// barchart.js
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.createElement('canvas');
    document.getElementById('vis-barchart').appendChild(ctx);

    const data = {
        labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5'],
        datasets: [{
            label: 'GPA',
            data: [3.76, 3.64, 3.76, 3.42, 3.64],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',  // Blue
                'rgba(75, 192, 192, 0.8)',  // Teal
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',  // Red (for lower GPA)
                'rgba(75, 192, 192, 0.8)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'High Diploma GPA by Semester',
                    font: { size: 18, weight: 'bold' },
                    padding: 20
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `GPA: ${context.parsed.y}/4.00`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4.0,
                    title: {
                        display: true,
                        text: 'GPA',
                        font: { size: 14 }
                    },
                    ticks: {
                        stepSize: 0.5
                    },
                    grid: { color: 'rgba(0,0,0,0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    };

    // Add inline style to section for better chart height
    const section = document.getElementById('vis-barchart');
    section.style.height = '400px';
    section.style.padding = '20px';
    section.style.backgroundColor = '#f9f9f9';
    section.style.borderRadius = '12px';
    section.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';

    new Chart(ctx, config);
});