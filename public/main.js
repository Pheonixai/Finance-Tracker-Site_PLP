// document.addEventListener("DOMContentLoaded", () => {
//     // Line Chart
//     const ctxLine = document.getElementById('lineChart').getContext('2d');
//     new Chart(ctxLine, {
//         type: 'line',
//         data: {
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//             datasets: [
//                 {
//                     label: 'Income',
//                     data: [400, 700, 1200, 900, 1500],
//                     borderColor: '#2A71D0',
//                     fill: false,
//                 },
//                 {
//                     label: 'Spending',
//                     data: [200, 500, 800, 600, 1000],
//                     borderColor: '#FF5733',
//                     fill: false,
//                 }
//             ]
//         }
//     });
// });


const view = document.getElementById('view');


// Budget Chart

// view.addEventListener("click", ()=> {
//     alert('budgetie');
    async function fetchBudgetData() {
        try {
          const response = await fetch('/chart/dispBudget', { method: 'GET' });
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error("Error fetching budget data:", error);
          return [];
        }
      }
    
      // Prepare the data for the chart
      function prepareChartData(budgetData) {
        const categories = {};
        budgetData.forEach((item) => {
          const category = item.category;
          const amount = parseFloat(item.amount);
          if (categories[category]) {
            categories[category] += amount;
          } else {
            categories[category] = amount;
          }
        });
    
        return {
          labels: Object.keys(categories),
          data: Object.values(categories),
        };
      }
    
      // Render the chart
      async function renderChart() {
        const budgetData = await fetchBudgetData();
    
        const chartData = prepareChartData(budgetData);
    
        const ctx = document.getElementById('budgetChart').getContext('2d');
        new Chart(ctx, {
          type: 'pie', // You can change this to 'bar', 'line', etc.
          data: {
            labels: chartData.labels,
            datasets: [{
              label: 'Budget Allocation',
              data: chartData.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Budget Distribution by Category'
              }
            }
          },
        });
      }
    
        // Initialize the chart
renderChart();
// })

// Transactions chart

// Fetch transaction data
async function fetchTransactionData() {
    try {
        const response = await fetch('/chart/dispTransact', { method: 'GET' });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching transactions data:", error);
        return [];
    }
}

// Prepare the data for the chart
function prepareTransactionComparisonData(transactionData) {
    const totals = {
        Income: 0,
        Expense: 0,
    };

    transactionData.forEach((item) => {
        const type = item.Transaction_Type; // Ensure this matches your data
        const amount = parseFloat(item.Amount); // Ensure Amount is parsed as a number
        if (type === 'Income') {
            totals.Income += amount;
        } else if (type === 'Expense') {
            totals.Expense += amount;
        }
    });

    return {
        labels: ['Income', 'Expense'],
        data: [totals.Income, totals.Expense],
    };
}
// Render the chart

async function renderTransactionComparisonChart() {
    const transactionData = await fetchTransactionData();
    const chartData = prepareTransactionComparisonData(transactionData);

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // You can change this to 'pie' or 'doughnut' if preferred
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Transaction Comparison',
                data: chartData.data,
                backgroundColor: ['#4CAF50', '#F44336'], // Colors for Income and Expense
                borderColor: ['#388E3C', '#D32F2F'], // Border colors
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Income vs Expenses',
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Initialize the chart
renderTransactionComparisonChart();

