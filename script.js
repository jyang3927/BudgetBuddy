document.addEventListener("DOMContentLoaded", (event) => {
  const btn = document.querySelector(".btn");
  const container = document.querySelector(".container");
  const budgetMain = document.querySelector(".budget-main");
  const nameValue = document.getElementById("name").value;
  const budgetValue = document.getElementById("budget").value;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    //on button click "display: none"
    container.style.display = "none";
    budgetMain.style.display = "flex";
  });
  // Name and budget goes into local storage
  localStorage.setItem("name", nameValue);
  localStorage.setItem("budget", budgetValue);
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
  var remainingBalance = document.getElementById("remaining-balance-num");
  
  // The 500 needs to be replaced by what is submitted on the first page
  var updatedBudget = 500;

// Iterate over rows starting from the second row (skip header row)
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell value of the third column (index 2) and parse it as a float
  var cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

  // Add the cost to the updatedBudget
  updatedBudget -= cost;
}
  remainingBalance.innerText = `$${updatedBudget}`

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
