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
const ul = document.querySelector(".money-stats .details ul");
const sortByName = document.getElementById('sortByName');
const sortByAmount = document.getElementById('sortByAmount');
const sortByDate = document.getElementById('sortByDate');

const chartData = {
    labels: ["Home & Utilities", "Transportation", "Groceries", "Restaurants", "Health", "Shopping"],
    data: [0, 0, 0, 0, 0, 0],
};


// create a function fo fitler by espense through categories 
function filterExpense(name){
    let sum = 0;
    for(let i = 0; i < expenses.length; i++){
        if (expenses[i].category === name) {
            sum  += expenses[i].amount;
        }
    }
    return sum;
}

// function to update chart data 
function updateChartData(){
    chartData.data = chartData.labels.map((label) => filterExpense(label));

    // Update chart visualization
    myChart.data.datasets[0].data = chartData.data;
    myChart.update();  
}


// Initialize chart
const myChart = new Chart(document.querySelector(".my-chart"), {
    type: "doughnut",
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: "Category Expense",
                data: chartData.data,
            },
        ],
    },
    options: {
        borderWidth: 10,
        borderRadius: 2,
        hoverborderWidth: 0,
        plugins: {
            legend: {
                display: false,
            }
        }
    }
});


// Function to update UI list with percentages
const populateUl = () => {
    // clear existing list items
   ul.innerHTML = "";

    chartData.labels.forEach((label, i) => {
        const categorySum = chartData.data[i];
        // calculate percentage relative to the totalAmount (guard against division by zero)
        const percentage = totalAmount ? ((categorySum/ totalAmount) * 100).toFixed(2) : 0;

      let li = document.createElement("li");
      li.innerHTML = `${label}: <span class='percentage'>${percentage}%</span>`;
      ul.appendChild(li);
    });
  };
  
// Ensure UI starts correctly
populateUl();

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
    const expense = {category: categoryValue, amount: amountValue, date: dateValue};
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

    // update chart data/ percentages
    updateChartData();
    populateUl();

});

    // add new row
    expenseTableBody.append(newRow);

    // update chart data/ percentages
    updateChartData();
    populateUl();

    //reset input fields 
    amount.value = "";
    date.value = "";
});

// Sorting functions
sortByName.addEventListener('click', function() {
    expenses = sortName([...expenses]);
    renderExpensetable();
});

sortByAmount.addEventListener('click', function() {
    expenses = sortAmount([...expenses]);
    renderExpensetable();
});

sortByDate.addEventListener('click', function() {
    expenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderExpensetable();
});

// Function to render table
function renderExpensetable() {
    expenseTableBody.innerHTML = ""; // Clear existing rows

    expenses.forEach(expense => {
        const formattedAmount = expense.amount < 0 ?
            `-$${Math.abs(expense.amount).toFixed(2)}` :
            `$${expense.amount.toFixed(2)}`;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${expense.category}</td>
            <td>${formattedAmount}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn">Delete</button></td>`;

        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            expenses = expenses.filter(e => e.date !== expense.date || e.amount !== expense.amount || e.category !== expense.category);
            totalAmount -= expense.amount;
            totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`;
            newRow.remove();
            updateChartData();
            populateUl();
        });

        expenseTableBody.appendChild(newRow);
    });
}

// Sorting functions
function sortAmount(list) {
    return list.sort((a, b) => a.amount - b.amount);
}

function sortName(list) {
    return list.sort((a, b) => a.category.localeCompare(b.category));
}

// Corrected date conversion function
function dateStrToObj(dateStr) {
    const [month, day, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Convert to Date object
}

// Date comparison function
function compareDates(date1, date2) {
    return new Date(date1) - new Date(date2);
}




