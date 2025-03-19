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
    const slides = document.querySelectorAll(`#slides-${eventId} img`);
    if (slides.length === 0) return;

    let currentIndex = Array.from(slides).findIndex(img => img.classList.contains('active'));

    if (currentIndex === -1) {
        currentIndex = 0;
        slides[currentIndex].classList.add('active');
        return;
    }

    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
}


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
;