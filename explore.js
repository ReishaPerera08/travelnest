//===explore, show destination cards===//

//get reference to the grid container
const grid = document.getElementById("destinations-grid");

//function that diplays the given list of destinations as cards
function displayDestinations(list) {
    let cardsHTML = ""; //start with an empty string

    //loop through each destination in the list
    for (let i = 0; i < list.length; i++) {
        const d = list[i]; //current destination object


        //build the card and adding it to the string
        cardsHTML = cardsHTML + `
            <div class="destination-card" data-id="${d.id}">
                <img src="${d.image}" alt="${d.name}">
                <div class="card-body">
                    <h3>${d.name}, ${d.country}</h3>
                    <p class="card-meta">${d.continent} · ${d.type}</p>
                    <p class="card-budget">Budget: ${d.budgetLevel}</p>
                </div>
            </div>
    `;
  }

  // if nothing matched, show a friendly message instead of blank space
  if (list.length === 0) {
    cardsHTML = "<p>No destinations found. Try another filter.</p>";
  }

  grid.innerHTML = cardsHTML;     // put all cards into the grid at once
}

// when the page loads, show all destinations
displayDestinations(destinations);


// =====explore, filter and search =====

// get references to the controls
const continentFilter = document.getElementById("continent-filter");
const searchBox = document.getElementById("destination-search");
const clearBtn = document.getElementById("clear-filters");

// the main filtering function
function applyFilters() {
  const chosenContinent = continentFilter.value;
  const searchText = searchBox.value.trim().toLowerCase();

  // start from the full list and then narrow it down
  const filtered = destinations.filter(function (d) {
    // condition 1: continent matches (or "All" was chosen)
    const continentMatch = (chosenContinent === "All") || (d.continent === chosenContinent);

    // condition 2: name contains the search text (empty search matches everything)
    const searchMatch = d.name.toLowerCase().includes(searchText);

    // keep this destination only if BOTH are true
    return continentMatch && searchMatch;
  });

  displayDestinations(filtered);
}

// refilter whenever the controls change
continentFilter.addEventListener("change", applyFilters);
searchBox.addEventListener("input", applyFilters);

// clear btn,resets everything
clearBtn.addEventListener("click", function () {
  continentFilter.value = "All";
  searchBox.value = "";
  displayDestinations(destinations);
});

// =====explore auto complete=====
const suggestions = document.getElementById("suggestions");


searchBox.addEventListener("input", function () {
  const text = searchBox.value.trim().toLowerCase();

  suggestions.innerHTML = "";

  if (text === "") {
    suggestions.style.display = "none";
    return;
  }

  // find matching destinations
  const matches = destinations.filter(d => d.name.toLowerCase().includes(text));

  if (matches.length === 0) {
    suggestions.style.display = "none";
    return;
  }

  // build a clickable item for each match
  for (let i = 0; i < matches.length && i < 6; i++) {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.innerText = matches[i].name + ", " + matches[i].country;

    // when this item is clicked, fill the box and filter
    item.addEventListener("click", function () {
      searchBox.value = matches[i].name;
      suggestions.style.display = "none";
      applyFilters();
    });

    suggestions.appendChild(item);
  }

  suggestions.style.display = "block";
});

// clicking anywhere outside the search area hides the suggestions
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-wrapper")) {
    suggestions.style.display = "none";
  }
});

// =====detail modal =====
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

// build and show the modal for a given destination id
function openModal(id) {
  // find the matching destination
  const d = destinations.find(item => item.id === id);
  if (!d) return;   // safety: if not found, do nothing

  // build the attractions LIST
  let attractionsList = "";
  for (let i = 0; i < d.attractions.length; i++) {
    attractionsList += `<li>${d.attractions[i]}</li>`;
  }

  // build the cost TABLE rows from the costs object
  const c = d.costs;
  const costTable = `
    <table class="cost-table">
      <tr><th>Category</th><th>Estimated Cost (USD)</th></tr>
      <tr><td>Hotel</td><td>$${c.hotel}</td></tr>
      <tr><td>Food</td><td>$${c.food}</td></tr>
      <tr><td>Activities</td><td>$${c.activities}</td></tr>
      <tr><td>Transportation</td><td>$${c.transportation}</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>$${c.total}</strong></td></tr>
    </table>
  `;

  // put it all together
  modalContent.innerHTML = `
    <img src="${d.image}" alt="${d.name}" class="modal-img">
    <h2>${d.name}, ${d.country}</h2>
    <p class="modal-meta">${d.continent} · ${d.type} · Budget: ${d.budgetLevel}</p>
    <p>${d.description}</p>
    <h3>Top Attractions</h3>
    <ul>${attractionsList}</ul>
    <h3>Estimated Costs</h3>
    ${costTable}
  `;

  modal.style.display = "flex";   // show it
}

function closeModal() {
  modal.style.display = "none";   // hide it
}

// when a card is clicked, find which one and open it
grid.addEventListener("click", function (event) {
  const card = event.target.closest(".destination-card");
  if (!card) return;
  const id = Number(card.dataset.id);
  openModal(id);
});

// close on × click, or when the dark background is clicked
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", function (event) {
  if (event.target === modal) closeModal();
});