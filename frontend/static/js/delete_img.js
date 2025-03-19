document.querySelectorAll('.delete-image-btn').forEach(button => {
    button.addEventListener('click', function() {
        const albumId = this.dataset.albumId;
        const imageIndex = this.dataset.imageIndex;
        const carouselItem = this.closest('.carousel-item');

        Swal.fire({
            title: 'Are you sure?',
            text: "This image will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/delete-image/${albumId}/${imageIndex}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Remove the carousel item from DOM
                        carouselItem.remove();
                        Swal.fire('Deleted!', 'The image has been deleted.', 'success').then(() => {
                            location.reload(); // Reload the page to reinitialize the carousel properly
                        });
                    } else {
                        Swal.fire('Error!', data.message || 'Failed to delete the image.', 'error');
                    }
                })
                .catch(() => {
                    Swal.fire('Error!', 'Network or server issue.', 'error');
                });
            }
        });
    });
});

function updateCarouselAfterDelete() {
    // Get all remaining carousel items
    const items = document.querySelectorAll('.carousel-item');
    const carousel = document.querySelector('.carousel');
    
    if (items.length === 0) {
        // If no images left, add the no-image placeholder
        const noImageHtml = `
            <div class="carousel-item active">
                <img src="/static/images/no-image.jpg" alt="No Image Available">
            </div>`;
        
        // Preserve the navigation buttons but insert the no-image content
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        // Clear existing items but keep the buttons
        while (carousel.firstChild) {
            if (!carousel.firstChild.classList.contains('carousel-prev') && 
                !carousel.firstChild.classList.contains('carousel-next')) {
                carousel.removeChild(carousel.firstChild);
            }
        }
        
        // Insert the no-image content before the next button
        if (nextBtn) {
            nextBtn.insertAdjacentHTML('beforebegin', noImageHtml);
        } else {
            carousel.insertAdjacentHTML('afterbegin', noImageHtml);
        }
        
        // Hide navigation buttons
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    } else {
        // Show navigation buttons
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';
        
        // Update currentIndex if it's now out of bounds
        if (currentIndex >= items.length) {
            currentIndex = items.length - 1;
        }
        
        // Make sure one item is active
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
            
            // Update data-image-index attributes
            const deleteBtn = item.querySelector('.delete-image-btn');
            if (deleteBtn) {
                deleteBtn.dataset.imageIndex = index;
            }
        });
    }
}
