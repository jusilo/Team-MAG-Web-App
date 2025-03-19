// home.js

function confirmAddEvent(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add a new event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = url;
        }
    });
}

function confirmJoin(event, eventId) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to join this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, join it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('join-event-form-' + eventId).submit();
        }
    });
}

function confirmEdit(event, eventId) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/edit-event/" + eventId;
        }
    });
}

function confirmCancel(event, eventId) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('cancel-event-form-' + eventId).submit();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-btn");

    // Check if the logout button is found
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            confirmLogout();
        });
    } else {
        console.error("Logout button not found!");
    }

    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});

function confirmLogout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to log out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Submit the form if the user confirms the logout
            document.getElementById("logout-form").submit();
        }
    });
}

window.onload = function () {
    const messages = document.getElementById('flash-messages');
    if (messages) {
        const messageList = messages.children;
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i].innerHTML;
            const category = messageList[i].classList;

            if (category.contains('success')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('danger')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('info')) {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('warning')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'question',
                    title: 'Message',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            }
        }
    }
};

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

/*document.addEventListener("DOMContentLoaded", function () {
    const addEventBtn = document.querySelector(".add-event-btn");

    // Redirect to Add Event Page
    addEventBtn.addEventListener("click", function () {
        window.location.href = "add-event.html";
    });

    // Load events from localStorage
    loadEvents();
});

function loadEvents() {
    const eventGrid = document.getElementById("eventGrid");
    eventGrid.innerHTML = ""; // Clear grid
    const events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <img src="${event.mainImage || 'placeholder.jpg'}" alt="Event Image">
            <h3>${event.name}</h3>
            <p>${event.place} / ${event.date}</p>
        `;

        eventGrid.appendChild(eventCard);
    });
}
;*/