// Initializes the back-to-top button click behavior.
(function () {
    // Resolve the back-to-top control once for this script scope.
    var backToTopButton = document.getElementById('back-to-top');

    // Exit early when the button is not present in the current layout.
    if (!backToTopButton) {
        return;
    }

    backToTopButton.addEventListener('click', function () {
        // Smoothly return to the top of the page for better orientation.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
