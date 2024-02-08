const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const budgetMain = document.querySelector(".budget-main");
const entranceForm = document.querySelector("entranceForm");
const nameInput = document.getElementById("name");
const budgetInput = document.getElementById("budget");
const remainingBalance = document.getElementById("remaining-balance-num");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  //on button click "display: none"
  container.style.display = "none";
  budgetMain.style.display = "flex";
  // Name and budget goes into local storage
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("budget", budgetInput.value);
  remainingBalance.innerText = budgetInput.value;
  console.dir(remainingBalance)
});

function addRow() {
  // Get input values
  var item = document.getElementById("itemInput").value;
  var category = document.getElementById("categoryInput").value;
  var cost = document.getElementById("costInput").value;

  // Get table body
  var table = document.getElementById("mainTable").getElementsByTagName("tbody")[0];

  // Create a new row
  var newRow = table.insertRow();

  // Insert cells into the row
  var itemCol = newRow.insertCell(0);
  var categoryCol = newRow.insertCell(1);
  var costCol = newRow.insertCell(2);

  // Add values to the cells
  itemCol.innerHTML = item;
  categoryCol.innerHTML = category;
  costCol.innerHTML = `$${cost}`;

  // Clear input fields after adding row
  document.getElementById("itemInput").value = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("costInput").value = "";

  // Everything above this comment works, just need to convert to form

  // Update remaining budget each time new item is entered
  let remainingBalance = document.getElementById("remaining-balance-num");
  
  // The 500 needs to be replaced by what is submitted on the first page
  let updatedBudget = Number(remainingBalance.innerText);

// Iterate over rows starting from the second row (skip header row)
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell value of the third column (index 2) and parse it as a float
  var cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

  // Add the cost to the updatedBudget
  updatedBudget -= cost;
}
  remainingBalance.innerText = updatedBudget;

  var spanStartCost = document.getElementById("spanStartCost");
  var startCost = 0

// Total cost updates
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell value of the third column (index 2) and parse it as a float
  var cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

  // Add up total cost
  startCost += cost;
}
spanStartCost.innerText = `$${startCost}`

}
