/**
 * =================================================================
 * SCRIPT NAVIGASI UTAMA
 * =================================================================
 * Skrip ini membuat dan mengelola bar navigasi sticky di bagian atas halaman.
 * Cukup sertakan file ini di halaman HTML mana pun yang membutuhkan navigasi ini.
 */
function createMainNavigation() {
    // 1. Cari placeholder di dalam HTML. Jika tidak ada, hentikan eksekusi.
    const navPlaceholder = document.getElementById('main-navigation-placeholder');
    if (!navPlaceholder) {
        console.error("Placeholder dengan ID 'main-navigation-placeholder' tidak ditemukan.");
        return;
    }

    // 2. Definisikan struktur HTML untuk navigasi
    const navHTML = `
        <nav class="main-nav">
            <div class="nav-content">
                <!-- Tombol Home di sebelah kiri -->
                <a href="/learn/" class="nav-button home-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </a>

                <!-- Kontainer untuk menu Help di sebelah kanan -->
                <div class="relative" id="help-menu-container">
                    <button type="button" class="nav-button help-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                        Help
                    </button>
                    
                    <!-- Pop-up Info Kontak yang muncul saat hover -->
                    <div id="contact-info" class="contact-popup">
                        <h4 class="font-bold text-slate-100 mb-2">Hubungi Kami</h4>
                        <p class="text-sm text-slate-300">Punya pertanyaan atau masukan?</p>
                        <a href="mailto:msyalva+support@gmail.com" class="text-sm text-sky-400 block mt-2 hover:underline">support@syalva.my.id</a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // 3. Sisipkan HTML navigasi ke dalam placeholder
    navPlaceholder.innerHTML = navHTML;
}

// 4. Jalankan fungsi setelah seluruh halaman selesai dimuat
document.addEventListener('DOMContentLoaded', createMainNavigation);
