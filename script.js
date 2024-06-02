window.addEventListener("DOMContentLoaded", (event) => {
  const headerContainer = document.getElementsByClassName("container")[0];

  fetch("./header.html")
    .then((response) => response.text())
    .then((data) => (headerContainer.innerHTML = data));
  // Dispara un evento personalizado para indicar que el encabezado se ha cargado
  const headerLoadedEvent = new Event("headerLoaded");
  window.dispatchEvent(headerLoadedEvent);
});
