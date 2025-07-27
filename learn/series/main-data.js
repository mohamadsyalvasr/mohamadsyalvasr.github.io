/**
 * =================================================================
 * DATA JALUR PEMBELAJARAN UTAMA
 * =================================================================
 * File ini berisi semua jalur pembelajaran yang tersedia di portal.
 * Properti 'icon' sekarang dapat berupa emoji atau URL ke sebuah gambar.
 */
const learningPaths = [
    {
        id: "kubernetes",
        title: "Kubernetes Dari Nol",
        description: "Belajar untuk menguasai orkestrasi kontainer paling populer di dunia, dari dasar hingga mahir.",
        icon: "https://api.iconify.design/logos:kubernetes.svg", // URL ke ikon Kubernetes
        url: "/learn/series/kubernetes/",
        status: "active"
    },
    {
        id: "data-stream",
        title: "Data Stream di AWS",
        description: "Ikuti perjalanan belajarku memahami Data Stream di AWS—satu eksperimen, satu wawasan, dan satu langkah maju setiap harinya.",
        icon: "https://api.iconify.design/ph:arrows-merge-duotone.svg?color=%23e65100", // URL ke ikon Machine Learning
        url: "#",
        status: "coming_soon"
    },
    {
        id: "machine-learning",
        title: "Machine Learning",
        description: "Ikuti perjalanan belajarku memahami Machine Learning di AWS—satu eksperimen, satu wawasan, dan satu langkah maju setiap harinya.",
        icon: "https://api.iconify.design/ph:brain-light.svg?color=%23818cf8", // URL ke ikon Machine Learning
        url: "#",
        status: "coming_soon"
    },
    {
        id: "cloud-computing",
        title: "Pengantar Cloud Computing",
        description: "Pahami konsep dasar, model layanan (IaaS, PaaS, SaaS), dan manfaat komputasi awan untuk bisnis dan teknologi.",
        icon: "https://api.iconify.design/ph:cloud-light.svg?color=%2338bdf8", // URL ke ikon Cloud Computing
        url: "#",
        status: "coming_soon"
    }
];
