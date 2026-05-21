// Handles header interactions for mobile navigation and compact-on-scroll behavior.
(function () {
    // Resolve mobile navigation elements.
    var mobileMenuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileMenuDonate = document.getElementById('mobile-menu-donate');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            // Read current menu state and mirror it into aria-expanded for accessibility.
            var isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));

            // Toggle the primary mobile links and donate CTA visibility together.
            mobileMenu.classList.toggle('hidden');
            if (mobileMenuDonate) {
                mobileMenuDonate.classList.toggle('hidden');
            }
        });
    }

    // Resolve sticky-header elements and style behavior flags.
    var siteHeader = document.getElementById('site-header');
    var siteNav = document.getElementById('site-nav');
    var siteLogo = document.getElementById('site-logo');
    var shouldExpandNav = siteHeader ? siteHeader.dataset.expandNav === 'true' : true;
    var searchToggleButton = document.getElementById('navbar-search-toggle');
    var desktopSearchBar = document.getElementById('desktop-search-bar');
    var isHeaderCompact = false;

    // Keep search toggle aria-expanded synced with visibility state.
    if (searchToggleButton && desktopSearchBar) {
        var observer = new MutationObserver(function () {
            // Keep aria-expanded in sync with the live hidden state of the search panel.
            var isHidden = desktopSearchBar.classList.contains('hidden');
            searchToggleButton.setAttribute('aria-expanded', String(!isHidden));
        });
        observer.observe(desktopSearchBar, { attributes: true, attributeFilter: ['class'] });
    }

    // Applies compact or expanded header classes to match the current scroll state.
    function setHeaderCompactState(nextIsCompact) {
        // Avoid unnecessary DOM updates when the state is unchanged.
        if (isHeaderCompact === nextIsCompact) {
            return;
        }

        // Persist the new compact state so scroll logic can compare correctly.
        isHeaderCompact = nextIsCompact;

        // Toggle compact class hook on the header shell.
        if (siteHeader) {
            siteHeader.classList.toggle('is-compact', isHeaderCompact);
        }

        // Swap vertical nav spacing classes for expanded vs compact mode.
        if (siteNav) {
            siteNav.classList.toggle('py-4', !isHeaderCompact);
            siteNav.classList.toggle('py-2', isHeaderCompact);
        }

        // Scale logo height to match the header density.
        if (siteLogo) {
            siteLogo.classList.toggle('h-12', !isHeaderCompact);
            siteLogo.classList.toggle('h-10', isHeaderCompact);
        }
    }

    // Updates the header size based on scroll position when expanded navigation is enabled.
    function updateHeaderOnScroll() {
        // Use current vertical position to switch between expanded and compact thresholds.
        var scrollY = window.scrollY;

        if (shouldExpandNav) {
            if (!isHeaderCompact && scrollY > 24) {
                setHeaderCompactState(true);
            } else if (isHeaderCompact && scrollY < 8) {
                setHeaderCompactState(false);
            }
        }
    }

    if (shouldExpandNav) {
        // Initialize from the current scroll position for first paint consistency.
        setHeaderCompactState(window.scrollY > 24);
    } else {
        // Keep compact mode locked when expansion behavior is disabled in settings.
        setHeaderCompactState(true);
    }

    // Run once and then on future scroll events.
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
})();
