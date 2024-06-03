const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");
const codes = {
    "A": {
      description: "ALPHA",
      details: "Letra A del alfabeto fonético militar"
    },
    "B": {
      description: "BRAVO",
      details: "Letra B del alfabeto fonético militar"
    },
    "C": {
      description: "CHARLIE",
      details: "Letra C del alfabeto fonético militar"
    },
    "D": {
      description: "DELTA",
      details: "Letra D del alfabeto fonético militar"
    },
    "E": {
      description: "ECHO",
      details: "Letra E del alfabeto fonético militar"
    },
    "F": {
      description: "FOXTROT",
      details: "Letra F del alfabeto fonético militar"
    },
    "G": {
      description: "GOLF",
      details: "Letra G del alfabeto fonético militar"
    },
    "H": {
      description: "HOTEL",
      details: "Letra H del alfabeto fonético militar"
    },
    "I": {
      description: "INDIA",
      details: "Letra I del alfabeto fonético militar"
    },
    "J": {
      description: "JULIETT",
      details: "Letra J del alfabeto fonético militar"
    },
    "K": {
      description: "KILO",
      details: "Letra K del alfabeto fonético militar"
    },
    "L": {
      description: "LIMA",
      details: "Letra L del alfabeto fonético militar"
    },
    "M": {
      description: "MIKE",
      details: "Letra M del alfabeto fonético militar"
    },
    "N": {
      description: "NOVEMBER",
      details: "Letra N del alfabeto fonético militar"
    },
    "O": {
      description: "OSCAR",
      details: "Letra O del alfabeto fonético militar"
    },
    "P": {
      description: "PAPA",
      details: "Letra P del alfabeto fonético militar"
    },
    "Q": {
      description: "QUEBEC",
      details: "Letra Q del alfabeto fonético militar"
    },
    "R": {
      description: "ROMEO",
      details: "Letra R del alfabeto fonético militar"
    },
    "S": {
      description: "SIERRA",
      details: "Letra S del alfabeto fonético militar"
    },
    "T": {
      description: "TANGO",
      details: "Letra T del alfabeto fonético militar"
    },
    "U": {
      description: "UNIFORM",
      details: "Letra U del alfabeto fonético militar"
    },
    "V": {
      description: "VICTOR",
      details: "Letra V del alfabeto fonético militar"
    },
    "W": {
      description: "WHISKEY",
      details: "Letra W del alfabeto fonético militar"
    },
    "X": {
      description: "XRAY",
      details: "Letra X del alfabeto fonético militar"
    },
    "Y": {
      description: "YANKEE",
      details: "Letra Y del alfabeto fonético militar"
    },
    "Z": {
      description: "ZULU",
      details: "Letra Z del alfabeto fonético militar"
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