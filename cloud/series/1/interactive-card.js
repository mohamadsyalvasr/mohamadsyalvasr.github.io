document.addEventListener('DOMContentLoaded', () => {

    // --- Bagian 1: Injeksi Style CSS Dinamis ---
    // CSS ini penting untuk 'menyiapkan' kartu agar bisa dianimasikan dalam 3D.
    const style = document.createElement('style');
    style.textContent = `
        .interactive-card {
            transform-style: preserve-3d;
            /* Transisi untuk mengembalikan kartu ke posisi semula saat mouse pergi */
            transition: transform 0.2s ease-out;
        }
    `;
    document.head.appendChild(style);


    // --- Bagian 2: Logika Efek Tilt ---
    
    // Pilih semua elemen kartu yang ingin kita beri efek.
    const cards = document.querySelectorAll('.grid > div[class*="bg-slate-800"]');

    cards.forEach(card => {
        // Terapkan kelas dasar untuk persiapan
        card.classList.add('interactive-card');

        // Kekuatan efek tilt, semakin kecil angkanya semakin kuat efeknya.
        const tiltStrength = 20;

        // Listener saat mouse bergerak di atas kartu
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Hitung posisi mouse X dan Y relatif terhadap tengah kartu
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            // Hitung rotasi berdasarkan posisi mouse
            const rotateY = (mouseX / (rect.width / 2)) * tiltStrength;
            const rotateX = -(mouseY / (rect.height / 2)) * tiltStrength;
            
            // Terapkan transformasi 3D ke kartu
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Listener saat mouse meninggalkan area kartu
        card.addEventListener('mouseleave', () => {
            // Kembalikan kartu ke posisi semula dengan mulus
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});