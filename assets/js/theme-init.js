// Applies the saved or system theme as early as possible to prevent a flash.
(function () {
    // Read persisted theme preference from local storage.
    const savedTheme = localStorage.getItem('theme');

    // Validate stored mode and fall back to auto when missing or invalid.
    const mode = savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'auto'
        ? savedTheme
        : 'auto';

    // Resolve system preference and decide whether dark mode should be active.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = mode === 'dark' || (mode === 'auto' && prefersDark);

    // Apply dark class before page paint when needed.
    if (shouldUseDark) {
        document.documentElement.classList.add('dark');
    }
})();
