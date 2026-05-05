// js/onboarding.js
(function () {
    'use strict';

    const TOTAL_SLIDES = 4;
    let currentIndex = 0;

    const track = document.getElementById('ob-track');

    // ── Navigate to a slide ──────────────────────────────────────
    function goTo(index) {
        if (index < 0 || index >= TOTAL_SLIDES) return;

        const newSlide = track.children[index];
        newSlide.classList.add('entering');
        // Remove entering class after animation finishes
        newSlide.addEventListener('animationend', () => {
            newSlide.classList.remove('entering');
        }, { once: true });

        currentIndex = index;
        // Slide the track: each slide = 25% of the 400%-wide track
        // So offset in viewport units = index * (100% of device width)
        // But since track is 400% wide, each child is 100% device width
        // We move by (index * 100 / 4)% of the track width, which equals index * 25%
        // Simpler: just translate by negative index × device width (100vw for track)
        track.style.transform = `translateX(-${index * 25}%)`;
    }

    // ── Skip (go to dashboard) ───────────────────────────────────
    function skip() {
        window.location.href = 'dashboard.html';
    }

    // ── Wire up buttons ──────────────────────────────────────────
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
        const continueBtn = document.getElementById(`ob-continue-${i}`);
        const skipBtn     = document.getElementById(`ob-skip-${i}`);

        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (i < TOTAL_SLIDES) {
                    goTo(i); // next slide (0-indexed: slide i is index i)
                } else {
                    skip();  // last slide → go to dashboard
                }
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', skip);
        }
    }

    // ── Touch / swipe support ────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Only respond to horizontal swipes
        if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 40) return;

        if (dx < 0 && currentIndex < TOTAL_SLIDES - 1) {
            goTo(currentIndex + 1); // swipe left → next
        } else if (dx > 0 && currentIndex > 0) {
            goTo(currentIndex - 1); // swipe right → prev
        }
    }, { passive: true });

    // ── Initial state ────────────────────────────────────────────
    goTo(0);

})();
