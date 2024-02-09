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
    let tableRow = document.createElement('tr')
    let itemColumn = document.createElement('td')
    let categoryColumn = document.createElement('td')
    let amountColumn = document.createElement('td')
    itemColumn.innerText = expense.item
    categoryColumn.innerText = expense.category
    amountColumn.innerText = expense.amount
    tableRow.append(itemColumn, categoryColumn, amountColumn)
    tableBody.append(tableRow)
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

  //get values of form inputs 
  let item = itemInput.value;
  let category = categoryInput.value;
  let cost = costInput.value;

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
  //change display settings
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";
})