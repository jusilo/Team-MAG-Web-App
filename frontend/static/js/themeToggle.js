// Theme toggle functionality
const toggleButton = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

toggleButton.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  if (toggleButton) {
    toggleButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}
