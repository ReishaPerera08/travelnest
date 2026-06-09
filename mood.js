// info for each mood: nice label + a cover image (reusing destination photos)
const moodInfo = {
  adventure: { label: "Adventure", cover: "images/capetown.jpg", bg: "images/bg-adventure.jpg" },
  beach:     { label: "Beach",     cover: "images/bali.jpg",     bg: "images/bg-beach.jpg" },
  city:      { label: "City",      cover: "images/tokyo.jpg",    bg: "images/bg-city.jpg" },
  cultural:  { label: "Cultural",  cover: "images/paris.jpg",    bg: "images/bg-cultural.jpg" },
  forest:    { label: "Forest",    cover: "images/banff.jpg",    bg: "images/bg-forest.jpg" }
};

// ===== MOOD: AMBIENT SOUNDS + MINI-PLAYER =====
const moodButtons = document.querySelectorAll(".mood-btn");

// player elements
const player = document.getElementById("player");
const playerCover = document.getElementById("player-cover");
const playerTitle = document.getElementById("player-title");
const playerToggle = document.getElementById("player-toggle");
const playerStop = document.getElementById("player-stop");
const playerProgress = document.getElementById("player-progress");

let currentSound = null;   // the <audio> currently loaded
let currentName = null;    // its mood name (e.g. "beach")

// start a mood playing in the player
function startMood(soundName) {
  const audio = document.getElementById("sound-" + soundName);

  // if a different sound was playing, stop it first
  if (currentSound !== null && currentSound !== audio) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  currentSound = audio;
  currentName = soundName;

  // fill the player with this mood's cover + label, then show it
  playerCover.src = moodInfo[soundName].cover;
  // change the page background to this mood's photo
  document.body.classList.add("mood-bg");
  document.body.style.backgroundImage = `url('${moodInfo[soundName].bg}')`;
  playerTitle.innerText = moodInfo[soundName].label;
  playerToggle.innerText = "⏸";
  player.style.display = "block";

  highlightButtons();
  audio.play();
}

// keep the mood buttons' "playing" highlight in sync
function highlightButtons() {
  moodButtons.forEach(function (b) {
    if (currentSound !== null && b.dataset.sound === currentName && !currentSound.paused) {
      b.classList.add("playing");
    } else {
      b.classList.remove("playing");
    }
  });
}

// clicking a mood button starts (or restarts) that mood
moodButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    startMood(button.dataset.sound);
  });
});

// PLAY / PAUSE toggle
playerToggle.addEventListener("click", function () {
  if (currentSound === null) return;
  if (currentSound.paused) {
    currentSound.play();
    playerToggle.innerText = "⏸";
  } else {
    currentSound.pause();
    playerToggle.innerText = "▶";
  }
  highlightButtons();
});

// STOP: pause, rewind, hide the player
playerStop.addEventListener("click", function () {
  if (currentSound === null) return;
  currentSound.pause();
  currentSound.currentTime = 0;
  player.style.display = "none";
  highlightButtons();
});

// LIVE PROGRESS BAR — runs repeatedly as audio plays
setInterval(function () {
  if (currentSound !== null && currentSound.duration) {
    const percent = (currentSound.currentTime / currentSound.duration) * 100;
    playerProgress.style.width = percent + "%";
  }
}, 200);

// ===== MOOD: VISITED / PLANNED MARKING =====
const goalsDiv = document.getElementById("mood-destinations");

// read the statuses object (or {} if none saved)
function getStatuses() {
  const stored = localStorage.getItem("travelStatuses");
  if (stored === null) return {};         // nothing yet → empty object
  return JSON.parse(stored);
}

// save the statuses object
function saveStatuses(statuses) {
  localStorage.setItem("travelStatuses", JSON.stringify(statuses));
}

// set (or toggle off) a destination's status
function setStatus(id, status) {
  const statuses = getStatuses();
  if (statuses[id] === status) {
    delete statuses[id];                  // clicking the same one again clears it
  } else {
    statuses[id] = status;                // otherwise set it
  }
  saveStatuses(statuses);
  displayGoals();
}


/* Travel Goals  */

// draw the list of destinations with their buttons + current status
function displayGoals() {
  const statuses = getStatuses();
  let html = "";

  for (let i = 0; i < destinations.length; i++) {
    const d = destinations[i];
    const status = statuses[d.id] || "";

    html += `
      <div class="goal-item ${status}">
        <img src="${d.image}" alt="${d.name}" class="goal-img">
        <span class="goal-name">${d.name}, ${d.country}</span>
        <span class="goal-status">${status}</span>
        <span class="goal-buttons">
          <button class="btn-secondary mark-visited" data-id="${d.id}">Visited</button>
          <button class="btn-secondary mark-planned" data-id="${d.id}">Planned</button>
          ${status !== "" ? `<button class="goal-clear" data-id="${d.id}" aria-label="Clear">&times;</button>` : ""}
        </span>
      </div>
    `;
  }

  goalsDiv.innerHTML = html;
}

// one listener on the container handles all buttons
goalsDiv.addEventListener("click", function (event) {
  const id = Number(event.target.dataset.id);
  if (event.target.classList.contains("mark-visited")) {
    setStatus(id, "visited");
  } else if (event.target.classList.contains("mark-planned")) {
    setStatus(id, "planned");
  } else if (event.target.classList.contains("goal-clear")) {
    clearStatus(id);
  }
});

// remove a destination's status entirely
function clearStatus(id) {
  const statuses = getStatuses();
  delete statuses[id];
  saveStatuses(statuses);
  displayGoals();
}

// show goals when the page loads
displayGoals();