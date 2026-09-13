# 🚀 Web Portofolio Siswa - Goldie Gladwin (SMKN 1 Pasuruan)

Portofolio web modern, responsif, dan interaktif yang dibangun menggunakan **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Proyek ini dikembangkan untuk memenuhi standar tugas dan modul kejuruan RPL (*Rekayasa Perangkat Lunak*), mencakup implementasi **Dynamic Routing**, **SearchParams URL Filtering**, **Tailwind Styling**, serta struktur komponen modular.

---

## 📌 Ringkasan Pemenuhan Tugas Modul

| No | Kriteria Tugas Modul | Status | Keterangan Implementasi |
|:---|:---|:---:|:---|
| 1 | **Styling Tailwind CSS** | ✅ Selesai | Desain responsif (*mobile-first*), dark/light mode toggle, glassmorphism, dan utility layout. |
| 2 | **Dynamic Route (`project/[id]`)** | ✅ Selesai | Folder `src/app/project/[id]` & `src/app/proyek/[id]` dengan *async params* Next.js 15 & 404 handler. |
| 3 | **SearchParams (`category`)** | ✅ Selesai | Halaman katalog `src/app/project` & `src/app/proyek` dengan filter kategori URL query string. |
| 4 | **Penambahan Components** | ✅ Selesai | Pemisahan modular (Nav, Hero, About, Skills, Projects, Experience, Testimonials, Contact, Footer, Counter). |
| 5 | **Fitur Interaktif & 404 Page** | ✅ Selesai | Custom `not-found.tsx`, Counter Apresiasi interaktif, form kontak EmailJS. |
| 6 | **Dokumentasi Lengkap README.md** | ✅ Selesai | Dokumentasi fitur, styling, komponen, dan rute dinamis secara mendalam. |

---

## 🌟 1. Dokumentasi Penambahan Fitur (Features)

### A. Rute Dinamis Proyek (`project/[id]` & `projects/[slug]`)
* Memungkinkan setiap proyek memiliki halaman detail spesifik yang diakses berdasarkan identifier unik (`id` numerik seperti `/project/1` maupun `slug` semantik seperti `/project/management-siswa`).
* Menerapkan standar terbaru **Next.js 15+** di mana `params` diakses secara *asynchronous* (`await params`).
* Dilengkapi dengan fungsi `notFound()` untuk mengarahkan pengguna secara otomatis ke halaman error kustom jika ID proyek tidak valid.

### B. Filter Katalog Berbasis `searchParams` (`/project?category=...`)
* Halaman katalog karya kejuruan pada rute `/project` dan `/proyek` mendukung penyaringan dinamis menggunakan URL Query String (`searchParams`).
* Kategori yang tersedia: `Semua`, `Web`, `Mobile`, dan `IoT`.
* Bersifat *Server Component friendly* sehingga tidak memerlukan JavaScript berlebih di client untuk filter data; URL dapat di-share langsung dengan status filter yang aktif.

### C. Komponen Interaktif: Counter Apresiasi Siswa (`CounterApresiasi.tsx`)
* Komponen interaktif *Client Component* (`'use client'`) yang memberikan kesempatan bagi pengunjung/guru/evaluator untuk memberikan apresiasi karya portofolio secara real-time.
* Dilengkapi animasi tombol, audio-feedback visual, dan perhitungan jumlah apresiasi.

### D. Halaman 404 Kustom (`not-found.tsx`)
* Terletak di `src/app/not-found.tsx` untuk menangani URL salah atau proyek yang tidak ditemukan.
* Tampilan ramah pengguna dengan tombol navigasi cepat untuk kembali ke Beranda (*Back to Home*).

### E. Integrasi Formulir Kontak Fungsional (EmailJS)
* Menghubungkan input nama, email, subjek, dan pesan langsung ke Gmail melalui API EmailJS tanpa perlu backend server terpisah.
* Dilengkapi notifikasi status pengiriman sukses atau gagal.

### F. Dark & Light Mode Theme Switcher
* Menggunakan pustaka `next-themes` untuk perpindahan tema instan yang tersinkronisasi dengan preferensi sistem operasi pengguna.

---

## 🎨 2. Dokumentasi Styling Tailwind CSS

Proyek ini memaksimalkan fleksibilitas **Tailwind CSS** untuk menciptakan antarmuka yang bersih, elegan, dan profesional:

1. **Mobile-First Responsive Design:**
   * Breakpoint dimanfaatkan secara konsisten di seluruh layout:
     * `sm:` (640px) untuk tablet portrait & ponsel lanskap.
     * `md:` (768px) untuk tata letak 2 kolom kartu dan navigasi.
     * `lg:` & `xl:` (1024px / 1280px) untuk tata letak multi-kolom desktop dan container terpusat (`mx-auto max-w-6xl`).
2. **Glassmorphism & Surface Elevation:**
   * Penggunaan class seperti `backdrop-blur-md`, `bg-white/80`, `dark:bg-gray-800/80`, serta border halus `border-slate-200/80` dan `shadow-xl` untuk kedalaman visual yang modern.
3. **Palet Warna Harmonis & Dark Mode:**
   * Tema terang: Menggunakan slate/gray dengan aksen *indigo-600* dan *emerald-500*.
   * Tema gelap: Menggunakan `dark:bg-gray-900`, `dark:text-white`, dan ring aksen `dark:ring-indigo-800/60`.
