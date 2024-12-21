// Add Chart.js to your project for this script to work: https://cdn.jsdelivr.net/npm/chart.js
document.addEventListener("DOMContentLoaded", () => {
    // Line Chart
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Income',
                data: [400, 700, 1200, 900, 1500],
                borderColor: '#2A71D0',
                fill: false,
            }, {
                label: 'Spending',
                data: [200, 500, 800, 600, 1000],
                borderColor: '#FF5733',
                fill: false,
            }]
        }
    });

    // Pie Chart
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Gift', 'Grocery', 'Transportation'],
            datasets: [{
                data: [320, 150, 120],
                backgroundColor: ['#FF5733', '#2A71D0', '#33FF57']
            }]
        }
    });
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
        type: 'bar', // You can use 'line', 'pie', etc.
        data: {
            labels: ['Rent', 'Food', 'Utilities', 'Transportation', 'Entertainment'],
            datasets: [{
                label: 'Expenses (in USD)',
                data: [500, 300, 150, 100, 200],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});

