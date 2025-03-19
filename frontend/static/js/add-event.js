document.getElementById("createEventBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // SweetAlert confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById("eventForm").submit();
        }
    });
});

// Theme switcher functionality
const toggleSwitch = document.querySelector('#checkbox');
const lightText = document.querySelector('.theme-mode-text:first-child');
const darkText = document.querySelector('.dark-text');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update text opacity based on theme
    if (theme === 'dark') {
        lightText.style.opacity = '0.5';
        darkText.style.opacity = '1';
    } else {
        lightText.style.opacity = '1';
        darkText.style.opacity = '0.5';
    }
}

// Check for saved theme preference or use default light theme
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
setTheme(currentTheme);

// Set initial toggle position
toggleSwitch.checked = currentTheme === 'dark';

// Handle theme toggle change
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

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

    // Check for saved theme at page load and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            toggleSwitch.checked = true;
            lightText.style.opacity = '0.5';
            darkText.style.opacity = '1';
        } else {
            lightText.style.opacity = '1';
            darkText.style.opacity = '0.5';
        }
    }
};