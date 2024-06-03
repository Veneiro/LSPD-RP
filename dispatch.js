let markdownLines = [];

window.onload = function() {
  fetch('procedimientos/dispatch.md')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.text();
    })
    .then(text => {
      // Guardar cada línea del archivo Markdown en un array
      markdownLines = text.split('\n').map(line => {
        const [code, ...description] = line.split(':');
        return { code: code.trim(), description: description.join(':').trim() };
      });
      
      // Mostrar cada línea del archivo Markdown como un resultado separado
      displayResults(markdownLines);
    })
    .catch(function() {
      console.log('Hubo un problema con la operación fetch: ' + error.message);
    });
}

function removeAccentsAndNonAlphanumeric(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\W/g, "");
}

const searchInput = document.getElementById('search-input');

searchInput.addEventListener("input", () => {
  const searchTerm = removeAccentsAndNonAlphanumeric(
    searchInput.value.toUpperCase()
  );
  const results = [];

  for (const line of markdownLines) {
    if (
      removeAccentsAndNonAlphanumeric(line.code.toUpperCase()).includes(
        searchTerm
      ) ||
      removeAccentsAndNonAlphanumeric(
        line.description.toUpperCase()
      ).includes(searchTerm)
    ) {
      results.push(line);
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
  const resultsContainer = document.getElementById('markdown-content');
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

    resultsContainer.appendChild(resultElement);
  }
}