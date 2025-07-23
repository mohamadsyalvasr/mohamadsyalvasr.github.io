// =================================================================
// UTILITIES
// =================================================================
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        level: params.get('level'),
        seriesId: params.get('seriesId'),
        episodeId: params.get('episodeId')
    };
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const colorStyles = {
    sky:    { badge: 'bg-sky-500/10 text-sky-400', button: 'bg-sky-500 hover:bg-sky-600', border: 'border-sky-500/30' },
    teal:   { badge: 'bg-teal-500/10 text-teal-400', button: 'bg-teal-500 hover:bg-teal-600', border: 'border-teal-500/30' },
    amber:  { badge: 'bg-amber-500/10 text-amber-400', button: 'bg-amber-500 hover:bg-amber-600', border: 'border-amber-500/30' },
    indigo: { badge: 'bg-indigo-500/10 text-indigo-400', button: 'bg-indigo-500 hover:bg-indigo-600', border: 'border-indigo-500/30' },
    rose:   { badge: 'bg-rose-500/10 text-rose-400', button: 'bg-rose-500 hover:bg-rose-600', border: 'border-rose-500/30' },
    fuchsia:{ badge: 'bg-fuchsia-500/10 text-fuchsia-400', button: 'bg-fuchsia-500 hover:bg-fuchsia-600', border: 'border-fuchsia-500/30' },
    slate:  { badge: 'bg-slate-500/10 text-slate-400', button: 'bg-slate-700', border: 'border-slate-700' }
};

// =================================================================
// RENDER FUNCTIONS
// =================================================================

// --- Halaman Utama (index.html) ---
function renderLevelSelection() {
    const container = document.getElementById('level-list');
    if (!container) return;

    const levels = [
        { id: 'beginner', title: '🚀 Beginner', desc: 'Mulai dari nol, pahami konsep dasar kontainer hingga menjalankan aplikasi pertama Anda di Kubernetes.', status: 'active' },
        { id: 'intermediate', title: '🛠️ Intermediate', desc: 'Kelola aplikasi stateful, jaringan kompleks, dan konfigurasi lanjutan.', status: 'coming_soon' },
        { id: 'advanced', title: '✨ Advanced', desc: 'Kuasai keamanan, otomatisasi CI/CD, monitoring, dan perluas fungsionalitas klaster.', status: 'coming_soon' }
    ];

    let html = '';
    levels.forEach(level => {
        const isAvailable = level.status === 'active';
        const titleParts = level.title.split(' ');
        const icon = titleParts[0];
        const textTitle = titleParts.slice(1).join(' ');
        const link = isAvailable ? `level.html?level=${level.id}` : '#';

        html += `
            <a href="${link}" class="list-item-link ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:border-sky-500/50'}">
                <div class="flex-shrink-0 text-6xl mb-4 md:mb-0 md:mr-8">${icon}</div>
                <div class="flex-grow text-center md:text-left">
                    <h3 class="text-2xl font-bold text-slate-100">${textTitle}</h3>
                    <p class="mt-1 text-slate-400">${level.desc}</p>
                </div>
                <div class="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                    ${isAvailable ? `<span class="list-item-button bg-sky-500">Pilih</span>` : `<span class="list-item-button bg-slate-700 text-slate-400">Segera Hadir</span>`}
                </div>
            </a>
        `;
    });
    container.innerHTML = html;
}

// --- Halaman Level (level.html) ---
function renderSeriesListPage() {
    const { level } = getUrlParams();
    if (!level) return;

    const seriesList = kubernetesData[level];
    document.getElementById('main-title').textContent = `Level: ${capitalize(level)}`;
    renderBreadcrumb(level);

    // Tambahkan komponen pencarian
    const searchPlaceholder = document.getElementById('search-placeholder');
    if (searchPlaceholder) {
        searchPlaceholder.innerHTML = `
            <div class="mb-12 max-w-lg mx-auto">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" id="search-input" placeholder="Cari seri pembelajaran..." class="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-full text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-300">
                </div>
            </div>
        `;
    }

    const container = document.getElementById('series-list');
    const noResultsMessage = document.getElementById('no-results');
    const allSeries = kubernetesData[level];

    const renderList = (seriesToRender) => {
        container.innerHTML = '';
        if (seriesToRender.length === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }

        let html = '';
        seriesToRender.forEach(series => {
            const isAvailable = series.status === 'active';
            const styles = colorStyles[series.color] || colorStyles.slate;
            const link = isAvailable ? `series.html?level=${level}&seriesId=${series.seriesId}` : '#';

            html += `
                <a href="${link}" class="list-item-link ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:border-sky-500/50'}">
                    <div class="flex-grow">
                        <h2 class="text-2xl font-bold text-slate-100">${series.title}</h2>
                        <p class="mt-1 text-slate-400">${series.description}</p>
                    </div>
                    <div class="flex-shrink-0 ml-6">
                        ${isAvailable ? `<span class="list-item-button ${styles.button}">Detail</span>` : `<span class="list-item-button bg-slate-700 text-slate-400">Segera Hadir</span>`}
                    </div>
                </a>
            `;
        });
        container.innerHTML = html;
    };

    renderList(allSeries); // Render awal

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredSeries = allSeries.filter(series =>
                series.title.toLowerCase().includes(searchTerm) ||
                series.description.toLowerCase().includes(searchTerm)
            );
            renderList(filteredSeries);
        });
    }
}

