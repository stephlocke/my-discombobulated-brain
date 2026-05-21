// Initializes desktop search interactions and keeps search code scoped.
(function () {
    var searchBar = document.getElementById('desktop-search-bar');

    // Exit when desktop search markup is not present on the page.
    if (!searchBar) {
        return;
    }

    // Read Hugo-provided configuration from data attributes.
    var indexUrl = searchBar.dataset.indexUrl || '/index.json';
    var cardRounding = searchBar.dataset.cardRounding || '';
    var summaryLimitMicro = Number(searchBar.dataset.summaryLimitMicro || 100);
    var searchPageUrl = searchBar.dataset.searchPageUrl || '/search/';
    var searchIndex = null;
    var searchTimeout = null;

    // Escapes potentially unsafe HTML before rendering user-facing text.
    function escapeHtml(str) {
        // Use a detached element so the browser encodes any special characters safely.
        var div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    // Builds a snippet around the first match and highlights all matched terms.
    function highlightTerms(html, terms, limit) {
        // Normalize to plain text so highlighting logic is independent of source markup.
        var temp = document.createElement('div');
        temp.innerHTML = html || '';
        var text = (temp.textContent || temp.innerText || '').replace(/\s+/g, ' ').trim();
        var lowercaseText = text.toLowerCase();
        var snippetStart = 0;
        var firstMatchIndex = -1;

        // Find the earliest matching term in the searchable text.
        terms.forEach(function (term) {
            var currentIndex = lowercaseText.indexOf(term.toLowerCase());
            if (currentIndex !== -1 && (firstMatchIndex === -1 || currentIndex < firstMatchIndex)) {
                firstMatchIndex = currentIndex;
            }
        });

        // Track the longest term at the first match to keep full matches visible.
        var matchLength = 0;
        if (firstMatchIndex !== -1) {
            terms.forEach(function (term) {
                if (lowercaseText.indexOf(term.toLowerCase()) === firstMatchIndex && term.length > matchLength) {
                    matchLength = term.length;
                }
            });
        }

        // Center a fixed-length snippet around the first match when truncation is needed.
        if (firstMatchIndex !== -1 && text.length > limit) {
            var availableContext = Math.max(limit - matchLength, 0);
            var contextBefore = Math.floor(availableContext / 2);
            snippetStart = Math.max(0, firstMatchIndex - contextBefore);

            // Clamp the start if the snippet would run beyond the text length.
            if (snippetStart + limit > text.length) {
                snippetStart = Math.max(0, text.length - limit);
            }
        }

        // Finalize snippet boundaries and guarantee the first full match is included.
        var snippetEnd = Math.min(text.length, snippetStart + limit);
        if (firstMatchIndex !== -1 && snippetEnd < firstMatchIndex + matchLength) {
            snippetStart = Math.max(0, firstMatchIndex + matchLength - limit);
            snippetEnd = Math.min(text.length, snippetStart + limit);
        }

        // Add leading and trailing ellipses when content is omitted.
        var hasLeadingText = snippetStart > 0;
        var hasTrailingText = snippetEnd < text.length;
        var truncated = (hasLeadingText ? '\u2026' : '') + text.slice(snippetStart, snippetEnd) + (hasTrailingText ? '\u2026' : '');

        // Highlight matching terms (case-insensitive).
        var highlighted = escapeHtml(truncated);
        terms.forEach(function (term) {
            // Escape term regex tokens before creating the case-insensitive matcher.
            var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            highlighted = highlighted.replace(regex, '<span class="search-term-highlight">$1</span>');
        });

        return highlighted;
    }

    // Creates one search result item for the desktop search dropdown list.
    function renderResult(item, terms) {
        // Build a compact result row with highlighted title and snippet preview.
        var li = document.createElement('li');
        li.innerHTML =
            '<a href="' + escapeHtml(item.url) + '" ' +
                'class="block bg-white border border-primary/20 p-3 ' + cardRounding + ' hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary text-sm transition">' +
                '<p class="font-semibold text-primary hover:underline hover:underline-offset-2 line-clamp-1">' + highlightTerms(item.title, terms, 999) + '</p>' +
                ((item.content || item.summary) ? '<p class="text-off-black text-xs mt-1">' + highlightTerms(item.content || item.summary, terms, summaryLimitMicro) + '</p>' : '') +
            '</a>';
        return li;
    }

    // Loads and caches the search index JSON so repeated searches are fast.
    async function loadIndex() {
        // Return cached data immediately when available.
        if (searchIndex) {
            return searchIndex;
        }

        try {
            // Fetch and parse the search index once per page load.
            var response = await fetch(indexUrl);
            if (!response.ok) {
                throw new Error('index unavailable');
            }
            searchIndex = await response.json();
            return searchIndex;
        } catch (e) {
            // Keep failures non-fatal and let callers show user-facing status text.
            console.error('Failed to load search index:', e);
            return null;
        }
    }

    // Filters index entries by query terms and updates dropdown results and status text.
    async function performSearch(query) {
        // Resolve current UI targets used during each search update cycle.
        var resultsList = document.getElementById('desktop-search-results-list');
        var resultsContainer = document.getElementById('desktop-search-results');
        var statusText = document.getElementById('desktop-search-status');

        // Hide everything when the input is empty.
        if (!query.trim()) {
            resultsContainer.classList.add('hidden');
            statusText.classList.add('hidden');
            resultsList.innerHTML = '';
            return;
        }

        // Ensure the index is available before filtering.
        var index = await loadIndex();
        if (!index) {
            statusText.textContent = 'Search is temporarily unavailable.';
            statusText.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
            return;
        }

        // Split the query into normalized terms for an AND-style match.
        var q = query.toLowerCase().trim();
        var terms = q.split(/\s+/).filter(Boolean);

        // Match items whose cached haystack contains every query term.
        var results = index.filter(function (item) {
            if (!item._haystack) {
                // Build and cache a lowercase searchable corpus from key fields.
                item._haystack = [
                    item.title || '',
                    item.summary || '',
                    item.content || '',
                    (item.tags || []).join(' ')
                ].join(' ').toLowerCase();
            }
            return terms.every(function (term) {
                return item._haystack.includes(term);
            });
        });

        // Clear old result rows before rendering the latest query output.
        resultsList.innerHTML = '';

        if (results.length === 0) {
            statusText.textContent = 'No results for "' + escapeHtml(query) + '"';
            statusText.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
            return;
        }

        // Show result count before appending visible result rows.
        statusText.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for "' + escapeHtml(query) + '"';
        statusText.classList.remove('hidden');

        // Render only the top five results in the dropdown preview.
        results.slice(0, 5).forEach(function (item) {
            resultsList.appendChild(renderResult(item, terms));
        });

        resultsContainer.classList.remove('hidden');
    }

    // Wires up search bar events for toggle, typing, submit, and keyboard dismissal.
    function initSearchBar() {
        // Resolve all interactive elements used by search bar behavior.
        var searchInput = document.getElementById('desktop-search-input');
        var searchForm = document.getElementById('desktop-search-form');
        var resultsContainer = document.getElementById('desktop-search-results');
        var searchToggleButton = document.getElementById('navbar-search-toggle');

        if (!searchInput) {
            return;
        }

        // Toggle search bar visibility.
        if (searchToggleButton && searchBar) {
            searchToggleButton.addEventListener('click', function (e) {
                // Keep this button from triggering navigation or form side effects.
                e.preventDefault();

                // Flip visibility based on the current state.
                searchBar.classList.toggle('hidden', !searchBar.classList.contains('hidden'));

                // Focus the input when opening.
                if (!searchBar.classList.contains('hidden')) {
                    searchInput.focus();
                }
            });
        }

        // Auto-execute search as user types.
        searchInput.addEventListener('input', function () {
            // Debounce requests so we search after the user pauses typing briefly.
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function () {
                performSearch(searchInput.value);
            }, 200);
        });

        // Handle form submission.
        searchForm.addEventListener('submit', function (e) {
            // Keep search UX on the client by handling query routing ourselves.
            e.preventDefault();
            var query = searchInput.value.trim();
            if (query) {
                window.location.href = searchPageUrl + '?q=' + encodeURIComponent(query);
            }
        });

        // Hide the entire search bar when clicking outside.
        document.addEventListener('click', function (e) {
            // Close both the bar and dropdown unless the click happened inside search UI.
            if (!e.target.closest('#desktop-search-bar') && !e.target.closest('#navbar-search-toggle')) {
                searchBar.classList.add('hidden');
                resultsContainer.classList.add('hidden');
            }
        });

        // Allow navigation with keyboard.
        searchInput.addEventListener('keydown', function (e) {
            // Escape closes the search experience quickly from the keyboard.
            if (e.key === 'Escape') {
                resultsContainer.classList.add('hidden');
                searchBar.classList.add('hidden');
            }
        });
    }

    // Wait for DOM readiness before binding events when needed.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearchBar);
    } else {
        initSearchBar();
    }
})();
