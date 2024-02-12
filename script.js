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
const spanStartCost = document.getElementById("spanStartCost");
// form inputs
let itemInput = document.getElementById("itemInput");
let categoryInput = document.getElementById("categoryInput");
let costInput = document.getElementById("costInput");
//table
const mainTable = document.getElementById("mainTable");
let expenseArray = [];
//category breakdown 
let foodTotal = document.getElementById("food-total"); 
let billsTotal = document.getElementById("bills-total"); 
let entTotal = document.getElementById("ent-total"); 
let clothingTotal = document.getElementById("clothing-total");
// tbody
let tableBody = document.querySelector("tbody");
//progressbar
let foodBar = document.getElementById("food-percentage");
let billsBar = document.getElementById("bills-percentage");
let entBar = document.getElementById("ent-percentage");
let clothingBar = document.getElementById("clothing-percentage");

//Class 
class Expense {
  constructor(item, category, amount) {
    this.item = item; 
    this.category = category; 
    this.amount = amount; 
  }
}

// FUNCTIONS 
function createExpense(item, category, amount) {
  let newExpense = new Expense(item, category, amount); 
  expenseArray.push(newExpense)
  return newExpense; 
}

function addToTable() {
  // Initially add 1 row and 3 columns
  // Append td's to row
  // Insert cells into the row
  // Append entry to table
  expenseArray.forEach((expense)=> {
    let tableRow = document.createElement('tr');
    let itemColumn = document.createElement('td');
    let categoryColumn = document.createElement('td');
    let amountColumn = document.createElement('td');
    itemColumn.innerText = expense.item;
    categoryColumn.innerText = expense.category;
    amountColumn.innerText = expense.amount;
    tableRow.classList.add(categoryColumn.innerText);
    tableRow.append(itemColumn, categoryColumn, amountColumn);
    tableBody.append(tableRow);
  }) 
}

function categoryBreakdown(expenseArray){
  let food = "Food"; 
  let bills = "Bills"; 
  let ent = "Entertainment"; 
  let clothing = "Clothing"; 
  let newCatTotal = 0; 
  let addedObj = expenseArray.length-1;

  if(expenseArray[addedObj].category === food) {
    newCatTotal = Number(expenseArray[addedObj].amount) + Number(foodTotal.innerText);
    foodTotal.innerText = newCatTotal.toString();
  }else if (expenseArray[addedObj].category === bills) {
    newCatTotal = Number(expenseArray[addedObj].amount) + Number(billsTotal.innerText);
    billsTotal.innerText = newCatTotal.toString();
  }else if (expenseArray[addedObj].category === ent) {
    newCatTotal = Number(expenseArray[addedObj].amount) + Number(entTotal.innerText);
    entTotal.innerText = newCatTotal.toString();
  }else if (expenseArray[addedObj].category === clothing) {
    newCatTotal = Number(expenseArray[addedObj].amount) + Number(clothingTotal.innerText);
    clothingTotal.innerText = newCatTotal.toString();
  }
}

// Updating Remaning expense and Total Cost, not working rn
function updateTotals() {
  let startCost = 0;

  // Total cost updates
  for (let i = 0; i < expenseArray.length; i++) {
    // Get cost from array
    cost = Number(expenseArray[i].amount)

    // Add up total cost
    startCost += cost;
  }
  spanStartCost.innerText = `$${startCost}`;
  remainingBalance.innerText = budgetInput.value - startCost;
}

// Progress bar
function updateProgressBar() {
  //DOM progress elements 
  let displayWidth = 0;
  let foodTotalVal = Number(foodTotal.innerText);
  let billsTotalVal = Number(billsTotal.innerText); 
  let entTotalVal = Number(entTotal.innerText); 
  let clothingTotalVal = Number(clothingTotal.innerText)
  //calculate percentages of categories 
  let foodPercentage = getCategoryPercentage(foodTotalVal); 
  if (foodPercentage != false) {
    foodBar.style.display = "flex";
    displayWidth = foodPercentage * 100;
    foodBar.style.width = displayWidth + "%";
    foodBar.innerText = displayWidth + "%";
  }
  let billsPercentage = getCategoryPercentage(billsTotalVal); 
  if (billsPercentage!= false) {
    billsBar.style.display = "flex";
    displayWidth = billsPercentage * 100;
    billsBar.style.width = displayWidth + "%";
    billsBar.innerText = displayWidth + "%"; 
  }
  let entPercentage = getCategoryPercentage(entTotalVal);
  if (entPercentage!= false) {
    entBar.style.display = "flex";
    displayWidth = entPercentage * 100;
    entBar.style.width = displayWidth + "%";
    entBar.innerText = displayWidth + "%";
  } 
  let clothingPercentage = getCategoryPercentage(clothingTotalVal); 
  if (clothingPercentage!= false) {
    clothingBar.style.display = "flex";
    displayWidth = clothingPercentage * 100;
    clothingBar.style.width = displayWidth + "%";
    clothingBar.innerText = displayWidth + "%";
  }
}

//calculate percentage of category for progress bar
function getCategoryPercentage(category) {
  let totalBudget = Number(budgetInput.value);
  let categoryPercentage = category/totalBudget;
  if (categoryPercentage > 0) {
    console.log(Math.round(categoryPercentage));
    return categoryPercentage.toFixed(2); 
  }else {
    return false;
  }
}

// Event listeners
btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (nameInput.value === '' || budgetInput.value === '') {
    alert('Please fill in all fields');
    return;
  }
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
  if (nameInput === '' || budgetInput === '') {
    alert('Please fill in all fields');
    return;
  }
  //on button click "display: none"
  container.style.display = "none";
  expenseForm.style.display = "flex";
  budgetMain.style.display = "none";
})

//Add Purchase Button click will bring back to main page with updated table
addPurchaseBtn.addEventListener("click", (e) => {
  e.preventDefault(); 

  //get values of form inputs 
  let item = itemInput.value;
  let category = categoryInput.value;
  let cost = costInput.value;

  if (item === '' || category === '' || cost === '') {
    alert('Please fill in all fields');
    return;
  }

  //create new expense object 
  createExpense(item, category, cost);
  //call function to create new item row
  tableBody.innerHTML = "" 
  addToTable();
  updateTotals()
  
  // clear inputs of form
  itemInput.value = "";
  categoryInput.value = "";
  costInput.value = ""

  //update category breakdown 
  categoryBreakdown(expenseArray);

  updateProgressBar();

  //change display settings for cells 
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";
})