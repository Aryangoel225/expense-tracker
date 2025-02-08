// Initalize values
let expenses = [];
let totalAmount = 0;

// grab elements fro html code
const categories = document.getElementById("categories");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");


// add btn functions
addBtn.addEventListener('click', function(){

 // create the values from the input
    const categoryValue = categories.value;
    const amountValue = parseFloat(amount.value);
    const dateValue = date.value;

    // check for valid input
    if(isNaN(amountValue) || !dateValue ){
        alert("Please enter a valid amount or date");
        return;
    }
    //  add expenses to the list
    const expense = {category: categoryValue, amount: amountValue, data: dateValue};
    expenses.push(expense);
    totalAmount += amountValue;

    // Update the total 
    totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`;

    const formattedAmount = amountValue < 0 ? `-$${Math.abs(amountValue).toFixed(2)}` : `$${amountValue.toFixed(2)}`;

    // add a new row to the table with each formatted value
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${categoryValue}</td>
    <td>${formattedAmount}</td>
    <td>${dateValue}</td>
    <td><button class="delete-btn">Delete</button></td>`;

    // delete functionality 
    newRow.querySelector('.delete-btn').addEventListener('click', function(){
        //filer out expense
        expenses = expenses.filter(e => e !==expense);

        //Update the total amount
        totalAmount -= amountValue;
        totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`;

        // Remove the row from the table
        newRow.remove();

    });

    // add new row
    expenseTableBody.append(newRow);

    //reset input fields 
    amount.value = "";
    date.value = "";

});

