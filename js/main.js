// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // Complex navigation interaction for the mockup with view routing
    const navItems = document.querySelectorAll(".nav-item");
    const viewHome = document.getElementById("view-home");
    const viewCard = document.getElementById("view-card");
    const appContainer = document.querySelector(".app-container");
    
    // Map of nav indexes to views (0 = Home, 1 = Card)
    const viewMap = [viewHome, viewCard, null, null, null];
    let currentIndex = 0; // Starts at Home

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // Remove active class from all
            if (item.classList.contains("active")) return;
            
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            // Handle routing if view exists
            const nextView = viewMap[index];
            const currentView = viewMap[currentIndex];
            
            if (nextView && currentView && nextView !== currentView) {
                // Scroll to top
                appContainer.scrollTop = 0;

                // Reset animation classes
                currentView.className = "app-content view-pane";
                nextView.className = "app-content view-pane";

                // Direction logic: if going to a higher index, slide right-to-left
                if (index > currentIndex) {
                    currentView.classList.add("slide-out-left");
                    nextView.classList.add("slide-in-right");
                } else {
                    // Sliding back, left-to-right
                    currentView.classList.add("slide-out-right");
                    nextView.classList.add("slide-in-left");
                }
                
                currentIndex = index;

                // After animation completes, clean up classes to keep it robust
                setTimeout(() => {
                    // Only apply if it's still the active view after the timeout
                    if (currentIndex === index) {
                        currentView.className = "app-content view-pane"; // Hide old
                        nextView.className = "app-content view-pane active"; // Show new
                        
                        // Fire card animation when entering the card view
                        if (nextView.id === 'view-card') {
                            const slide = nextView.querySelector('.card-slide');
                            if (slide) {
                                slide.classList.remove('play-anim');
                                void slide.offsetWidth;
                                slide.classList.add('play-anim');
                            }
                        }
                    }
                }, 400); // matches the 0.4s CSS duration
            } else if (nextView === null) {
                // Fallback for unimplemented tabs, just update index
                currentIndex = index;
            }
        });
    });

    // Allow clicking the card itself to replay the animation manually
    const cardSlides = document.querySelectorAll('.card-slide');
    cardSlides.forEach(slide => {
        slide.style.cursor = 'pointer'; // Ensure it looks clickable
        slide.addEventListener('click', () => {
            // Fire the Aura/Flare animation manually on click
            slide.classList.remove('play-anim');
            void slide.offsetWidth; 
            slide.classList.add('play-anim');
        });
    });

    // Sub-interaction: animate account cards on click
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('click', () => {
            // Smoothly scroll the card to the center of the carousel
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        });
    });
});
