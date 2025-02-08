const categories = document.getElementById("categories");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");


addBtn.addEventListener('click', function(){
    const categoryValue = categories.value;
    const amountValue = parseFloat(amount.value);
    const dateValue = date.value;

    if(isNaN(amountValue) || !dateValue ){
        alert("Please enter a valid amount or date");
        return;
    }
    const formattedAmount = amountValue < 0
    ? `-$${Math.abs(amountValue).toFixed(2)}`
    : `$${amountValue.toFixed(2)}`
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${categoryValue}</td>
    <td>${formattedAmount}</td>
    <td>${dateValue}</td>
    <td><button class="delete-btn">Delete</button></td>
`;

    expenseTableBody.append(newRow);
    amount.value = "";
    date.value = "";
});

function updateTotal(){
    let total = 0;
    totalAmountCell.textContent = amountValue;
}