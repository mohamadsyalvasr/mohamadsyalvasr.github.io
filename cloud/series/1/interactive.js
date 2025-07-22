document.addEventListener('DOMContentLoaded', () => {

    // --- Bagian 1: Injeksi Style CSS Dinamis ---
    // Kita menambahkan CSS untuk animasi via JavaScript agar tidak perlu menyentuh file HTML/CSS sama sekali.
    const style = document.createElement('style');
    style.textContent = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .reveal-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);


    // --- Bagian 2: Logika Intersection Observer ---
    // Ini adalah cara modern dan efisien untuk mendeteksi kapan sebuah elemen masuk ke layar.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika elemennya terlihat di layar
            if (entry.isIntersecting) {
                // Tambahkan kelas 'visible' untuk memicu animasi CSS
                entry.target.classList.add('visible');
                // Hentikan pengamatan pada elemen ini agar animasi tidak berulang
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Memicu saat 10% elemen terlihat
    });


    // --- Bagian 3: Memilih Elemen yang Akan Dianimasikan ---
    // Pilih semua elemen yang ingin kita beri efek 'fade in'.
    // Anda bisa menambahkan selector lain di sini jika perlu.
    const elementsToAnimate = document.querySelectorAll('.section-screen > div, .grid > div');
    
    // Terapkan kelas awal dan mulai amati setiap elemen
    elementsToAnimate.forEach(element => {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
    });

});