// =====random trip generator=====
const tripType = document.getElementById("trip-type");
const tripBudget = document.getElementById("trip-budget");
const surpriseBtn = document.getElementById("surprise-btn");
const tripResult = document.getElementById("trip-result");

surpriseBtn.addEventListener("click", function () {
  // wiggle the button on each click
  surpriseBtn.classList.add("wiggle");
  setTimeout(function () {
    surpriseBtn.classList.remove("wiggle");
  }, 400);

  const chosenType = tripType.value;
  const chosenBudget = tripBudget.value;

  // keep destinations matching BOTH choices
  const matches = destinations.filter(function (d) {
    const typeMatch = (chosenType === "Any") || (d.type === chosenType);
    const budgetMatch = (chosenBudget === "Any") || (d.budgetLevel === chosenBudget);
    return typeMatch && budgetMatch;
  });

  //if nothing matches
  if (matches.length === 0) {
    tripResult.innerHTML = "<p class='warning'>No trips match that combination. Try different options!</p>";
    return;
  }

  // pick oneat random
  const randomIndex = Math.floor(Math.random() * matches.length);
  const pick = matches[randomIndex];

  // is this destination already in the wishlist?
  const inWishlist = getWishlist().includes(pick.id);

  // reveal it
  tripResult.innerHTML = `
    <div class="trip-card">
      ${inWishlist ? `<span class="wishlist-badge">♥</span>` : ""}
      <img src="${pick.image}" alt="${pick.name}">
      <h2>${pick.name}, ${pick.country}</h2>
      <p class="trip-meta">${pick.continent} · ${pick.type} · Budget: ${pick.budgetLevel}</p>
      <p>${pick.description}</p>
      <button class="btn-secondary add-wishlist ${inWishlist ? "added" : ""}" data-id="${pick.id}">
        ${inWishlist ? "♥ Added to Wishlist" : "♡ Add to Wishlist"}
      </button>
    </div>
  `;

  surpriseBtn.innerText = "Surprise Me Again 🎲";

});

// =====wishlist=====
const wishlistDiv = document.getElementById("wishlist");

// read the wishlist array from storage
function getWishlist() {
  const stored = localStorage.getItem("wishlist");
  if (stored === null) return [];
  return JSON.parse(stored);
}

// save the wishlist array to storage
function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}

// add an id
function addToWishlist(id) {
  const list = getWishlist();
  if (list.includes(id)) return;
  list.push(id);
  saveWishlist(list);
  displayWishlist();
}

// remove an id
function removeFromWishlist(id) {
  let list = getWishlist();
  list = list.filter(savedId => savedId !== id);  // keep everything except this id
  saveWishlist(list);
  displayWishlist();
}

// show the wishlist on screen
function displayWishlist() {
  const list = getWishlist();

  if (list.length === 0) {
    wishlistDiv.innerHTML = "<p>Your wishlist is empty. Add a destination above!</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < list.length; i++) {
    const d = destinations.find(item => item.id === list[i]);
    if (!d) continue;
    html += `
      <div class="wishlist-item">
        <span>${d.name}, ${d.country}</span>
        <button class="btn-secondary remove-wishlist" data-id="${d.id}">Remove</button>
      </div>
    `;
  }
  wishlistDiv.innerHTML = html;
}

// listen for clicks on the "Add to Wishlist" button
tripResult.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-wishlist")) {
    const id = Number(event.target.dataset.id);
    addToWishlist(id);

    const btn = event.target;

    // change ♡ to ♥ and mark as added
    btn.innerText = "♥ Added to Wishlist";
    btn.classList.add("added");

    // pop animation (add, then remove so it can replay)
    btn.classList.add("pop");
    setTimeout(function () {
      btn.classList.remove("pop");
    }, 300);   // matches the 0.3s animation
  }
});

// listen for clicks on any "Remove" button in the wishlist
wishlistDiv.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-wishlist")) {
    const id = Number(event.target.dataset.id);
    removeFromWishlist(id);
  }
});

// show saved wishlist when the page loads
displayWishlist();