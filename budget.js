// =====fill destination dropdown=====
const destSelect = document.getElementById("budget-destination");
let currentPlan = null;   // will hold the latest calculated plan

for (let i = 0; i < destinations.length; i++) {
  const d = destinations[i];
  const option = document.createElement("option");
  option.value = d.id; // store the id as the value
  option.innerText = d.name + ", " + d.country;
  destSelect.appendChild(option);
}

// =====calculator =====
const dailyBudgetInput = document.getElementById("daily-budget");
const numDaysInput = document.getElementById("num-days");
const calculateBtn = document.getElementById("calculate-btn");
const budgetResult = document.getElementById("budget-result");

calculateBtn.addEventListener("click", function () {
  // read the inputs (Number() turns the text into an actual number)
  const dailyBudget = Number(dailyBudgetInput.value);
  const days = Number(numDaysInput.value);
  const chosenId = Number(destSelect.value);

  //validation: make sure they entered valid numbers greater than zero
  if (dailyBudget <= 0 || days <= 0 || isNaN(dailyBudget) || isNaN(days)) {
    budgetResult.innerHTML = "<p class='error'>Please enter a budget and days greater than zero.</p>";
    return;
  }

  // user's total budget for the whole trip
  const totalBudget = dailyBudget * days;

  // find the chosen destination and its real cost
  const dest = destinations.find(d => d.id === chosenId);
  const tripCost = dest.costs.total;

  // how much of their budget the trip uses (as a percentage)
  let percentUsed = (tripCost / totalBudget) * 100;
  if (percentUsed > 100) percentUsed = 100;

  // the status message
  let statusMessage;
  if (totalBudget >= tripCost) {
    statusMessage = `<p class='success'>✅ Within budget! ${dest.name} costs about $${tripCost}, and your budget is $${totalBudget}.</p>`;
  } else {
    const shortfall = tripCost - totalBudget;
    statusMessage = `<p class='warning'>⚠️ Over budget by $${shortfall}. ${dest.name} costs about $${tripCost}, but your budget is $${totalBudget}.</p>`;
  }

  // build the result: message + progress bar
  budgetResult.innerHTML = `
    ${statusMessage}
    <div class="progress-track">
      <div class="progress-fill" style="width: ${percentUsed}%;"></div>
    </div>
    <p class="progress-label">Trip uses ${Math.round(percentUsed)}% of your budget</p>
  `;

  // remembers this plan so it can be saved
  currentPlan = {
    destination: dest.name,
    days: days,
    dailyBudget: dailyBudget,
    totalBudget: totalBudget,
    tripCost: tripCost
  };
});

// ===== BUDGET: SAVE & LOAD PLAN =====
const savePlanBtn = document.getElementById("save-plan-btn");
const savedPlanDiv = document.getElementById("saved-plan");

// SAVE when the button is clicked
savePlanBtn.addEventListener("click", function () {
  if (currentPlan === null) {            // nothing calculated yet
    savedPlanDiv.innerHTML = "<p class='warning'>Please calculate a plan first.</p>";
    return;
  }
  // object → string, then store it
  localStorage.setItem("savedBudgetPlan", JSON.stringify(currentPlan));
  displaySavedPlan();                    // refresh the display
});

// show whatever plan is currently saved
function displaySavedPlan() {
  const stored = localStorage.getItem("savedBudgetPlan");

  if (stored === null) {
    savedPlanDiv.innerHTML = "";
    return;
  }

  const plan = JSON.parse(stored);       // turns string → object

  savedPlanDiv.innerHTML = `
    <h3>Your Saved Plan</h3>
    <p>${plan.destination} — ${plan.days} days</p>
    <p>Daily budget: $${plan.dailyBudget} · Total budget: $${plan.totalBudget}</p>
    <p>Estimated trip cost: $${plan.tripCost}</p>
    <button id="clear-plan-btn" class="btn-secondary">Clear Saved Plan</button>
  `;

  document.getElementById("clear-plan-btn").addEventListener("click", function () {
    localStorage.removeItem("savedBudgetPlan");
    displaySavedPlan();
  });
}

// when the page loads, show any previously saved plan
displaySavedPlan();