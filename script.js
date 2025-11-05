// GRAFIK 1: Tugas per Mata Kuliah (Grafik Batang)
const chartTugas = document.getElementById('chartTugas');

new Chart(chartTugas, {
    type: 'bar', // Jenis grafik: batang
    data: {
        labels: ['Web Design', 'Pemrograman', 'Database', 'Matematika', 'B. Inggris'],
        datasets: [{
            label: 'Jumlah Tugas',
            data: [3, 2, 1, 1, 1], // Data jumlah tugas
            backgroundColor: [
                '#4f46e5', // Ungu
                '#10b981', // Hijau
                '#f59e0b', // Kuning
                '#ef4444', // Merah
                '#6366f1'  // Biru
            ],
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // Naik per 1
                }
            }
        },
        plugins: {
            legend: {
                display: false // Sembunyikan legend
            }
        }
    }
});

// GRAFIK 2: Status Tugas (Grafik Donat)
const chartStatus = document.getElementById('chartStatus');

new Chart(chartStatus, {
    type: 'doughnut', // Jenis grafik: donat
    data: {
        labels: ['Selesai', 'Progress', 'Belum'],
        datasets: [{
            data: [5, 2, 1], // Data status tugas
            backgroundColor: [
                '#10b981', // Hijau untuk selesai
                '#f59e0b', // Kuning untuk progress
                '#ef4444'  // Merah untuk belum
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// FUNGSI PENCARIAN SEDERHANA
const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll('.table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(keyword)) {
            row.style.display = ''; // Tampilkan
        } else {
            row.style.display = 'none'; // Sembunyikan
        }
    });
});

// PESAN SELAMAT DATANG
console.log('Dashboard Tugas Kuliah berhasil dimuat! 🎉');

// ANIMASI SEDERHANA SAAT HALAMAN DIMUAT
window.addEventListener('load', function() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// KLIK MENU SIDEBAR
const menuItems = document.querySelectorAll('.menu li');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Hapus class active dari semua menu
        menuItems.forEach(menu => menu.classList.remove('active'));
        
        // Tambah class active ke menu yang diklik
        this.classList.add('active');
        
        // Tampilkan pesan (nanti bisa diganti dengan load halaman lain)
        const menuName = this.textContent.trim();
        alert('Anda mengklik menu: ' + menuName);
    });
});
```

---

## 📁 **Struktur Folder:**
```
folder-project/
│
├── index.html
├── style.css
└── script.js