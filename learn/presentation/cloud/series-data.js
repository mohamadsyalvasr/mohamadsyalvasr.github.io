/**
 * =================================================================
 * DATA UNTUK SEMUA SERI PEMBELAJARAN
 * =================================================================
 * File ini berisi semua data terstruktur untuk seri dan episode.
 * Cukup edit file ini untuk memperbarui konten di seluruh situs.
 *
 * Struktur Data:
 * allSeriesData = {
 * "seri_X": {
 * seriesTitle: "Judul Seri",
 * seriesDescription: "Deskripsi singkat seri.",
 * color: "Warna tema (dari Tailwind)",
 * episodes: [
 * {
 * episodeNumber: 1,
 * title: "Judul Episode",
 * description: "Deskripsi singkat episode.",
 * url: "/path/ke/halaman.html", // Gunakan "#" jika belum ada
 * status: "available" atau "coming_soon"
 * },
 * // ... episode lainnya
 * ]
 * },
 * // ... seri lainnya
 * }
 */

const allSeriesData = {
  "seri_1": {
    "seriesTitle": "Konsep dan Teori Dasar",
    "seriesDescription": "Membahas 'apa' dan 'mengapa' di balik teknologi cloud, membangun fondasi yang kokoh untuk pemula.",
    "color": "sky",
    "episodes": [
      { "episodeNumber": 1, "title": "Pengantar Komputasi Awan", "description": "Memahami konsep fundamental komputasi awan, mengapa ia penting, dan bagaimana kita menggunakannya setiap hari.", "url": "#", "status": "available" },
      { "episodeNumber": 2, "title": "Model Layanan: IaaS, PaaS, SaaS", "description": "Membedah tiga model layanan utama dalam cloud menggunakan analogi 'Pizza as a Service' yang mudah dipahami.", "url": "#", "status": "available" },
      { "episodeNumber": 3, "title": "Model Deployment: Public, Private, & Hybrid", "description": "Mengenal perbedaan antara menempatkan infrastruktur di cloud publik, privat, atau menggabungkan keduanya.", "url": "#", "status": "available" },
      { "episodeNumber": 4, "title": "Manfaat & Risiko Cloud", "description": "Menganalisis keuntungan dan tantangan dalam mengadopsi teknologi komputasi awan secara mendalam.", "url": "#", "status": "available" },
      { "episodeNumber": 5, "title": "Masa Depan Cloud", "description": "Merangkum perjalanan kita dan melihat tren teknologi yang akan mendefinisikan era komputasi awan berikutnya.", "url": "#", "status": "available" }
    ]
  },
  "seri_2": {
    "seriesTitle": "Cloud dalam Praktik",
    "seriesDescription": "Melangkah lebih jauh ke aspek teknis, membahas 'bagaimana' cara kerja komponen inti di cloud.",
    "color": "teal",
    "episodes": [
      { "episodeNumber": 1, "title": "Komponen Inti: Compute, Storage, Networking", "description": "Pengenalan tiga pilar utama yang membentuk infrastruktur cloud di seluruh dunia.", "url": "#", "status": "available" },
      { "episodeNumber": 2, "title": "Praktik: Meluncurkan Server Virtual (Compute)", "description": "Pengalaman langsung meluncurkan, mengkonfigurasi, dan terhubung dengan sebuah Virtual Machine.", "url": "#", "status": "available" },
      { "episodeNumber": 3, "title": "Praktik: Menggunakan Penyimpanan Objek (Storage)", "description": "Membuat sebuah 'bucket' dan belajar cara mengunggah, mengelola, dan membagikan file di cloud.", "url": "#", "status": "available" },
      { "episodeNumber": 4, "title": "Praktik: Membangun Jaringan Dasar (Networking)", "description": "Membuat sebuah jaringan virtual sederhana untuk menghubungkan sumber daya cloud Anda.", "url": "#", "status": "available" },
      { "episodeNumber": 5, "title": "Studi Kasus: Menggabungkan Semuanya", "description": "Melihat bagaimana Compute, Storage, dan Networking bekerja sama untuk menjalankan sebuah aplikasi.", "url": "#", "status": "available" }
    ]
  },
  "seri_3": {
    "seriesTitle": "Mengenal Konsol Manajemen Cloud",
    "seriesDescription": "Membuat pengguna nyaman dan tidak tersesat saat pertama kali login ke platform cloud.",
    "color": "amber",
    "episodes": [
      { "episodeNumber": 1, "title": "Tur Singkat dan Login Pertama", "description": "Pengenalan apa itu konsol manajemen, cara login dengan aman, dan tampilan pertama dasbor utama.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Navigasi Inti: Region, Layanan, dan Pencarian", "description": "Menjelaskan konsep Region, cara menemukan layanan spesifik, dan menggunakan bar pencarian.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Mengelola Akun dan Dasbor Billing", "description": "Menunjukkan di mana menemukan informasi akun dan cara mengakses dasbor penagihan.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Melihat dan Mengelola Sumber Daya Aktif", "description": "Cara melihat daftar semua sumber daya (seperti VM atau Database) yang sedang berjalan.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_4": {
    "seriesTitle": "Dasar Keamanan: Identitas & Akses (IAM)",
    "seriesDescription": "Menanamkan konsep 'Principle of Least Privilege' (memberikan hak akses secukupnya).",
    "color": "indigo",
    "episodes": [
      { "episodeNumber": 1, "title": "Pengguna Root vs Pengguna IAM", "description": "Penjelasan risiko menggunakan akun root dan pentingnya membuat pengguna IAM terpisah.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Membuat Pengguna dan Grup IAM", "description": "Panduan langkah demi langkah membuat pengguna baru dan mengelompokkannya ke dalam grup.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Mengenal Policies (Kebijakan)", "description": "Penjelasan apa itu policy dan cara melampirkannya ke grup untuk memberikan izin.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Konsep Peran (Roles) untuk Layanan", "description": "Penjelasan apa itu role agar layanan cloud bisa berinteraksi dengan layanan lain secara aman.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 5, "title": "Wajib: Mengaktifkan Multi-Factor Authentication (MFA)", "description": "Panduan untuk mengamankan akun pengguna dengan lapisan keamanan tambahan.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_5": {
    "seriesTitle": "Manajemen Penyimpanan di Cloud",
    "seriesDescription": "Memahami perbedaan dan kasus penggunaan tiga jenis penyimpanan utama.",
    "color": "rose",
    "episodes": [
      { "episodeNumber": 1, "title": "Tiga Jenis Penyimpanan: Objek, Blok, dan File", "description": "Analogi sederhana untuk menjelaskan perbedaan fundamental antara ketiganya.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Praktik Object Storage: Membuat Bucket", "description": "Panduan membuat 'bucket' S3 (atau sejenisnya), mengunggah file, dan mengatur hak aksesnya.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Praktik Block Storage: Menambah 'Hard Drive' ke VM", "description": "Menunjukkan cara membuat volume penyimpanan blok dan melampirkannya ke sebuah VM.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Studi Kasus: Kapan Harus Menggunakan yang Mana?", "description": "Memberikan contoh kasus penggunaan untuk website statis, disk OS, dan penyimpanan tim.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_6": {
    "seriesTitle": "Jaringan Virtual di Cloud",
    "seriesDescription": "Mengerti cara kerja jaringan privat yang terisolasi di dalam infrastruktur cloud.",
    "color": "fuchsia",
    "episodes": [
      { "episodeNumber": 1, "title": "Apa itu Virtual Private Cloud (VPC)?", "description": "Analogi VPC sebagai jaringan kantor pribadi Anda di cloud yang terisolasi dari pengguna lain.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Subnet: Membagi Jaringan (Publik vs Privat)", "description": "Perbedaan krusial antara subnet yang bisa diakses internet dan yang terisolasi.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Route Table & Internet Gateway: Pintu ke Internet", "description": "Penjelasan bagaimana sumber daya di dalam VPC dapat terhubung ke internet.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Firewall Virtual: Pengenalan Security Groups", "description": "Konsep Security Group sebagai satpam/firewall yang melekat pada setiap VM.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 5, "title": "Arsitektur Sederhana: Web Server di Subnet Publik", "description": "Menggambar dan menjelaskan diagram sederhana sebuah VM web server di subnet publik.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_7": {
    "seriesTitle": "Pengenalan Database di Cloud",
    "seriesDescription": "Memahami pilihan utama saat membutuhkan database untuk aplikasi Anda.",
    "color": "sky",
    "episodes": [
      { "episodeNumber": 1, "title": "Pilihan Kunci: IaaS vs PaaS Database", "description": "Perbandingan antara menginstal database sendiri di VM dengan menggunakan layanan terkelola.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Skenario IaaS: Menginstal Database di VM", "description": "Menjelaskan tanggung jawab penuh yang harus diemban (instalasi, patching, backup).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Skenario PaaS: Layanan Database Terkelola", "description": "Menunjukkan kemudahan membuat database dan fitur-fitur otomatisnya (backup, failover).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Sekilas tentang Relasional vs NoSQL", "description": "Pengenalan singkat tentang dua tipe database utama dan kapan harus mempertimbangkannya.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_8": {
    "seriesTitle": "Otomatisasi Dasar dengan CLI & SDK",
    "seriesDescription": "Bekerja lebih efisien di cloud tanpa harus selalu mengklik di konsol web.",
    "color": "teal",
    "episodes": [
      { "episodeNumber": 1, "title": "Kenapa Harus Otomatis? Batasan Konsol Web", "description": "Menjelaskan kapan klik-klik di konsol menjadi tidak efisien dan membosankan.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Instalasi dan Konfigurasi CLI", "description": "Panduan setup Command Line Interface (CLI) di komputer lokal Anda.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Perintah CLI Pertama Anda", "description": "Menjalankan perintah dasar seperti melihat daftar VM atau bucket penyimpanan dari terminal.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Apa itu SDK? Otomatisasi dengan Kode", "description": "Pengenalan konsep SDK dan contoh singkat penggunaannya di bahasa skrip seperti Python.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_9": {
    "seriesTitle": "Memahami Biaya dan Anggaran Cloud",
    "seriesDescription": "Mengelola pengeluaran cloud Anda agar tidak membengkak dan sesuai anggaran.",
    "color": "amber",
    "episodes": [
      { "episodeNumber": 1, "title": "Model Harga Pay-As-You-Go dan Free Tier", "description": "Memahami cara kerja penagihan dan cara memaksimalkan kuota gratis dari provider.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Menjelajahi Dasbor Billing & Cost Explorer", "description": "Panduan membaca tagihan dan menganalisis sumber biaya terbesar di akun Anda.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Wajib Tahu: Membuat Notifikasi Anggaran", "description": "Langkah-langkah membuat alarm yang akan memberi notifikasi jika pengeluaran mendekati batas.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Tips Sederhana Menghemat Biaya", "description": "Praktik dasar seperti mematikan sumber daya yang tidak terpakai dan memilih region.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_10": {
    "seriesTitle": "Monitoring & Logging Dasar",
    "seriesDescription": "Belajar melihat 'kesehatan' sumber daya dan mencari jejak jika terjadi masalah.",
    "color": "indigo",
    "episodes": [
      { "episodeNumber": 1, "title": "Membaca Metrik: Apa itu Monitoring?", "description": "Melihat grafik CPU, RAM, dan I/O dari sebuah VM untuk memahami 'kesehatan'nya.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Membaca Log: Mencari Jejak Kejadian", "description": "Menemukan dan membaca log dasar dari sebuah aplikasi atau sistem operasi.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Membuat Alarm Sederhana", "description": "Mengatur notifikasi otomatis jika metrik melebihi ambang batas (misal: CPU di atas 80%).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Konsep Log Terpusat", "description": "Pengenalan singkat mengapa mengumpulkan semua log di satu tempat itu penting.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_11": {
    "seriesTitle": "Pengenalan Arsitektur Cloud",
    "seriesDescription": "Mulai berpikir seperti arsitek cloud untuk membangun solusi yang andal dan tangguh.",
    "color": "rose",
    "episodes": [
      { "episodeNumber": 1, "title": "Masalah Satu Server: Single Point of Failure", "description": "Menjelaskan mengapa menaruh semua pada satu VM itu berisiko tinggi.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Konsep High Availability", "description": "Menggunakan lebih dari satu server di lokasi berbeda untuk mencegah downtime.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Konsep Scalability", "description": "Perbedaan antara menambah kekuatan server (vertikal) vs menambah jumlah server (horizontal).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Konsep Decoupling: Menggunakan Antrian Pesan", "description": "Pengenalan tingkat tinggi tentang bagaimana layanan bisa berkomunikasi tanpa terhubung langsung.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_12": {
    "seriesTitle": "Proyek: Hosting Website Statis",
    "seriesDescription": "Menggabungkan semua yang telah dipelajari dalam sebuah proyek nyata dari awal hingga akhir.",
    "color": "fuchsia",
    "episodes": [
      { "episodeNumber": 1, "title": "Perencanaan Proyek dan Arsitektur", "description": "Menentukan tujuan dan menggambar arsitektur sederhana (HTML di Object Storage).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Menyiapkan Bucket untuk Web Hosting", "description": "Konfigurasi sebuah bucket di Object Storage agar bisa berfungsi sebagai web server.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Mengunggah Konten Website", "description": "Menyiapkan file index.html sederhana dan mengunggahnya ke bucket.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Mempercepat dengan Content Delivery Network (CDN)", "description": "Menambahkan layanan CDN di depan bucket untuk distribusi konten yang lebih cepat.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 5, "title": "Bonus: Menggunakan Domain Kustom", "description": "Menghubungkan website dengan nama domain yang Anda miliki.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_13": {
    "seriesTitle": "Fokus Komputasi: Virtual Machines",
    "seriesDescription": "Menyelami layanan komputasi paling fundamental di cloud secara lebih mendalam.",
    "color": "sky",
    "episodes": [
      { "episodeNumber": 1, "title": "Anatomi Sebuah VM", "description": "Membedah komponen: vCPU, RAM, Storage, dan Machine Image (AMI).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Meluncurkan VM Windows", "description": "Panduan langkah demi langkah meluncurkan server Windows dari awal.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Meluncurkan VM Linux", "description": "Panduan langkah demi langkah meluncurkan server Linux dari awal.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Terhubung dengan VM Anda (RDP & SSH)", "description": "Cara mengakses desktop Windows (RDP) dan terminal Linux (SSH) dengan aman.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 5, "title": "Snapshot & Backup", "description": "Cara membuat cadangan dari VM Anda untuk pemulihan bencana.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_14": {
    "seriesTitle": "Dasar Keamanan: Jaringan",
    "seriesDescription": "Melindungi lalu lintas data Anda dengan 'firewall' virtual di cloud.",
    "color": "teal",
    "episodes": [
      { "episodeNumber": 1, "title": "Lapisan Keamanan Jaringan", "description": "Mengapa keamanan jaringan penting selain keamanan identitas (IAM).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Praktik Security Groups", "description": "Membuat dan mengkonfigurasi aturan untuk mengizinkan lalu lintas web (HTTP/HTTPS) ke VM.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Pengenalan Network ACLs (NACLs)", "description": "Perbedaan antara NACL (firewall untuk subnet) dan Security Groups (firewall untuk VM).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 4, "title": "Skenario Umum: Mengamankan Web Server", "description": "Konfigurasi gabungan Security Group dan NACL untuk melindungi sebuah web server.", "url": "#", "status": "coming_soon" }
    ]
  },
  "seri_15": {
    "seriesTitle": "Pengenalan Konsep Serverless",
    "seriesDescription": "Menulis dan menjalankan kode tanpa perlu pusing memikirkan manajemen server.",
    "color": "amber",
    "episodes": [
      { "episodeNumber": 1, "title": "Apa Artinya 'Tanpa Server'?", "description": "Penjelasan evolusi dari VM ke Fungsi dan keuntungan utama dari model Function-as-a-Service (FaaS).", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 2, "title": "Membuat Fungsi 'Hello World' Pertama", "description": "Panduan singkat menulis beberapa baris kode dan mendeploynya sebagai fungsi cloud.", "url": "#", "status": "coming_soon" },
      { "episodeNumber": 3, "title": "Kapan Serverless Menjadi Pilihan Tepat?", "description": "Contoh kasus penggunaan ideal seperti pemrosesan data, backend API, atau tugas terjadwal.", "url": "#", "status": "coming_soon" }
    ]
  }
};
