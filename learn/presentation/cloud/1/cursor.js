document.addEventListener('DOMContentLoaded', () => {

    // --- Bagian 1: Injeksi Style CSS Dinamis ---
    const style = document.createElement('style');
    style.textContent = `
        /* Sembunyikan kursor bawaan */
        body, a {
            cursor: none;
        }

        /* Titik tengah kursor kustom */
        .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            background-color: #e2e8f0; /* text-slate-200 */
            border-radius: 50%;
            pointer-events: none; /* Agar tidak mengganggu klik */
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
        }

        /* Lingkaran luar kursor kustom */
        .cursor-outline {
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(226, 232, 240, 0.5); /* border-slate-200 with opacity */
            border-radius: 50%;
            pointer-events: none; /* Agar tidak mengganggu klik */
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.1s ease-out, width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s ease-out;
        }
         
        /* Animasi hover */
        @keyframes hoverAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
            
        /* Gaya kursor saat hover di atas elemen interaktif */
        .cursor-dot.hover {
            transform: translate(-50%, -50%) scale(0.5);
        }
        .cursor-outline.hover {
            width: 60px;
            height: 60px;
            border-color: #38bdf8; /* sky-500 */
        }
    `;
    document.head.appendChild(style);

    // --- Bagian 2: Membuat Elemen Kursor ---
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    // --- Bagian 3: Logika Gerakan Kursor ---
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Fungsi untuk animasi yang mulus
    const animateCursor = () => {
        // Gerakan titik tengah (langsung)
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Gerakan lingkaran luar (dengan jeda/lag)
        // Posisi outline akan mengejar posisi mouse
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    };
    
    // Mulai animasi
    requestAnimationFrame(animateCursor);

    // --- Bagian 4: Menambahkan Interaktivitas Hover ---
    const interactiveElements = document.querySelectorAll('a, button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
});