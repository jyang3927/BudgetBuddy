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
  expenseArray.push(newExpense);
  return newExpense; 
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

// function addRow() {
//   // Get input values
//   let item = itemInput.value;
//   let category = categoryInput.value;
//   let cost = costInput.value;

//   // Get table body
//   let table = mainTable.getElementsByTagName("tbody")[0];

//   // Create a new row
//   let newRow = table.insertRow();

//   // Insert cells into the row
//   let itemCol = newRow.insertCell(0);
//   let categoryCol = newRow.insertCell(1);
//   let costCol = newRow.insertCell(2);

//   // Add values to the cells
//   itemCol.innerHTML = item;
//   categoryCol.innerHTML = category;
//   costCol.innerHTML = `$${cost}`;

//   // //set class names to values 
//   console.log(categoryCol);
//   let createdCatCol = document.getElementsByTagName("tbody"); 
//   createdCatCol[0].className = category;
//   console.log(createdCatCol);
//   // createdCatCol.classList.add(category);

//   // Clear input fields after adding row
//   itemInput.value = "";
//   categoryInput.value = "";
//   costInput.value = "";

//   // Update remaining budget each time new item is entered
//   let remainingBalance = document.getElementById("remaining-balance-num");

//   container.style.display = "none";
//   expenseForm.style.display = "none";
//   budgetMain.style.display = "flex";

//   let spanStartCost = document.getElementById("spanStartCost");
//   let startCost = 0;

//   // Total cost updates
//   for (var i = 1; i < table.rows.length; i++) {
//     // Get the cell value of the third column (index 2) and parse it as a float
//     cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));

//     // Add up total cost
//     startCost += cost;
//   }
//   spanStartCost.innerText = `$${startCost}`;
//   remainingBalance.innerText =budgetInput.value - startCost;
// }

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

  //create new row 

  //call function to create new item row 
  // addRow();

  //update category breakdown 
  categoryBreakdown(expenseArray);
  //change display settings
  container.style.display = "none";
  expenseForm.style.display = "none";
  budgetMain.style.display = "flex";
})