// This script creates a global AppNavigator object to handle everything related to the navigation.
// It uses a clever technique to load JSON files without 'fetch' to work on the file:/// protocol.
const AppNavigator = {
    translations: {},
    menu: [],
    currentLang: 'id',

    /**
     * Dynamically loads a JSON file by inserting it as a script tag.
     * @param {string} path - The path to the JSON file.
     * @param {string} variableName - The name of the global variable the JSON will be assigned to.
     * @returns {Promise<void>} A promise that resolves when the script is loaded.
     */
    _loadJsonAsScript(path, variableName) {
        return new Promise((resolve, reject) => {
            // Create a script tag
            const script = document.createElement('script');
            // The trick is to assign the JSON content to a global variable.
            // We create a simple JS file on the fly.
            const scriptContent = `const ${variableName} = ${JSON.stringify(this._fetchSync(path))};`;
            const blob = new Blob([scriptContent], { type: 'application/javascript' });
            
            script.src = URL.createObjectURL(blob);
            script.onload = () => {
                // Clean up the created object URL
                URL.revokeObjectURL(script.src);
                resolve();
            };
            script.onerror = () => {
                URL.revokeObjectURL(script.src);
                reject(new Error(`Failed to load script for ${path}`));
            };
            document.head.appendChild(script);
        });
    },
    
    /**
     * Synchronously fetches local JSON data. This is a workaround for the file:// protocol.
     * NOTE: This method is generally not recommended for web applications, but is
     * a necessary workaround for the specific constraint of running without a server.
     */
    _fetchSync(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // `false` makes the request synchronous
        xhr.send(null);
        if (xhr.status === 200 || xhr.status === 0) { // status 0 for file://
            return JSON.parse(xhr.responseText);
        } else {
            throw new Error(`Failed to fetch ${url}: ${xhr.statusText}`);
        }
    },


    /**
     * Initializes the navigation. Fetches data, builds HTML, and sets up events.
     * @param {string} desktopNavSelector - CSS selector for the desktop navigation container.
     * @param {string} mobileNavSelector - CSS selector for the mobile navigation container.
     */
    async init(desktopNavSelector, mobileNavSelector) {
        const desktopNav = document.querySelector(desktopNavSelector);
        const mobileNav = document.querySelector(mobileNavSelector);

        if (!desktopNav || !mobileNav) {
            console.error("Navigation containers not found.");
            return;
        }

        try {
            // Load JSON files using the synchronous workaround
            this.menu = this._fetchSync('../menu-data.json').menu;
            this.translations = this._fetchSync('../translations.json');

            // Build the HTML structure
            this._buildHTML(this.menu, desktopNav, mobileNav);
            
            // Set initial language from localStorage or default to 'id'
            this.currentLang = localStorage.getItem('language') || 'id';
            this.switchLanguage(this.currentLang);

            // Setup mobile menu interactivity
            this._setupMobileToggle(mobileNav);

            console.log("Navigation Initialized Successfully.");

        } catch (error) {
            console.error("Failed to initialize navigation:", error);
            desktopNav.innerHTML = `<div class="p-4 text-red-500">Error: Could not load menu data. Please ensure you are running this from a web server.</div>`;
        }
    },

    /**
     * Switches the language for all elements with a data-lang-key attribute.
     * @param {string} lang - The language code ('id' or 'en').
     */
    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (this.translations[key] && this.translations[key][lang]) {
                element.innerHTML = this.translations[key][lang];
            }
        });
    },
    
    _buildHTML(menuItems, desktopNav, mobileNav) {
        desktopNav.innerHTML = '';
        mobileNav.innerHTML = '';

        menuItems.forEach(item => {
            // --- DESKTOP MENU ---
            if (item.type === 'link') {
                desktopNav.innerHTML += `<a href="${item.href}" class="px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors" data-lang-key="${item.langKey}"></a>`;
            } else if (item.type === 'dropdown') {
                const dropdownItems = item.items.map(subItem => {
                    const isComingSoon = subItem.status === 'comingsoon';
                    return isComingSoon
                        ? `<div class="relative px-4 py-2 text-slate-400 flex justify-between items-center cursor-not-allowed"><span data-lang-key="${subItem.langKey}"></span><span class="text-xs bg-slate-200 text-slate-500 font-semibold rounded-full px-2 py-0.5" data-lang-key="comingSoon"></span></div>`
                        : `<a href="${subItem.href}" class="block px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-amber-600" data-lang-key="${subItem.langKey}"></a>`;
                }).join('');
                desktopNav.innerHTML += `<div class="relative dropdown"><button class="px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors flex items-center"><span data-lang-key="${item.langKey}"></span><svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="dropdown-menu absolute top-full left-0 w-56 z-50 bg-white rounded-lg shadow-xl py-2">${dropdownItems}</div></div>`;
            } else if (item.type === 'mega-menu') {
                let megaMenuHTML = '';
                if (item.content.columns) {
                    const allItems = item.content.columns[0].items;
                    const midIndex = Math.ceil(allItems.length / 2);
                    const splitColumns = [allItems.slice(0, midIndex), allItems.slice(midIndex)];
                    const megaColumns = splitColumns.map(colItems => `<div class="space-y-2">${colItems.map(colItem => {
                        const isComingSoon = colItem.status === 'comingsoon';
                        const linkClass = isComingSoon ? 'menu-item-disabled' : '';
                        const badgeHTML = isComingSoon ? '<span class="menu-item-badge" data-lang-key="comingSoon"></span>' : '';
                        return `<div class="relative"><a href="${colItem.href}" class="flex items-center p-3 rounded-lg hero-menu-card ${linkClass}"><img src="${colItem.img}" class="mr-4 rounded-md flex-shrink-0 w-12 h-12 object-contain" alt="${colItem.alt}" onerror="this.style.display='none'"><div class="flex-grow"><p class="font-semibold text-slate-700" data-lang-key="${colItem.titleLangKey}"></p><p class="text-sm text-slate-500" data-lang-key="${colItem.descLangKey}"></p></div></a>${badgeHTML}</div>`;
                    }).join('')}</div>`).join('');
                    let viewAllLink = item.content.viewAll?.active ? `<div class="md:col-span-2 mt-4 text-center border-t border-slate-200 pt-4"><a href="${item.content.viewAll.href}" class="font-semibold text-amber-600 hover:text-amber-700 transition-colors" data-lang-key="${item.content.viewAll.langKey}"></a></div>` : '';
                    const featured = item.content.featured;
                    megaMenuHTML = `<div class="mega-menu-content absolute left-0 top-full w-full z-50"><div class="bg-white shadow-lg border-t border-slate-200/50"><div class="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2"><h3 class="font-bold text-slate-800 px-3 mb-4" data-lang-key="${item.content.columns[0].titleLangKey}"></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">${megaColumns}</div>${viewAllLink}</div><div class="bg-slate-50 rounded-lg p-6 flex flex-col justify-center"><img src="${featured.img}" class="rounded-md mb-4" alt="${featured.alt}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/fb923c/ffffff?text=Image+Not+Found';"><h3 class="font-bold text-slate-800" data-lang-key="${featured.titleLangKey}"></h3><p class="text-slate-500 mt-2 mb-4 text-sm" data-lang-key="${featured.descLangKey}"></p><a href="${featured.href}" class="inline-block text-amber-600 font-semibold hover:text-amber-700 transition-colors" data-lang-key="${featured.linkLangKey}"></a></div></div></div></div>`;
                } else if (item.content.background) {
                    const keyPoints = item.content.keyPoints.map(point => `<div class="bg-white/80 backdrop-blur-sm p-4 rounded-lg"><h4 class="font-bold text-slate-800" data-lang-key="${point.titleLangKey}"></h4><p class="text-slate-600 text-sm mt-1" data-lang-key="${point.descLangKey}"></p></div>`).join('');
                    megaMenuHTML = `<div class="mega-menu-content absolute left-0 top-full w-full z-50"><div class="container mx-auto p-4"><div class="bg-slate-200 rounded-lg shadow-lg overflow-hidden about-mega-menu-bg" style="background-image: url('${item.content.background.url}')"><div class="bg-black/20 p-8 grid grid-cols-1 md:grid-cols-2 gap-8"><div class="text-white"><h3 class="text-2xl font-bold" data-lang-key="${item.content.titleLangKey}"></h3><p class="mt-2" data-lang-key="${item.content.descLangKey}"></p><a href="${item.content.cta.href}" class="inline-block bg-amber-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-amber-600 transition-colors mt-6" data-lang-key="${item.content.cta.langKey}"></a></div><div class="space-y-4">${keyPoints}</div></div></div></div></div>`;
                }
                desktopNav.innerHTML += `<div class="group static"><button class="px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors flex items-center"><span data-lang-key="${item.langKey}"></span><svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>${megaMenuHTML}</div>`;
            }

            // --- MOBILE MENU ---
            if (item.type === 'link' || (item.type === 'mega-menu' && item.content.background)) {
                mobileNav.innerHTML += `<a href="${item.href}" class="block py-2 text-slate-600 font-medium hover:text-amber-600" data-lang-key="${item.langKey}"></a>`;
            } else if (item.type === 'dropdown' || (item.type === 'mega-menu' && item.content.columns)) {
                const mobileSubItems = (item.items || item.content.columns.flatMap(col => col.items)).map(subItem => {
                    const isComingSoon = subItem.status === 'comingsoon';
                    return isComingSoon
                        ? `<div class="flex items-center justify-between py-2 pl-4 text-slate-400 cursor-not-allowed"><span data-lang-key="${subItem.langKey || subItem.titleLangKey}"></span><span class="text-xs bg-slate-200 text-slate-500 font-semibold rounded-full px-2 py-0.5 mr-2" data-lang-key="comingSoon"></span></div>`
                        : `<a href="${subItem.href}" class="block py-2 pl-4 text-slate-500 hover:text-amber-600" data-lang-key="${subItem.langKey || subItem.titleLangKey}"></a>`;
                }).join('');
                mobileNav.innerHTML += `<div><button class="w-full flex justify-between items-center py-2 text-slate-600 font-medium hover:text-amber-600 submenu-toggle"><span data-lang-key="${item.langKey}"></span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button><div class="mt-1 pl-2 space-y-1 mobile-submenu">${mobileSubItems}</div></div>`;
            }
        });
    },

    /**
     * Private helper to set up mobile submenu toggle functionality.
     * @private
     */
    _setupMobileToggle(mobileNavContainer) {
        mobileNavContainer.addEventListener('click', (e) => {
            const toggleButton = e.target.closest('.submenu-toggle');
            if (toggleButton) {
                toggleButton.classList.toggle('open');
            }
        });
    }
};
