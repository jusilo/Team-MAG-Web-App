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
            // Redirect to the "add event" page if confirmed
            window.location.href = url;
        }
    });
}
function confirmJoin(event, eventId) {
    event.preventDefault(); // Prevent the form from submitting immediately

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to join this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, join it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById('join-event-form-' + eventId).submit();
        }
    });
}

function confirmEdit(event, eventId) {
    event.preventDefault(); // Prevent the default action

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, redirect to the edit event page
            window.location.href = "/edit-event/" + eventId;  // Redirect to the edit page
        }
    });
}

function confirmCancel(event, eventId) {
    event.preventDefault(); // Prevent the form from submitting immediately

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById('cancel-event-form-' + eventId).submit();
        }
    });
}

function confirmJoin(event, eventId) {
    event.preventDefault(); // Prevent the form from submitting immediately

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to join this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, join it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById('join-event-form-' + eventId).submit();
        }
    });
}

function confirmEdit(event, eventId) {
    event.preventDefault(); // Prevent the default action

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, redirect to the edit event page
            window.location.href = "/edit-event/" + eventId;  // Redirect to the edit page
        }
    });
}

function confirmCancel(event, eventId) {
    event.preventDefault(); // Prevent the form from submitting immediately

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById('cancel-event-form-' + eventId).submit();
        }
    });
}

window.onload = function() {
    const messages = document.getElementById('flash-messages');
    if (messages) {
        const messageList = messages.children;
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i].innerHTML;
            const category = messageList[i].classList;

            // Customize alert based on category (success, danger, etc.)
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

function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.id !== eventId); // Filter event by ID
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents(); // Reload events after deletion
}
document.getElementById("search").addEventListener("input", function () {
    let filter = this.value.toLowerCase().trim(); // Get input and trim spaces
    let events = document.querySelectorAll(".event-card"); // Select all event cards
    let hasResults = false;

    events.forEach(event => {
        let title = event.querySelector("h3").textContent.toLowerCase(); // Get event title
        if (title.includes(filter)) {
            event.style.display = "block"; // Show matching event
            hasResults = true;
        } else {
            event.style.display = "none"; // Hide non-matching event
        }
    });

    // Handle "No Events Found" message
    let noResultsMessage = document.getElementById("noResults");
    if (!hasResults) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement("p");
            noResultsMessage.id = "noResults";
            noResultsMessage.textContent = "No events found.";
            noResultsMessage.style.textAlign = "center";
            noResultsMessage.style.color = "gray";
            document.getElementById("eventGrid").appendChild(noResultsMessage);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    });*/


