const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");
const codes = {
    "10-00": {
      description: "Precaución",
      details: "Indica que se debe proceder con precaución. Utilizado en situaciones donde hay potencial de peligro."
    },
    "10-03": {
      description: "Información sobre algo",
      details: "Se utiliza para solicitar o proporcionar información adicional sobre un tema específico."
    },
    "10-04": {
      description: "Afirmativo",
      details: "Confirma que un mensaje ha sido recibido y entendido correctamente."
    },
    "10-05": {
      description: "Negativo",
      details: "Indica que la respuesta a una pregunta es negativa o que una acción no puede ser realizada."
    },
    "10-06": {
      description: "Parada de tráfico",
      details: "Se refiere a una parada de tráfico rutinaria para inspección o verificación."
    },
    "10-08": {
      description: "Esperando Asignación",
      details: "Indica que una unidad está disponible y esperando una nueva asignación."
    },
    "10-09": {
      description: "Repetir último mensaje",
      details: "Solicita la repetición del último mensaje debido a que no fue comprendido o escuchado claramente."
    },
    "10-10": {
      description: "Fin del servicio",
      details: "Indica que una unidad ha finalizado su servicio y no está disponible para nuevas asignaciones."
    },
    "10-11": {
      description: "Comunicación más lenta",
      details: "Solicita que la comunicación sea más lenta para mejor comprensión."
    },
    "10-14": {
      description: "Sujeto Sospechoso",
      details: "Indica la presencia de un sujeto sospechoso en el área."
    },
    "10-15": {
      description: "Sujeto Detenido",
      details: "Informa que un sujeto ha sido detenido y está bajo custodia."
    },
    "10-20": {
      description: "Ubicación",
      details: "Solicita la ubicación actual de una unidad o persona."
    },
    "10-22": {
      description: "Vuelta a Comisaria",
      details: "Instruye a una unidad a regresar a la comisaría."
    },
    "10-23": {
      description: "Espera",
      details: "Solicita que una unidad espere en su ubicación actual."
    },
    "10-25": {
      description: "Traslado de detenido",
      details: "Indica que un detenido está siendo trasladado a una ubicación específica."
    },
    "10-37": {
      description: "Llamada a la Grúa",
      details: "Solicita el envío de una grúa para asistencia vehicular."
    },
    "10-50": {
      description: "Accidente de Tráfico",
      details: "Informa de un accidente de tráfico que requiere atención."
    },
    "10-95": {
      description: "Procesar a un sujeto",
      details: "Indica que un sujeto está siendo procesado, generalmente para arresto o detención."
    },
    "10-97": {
      description: "Llegada a la zona",
      details: "Informa que una unidad ha llegado a la escena o área asignada."
    },
    "10-98": {
      description: "Finalización de acción",
      details: "Indica que una acción o intervención ha sido completada."
    },
    "148": {
      description: "Resistencia al arresto",
      details: "Se refiere a una situación donde un sujeto está resistiendo activamente al arresto."
    },
    "254": {
      description: "Persecución a pie",
      details: "Informa de una persecución a pie de un sospechoso."
    },
    "147": {
      description: "Homicidio",
      details: "Se utiliza para reportar un incidente de homicidio."
    },
    "320": {
      description: "Venta de droga",
      details: "Indica una situación donde se ha detectado la venta de drogas."
    },
    "207": {
      description: "Secuestro",
      details: "Reporta un incidente de secuestro."
    },
    "211": {
      description: "Robo a mano armada",
      details: "Informa de un robo que se está llevando a cabo con uso de armas."
    },
    "215": {
      description: "Disparos / Tiroteo en curso",
      details: "Indica que hay disparos o un tiroteo en curso."
    },
    "240": {
      description: "Agresión",
      details: "Reporta un incidente de agresión física."
    },
    "245": {
      description: "Agresión con arma letal",
      details: "Informa de una agresión donde se ha utilizado un arma letal."
    },
    "254 Paul": {
      description: "Persecución a pie",
      details: "Específicamente designado para una persecución a pie de un sospechoso."
    },
    "415": {
      description: "Disturbios / Peleas",
      details: "Reporta disturbios o peleas en una área específica."
    },
    "417": {
      description: "Sujeto armado",
      details: "Indica la presencia de un sujeto armado."
    },
    "444": {
      description: "Agente en peligro",
      details: "Informa que un agente está en peligro y necesita asistencia inmediata."
    },
    "459": {
      description: "Robo a domicilio",
      details: "Reporta un robo en una residencia o domicilio."
    },
    "487": {
      description: "Robo mayor",
      details: "Indica un robo de mayor escala o significancia."
    },
    "488": {
      description: "Robo menor",
      details: "Se refiere a un robo de menor importancia o escala."
    },
    "QRR": {
      description: "Activación del botón del Pánico",
      details: "Informa que se ha activado un botón de pánico, indicando una emergencia."
    },
    "Código 1": {
      description: "Aviso / Incidencia",
      details: "Se utiliza para reportar una incidencia o dar un aviso general."
    },
    "Código 2": {
      description: "Patrullaje Ordinario",
      details: "Indica que una unidad está en patrullaje rutinario."
    },
    "Código 3": {
      description: "Prioridad Máxima",
      details: "Se utiliza en situaciones que requieren máxima prioridad y respuesta urgente."
    },
    "Código 4": {
      description: "No se necesitan refuerzos",
      details: "Informa que no se necesitan refuerzos adicionales en la escena."
    },
    "Código 4 ADAM": {
      description: "Sin visual, retoma patrullaje",
      details: "Indica que no se tiene visual del incidente y se retoma el patrullaje normal."
    },
    "Código 5": {
      description: "Abandonar la zona",
      details: "Instruye a las unidades a abandonar una zona específica."
    },
    "Código 6": {
      description: "Vigilancia por la zona en vehículo",
      details: "Solicita vigilancia en una zona utilizando un vehículo."
    },
    "Código 6 PAUL": {
      description: "Vigilancia por la zona a pie",
      details: "Solicita vigilancia en una zona a pie."
    },
    "Código 6 ADAM": {
      description: "Solicito refuerzos",
      details: "Informa de la necesidad de refuerzos en una zona específica."
    },
    "Código 7": {
      description: "Parada Técnica",
      details: "Indica una parada técnica por razones específicas como mantenimiento o descanso."
    },
    "Código 8": {
      description: "Llamada a la ambulancia",
      details: "Solicita una ambulancia en la escena."
    },
    "Código 8 ADAM": {
      description: "Llamada de varias ambulancias",
      details: "Informa que se necesitan múltiples ambulancias en la escena."
    },
    "Código 9": {
      description: "Sujeto en búsqueda y captura",
      details: "Indica que hay un sujeto buscado activamente por las autoridades."
    },
    "Código 9 ADAM": {
      description: "Sujeto peligroso en búsqueda y captura",
      details: "Se refiere a un sujeto peligroso que está siendo buscado activamente."
    },
    "Código 10": {
      description: "Delito Flagrante",
      details: "Reporta un delito que está ocurriendo en ese momento."
    },
    "Código 11": {
      description: "Situación actual",
      details: "Solicita o proporciona una actualización sobre la situación actual."
    },
    "Código 12": {
      description: "Falsa Alarma",
      details: "Informa que una alarma o reporte fue falso."
    },
    "Código 37": {
      description: "Vehículo notificado como robo",
      details: "Se utiliza para indicar que un vehículo ha sido reportado como robado."
    },
    "Código 100": {
      description: "Bloqueo de calle con vehículo",
      details: "Indica que una calle ha sido bloqueada utilizando un vehículo."
    },
    "Código ADAM": {
      description: "Cerrar la zona",
      details: "Solicita el cierre de una zona específica."
    },
    "CLAVE ROBERT": {
      description: "Disparar a las ruedas",
      details: "Autorización para disparar a las ruedas de un vehículo."
    },
    "CLAVE PIT": {
      description: "Autorización para envestir",
      details: "Permiso para realizar una maniobra de PIT para detener un vehículo."
    },
    "TOM CHARLES": {
      description: "Choque con el Vehículo",
      details: "Informa de un choque intencional con un vehículo."
    },
    "243": {
      description: "Agresión sexual",
      details: "Reporta un incidente de agresión sexual."
    },
    "111": {
      description: "Robo en progreso",
      details: "Informa de un robo que está ocurriendo en ese momento."
    },
    "210": {
      description: "Robo",
      details: "Se refiere a un incidente de robo en general."
    },
    "288": {
      description: "Violación de menor",
      details: "Reporta un incidente de violación de un menor."
    },
    "451": {
      description: "Incendio",
      details: "Informa de un incendio que requiere atención."
    },
    "483": {
      description: "Robo en establecimiento comercial",
      details: "Reporta un robo en una tienda o establecimiento comercial."
    },
    "509": {
      description: "Droga en posesión",
      details: "Informa que se ha encontrado droga en posesión de un individuo."
    },
    "5150": {
      description: "Persona con problemas mentales",
      details: "Indica la presencia de una persona con problemas mentales que puede necesitar atención."
    },
    "517": {
      description: "Persona en peligro",
      details: "Informa que una persona está en peligro y requiere asistencia."
    },
    "594": {
      description: "Vandalismo",
      details: "Se utiliza para reportar actos de vandalismo."
    },
    "600": {
      description: "Asalto a mano armada",
      details: "Informa de un asalto llevado a cabo con un arma."
    },
    "786": {
      description: "Fuga de un preso",
      details: "Reporta la fuga de un preso."
    },
    "PC": {
      description: "Persona desaparecida",
      details: "Informa que una persona ha sido reportada como desaparecida."
    },
    "CI": {
      description: "Investigación en curso",
      details: "Indica que hay una investigación en curso."
    },
    "API": {
      description: "Persona de interés",
      details: "Se refiere a una persona de interés en una investigación."
    }
  };  

  function removeAccentsAndNonAlphanumeric(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\W/g, "");
  }
  
  searchInput.addEventListener("input", () => {
    const searchTerm = removeAccentsAndNonAlphanumeric(
      searchInput.value.toUpperCase()
    );
    const results = [];
  
    for (const code in codes) {
      if (
        removeAccentsAndNonAlphanumeric(code.toUpperCase()).includes(
          searchTerm
        ) ||
        removeAccentsAndNonAlphanumeric(
          codes[code].description.toUpperCase()
        ).includes(searchTerm) ||
        removeAccentsAndNonAlphanumeric(
          codes[code].details.toUpperCase()
        ).includes(searchTerm)
      ) {
        results.push({
          code,
          description: codes[code].description,
          details: codes[code].details,
        });
      }
    }
  
    // Ordenar los resultados originales según la cercanía con el término de búsqueda
    results.sort((a, b) => {
      const aMatch = a.code
        .toUpperCase()
        .includes(searchInput.value.toUpperCase());
      const bMatch = b.code
        .toUpperCase()
        .includes(searchInput.value.toUpperCase());
  
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
      <div class="codeblock">
        <h3>${result.code}</h3>
        <p>${result.description}</p>
      </div>
      `;
  
      // Agrega un evento de clic al elemento de resultado
      resultElement.addEventListener("click", () => {
        // Muestra el modal
        const modal = document.getElementById("modal");
        modal.style.display = "block";
  
        // Llena el modal con los detalles del código
        document.getElementById("modal-title").innerText = result.code;
        document.getElementById("modal-description").innerText = result.details;
      });
  
      resultsContainer.appendChild(resultElement);
    }
  }
  
  // Agrega un evento de clic al botón de cierre del modal
  document.getElementsByClassName("close")[0].addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });
  
  // Cierra el modal cuando se hace clic fuera de él
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  
  // Convierte el objeto codes en un array de objetos y los muestra
  const allCodes = Object.entries(codes).map(([code, { description, details }]) => ({
    code,
    description,
    details
  }));
  displayResults(allCodes);