// --- Halaman Seri (series.html) ---
function renderEpisodeListPage() {
    const { level, seriesId } = getUrlParams();
    if (!level || !seriesId) return;

    const series = kubernetesData[level].find(s => s.seriesId === seriesId);
    document.getElementById('main-title').textContent = series.title;
    document.getElementById('subtitle').textContent = series.description;
    renderBreadcrumb(level, seriesId);

    // Tambahkan komponen pencarian
    const searchPlaceholder = document.getElementById('search-placeholder');
    if (searchPlaceholder) {
        searchPlaceholder.innerHTML = `
            <div class="mb-12 max-w-lg mx-auto">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" id="search-input" placeholder="Cari episode..." class="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-full text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-300">
                </div>
            </div>
        `;
    }

    const container = document.getElementById('episode-list-container');
    const noResultsMessage = document.getElementById('no-results');
    const allEpisodes = series.episodes;

    const renderList = (episodesToRender) => {
        container.innerHTML = '';
        if (episodesToRender.length === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }

        const styles = colorStyles[series.color] || colorStyles.slate;
        let html = '<div class="space-y-6">';
        episodesToRender.forEach((episode, index) => {
            const isAvailable = episode.status === 'available';
            const link = isAvailable ? `episode.html?level=${level}&seriesId=${seriesId}&episodeId=${episode.id}` : '#';
            html += `
                <a href="${link}" class="episode-list-item ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}">
                    <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isAvailable ? styles.badge : colorStyles.slate.badge}">
                        <span class="text-xl font-bold">${index + 1}</span>
                    </div>
                    <div class="flex-grow">
                        <h3 class="font-bold text-xl text-slate-100">${episode.title}</h3>
                        <p class="text-slate-400 mt-1">${episode.description}</p>
                    </div>
                    <div class="flex-shrink-0 self-center">
                        ${isAvailable ? `<span class="episode-button ${styles.button}">Mulai</span>` : `<span class="episode-button bg-slate-700 text-slate-400">Segera</span>`}
                    </div>
                </a>
            `;
            if (index < episodesToRender.length - 1) {
                html += '<hr class="border-slate-700/50">';
            }
        });
        html += '</div>';
        container.innerHTML = html;
    };

    renderList(allEpisodes); // Render awal

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEpisodes = allEpisodes.filter(episode =>
                episode.title.toLowerCase().includes(searchTerm) ||
                episode.description.toLowerCase().includes(searchTerm)
            );
            renderList(filteredEpisodes);
        });
    }
}

// --- Halaman Episode (episode.html) ---
async function renderEpisodeDetailPage() {
    const { level, seriesId, episodeId } = getUrlParams();
    if (!level || !seriesId || !episodeId) return;

    const series = kubernetesData[level].find(s => s.seriesId === seriesId);
    const episode = series.episodes.find(e => e.id === episodeId);
    const episodeIndex = series.episodes.findIndex(e => e.id === episodeId);

    document.title = episode.title;
    document.getElementById('main-title').textContent = episode.title;
    document.getElementById('subtitle').textContent = `Dari seri: ${series.title}`;
    renderBreadcrumb(level, seriesId, episode.title);

    const contentContainer = document.getElementById('episode-content');
    contentContainer.innerHTML = '<p>Memuat konten...</p>'; // Placeholder

    try {
        const response = await fetch(episode.content);
        if (!response.ok) {
            throw new Error(`Gagal memuat konten: ${response.statusText}`);
        }
        const htmlContent = await response.text();
        contentContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error('Error fetching episode content:', error);
        contentContainer.innerHTML = '<p class="text-red-400">Maaf, terjadi kesalahan saat memuat materi episode.</p>';
    }

    // Render Navigasi
    const navContainer = document.getElementById('episode-navigation');
    const prevEpisode = series.episodes[episodeIndex - 1];
    const nextEpisode = series.episodes[episodeIndex + 1];
    let navHtml = '';

    // Tombol Sebelumnya
    if (prevEpisode) {
        navHtml += `<a href="episode.html?level=${level}&seriesId=${seriesId}&episodeId=${prevEpisode.id}" class="nav-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Sebelumnya
                     </a>`;
    } else {
        navHtml += `<div></div>`; // Placeholder agar layout tidak rusak
    }

    // Tombol Selanjutnya (LOGIKA BARU)
    if (nextEpisode) {
        if (nextEpisode.status === 'available') {
            // Jika episode selanjutnya tersedia, buat link aktif
            navHtml += `<a href="episode.html?level=${level}&seriesId=${seriesId}&episodeId=${nextEpisode.id}" class="nav-button">
                            Selanjutnya
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                         </a>`;
        } else {
            // Jika "coming_soon", buat elemen yang tidak bisa diklik
            navHtml += `<span class="flex items-center font-semibold text-slate-500 cursor-not-allowed">
                            Selanjutnya
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                         </span>`;
        }
    } else {
        navHtml += `<div></div>`; // Placeholder
    }
    navContainer.innerHTML = navHtml;
}

// --- Komponen ---
function renderBreadcrumb(level, seriesId, episodeTitle) {
    const container = document.getElementById('breadcrumb');
    if (!container || !level) return;

    const series = seriesId ? kubernetesData[level].find(s => s.seriesId === seriesId) : null;

    let homeLink = `<a href="/learn/" class="text-sky-400 hover:underline">Home</a>`;
    let learnLink = ` / <a href="/learn/kubernetes" class="text-sky-400 hover:underline">Kubernetes</a>`;
    let levelLink = ` / <a href="level.html?level=${level}" class="text-sky-400 hover:underline">${capitalize(level)}</a>`;
    let seriesLink = series ? ` / <a href="series.html?level=${level}&seriesId=${seriesId}" class="text-sky-400 hover:underline">${series.title}</a>` : '';
    let episodeCrumb = episodeTitle ? ` / <span class="text-slate-300">${episodeTitle}</span>` : '';

    container.innerHTML = `<div class="breadcrumb-inner">${homeLink}${learnLink}${levelLink}${seriesLink}${episodeCrumb}</div>`;
}
