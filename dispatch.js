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
        line = line.trim();
        const categoryMatch = line.match(/\(([^)]+)\)$/);
        const category = categoryMatch ? categoryMatch[1].trim() : 'Sin categoría';
        const cleanLine = categoryMatch ? line.replace(/\(([^)]+)\)$/, '').trim() : line.trim();
        return { line: cleanLine, category: category };
      });
      
      // Mostrar cada línea del archivo Markdown como un resultado separado
      displayResults(markdownLines);
    })
    .catch(function(error) {
      console.log('Hubo un problema con la operación fetch: ' + error.message);
    });
}

function removeAccentsAndNonAlphanumeric(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "");
}

const searchInput = document.getElementById('search-input');

searchInput.addEventListener("input", () => {
  const searchTerm = removeAccentsAndNonAlphanumeric(
    searchInput.value.toUpperCase()
  );
  const results = [];

  for (const line of markdownLines) {
    if (
      removeAccentsAndNonAlphanumeric(line.line.toUpperCase()).includes(
        searchTerm
      )
    ) {
      results.push(line);
    }
  }

  // Ordenar los resultados originales según la cercanía con el término de búsqueda
  results.sort((a, b) => {
    const aMatch = a.line
      .toUpperCase()
      .includes(searchInput.value.toUpperCase());
    const bMatch = b.line
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

  // Agrupar resultados por categoría
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {});

  // Mostrar resultados agrupados por categoría
  for (const category in groupedResults) {
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("category");
    categoryElement.innerHTML = `<h2>${category}</h2>`;
    resultsContainer.appendChild(categoryElement);

    for (const result of groupedResults[category]) {
      const resultElement = document.createElement("div");
      resultElement.classList.add("result");
      resultElement.innerHTML = `
      <div class="codeblock">
        <p>${result.line}</p>
      </div>
      `;
      categoryElement.appendChild(resultElement);
    }
  }
}