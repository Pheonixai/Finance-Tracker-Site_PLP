document.addEventListener("DOMContentLoaded", () => {
    // Line Chart
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
                {
                    label: 'Income',
                    data: [400, 700, 1200, 900, 1500],
                    borderColor: '#2A71D0',
                    fill: false,
                },
                {
                    label: 'Spending',
                    data: [200, 500, 800, 600, 1000],
                    borderColor: '#FF5733',
                    fill: false,
                }
            ]
        }
    });
});
