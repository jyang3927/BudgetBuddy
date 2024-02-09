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
let itemInput = document.getElementById("itemInput");
let categoryInput = document.getElementById("categoryInput");
let costInput = document.getElementById("costInput");
const mainTable = document.getElementById("mainTable");

// FUNCTIONS 

function addRow() {
  // Get input values
  let item = itemInput.value;
  let category = categoryInput.value;
  let cost = costInput.value;

  // Get table body
  let table = mainTable.getElementsByTagName("tbody")[0];

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

  // //set class names to values 
  console.log(categoryCol);
  let createdCatCol = document.getElementsByTagName("tbody"); 
  createdCatCol[0].className = category;
  console.log(createdCatCol);
  // createdCatCol.classList.add(category);

  // Clear input fields after adding row
  itemInput.value = "";
  categoryInput.value = "";
  costInput.value = "";

  // Update remaining budget each time new item is entered
  let remainingBalance = document.getElementById("remaining-balance-num");

  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";

  let spanStartCost = document.getElementById("spanStartCost");
  let startCost = 0;

  // Total cost updates
  for (var i = 1; i < table.rows.length; i++) {
    // Get the cell value of the third column (index 2) and parse it as a float
    cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

    // Add up total cost
    startCost += cost;
  }
  spanStartCost.innerText = `$${startCost}`;
  remainingBalance.innerText =budgetInput.value - startCost;
}

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
  //call function to create new item row 
  addRow();

  //set class equal to category of purchase 

  //change display settings
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";
})