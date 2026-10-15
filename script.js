// 📈 HƏFTƏLİK DİAQRAM (Gün adları olmadan, estetik mərhələli inkişaf)
        function renderStudentChart(weeklyGained) {
            const ctx = document.getElementById('studentChart').getContext('2d');
            if (chartInstance) chartInstance.destroy();
            
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    // Gün adları yoxdur, sadəcə həftəlik addım-addım inkişaf dərəcəsi var
                    labels: ['Start (0 pt)', 'Ⅰ Mərhələ', 'Ⅱ Mərhələ', 'Ⅲ Mərhələ', 'Cari Nəticə'],
                    datasets: [{
                        label: 'Bu həftə qazanılan bal',
                        data: [
                            0, 
                            Math.round(weeklyGained * 0.2), 
                            Math.round(weeklyGained * 0.55), 
                            Math.round(weeklyGained * 0.8), 
                            weeklyGained
                        ],
                        borderColor: '#38bdf8', 
                        backgroundColor: 'rgba(56, 189, 248, 0.2)', 
                        fill: true, 
                        tension: 0.4, // Xətti hamar və dalğalı göstərir
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#fff',
                        pointRadius: 6,
                        pointHoverRadius: 9
                    }]
                },
                options: { 
                    responsive: true, 
                    plugins: { 
                        legend: { display: true, labels: { color: '#94a3b8', font: { weight: 'bold' } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Artım: +${context.raw} pt`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94a3b8' }
                        },
                        y: { 
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94a3b8' }
                        }
                    }
                }
            });
        }
