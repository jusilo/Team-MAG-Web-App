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

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if theme was previously saved
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
});
