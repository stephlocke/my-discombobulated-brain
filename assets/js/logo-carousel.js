// Starts logo-track animations unless reduced motion is preferred.
(function () {
    // Respect user motion preferences before applying continuous animation.
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        return;
    }

    // Select only tracks that have not already been animated.
    var tracks = document.querySelectorAll('[data-logo-carousel-track]:not([data-animated])');
    tracks.forEach(function (track) {
        // Skip tracks that are not yet measurable.
        if (!track.scrollWidth) {
            return;
        }

        // Read animation duration from Hugo-provided data or fallback.
        var duration = Number(track.dataset.logoCarouselDuration || 25000);

        // Mark the track to avoid duplicate animation initialization.
        track.setAttribute('data-animated', 'true');

        // Animate by half the duplicated track width to create a seamless loop.
        var distance = track.scrollWidth / 2;
        track.animate(
            [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-' + distance + 'px)' }
            ],
            {
                duration: duration,
                iterations: Infinity,
                easing: 'linear'
            }
        );
    });
})();
