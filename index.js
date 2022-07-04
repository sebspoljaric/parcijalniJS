function searchPoem(query) {
  const url = `https://poetrydb.org/title/${query}`;
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const results = jsonData.map((element) => {
        return { author: element.author, lines: element.lines };
      });
      renderResults(results);
      document.getElementById("errorMessage").innerHTML = "";
      console.log(jsonData);
    })
    .catch((error) => {
      document.getElementById("errorMessage").innerHTML = error;
    });
}

function renderResults(results) {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";
  results.forEach((result) => {
    const element = document.createElement("li");
    let sadrzaj = `<h4>${result.author}</h4>`;
    result.lines.forEach((red) => {
      sadrzaj += `<p>${red}</p>`;
    });
    element.innerHTML = sadrzaj;
    list.appendChild(element);
  });
}

let searchTimeoutToken = 0;
window.onload = () => {
  const searchFieldElement = document.getElementById("searchField");
  searchFieldElement.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken);

    if (searchFieldElement.value.trim().length === 0) {
      return;
    }

    searchTimeoutToken = setTimeout(() => {
      searchPoem(searchFieldElement.value);
    }, 250);
  };
};
