/**
 * =================================================================
 * DATA KURIKULUM PEMBELAJARAN KUBERNETES
 * =================================================================
 * File ini berisi semua data terstruktur untuk seri dan episode.
 * Cukup edit file ini untuk memperbarui konten di seluruh situs.
 */
const kubernetesData = {
    beginner: [
        {
            seriesId: "b1",
            title: "Seri 1: Fondasi Kontainer & Docker",
            description: "Sebelum menyentuh Kubernetes, kita wajib paham fondasinya: kontainer. Seri ini membahas 'mengapa' kontainer ada dan cara menggunakannya dengan Docker.",
            color: "sky",
            status: "active",
            episodes: [
                {
                    id: "b1e1",
                    title: "Episode 1: Masalah Klasik 'Works on My Machine'",
                    description: "Memahami masalah utama yang diselesaikan oleh teknologi kontainer: dependensi yang berantakan dan lingkungan yang tidak konsisten.",
                    status: "available",
                    content: "content/b1e1.html"
                },
                { id: "b1e2", title: "Episode 2: Pengenalan Kontainer & Docker", description: "Mengenal konsep kontainer, perbedaannya dengan Virtual Machine (VM), dan peran Docker sebagai alat bantu utama.", status: "coming_soon", content: "Konten untuk episode 2 akan segera ditambahkan." },
                { id: "b1e3", title: "Episode 3: Praktik: Dockerfile & Image Pertama Anda", description: "Panduan langkah demi langkah menulis Dockerfile sederhana untuk membungkus sebuah aplikasi menjadi sebuah image.", status: "coming_soon", content: "Konten untuk episode 3 akan segera ditambahkan." },
                { id: "b1e4", title: "Episode 4: Batasan Skala & Kebutuhan Orkestrasi", description: "Setelah bisa membuat satu kontainer, kita akan sadar betapa sulitnya mengelola puluhan atau ratusan kontainer secara manual. Inilah jembatan menuju Kubernetes.", status: "coming_soon", content: "Konten untuk episode 4 akan segera ditambahkan." }
            ]
        },
        {
            seriesId: "b2",
            title: "Seri 2: Arsitektur & Interaksi Pertama K8s",
            description: "Selamat datang di Kubernetes! Di seri ini, kita akan membedah arsitektur klaster dan melakukan interaksi pertama menggunakan `kubectl`.",
            color: "teal",
            status: "coming_soon",
            episodes: [
                { id: "b2e1", title: "Episode 1: Arsitektur Inti: Control Plane & Worker Nodes", description: "Mengenal komponen-komponen utama seperti etcd, API Server, Scheduler (di Control Plane) dan Kubelet, Kube-proxy (di Worker Node).", status: "available", content: "Konten akan segera ditambahkan." },
                { id: "b2e2", title: "Episode 2: Instalasi Lingkungan Lokal (minikube/kind)", description: "Panduan praktis untuk menjalankan klaster Kubernetes yang berfungsi penuh di laptop Anda untuk keperluan belajar.", status: "available", content: "Konten akan segera ditambahkan." },
                { id: "b2e3", title: "Episode 3: Konfigurasi `kubectl` dan Konteks", description: "Memahami bagaimana `kubectl` bisa terhubung ke klaster Kubernetes menggunakan file `kubeconfig` dan cara berganti-ganti klaster (konteks).", status: "available", content: "Konten akan segera ditambahkan." },
                { id: "b2e4", title: "Episode 4: Perintah `kubectl` Esensial (get, describe, logs)", description: "Belajar perintah-perintah dasar yang paling sering digunakan untuk melihat dan mendiagnosis apa yang terjadi di dalam klaster.", status: "available", content: "Konten akan segera ditambahkan." }
            ]
        },
        {
            seriesId: "b3",
            title: "Seri 3: Menjalankan Aplikasi Pertama Anda",
            description: "Saatnya praktik! Kita akan belajar objek-objek fundamental Kubernetes untuk mendeploy, mengelola, dan mengekspos aplikasi sederhana.",
            color: "amber",
            status: "coming_soon",
            episodes: []
        },
    ],
    intermediate: [
        {
            seriesId: "i1",
            title: "Seri 4: Konfigurasi & Penyimpanan Data",
            description: "Aplikasi butuh konfigurasi dan seringkali butuh menyimpan data secara permanen. Seri ini membahas cara mengelola keduanya di Kubernetes.",
            color: "indigo",
            status: "coming_soon",
            episodes: [
                { title: "Episode 1: ConfigMap & Secret: Memisahkan Konfigurasi", description: "Praktik terbaik untuk mengelola data konfigurasi (seperti URL database) dan kredensial (seperti password) secara terpisah dari image kontainer.", status: "coming_soon" },
                { title: "Episode 2: Probes: Liveness, Readiness, & Startup", description: "Mengajarkan Kubernetes cara memeriksa 'kesehatan' aplikasi Anda, agar traffic tidak dikirim ke Pod yang belum siap atau rusak.", status: "coming_soon" },
                { title: "Episode 3: Volume, PersistentVolume & PVC", description: "Menyelami cara kerja penyimpanan di Kubernetes, dari volume sementara hingga penyimpanan permanen (persisten) untuk database.", status: "coming_soon" },
                { title: "Episode 4: StatefulSet: Untuk Aplikasi Stateful", description: "Jika Deployment untuk aplikasi 'biasa', StatefulSet didesain khusus untuk aplikasi yang butuh identitas jaringan dan penyimpanan yang stabil, seperti database.", status: "coming_soon" }
            ]
        },
        {
            seriesId: "i2",
            title: "Seri 5: Jaringan Tingkat Lanjut & Ingress",
            description: "Menyelami lebih dalam tentang bagaimana lalu lintas data diatur di dalam dan di luar klaster, dengan fokus pada Ingress.",
            color: "rose",
            status: "coming_soon",
            episodes: [
                { title: "Episode 1: Ingress: Gerbang Cerdas untuk Aplikasi", description: "Belajar menggunakan Ingress sebagai 'router' HTTP/S untuk mengarahkan domain (misal: app1.com, app2.com) ke Service yang berbeda di dalam klaster.", status: "coming_soon" },
                { title: "Episode 2: Praktik: Setup Ingress Controller (NGINX)", description: "Ingress hanyalah sebuah aturan. Kita butuh 'sesuatu' yang menerapkan aturan itu. Kita akan menginstal dan mengkonfigurasi Ingress Controller.", status: "coming_soon" },
                { title: "Episode 3: Network Policies: Firewall Antar Pod", description: "Secara default, semua Pod bisa berkomunikasi. NetworkPolicy memungkinkan kita membuat aturan firewall untuk membatasi komunikasi hanya ke Pod yang diizinkan.", status: "coming_soon" },
                { title: "Episode 4: Headless Service & Service Discovery", description: "Mempelajari kasus penggunaan khusus Service untuk skenario di mana kita butuh menemukan IP dari setiap Pod secara langsung, bukan melalui satu IP virtual.", status: "coming_soon" }
            ]
        }
    ],
    advanced: [
        {
            seriesId: "a1",
            title: "Seri 6: Keamanan & Tata Kelola Klaster",
            description: "Mengamankan klaster dari berbagai sisi dan menerapkan praktik terbaik untuk manajemen sumber daya dan akses pengguna.",
            color: "fuchsia",
            status: "coming_soon",
            episodes: [
                { title: "Episode 1: RBAC: Mengontrol Akses Pengguna & Service", description: "Memahami Role-Based Access Control (Role, ClusterRole, RoleBinding, ClusterRoleBinding) untuk memberikan izin secara granular.", status: "coming_soon" },
                { title: "Episode 2: ServiceAccount untuk Aplikasi", description: "Memberikan identitas dan izin yang spesifik untuk aplikasi (Pod) yang perlu berinteraksi dengan Kubernetes API.", status: "coming_soon" },
                { title: "Episode 3: Manajemen Resource: Request & Limit", description: "Cara memastikan aplikasi mendapatkan sumber daya (CPU/Memori) yang cukup dan tidak 'mengganggu' aplikasi lain dengan menetapkan batas.", status: "coming_soon" },
                { title: "Episode 4: Pod Security Standards & Admission Controllers", description: "Menerapkan kebijakan keamanan pada level klaster untuk mencegah pembuatan Pod yang tidak aman (misalnya, yang berjalan sebagai root).", status: "coming_soon" }
            ]
        },
        {
            seriesId: "a2",
            title: "Seri 7: Otomatisasi & Ekosistem",
            description: "Menjelajahi alat bantu dan pola arsitektur canggih untuk membawa operasional Kubernetes ke level selanjutnya.",
            color: "sky",
            status: "coming_soon",
            episodes: [
                { title: "Episode 1: Helm: Manajer Paket untuk Kubernetes", description: "Belajar cara membungkus, membagikan, dan mengelola aplikasi kompleks beserta semua dependensinya menggunakan Helm Charts.", status: "coming_soon" },
                { title: "Episode 2: CI/CD dengan GitOps (ArgoCD/Flux)", description: "Pengenalan konsep GitOps, di mana Git menjadi satu-satunya 'source of truth' untuk kondisi klaster yang diinginkan.", status: "coming_soon" },
                { title: "Episode 3: Monitoring dengan Prometheus & Grafana", description: "Cara mengumpulkan metrik dari klaster dan aplikasi, lalu memvisualisasikannya dalam dasbor yang informatif.", status: "coming_soon" },
                { title: "Episode 4: Memperluas API dengan CRD & Operator", description: "Puncak dari Kubernetes: belajar cara membuat 'objek' custom Anda sendiri (Custom Resource Definition) dan logika untuk mengelolanya (Operator).", status: "coming_soon" }
            ]
        }
    ]
};
