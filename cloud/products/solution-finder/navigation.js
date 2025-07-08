// This script creates a global AppNavigator object to handle everything related to the navigation.
const AppNavigator = {
    translations: {},
    menu: [],
    currentLang: 'id',

    /**
     * Synchronously fetches local JSON data. This is a workaround for the file:// protocol.
     * NOTE: This method is generally not recommended for web applications.
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
            this.menu = this._fetchSync('../../../menu-data.json').menu;
            this.translations = this._fetchSync('../../../translations.json');

            // Build the HTML structure using the new recursive methods
            desktopNav.innerHTML = this._createDesktopMenuItemsRecursive(this.menu);
            mobileNav.innerHTML = this._createMobileMenuItemsRecursive(this.menu);
            
            // Set initial language from localStorage or default to 'id'
            this.currentLang = localStorage.getItem('language') || 'id';
            this.switchLanguage(this.currentLang);

            // Setup mobile menu interactivity
            this._setupMobileToggle(mobileNav);

            console.log("Navigation Initialized Successfully.");

        } catch (error) {
            console.error("Failed to initialize navigation:", error);
            desktopNav.innerHTML = `<div class="p-4 text-red-500">Error: Could not load menu data.</div>`;
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
    
    /**
     * NEW RECURSIVE function to build desktop menu items.
     * Handles nested dropdowns and 'comingsoon' status.
     */
    _createDesktopMenuItemsRecursive(menuItems, isSubmenu = false) {
        let html = '';
        menuItems.forEach(item => {
            const isComingSoon = item.status === 'comingsoon';
            const hasSubItems = item.items && item.items.length > 0;

            if (item.type === 'link') {
                if (isComingSoon) {
                    const itemClass = isSubmenu 
                        ? 'block w-full text-left px-4 py-2 text-slate-400 cursor-not-allowed flex justify-between items-center'
                        : 'px-4 py-5 text-slate-400 font-medium cursor-not-allowed flex items-center';
                    html += `
                        <div class="${itemClass}">
                            <span data-lang-key="${item.langKey}"></span>
                            <span class="ml-2 text-xs bg-slate-200 text-slate-500 font-semibold rounded-full px-2 py-0.5" data-lang-key="comingSoon"></span>
                        </div>`;
                } else {
                    const itemClass = isSubmenu 
                        ? 'block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-amber-600'
                        : 'px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors';
                    html += `<a href="${item.href}" class="${itemClass}" data-lang-key="${item.langKey}"></a>`;
                }
            } else if (item.type === 'dropdown') {
                if (isComingSoon) {
                    const buttonClasses = isSubmenu
                        ? 'w-full flex items-center justify-between px-4 py-2 text-slate-400 cursor-not-allowed'
                        : 'px-4 py-5 text-slate-400 font-medium cursor-not-allowed flex items-center';
                    html += `
                        <div class="relative">
                            <div class="${buttonClasses}">
                                <span data-lang-key="${item.langKey}"></span>
                                <span class="ml-2 text-xs bg-slate-200 text-slate-500 font-semibold rounded-full px-2 py-0.5" data-lang-key="comingSoon"></span>
                            </div>
                        </div>`;
                } else if (hasSubItems) {
                    const subMenuHTML = this._createDesktopMenuItemsRecursive(item.items, true);
                    const menuContainerClasses = isSubmenu 
                        ? 'submenu absolute left-full -top-2 mt-0 ml-1 w-auto min-w-max whitespace-nowrap z-50 bg-white rounded-lg shadow-xl py-2' 
                        : 'dropdown-menu absolute top-full left-0 w-auto min-w-max whitespace-nowrap z-50 bg-white rounded-lg shadow-xl py-2';
                    const icon = isSubmenu
                        ? `<svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`
                        : `<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
                    const buttonClasses = isSubmenu
                        ? 'w-full flex items-center px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-amber-600'
                        : 'px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors flex items-center';

                    html += `
                        <div class="group relative">
                            <a href="${item.href || '#'}" class="${buttonClasses}">
                                <span data-lang-key="${item.langKey}"></span>
                                ${icon}
                            </a>
                            <div class="${menuContainerClasses}">${subMenuHTML}</div>
                        </div>`;
                } else {
                    // MODIFICATION: Handle active dropdowns with no sub-items by rendering them as a simple link.
                    const itemClass = isSubmenu 
                        ? 'block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-amber-600'
                        : 'px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors';
                    html += `<a href="${item.href || '#'}" class="${itemClass}" data-lang-key="${item.langKey}"></a>`;
                }
            } else if (item.type === 'mega-menu') {
                // Mega menu logic remains the same as it's not designed to be nested
                let megaMenuHTML = '';
                if (item.content.columns) {
                    const allItems = item.content.columns[0].items;
                    const midIndex = Math.ceil(allItems.length / 2);
                    const splitColumns = [allItems.slice(0, midIndex), allItems.slice(midIndex)];
                    const megaColumns = splitColumns.map(colItems => `<div class="space-y-2">${colItems.map(colItem => {
                        const isItemComingSoon = colItem.status === 'comingsoon';
                        const linkHref = isItemComingSoon ? '#' : colItem.href;
                        const linkClass = isItemComingSoon ? 'menu-item-disabled' : '';
                        const badgeHTML = isItemComingSoon ? '<span class="menu-item-badge" data-lang-key="comingSoon"></span>' : '';
                        return `<div class="relative"><a href="${linkHref}" class="flex items-center p-3 rounded-lg hero-menu-card ${linkClass}"><img src="${colItem.img}" class="mr-4 rounded-md flex-shrink-0 w-12 h-12 object-contain" alt="${colItem.alt}" onerror="this.onerror=null;this.src='https://placehold.co/64x64/e2e8f0/475569?text=Img';"><div class="flex-grow"><p class="font-semibold text-slate-700" data-lang-key="${colItem.titleLangKey}"></p><p class="text-sm text-slate-500" data-lang-key="${colItem.descLangKey}"></p></div></a>${badgeHTML}</div>`;
                    }).join('')}</div>`).join('');
                    let viewAllLink = item.content.viewAll?.active ? `<div class="md:col-span-2 mt-4 text-center border-t border-slate-200 pt-4"><a href="${item.content.viewAll.href}" class="font-semibold text-amber-600 hover:text-amber-700 transition-colors" data-lang-key="${item.content.viewAll.langKey}"></a></div>` : '';
                    const featured = item.content.featured;
                    megaMenuHTML = `<div class="mega-menu-content absolute left-0 top-full w-full z-50"><div class="bg-white shadow-lg border-t border-slate-200/50"><div class="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2"><h3 class="font-bold text-slate-800 px-3 mb-4" data-lang-key="${item.content.columns[0].titleLangKey}"></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">${megaColumns}</div>${viewAllLink}</div><div class="bg-slate-50 rounded-lg p-6 flex flex-col justify-center"><img src="${featured.img}" class="rounded-md mb-4" alt="${featured.alt}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/fb923c/ffffff?text=Image+Not+Found';"><h3 class="font-bold text-slate-800" data-lang-key="${featured.titleLangKey}"></h3><p class="text-slate-500 mt-2 mb-4 text-sm" data-lang-key="${featured.descLangKey}"></p><a href="${featured.href}" class="inline-block text-amber-600 font-semibold hover:text-amber-700 transition-colors" data-lang-key="${featured.linkLangKey}"></a></div></div></div></div>`;
                }
                html += `<div class="group static"><button class="px-4 py-5 text-slate-600 font-medium hover:text-amber-600 transition-colors flex items-center"><span data-lang-key="${item.langKey}"></span><svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>${megaMenuHTML}</div>`;
            }
        });
        return html;
    },

    /**
     * NEW RECURSIVE function to build mobile menu items.
     */
    _createMobileMenuItemsRecursive(menuItems) {
        let html = '';
        menuItems.forEach(item => {
            const isComingSoon = item.status === 'comingsoon';
            const hasSubItems = !isComingSoon && ((item.items && item.items.length > 0) || (item.type === 'mega-menu' && item.content.columns));

            if (!hasSubItems) {
                 if (isComingSoon) {
                    html += `
                    <div class="flex items-center justify-between py-2 text-slate-400 cursor-not-allowed">
                        <span data-lang-key="${item.langKey || item.titleLangKey}"></span>
                        <span class="text-xs bg-slate-200 text-slate-500 font-semibold rounded-full px-2 py-0.5 mr-2" data-lang-key="comingSoon"></span>
                    </div>`;
                } else {
                    html += `<a href="${item.href}" class="block py-2 text-slate-600 font-medium hover:text-amber-600" data-lang-key="${item.langKey || item.titleLangKey}"></a>`;
                }
            } else { 
                const subItemsData = item.items || item.content.columns.flatMap(col => col.items);
                const mobileSubItems = this._createMobileMenuItemsRecursive(subItemsData);
                html += `
                    <div>
                        <button class="w-full flex justify-between items-center py-2 text-slate-600 font-medium hover:text-amber-600 submenu-toggle">
                            <span data-lang-key="${item.langKey}"></span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <div class="pl-4 mobile-submenu">${mobileSubItems}</div>
                    </div>`;
            }
        });
        return html;
    },

    /**
     * Private helper to set up mobile submenu toggle functionality.
     * @private
     */
    _setupMobileToggle(mobileNavContainer) {
        mobileNavContainer.addEventListener('click', (e) => {
            const toggleButton = e.target.closest('.submenu-toggle');
            if (toggleButton) {
                e.preventDefault();
                toggleButton.classList.toggle('open');
                const submenu = toggleButton.nextElementSibling;
                if (submenu && submenu.classList.contains('mobile-submenu')) {
                    // This logic enables smooth animation via max-height in CSS
                    if (submenu.style.maxHeight) {
                        submenu.style.maxHeight = null;
                    } else {
                        submenu.style.maxHeight = submenu.scrollHeight + "px";
                    }
                }
            }
        });
    }
};
