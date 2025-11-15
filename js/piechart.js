// js/piechart.js
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    const data = {
        labels: ['Photography', 'Animation', '3D Modeling', 'Interactive Design', 'New Media'],
        datasets: [{
            data: [30, 10, 20, 20, 20],
            backgroundColor: [
                '#e91e63', // pink
                '#9c27b0', // purple
                '#3f51b5', // indigo
                '#03a9f4', // light-blue
                '#4caf50'  // green
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } }
            }
        }
    });
});

