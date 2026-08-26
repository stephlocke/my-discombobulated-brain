// Starts logo-track animations unless reduced motion is preferred.
(function () {
    // Respect user motion preferences before applying continuous animation.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        return;
    }

    // Select only tracks that have not already been animated.
    const tracks = document.querySelectorAll('[data-logo-carousel-track]:not([data-animated])');
    tracks.forEach(function (track) {
        // Skip tracks that are not yet measurable.
        if (!track.scrollWidth) {
            return;
        }

        // Read the target scroll speed (pixels per second) from Hugo-provided
        // data or fallback. Deriving duration from speed, rather than using a
        // fixed duration, keeps the visual speed consistent across carousels
        // regardless of how many logos each one has.
        const pixelsPerSecond = Number(track.dataset.logoCarouselSpeed || 50);

        // Mark the track to avoid duplicate animation initialization.
        track.setAttribute('data-animated', 'true');

        // Animate by half the duplicated track width to create a seamless loop.
        const distance = track.scrollWidth / 2;
        const duration = (distance / pixelsPerSecond) * 1000;
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
