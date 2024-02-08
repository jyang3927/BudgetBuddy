const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const budgetMain = document.querySelector(".budget-main");
const entranceForm = document.querySelector("entranceForm");
const nameInput = document.getElementById("name");
const budgetInput = document.getElementById("budget");
const remainingBalance = document.getElementById("remaining-balance-num");
const addExpense = document.getElementById("submit-expense-btn"); 
const expenseForm = document.getElementById("expense-container");
const addPurchaseBtn = document.getElementById("expense-add-btn"); 

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
  let item = document.getElementById("itemInput").value;
  let category = document.getElementById("categoryInput").value;
  let cost = document.getElementById("costInput").value;

  // Get table body
  let table = document.getElementById("mainTable").getElementsByTagName("tbody")[0];

  // Create a new row
  let newRow = table.insertRow();

  // Insert cells into the row
  let itemCol = newRow.insertCell(0);
  let categoryCol = newRow.insertCell(1);
  let costCol = newRow.insertCell(2);

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

  //
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";

// Iterate over rows starting from the second row (skip header row)
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell value of the third column (index 2) and parse it as a float
   cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

  // Add the cost to the updatedBudget
  updatedBudget -= cost;
}
  remainingBalance.innerText = updatedBudget;

  var spanStartCost = document.getElementById("spanStartCost");
  var startCost = 0

// Total cost updates
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell value of the third column (index 2) and parse it as a float
   cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

  // Add up total cost
  startCost += cost;
}
spanStartCost.innerText = `$${startCost}`

}


//Add expense click will bring form to display
addExpense.addEventListener("click", function (e) {
  e.preventDefault();
  //on button click "display: none"
  container.style.display = "none";
  expenseForm.style.display = "flex";
  budgetMain.style.display = "none";
})

//Add Purchase Button click will bring back to main page with updated table
addPurchaseBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";
})