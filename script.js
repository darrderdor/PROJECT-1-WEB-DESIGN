// ===== LEARNING STATISTICS CHART =====
const learningChart = document.getElementById('learningChart');

new Chart(learningChart, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Hours Studied',
                data: [3, 5, 4, 6, 7, 4, 5],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderRadius: 8,
                borderSkipped: false,
            },
            {
                label: 'Completed Lessons',
                data: [2, 4, 3, 5, 6, 3, 4],
                backgroundColor: 'rgba(118, 75, 162, 0.6)',
                borderRadius: 8,
                borderSkipped: false,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(45, 55, 72, 0.9)',
                padding: 12,
                borderRadius: 8,
                titleFont: {
                    family: 'Inter',
                    size: 13,
                    weight: '600'
                },
                bodyFont: {
                    family: 'Inter',
                    size: 12
                },
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed.y;
                        if (context.datasetIndex === 0) {
                            label += ' hours';
                        } else {
                            label += ' lessons';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '500'
                    },
                    color: '#718096'
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f7fafc',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 12
                    },
                    color: '#718096',
                    stepSize: 2
                }
            }
        }
    }
});

// ===== CHART FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the filter type
        const filterType = this.textContent.toLowerCase();
        
        // Update chart data based on filter
        updateChartData(filterType);
    });
});

function updateChartData(filterType) {
    let newData, newLabels;
    
    if (filterType === 'week') {
        newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        newData = {
            studied: [3, 5, 4, 6, 7, 4, 5],
            completed: [2, 4, 3, 5, 6, 3, 4]
        };
    } else if (filterType === 'month') {
        newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        newData = {
            studied: [18, 22, 20, 25],
            completed: [12, 15, 14, 18]
        };
    } else { // year
        newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        newData = {
            studied: [60, 65, 70, 75, 80, 85, 78, 82, 88, 90, 85, 92],
            completed: [45, 50, 52, 58, 62, 65, 60, 63, 68, 70, 67, 72]
        };
    }
    
    // Update chart
    learningChart.data.labels = newLabels;
    learningChart.data.datasets[0].data = newData.studied;
    learningChart.data.datasets[1].data = newData.completed;
    learningChart.update();
    
    console.log(`Chart updated to ${filterType} view`);
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    
    // Filter lessons table
    const tableRows = document.querySelectorAll('.lessons-table tbody tr');
    
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// ===== MENU ITEM ACTIVE STATE =====
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        menuItems.forEach(menu => menu.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Show notification
        const menuName = this.querySelector('span').textContent;
        showNotification(`Navigating to ${menuName}`);
    });
});

// ===== CLASS CARD CLICK =====
const classCards = document.querySelectorAll('.class-card');

classCards.forEach(card => {
    card.addEventListener('click', function() {
        const className = this.querySelector('h6').textContent;
        showNotification(`Opening ${className}`);
    });
});

// ===== CALENDAR NAVIGATION =====
const calendarNavButtons = document.querySelectorAll('.calendar-nav');
const calendarTitle = document.querySelector('.calendar-header h6');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentMonth = 11; // December (0-indexed)
let currentYear = 2022;

calendarNavButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        if (index === 0) {
            // Previous month
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        } else {
            // Next month
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }
        
        calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;
    });
});

// ===== CALENDAR DAY CLICK =====
const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');

calendarDays.forEach(day => {
    day.addEventListener('click', function() {
        // Remove active class from all days
        calendarDays.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked day
        this.classList.add('active');
        
        const dayNumber = this.textContent;
        showNotification(`Selected: ${months[currentMonth]} ${dayNumber}, ${currentYear}`);
    });
});

// ===== REMINDER INTERACTIONS =====
const reminderItems = document.querySelectorAll('.reminder-item');

reminderItems.forEach(item => {
    item.addEventListener('click', function() {
        const reminderTitle = this.querySelector('.reminder-title').textContent;
        const reminderDate = this.querySelector('.reminder-date').textContent;
        showNotification(`Reminder: ${reminderTitle} on ${reminderDate}`);
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PROFILE BUTTON =====
const profileButton = document.querySelector('.btn-profile');

profileButton.addEventListener('click', function() {
    showNotification('Opening profile settings...');
});

// ===== BUY LESSON BUTTON =====
const buyLessonButton = document.querySelector('.btn-primary-custom');

buyLessonButton.addEventListener('click', function() {
    showNotification('Redirecting to lesson store...');
});

// ===== HELP BUTTON =====
const helpButton = document.querySelector('.btn-help');

helpButton.addEventListener('click', function() {
    showNotification('Opening help center...');
});

// ===== ANIMATE ON LOAD =====
window.addEventListener('load', function() {
    console.log('🎓 Learnthru Dashboard loaded successfully!');
    
    // Animate class cards
    const cards = document.querySelectorAll('.class-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome back, Stella! 👋');
    }, 1000);
});

// ===== TABLE ROW CLICK =====
const tableRows = document.querySelectorAll('.lessons-table tbody tr');

tableRows.forEach(row => {
    row.addEventListener('click', function() {
        const teacherName = this.cells[1].textContent;
        const startDate = this.cells[3].textContent;
        showNotification(`Lesson with ${teacherName} on ${startDate}`);
    });
});

// ===== DOWNLOAD MATERIAL CLICK =====
const materialBadges = document.querySelectorAll('.material-badge');

materialBadges.forEach(badge => {
    badge.addEventListener('click', function(e) {
        e.stopPropagation();
        showNotification('Downloading material...');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('✅ All interactive features loaded!');
