// Initializes search behavior on page load and keeps variables scoped to this script.
(function () {
    const searchResults = document.getElementById('search-results');

    // Exit early when the search page container is not present.
    if (!searchResults) {
        return;
    }

    // Read Hugo-provided configuration from data attributes.
    const indexUrl = searchResults.dataset.indexUrl || '/index.json';
    const cardRounding = searchResults.dataset.cardRounding || '';
    const summaryLimit = Number(searchResults.dataset.summaryLimit || 150);

    // Escapes potentially unsafe HTML so user-facing text is rendered as plain text.
    function escapeHtml(str) {
        // Use a DOM element so the browser handles escaping for us.
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    // Builds a snippet around the earliest matched term and highlights all matched terms.
    function highlightTerms(html, terms, limit) {
        // Treat the source as plain text so literal angle brackets are preserved for matching/snippets.
        const temp = document.createElement('div');
        temp.textContent = html || '';
        const text = (temp.textContent || temp.innerText || '').replace(/\s+/g, ' ').trim();
        const lowercaseText = text.toLowerCase();
        let snippetStart = 0;
        let firstMatchIndex = -1;

        // Find the earliest matching term position in the source text.
        terms.forEach(function (term) {
            const currentIndex = lowercaseText.indexOf(term.toLowerCase());
            if (currentIndex !== -1 && (firstMatchIndex === -1 || currentIndex < firstMatchIndex)) {
                firstMatchIndex = currentIndex;
            }
        });

        // Capture the matched term length so we can keep the full match visible in the snippet.
        let matchLength = 0;
        if (firstMatchIndex !== -1) {
            terms.forEach(function (term) {
                if (lowercaseText.indexOf(term.toLowerCase()) === firstMatchIndex && term.length > matchLength) {
                    matchLength = term.length;
                }
            });
        }

        // Center the snippet window around the first match when the text exceeds the limit.
        if (firstMatchIndex !== -1 && text.length > limit) {
            const availableContext = Math.max(limit - matchLength, 0);
            const contextBefore = Math.floor(availableContext / 2);
            snippetStart = Math.max(0, firstMatchIndex - contextBefore);

            // Shift the snippet back if it would overflow the source text.
            if (snippetStart + limit > text.length) {
                snippetStart = Math.max(0, text.length - limit);
            }
        }

        // Build the final snippet boundaries and ensure the first full match fits in view.
        let snippetEnd = Math.min(text.length, snippetStart + limit);
        if (firstMatchIndex !== -1 && snippetEnd < firstMatchIndex + matchLength) {
            snippetStart = Math.max(0, firstMatchIndex + matchLength - limit);
            snippetEnd = Math.min(text.length, snippetStart + limit);
        }

        // Add ellipses when the snippet starts or ends mid-text.
        const hasLeadingText = snippetStart > 0;
        const hasTrailingText = snippetEnd < text.length;
        const truncated = (hasLeadingText ? '\u2026' : '') + text.slice(snippetStart, snippetEnd) + (hasTrailingText ? '\u2026' : '');

        // Highlight matching terms (case-insensitive).
        let highlighted = escapeHtml(truncated);
        terms.forEach(function (term) {
            // Escape regex characters in each term before building the highlighter regex.
            const regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            highlighted = highlighted.replace(regex, '<span class="search-term-highlight">$1</span>');
        });

        return highlighted;
    }

    // Creates one search-result list item with highlighted title and summary text.
    function renderResult(item, terms) {
        // Compose one result card using escaped values and highlighted snippets.
        const li = document.createElement('li');
        li.innerHTML =
            '<article class="h-full overflow-hidden border border-primary/10 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg focus-within:border-primary/30 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-primary/20 ' + cardRounding + '">' +
                '<div class="space-y-3 p-5 md:p-6">' +
                    '<h2 class="text-2xl font-semibold text-primary mb-3">' +
                        '<a href="' + escapeHtml(item.url) + '" class="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">' +
                            highlightTerms(item.title, terms, 999) +
                        '</a>' +
                    '</h2>' +
                    ((item.content || item.summary) ? '<p class="text-muted mb-4">' + highlightTerms(item.content || item.summary, terms, summaryLimit) + '</p>' : '') +
                    (item.date && item.date.trim() && item.date !== '0001-01-01' ? '<time class="text-sm text-subtle mb-4 block">' + escapeHtml(item.date) + '</time>' : '') +
                    '<a href="' + escapeHtml(item.url) + '" aria-label="Read ' + escapeHtml(item.title) + '" class="inline-block min-h-11 bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus-visible:bg-primary-darken focus-visible:ring-primary-darken ' + cardRounding + '">' +
                        'Read more' +
                    '</a>' +
                '</div>' +
            '</article>';
        return li;
    }

    // Reads the query string, loads the search index, filters matching content, and renders results.
    async function initSearch() {
        // Read the search query from the URL and mirror it into the input field.
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q') || '';

        const searchInput = document.getElementById('search-input');
        if (searchInput && query) {
            searchInput.value = query;
        }

        // Resolve output targets used for status messaging and result rendering.
        const status = document.getElementById('search-status');
        const list = document.getElementById('search-results-list');

        // Short-circuit when there is no query to run.
        if (!query.trim()) {
            status.textContent = 'Enter a search term to find content.';
            return;
        }

        status.textContent = 'Searching\u2026';

        // Fetch and parse the generated search index.
        let index;
        try {
            const response = await fetch(indexUrl);
            if (!response.ok) {
                throw new Error('index unavailable');
            }
            index = await response.json();
        } catch (e) {
            // Surface a friendly failure message when index loading fails.
            status.textContent = 'Search is temporarily unavailable.';
            return;
        }

        // Normalize and split the query into independent search terms.
        const q = query.toLowerCase().trim();
        const terms = q.split(/\s+/).filter(Boolean);

        // Keep only items that include every term in their precomputed haystack.
        const results = index.filter(function (item) {
            if (!item._haystack) {
                // Build a cached lowercase search string on first use.
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

        // Clear stale results before rendering the new result set.
        list.innerHTML = '';

        if (results.length === 0) {
            status.textContent = 'No results found for “' + escapeHtml(query) + '”.';
            return;
        }

        // Report count and append each matching result card.
        status.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for “' + escapeHtml(query) + '”';
        results.forEach(function (item) {
            list.appendChild(renderResult(item, terms));
        });
    }

    initSearch();
}());
