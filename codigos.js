const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");
const codes = {
  "10-00": "Precaución",
  "10-03": "Información sobre algo",
  "10-04": "Afirmativo",
  "10-05": "Negativo",
  "10-06": "Parada de tráfico",
  "10-08": "Esperando Asignación",
  "10-09": "Repetir último mensaje",
  "10-10": "Fin del servicio",
  "10-11": "Comunicación más lenta",
  "10-14": "Sujeto Sospechoso",
  "10-15": "Sujeto Detenido",
  "10-20": "Ubicación",
  "10-22": "Vuelta a Comisaria",
  "10-23": "Espera",
  "10-25": "Traslado de detenido",
  "10-37": "Llamada a la Grúa",
  "10-50": "Accidente de Tráfico",
  "10-95": "Procesar a un sujeto",
  "10-97": "Llegada a la zona",
  "10-98": "Finalización de acción",
  148: "Resistencia al arresto",
  254: "Persecución a pie",
  147: "Homicidio",
  320: "Venta de droga",
  207: "Secuestro",
  211: "Robo a mano armada",
  215: "Disparos / Tiroteo en curso",
  240: "Agresión",
  245: "Agresión con arma letal",
  "254 Paul": "Persecución a pie",
  320: "Venta de droga",
  415: "Disturbios / Peleas",
  417: "Sujeto armado",
  444: "Agente en peligro",
  459: "Robo a domicilio",
  487: "Robo mayor",
  488: "Robo menor",
  QRR: "Activación del botón del Pánico",
  "Código 1": "Aviso / Incidencia",
  "Código 2": "Patrullaje Ordinario",
  "Código 3": "Prioridad Máxima",
  "Código 4": "No se necesitan refuerzos",
  "Código 4 ADAM": "Sin visual, retoma patrullaje",
  "Código 5": "Abandonar la zona",
  "Código 6": "Vigilancia por la zona en vehículo",
  "Código 6 PAUL": "Vigilancia por la zona a pie",
  "Código 6-ADAM": "Solicito refuerzos",
  "Código 7": "Parada Técnica",
  "Código 8": "Llamada a la ambulancia",
  "Código 8 ADAM": "Llamada de varias ambulancias",
  "Código 9": "Sujeto en búsqueda y captura",
  "Código 9 ADAM": "Sujeto peligroso en búsqueda y captura",
  "Código 10": "Delito Flagrante",
  "Código 11": "Situación actual",
  "Código 12": "Falsa Alarma",
  "Código 37": "Vehículo notificado como robo",
  "Código 100": "Bloqueo de calle con vehículo",
  "Código ADAM": "Cerrar la zona",
  QRR: "Activación del botón del Pánico",
  "CLAVE ROBERT": "Disparar a las ruedas",
  "CLAVE PIT": "Autorización para envestir",
  "TOM CHARLES": "Choque con el Vehículo",
  187: "Homicidio",
  243: "Agresión sexual",
  111: "Robo en progreso",
  210: "Robo",
  288: "Violación de menor",
  451: "Incendio",
  483: "Robo en establecimiento comercial",
  509: "Droga en posesión",
  5150: "Persona con problemas mentales",
  517: "Persona en peligro",
  594: "Vandalismo",
  600: "Asalto a mano armada",
  786: "Fuga de un preso",
  PC: "Persona desaparecida",
  CI: "Investigación en curso",
  API: "Persona de interés",
};

function removeAccentsAndNonAlphanumeric(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\W/g, "");
}

searchInput.addEventListener("input", () => {
  const searchTerm = removeAccentsAndNonAlphanumeric(searchInput.value.toUpperCase());
  const results = [];

  for (const code in codes) {
    if (
      removeAccentsAndNonAlphanumeric(code.toUpperCase()).includes(searchTerm) ||
      removeAccentsAndNonAlphanumeric(codes[code].toUpperCase()).includes(searchTerm)
    ) {
      results.push({ code, description: codes[code] });
    }
  }

  // Sort the original results by how closely they match the search term
  results.sort((a, b) => {
    const aMatch = a.code.toUpperCase().includes(searchInput.value.toUpperCase());
    const bMatch = b.code.toUpperCase().includes(searchInput.value.toUpperCase());

    if (aMatch && !bMatch) {
      return -1;
    } else if (!aMatch && bMatch) {
      return 1;
    } else {
      return 0;
    }
  });

  displayResults(results);
});

function displayResults(results) {
    resultsContainer.innerHTML = "";
  
    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }
  
    for (const result of results) {
      const resultElement = document.createElement("div");
      resultElement.classList.add("result");
      resultElement.innerHTML = `
      <div style="border: 1px solid #ddd; margin: 10px 0; padding: 10px; border-radius: 5px;">
        <h3 style="margin: 0;">${result.code}</h3>
        <p style="margin: 0;">${result.description}</p>
      </div>
      `;
  
      resultsContainer.appendChild(resultElement);
    }
  }
  
  // Convert the codes object to an array of objects and display them
  const allCodes = Object.entries(codes).map(([code, description]) => ({ code, description }));
  displayResults(allCodes);
