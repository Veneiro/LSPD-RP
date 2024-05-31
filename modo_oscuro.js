const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeButton.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    toggleThemeButton.textContent = 'Cambiar a modo oscuro';
  } else {
    body.classList.add('dark-mode');
    toggleThemeButton.textContent = 'Cambiar a modo claro';
  }
});