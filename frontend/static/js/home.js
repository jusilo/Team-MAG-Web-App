// home.js
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


