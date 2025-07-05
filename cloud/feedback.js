/**
 * Feedback Feature Module
 *
 * This script dynamically creates and injects a floating feedback button
 * and a corresponding modal into the page. It is designed to be self-contained
 * and does not require any changes to the existing HTML structure.
 * It uses Tailwind CSS classes already present in the main document for styling.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Konfigurasi (Bisa diubah sesuai kebutuhan) ---
    const feedbackEmail = "feedback-guides@contoh.com";
    const feedbackFormUrl = "https://www.contoh.com/feedback-form";

    // --- 1. Membuat Elemen-Elemen ---

    // A. Tombol Aksi Mengambang (Floating Action Button - FAB)
    const feedbackButton = document.createElement('button');
    feedbackButton.id = 'feedback-fab-btn';
    // Gunakan kelas Tailwind CSS untuk styling
    feedbackButton.className = 'fixed bottom-8 right-8 bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transform transition-all hover:scale-110 z-40';
    feedbackButton.setAttribute('aria-label', 'Buka modal feedback');
    
    // --- PERUBAHAN IKON DI SINI ---
    // Ikon SVG untuk tombol telah diganti sesuai permintaan Anda.
    feedbackButton.innerHTML = `
        <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C10.4003 22 8.88837 21.6244 7.54753 20.9565C7.19121 20.7791 6.78393 20.72 6.39939 20.8229L4.17335 21.4185C3.20701 21.677 2.32295 20.793 2.58151 19.8267L3.17712 17.6006C3.28001 17.2161 3.22094 16.8088 3.04346 16.4525C2.37562 15.1116 2 13.5997 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.5 11.1084C7.5 12.4768 8.81884 13.9126 10.0286 14.9417C10.8524 15.6426 11.2644 15.9931 12 15.9931C12.7356 15.9931 13.1476 15.6426 13.9714 14.9417C15.1812 13.9126 16.5 12.4768 16.5 11.1084C16.5 8.43124 14.0249 7.43172 12 9.4998C9.97507 7.43172 7.5 8.43124 7.5 11.1084Z" fill="#ffffff"></path>
            </g>
        </svg>
    `;

    // B. Latar Belakang Modal (Backdrop)
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'feedback-modal-backdrop';
    // Styling untuk backdrop: menutupi seluruh layar, semi-transparan, dan tersembunyi secara default
    modalBackdrop.className = 'hidden fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300';

    // C. Konten Modal
    const modalContent = document.createElement('div');
    modalContent.id = 'feedback-modal-content';
    // Styling untuk kotak modal
    modalContent.className = 'bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all duration-300 scale-95 opacity-0';
    modalContent.innerHTML = `
        <button id="feedback-modal-close-btn" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-2 text-gradient">Kami Menghargai Masukan Anda</h2>
        <p class="text-slate-500 mb-8">Punya saran, ide fitur baru, atau menemukan bug? Beri tahu kami melalui salah satu cara berikut.</p>
        
        <div class="space-y-6">
            <a href="mailto:${feedbackEmail}" class="group flex items-center p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-white transition-all duration-200">
                <div class="flex-shrink-0 bg-slate-200 group-hover:bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div class="ml-4">
                    <h3 class="font-semibold text-lg text-slate-700 group-hover:text-amber-600 transition-colors">Kirim via Email</h3>
                    <p class="text-slate-500 text-sm">Cara terbaik untuk laporan yang detail.</p>
                </div>
            </a>
            
            <a href="${feedbackFormUrl}" target="_blank" rel="noopener noreferrer" class="group flex items-center p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-white transition-all duration-200">
                <div class="flex-shrink-0 bg-slate-200 group-hover:bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div class="ml-4">
                    <h3 class="font-semibold text-lg text-slate-700 group-hover:text-amber-600 transition-colors">Isi Formulir Online</h3>
                    <p class="text-slate-500 text-sm">Untuk feedback cepat atau permintaan fitur.</p>
                </div>
            </a>
        </div>
    `;

    // --- 2. Merakit dan Menambahkan ke Halaman ---
    modalBackdrop.appendChild(modalContent);
    document.body.appendChild(feedbackButton);
    document.body.appendChild(modalBackdrop);


    // --- 3. Menambahkan Fungsionalitas (Event Listeners) ---

    const closeButton = document.getElementById('feedback-modal-close-btn');

    const openModal = () => {
        modalBackdrop.classList.remove('hidden');
        // Trigger transisi setelah display diubah
        setTimeout(() => {
            modalBackdrop.classList.add('opacity-100');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10); // delay kecil untuk memastikan browser me-render display:flex dulu
    };

    const closeModal = () => {
        modalBackdrop.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        // Sembunyikan elemen setelah transisi selesai
        setTimeout(() => {
            modalBackdrop.classList.add('hidden');
        }, 300); // Harus sama dengan durasi transisi
    };

    // Saat tombol feedback diklik, tampilkan modal
    feedbackButton.addEventListener('click', openModal);

    // Saat tombol 'close' di dalam modal diklik, sembunyikan modal
    closeButton.addEventListener('click', closeModal);

    // Saat area backdrop (di luar konten modal) diklik, sembunyikan modal
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            closeModal();
        }
    });

    // Saat tombol 'Escape' ditekan, sembunyikan modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
            closeModal();
        }
    });
});