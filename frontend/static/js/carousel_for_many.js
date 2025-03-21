//for carousel
function moveSlide(direction, eventId) {
    try {
        const slidesContainer = document.querySelector(`#slides-${eventId}`);
        if (!slidesContainer) {
            console.error(`Slides container not found for event ${eventId}`);
            return;
        }

        const slides = slidesContainer.querySelectorAll('img');
        if (!slides || slides.length === 0) {
            console.error(`No slides found for event ${eventId}`);
            return;
        }

        let currentIndex = Array.from(slides).findIndex(img => img.classList.contains('active'));
        
        // If no active slide is found, activate the first one
        if (currentIndex === -1) {
            currentIndex = 0;
            slides[currentIndex].classList.add('active');
            return;
        }

        // Remove active class from current slide
        slides[currentIndex].classList.remove('active');
        
        // Calculate new index
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        
        // Add active class to new slide
        slides[currentIndex].classList.add('active');
        
        console.log(`Moved to slide ${currentIndex} for event ${eventId}`);
    } catch (error) {
        console.error('Error in moveSlide:', error);
    }
}

// Add event listeners for carousel buttons when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all carousel buttons
    document.querySelectorAll('.prev, .next').forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent any parent elements from handling the click
            e.stopPropagation();
        });
    });
});
