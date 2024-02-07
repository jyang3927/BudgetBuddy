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

    // Update remaining budget each time new item is entered
    var spanBudget = document.getElementById("spanBudget");
    var updatedBudget = 500;

  // Iterate over rows starting from the second row (skip header row)
  for (var i = 1; i < table.rows.length; i++) {
    // Get the cell value of the third column (index 2) and parse it as a float
    var cost = parseFloat(table.rows[i].cells[2].textContent.replace("$", ""));
    
    // Add the cost to the updatedBudget
    updatedBudget -= cost;
  }
    spanBudget.innerText = `$${updatedBudget}`
   
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

  // Spending by category
  // Create a for loop to loop through main table
  // Target by category, probably via table.rows[i].cells[1].textContent

  }