4. **Micro-Interactions & Animations:**
   * Efek hover dinamis: `hover:scale-105`, `hover:-translate-y-1`, `transition-all duration-300`.
   * Integrasi pustaka AOS (*Animate On Scroll*) melalui komponen pembantu `AosInitializer.tsx`.

---

## 🧩 3. Dokumentasi Struktur & Penambahan Komponen

Struktur direktori kode dikelompokkan secara modular di dalam folder `src/components/`:

```text
src/
├── app/
│   ├── layout.tsx                     # Root layout aplikasi (Navbar, Footer, Providers)
│   ├── page.tsx                       # Halaman utama (One-Page Scroll Sections)
│   ├── not-found.tsx                  # Halaman 404 kustom
│   ├── project/
│   │   ├── page.tsx                   # Katalog proyek dengan filter searchParams
│   │   └── [id]/
│   │       └── page.tsx               # Rute Dinamis Detail Proyek (ID / Slug)
│   ├── proyek/                        # Rute bahasa Indonesia (alias modul)
│   └── projects/                      # Rute showcase komprehensif
├── components/
│   ├── CounterApresiasi.tsx           # Komponen interaktif apresiasi karya
│   ├── helper/
│   │   ├── AosInitializer.tsx         # Inisialisasi animasi AOS (Client)
│   │   ├── Logo.tsx                   # Identitas logo portofolio
│   │   ├── SectionHeading.tsx         # Judul seragam tiap section
│   │   └── ThemeToggler.tsx           # Tombol toggle dark/light theme
│   ├── Home/
│   │   ├── Navbar/                    # Navigasi sticky, burger menu & tombol CV
│   │   ├── Hero/                      # Section pembuka, bio singkat, & social link
│   │   ├── About/                     # Biografi lengkap, highlight, & CounterApresiasi
│   │   ├── Skills/                    # Tampilan kategori skill (Frontend, Backend, Tools)
│   │   ├── Project/                   # Grid proyek pilihan & tombol rute dinamis
│   │   │   ├── Projects.tsx           # Container section proyek
│   │   │   └── projectcard.tsx        # Kartu proyek dengan link ke /project/[id]
│   │   ├── Experience/                # Riwayat pendidikan & pengalaman kejuruan
│   │   ├── ClientRiview/              # Testimoni & ulasan rekan proyek
│   │   ├── contact/                   # Formulir EmailJS & kartu info kontak
│   │   └── Footer/                    # Footer penutup & hak cipta
│   └── ui/                            # Primitif UI (Button dengan varian Shadcn)
└── data.ts                            # Sumber data terpusat (Proyek, Skill, Edukasi)
```

---

## 🛣️ 4. Dokumentasi Rute Dinamis `project/[id]`

Rute dinamis diimplementasikan pada file:
👉 **[`src/app/project/[id]/page.tsx`](file:///d:/project%20rpl/next%20js%20kali/nextjs-portofolio/src/app/project/[id]/page.tsx)**

### Cara Kerja:
1. **Async Params Resolution (Next.js 15 Standard):**
   ```typescript
   interface ProjectDetailPageProps {
     params: Promise<{ id: string }>;
   }

   export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
     const { id } = await params;
     const project = projects.find((p) => p.id === id || p.slug === id);
     
     if (!project) {
       notFound(); // Memanggil 404 page secara otomatis jika data tidak ada
     }
     // ... render tampilan detail proyek
   }
   ```
2. **Pencarian Data Fleksibel:**
   Mendukung pencarian baik berdasarkan nomor urut ID (`/project/1`, `/project/2`) maupun slug teks (`/project/management-siswa`).
3. **Data yang Ditampilkan pada Halaman Dinamis:**
   * Badge Kategori Proyek (`kategori` / `category`).
   * Judul Proyek & Route ID aktif.
   * Gambar Cover Proyek dengan rasio responsif 16:9.
   * Penjelasan Latar Belakang Masalah & Solusi Proyek.
   * Daftar Fitur Unggulan (*Key Architectural Highlights*).
   * Badge Teknologi (*Tech Stack Chips*) yang digunakan.
   * Tombol Live Demo, Source Code GitHub, dan navigasi kembali.

---

## 💻 5. Panduan Instalasi & Menjalankan Proyek

### Prasyarat:
* **Node.js**: Versi 18.18 atau lebih baru.
* **NPM**, **Yarn**, atau **PNPM**.

### Langkah Instalasi:

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/GoldieGladwin/Portofolio-goldie.git
   cd nextjs-portofolio
   ```

2. **Install seluruh dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (Opsional untuk Form Kontak):**
   Buat file `.env.local` pada direktori root project:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Pengujian Build Produksi:**
   ```bash
   npm run build
   npm run start
   ```

---

## 👨‍💻 Profil Pengembang

* **Nama:** Goldie Gladwin
* **Sekolah:** SMKN 1 Pasuruan (Jurusan Rekayasa Perangkat Lunak / RPL)
* **GitHub:** [@GoldieGladwin](https://github.com/GoldieGladwin)
* **Status Proyek:** Tugas Modul Pemrograman Web Next.js Selesai & Terverifikasi ✅
