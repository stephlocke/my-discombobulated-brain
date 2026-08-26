// Starts logo-track animations unless reduced motion is preferred, and
// proactively loads the remaining (initially lazy) logos shortly after
// the page settles.
(function () {
    // Select every carousel track once - the warm-up step below applies
    // regardless of whether the animation itself runs.
    const tracks = document.querySelectorAll('[data-logo-carousel-track]');

    // Proactively fetch the logos left lazy (everything beyond the first
    // screenful, plus the whole duplicated half of the track used for the
    // seamless loop). Native loading="lazy" is unreliable here: the track
    // is animated via a CSS transform rather than real scrolling, so the
    // browser can defer these fetches until the animation happens to carry
    // them close to the viewport - or, with reduced motion on, never fetch
    // them at all, since nothing ever moves. Warming them up shortly after
    // the page settles guarantees they're ready well before they're
    // needed, without competing with the initial paint (hero image, first
    // screenful) for bandwidth.
    function warmUpLazyLogos() {
        tracks.forEach(function (track) {
            track.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
                img.loading = 'eager';
            });
        });
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(warmUpLazyLogos, { timeout: 3000 });
    } else {
        setTimeout(warmUpLazyLogos, 1000);
    }

    // Respect user motion preferences before applying continuous animation.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        return;
    }

    tracks.forEach(function (track) {
        // Skip tracks already animated or not yet measurable.
        if (track.hasAttribute('data-animated') || !track.scrollWidth) {
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
