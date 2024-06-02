window.addEventListener('headerLoaded', () => {
  const toggleThemeButton = document.getElementById('toggle-theme');
  const body = document.body;

  // Comprueba si el modo oscuro está guardado en localStorage y actualiza la interfaz de usuario en consecuencia
  if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    toggleThemeButton.textContent = '🌙';
  }

  toggleThemeButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      toggleThemeButton.textContent = '☀️';
      localStorage.setItem('dark-mode', 'false');
    } else {
      body.classList.add('dark-mode');
      toggleThemeButton.textContent = '🌙';
      localStorage.setItem('dark-mode', 'true');
    }
  });
});