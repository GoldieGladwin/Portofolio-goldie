# 🚀 Web Portofolio Siswa - Goldie Gladwin (SMKN 1 Pasuruan)

Portofolio web modern, responsif, dan interaktif yang dibangun menggunakan **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Proyek ini dikembangkan untuk memenuhi standar tugas dan modul kejuruan RPL (*Rekayasa Perangkat Lunak*), mencakup implementasi **Dynamic Routing**, **SearchParams URL Filtering**, **Tailwind Styling**, serta struktur komponen modular.

---

## 📌 Ringkasan Pemenuhan Tugas Modul

| No | Kriteria Tugas Modul | Status | Keterangan Implementasi |
|:---|:---|:---:|:---|
| 1 | **Styling Tailwind CSS** | ✅ Selesai | Desain responsif (*mobile-first*), dark/light mode toggle, glassmorphism, dan utility layout. |
| 2 | **Dynamic Route (`proyek/[id]`)** | ✅ Selesai | Folder `src/app/proyek/[id]` dengan *async params* Next.js 15+ & 404 handler. |
| 3 | **SearchParams (`category`)** | ✅ Selesai | Halaman katalog `src/app/proyek` dengan filter kategori URL query string. |
| 4 | **Penambahan Components** | ✅ Selesai | Pemisahan modular (Nav, Hero, About, Skills, Projects, Experience, Testimonials, Contact, Footer, Counter). |
| 5 | **Fitur Interaktif & 404 Page** | ✅ Selesai | Custom `not-found.tsx`, Counter Apresiasi interaktif, form kontak Web3Forms/EmailJS. |
| 6 | **Dokumentasi Lengkap README.md** | ✅ Selesai | Dokumentasi fitur, styling, komponen, Supabase, dan CMS CRUD secara mendalam. |
| 7 | **Database Supabase (Proyek & Road Experience)** | ✅ Selesai | Cloud database PostgreSQL untuk data Proyek dan Road Pengalaman (`Experience.tsx`) dinamis dengan fallback data. |
| 8 | **Admin Panel & Secret Doorpass** | ✅ Selesai | Proteksi pintu rahasia URL (`/admin?doorpass=...`), Supabase Auth & verifikasi tabel `profiles` role admin. |
| 9 | **Studio Live CMS & Full CRUD** | ✅ Selesai | Mode Live visual homepage & mode tabel untuk Create, Read, Update, Delete data Proyek & Pengalaman secara instan. |
| 10 | **Tautan Live Deploy Proyek (`link_deploy`)** | ✅ Selesai | Kolom `link_deploy` pada Supabase dan tombol "Kunjungi Proyek" langsung ke link demo produksi di `/proyek`. |

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
│   ├── proyek/
│   │   ├── page.tsx                   # Katalog proyek (Supabase + filter searchParams)
│   │   └── [id]/
│   │       └── page.tsx               # Rute Dinamis Detail Proyek (ID / Slug dari Supabase)
│   ├── tentang/                       # Rute standar modul (mengarah ke detail About)
│   ├── keahlian/                      # Rute standar modul (mengarah ke section Skills)
│   └── kontak/                        # Rute standar modul (mengarah ke section Contact)
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
│   │   │   ├── Projects.tsx           # Container section proyek (terhubung ke /proyek)
│   │   │   └── projectcard.tsx        # Kartu proyek dengan link ke /proyek/[id]
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

3. **Konfigurasi Environment Variables (Supabase & Kontak):**
   Buat file `.env.local` pada direktori root project (gunakan `.env.example` sebagai referensi):
   ```env
   # Supabase Cloud Database (Pertemuan 03)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key-here

   # EmailJS Form Kontak (Opsional)
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

## 🗄️ 6. Dokumentasi Integrasi Supabase Database (Modul Pertemuan 03)

Proyek ini telah terhubung ke cloud database **PostgreSQL** yang disediakan oleh **Supabase (Backend as a Service)** melalui pustaka resmi `@supabase/supabase-js`.

### A. Tabel Utama: `proyek`
Tabel ini menyimpan data karya dan proyek portofolio yang sebelumnya bersifat statis di kode program, kini diambil secara dinamis melalui Server Component.

| Nama Kolom | Tipe Data PostgreSQL | Constraint / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT` | Primary Key, Auto-increment (`GENERATED BY DEFAULT AS IDENTITY`) |
| `created_at` | `TIMESTAMPTZ` | Default: `now()`, Waktu pencatatan data |
| `judul` | `TEXT` | NOT NULL, Nama / judul karya proyek |
| `deskripsi` | `TEXT` | NOT NULL, Ringkasan penjelasan proyek |
| `teknologi` | `TEXT` | NOT NULL, Daftar teknologi dipisah koma (misal: "Next.js, Tailwind CSS") |
| `link` | `TEXT` | Nullable, Tautan repository GitHub atau demo proyek |
| `kategori` | `TEXT` | Default: `'Web'`, Kategori karya (`Web`, `Mobile`, `IoT`) |
| `image` | `TEXT` | Path gambar thumbnail proyek (misal: `'/images/managemens.png'`) |
| `role` | `TEXT` | Peran pengembang dalam proyek |

### B. Keamanan & Kebijakan Akses (Row Level Security / RLS)
* **Tabel `proyek`:** Menggunakan RLS dengan SELECT policy `"Enable read access for all users"` sesuai instruksi modul.
* **Tabel `pengalaman`:** RLS dinonaktifkan (`DISABLE ROW LEVEL SECURITY`) untuk akses cepat dan langsung tanpa batasan policy.

### C. Halaman Implementasi Supabase
1. **`/proyek`**: Halaman katalog karya kejuruan standar Modul Pertemuan 02 & 03 yang mengambil data langsung dari Supabase disertai fitur filter kategori `searchParams` (`Semua`, `Web`, `Mobile`, `IoT`).
2. **`/proyek/[id]`**: Detail proyek dinamis (`await params` Next.js 15+) yang mengambil data spesifik dari Supabase dan menangani kondisi ID tidak terdaftar dengan `notFound()`.
3. **`/#experience` (`Experience.tsx`)**: Timeline Road Pengalaman & Pendidikan dinamis berbasis data tabel `pengalaman` Supabase.

### D. Tabel Tambahan: `pengalaman` (Road Experience & Education Dinamis)
Tabel ini mengelola linimasa perjalanan karir, proyek independen, dan pendidikan kejuruan yang tampil pada komponen `Experience.tsx` di Beranda:

| Nama Kolom | Tipe Data PostgreSQL | Constraint / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT` | Primary Key, Auto-increment (`GENERATED BY DEFAULT AS IDENTITY`) |
| `created_at` | `TIMESTAMPTZ` | Default: `now()`, Waktu pencatatan riwayat |
| `tipe` | `TEXT` | Default: `'work'`, Jenis aktivitas (`'work'`, `'project'`, atau `'education'`) untuk penentuan ikon otomatis |
| `judul` | `TEXT` | NOT NULL, Posisi / Role pengalaman |
| `perusahaan` | `TEXT` | NOT NULL, Institusi / Perusahaan / Sekolah |
| `periode` | `TEXT` | NOT NULL, Rentang waktu (misal: "2025 - Present") |
| `deskripsi` | `TEXT` | NOT NULL, Ringkasan tanggung jawab dan pencapaian |
| `teknologi` | `TEXT` | NOT NULL, Daftar tech stack dipisah koma (misal: "Next.js, React, Supabase") |

#### 🛣️ Mekanisme "Road Experience" di Paling Bawah:
* **Pengurutan Kronologis:** Query diatur menggunakan `.order('id', { ascending: true })`.
* **Auto-Append:** Setiap baris baru yang di-input via Supabase Table Editor otomatis mendapatkan ID yang lebih besar, sehingga kartu dan simpul (node) timeline baru otomatis dirender di **bagian paling bawah garis road**, membentuk alur perjalanan karir yang berkesinambungan.
* **Resilient Fallback:** Jika koneksi Supabase terputus, komponen secara cerdas menggunakan data fallback lokal dari `src/data.ts`.

---

## 🔐 7. Dokumentasi Admin Panel, Live Studio CMS & Full CRUD (Modul Pertemuan 04)

Proyek ini telah dilengkapi dengan sistem administrasi konten (**CMS - Content Management System**) lengkap dengan proteksi keamanan ganda, antarmuka visual ganda (*Live Studio Mirror* & *Table Mode*), serta Server Actions untuk operasi **CRUD (Create, Read, Update, Delete)** data Proyek dan Road Pengalaman:

### A. Sistem Keamanan "Secret Doorpass" (`src/middleware.ts` & `src/lib/doorpass.ts`)
* **Auto 404 Cloaking:** Siapapun pengunjung yang mencoba mengakses rute `/admin`, `/admin/login`, atau `/admin/proyek` secara langsung tanpa kunci akan otomatis menerima **HTTP 404 Not Found**, sehingga rute panel admin tersembunyi dari publik dan bot pemindai.
* **Membuka Pintu (Doorpass Unlock):** Admin membuka akses dengan menambahkan parameter URL rahasia:
  ```text
  http://localhost:3000/admin?doorpass=figmap
  ```
* **Mekanisme Kerja:**
  1. Middleware mendeteksi query `doorpass` yang sesuai dengan `process.env.ADMIN_DOORPASS`.
  2. Middleware menetapkan cookie terenkripsi `admin_doorpass_unlocked=true` (`httpOnly`, `sameSite: 'lax'`).
  3. Pengguna dialihkan secara rapi ke halaman `/admin/login` (parameter doorpass otomatis dibersihkan dari bilah URL).

### B. Autentikasi Supabase & Role-Based Access Control (RBAC)
* Setelah pintu terbuka, admin **wajib login manual** dengan Email dan Password yang terdaftar di **Supabase Auth**.
* **Verifikasi Dua Lapis:** Sistem memeriksa tabel relasional `public.profiles` di Supabase untuk memastikan akun memiliki atribut `role = 'admin'`. Jika bukan admin, akses ditolak dan sesi otomatis di-logout.
* **Logout Terpadu:** Tombol Logout di navbar admin menghapus seluruh sesi Supabase Auth, menghapus cookie `admin_doorpass_unlocked`, dan mengembalikan pintu admin ke status terkunci rapat (kembali 404).

### C. Antarmuka Studio Live CMS (`src/app/admin/proyek/ProyekTableClient.tsx`)
Panel admin menyediakan dua mode pengalaman pengguna yang dapat dialihkan secara instan:
1. **Mode Live Studio (Homepage Duplication):**
   * Mereplikasi tampilan homepage publik secara interaktif.
   * Dilengkapi bilah aksi melayang (*Floating Action Bar*) untuk **+ Tambah Proyek** dan **+ Tambah Pengalaman**.
   * Pada setiap kartu proyek dan simpul timeline riwayat, tersedia tombol cepat **Edit (Ikon Pensil)** dan **Hapus (Ikon Tong Sampah)**.
2. **Mode Tabel Klasik:**
   * Tampilan tabel data ringkas dan responsif untuk pemindaian cepat puluhan item data secara terstruktur.

### D. Fitur Operasi CRUD Lengkap (Next.js Server Actions)
Operasi database dikelola melalui Next.js Server Actions di `src/app/admin/proyek/actions.ts`:
1. **Tambah Proyek (`tambahProyekAction`):** Form modal interaktif untuk Judul, Kategori (`Web`, `Mobile`, `IoT`), Deskripsi, Teknologi, Link GitHub, dan Link Deploy.
2. **Edit Proyek (`editProyekAction`):** Modal edit dengan data yang otomatis terisi sesuai ID baris yang dipilih.
3. **Hapus Proyek (`hapusProyekAction`):** Modal konfirmasi pengamanan dengan peringatan visual bahaya sebelum data benar-benar dihapus.
4. **Tambah Pengalaman (`tambahPengalamanAction`):** Form modal untuk Tipe (`work`, `project`, `education`), Posisi/Role, Perusahaan/Sekolah, Periode, Deskripsi, dan Teknologi.
5. **Edit Pengalaman (`editPengalamanAction`):** Memperbarui linimasa karir secara langsung.
6. **Hapus Pengalaman (`hapusPengalamanAction`):** Konfirmasi penghapusan riwayat pengalaman.
* **Instant Revalidation:** Setiap operasi memicu `revalidatePath('/admin/proyek')`, `revalidatePath('/proyek')`, dan `revalidatePath('/')` sehingga data terbaru langsung tersinkronisasi di seluruh halaman web tanpa delay.

### E. Dukungan Kolom `link_deploy` (Live Deploy Kunjungi Proyek)
* Menambahkan kolom `link_deploy TEXT` pada tabel Supabase `proyek`.
* Menampilkan tombol **"Kunjungi Proyek" (ExternalLink)** pada katalog `/proyek` untuk proyek-proyek yang memiliki tautan demo produksi aktif.

---

## 🚀 8. Catatan Pembaruan & Refactoring Terbaru (Changelog)

Berikut rincian optimasi dan pembaruan menyeluruh yang telah diterapkan:

1. **Unifikasi & Penyelarasan Rute Sesuai Standar Modul 1, 2, dan 3:**
   * Menyelaraskan seluruh rute katalog ke **`/proyek`** dan rute detail dinamis ke **`/proyek/[id]`** (bahasa Indonesia resmi modul).
   * Memindahkan logika filter kategori `searchParams` (`Semua`, `Web`, `Mobile`, `IoT`) dan pembacaan `await params` Next.js 15+ ke rute `/proyek`.
   * Menambahkan rute fallback terpadu: `/tentang`, `/keahlian`, `/kontak`, dan `/about` agar penguji yang mengetik URL langsung di address bar tidak mengalami error 404.

2. **Pembersihan Folder & Halaman Unused / Redundan:**
   * **`src/app/projects/detailproject` [DIHAPUS]:** Menghapus halaman mockup vertikal statis lama yang tidak lagi dipakai.
   * **`src/app/test-supabase` [DIHAPUS]:** Menghapus halaman uji coba sementara Step 9 Modul 3 setelah integrasi database Supabase terbukti aktif dan terintegrasi langsung di halaman utama.
   * **`src/app/project` [DIHAPUS]:** Menghapus folder duplikat bahasa Inggris setelah fiturnya disatukan seutuhnya ke `src/app/proyek`.

3. **Implementasi Admin Panel & Secret Doorpass Keamanan Ganda (Modul 4):**
   * Menyematkan middleware pelindung berbasis doorpass secret (`ADMIN_DOORPASS`) yang secara default menyembunyikan rute `/admin` dengan status 404 Cloaking.
   * Menghubungkan alur login ke Supabase Authentication dan verifikasi role `'admin'` di tabel `profiles`.
   * Membangun antarmuka Studio Live CMS dengan visual homepage preview ganda dan mode tabel cepat di `/admin/proyek`.
   * Implementasi Server Actions untuk Full CRUD (Create, Read, Update, Delete) pada tabel `proyek` dan `pengalaman` beserta revalidasi cache instan.
   * Menambahkan fitur tautan `link_deploy` dengan tombol "Kunjungi Proyek" di katalog `/proyek`.

4. **Redesain Splash Screen Bertema Putih & Monogram `G.G`:**
   * Mengubah splash screen menjadi bertema **putih bersih (*clean light mode*)** dengan tipografi minimalis **`G.G`** (font tebal dengan titik pemisah beraksen indigo yang berkedip halus).
   * Menambahkan **loading bar horizontal** di bawah teks yang terisi secara mulus dari `0%` ke `100%` (~0.8 detik) dilengkapi efek shimmer gradien.
   * Menerapkan efek transisi **tirai pembuka ditarik atas & bawah (*Vertical Split Curtain Reveal*)** dengan akselerasi GPU (`cubic-bezier(0.77, 0, 0.175, 1)`), memberikan kesan panggung teater yang dramatis saat homepage terbuka.
   * Dilengkapi fail-safe timeout mutlak agar scrollbar dan konten halaman selalu terbuka lancar di semua peramban.

5. **Peningkatan Responsivitas Mobile, Navigasi Pintar & Stabilitas 3D Lanyard:**
   * Menyesuaikan ukuran tombol *Download CV* dan elemen header agar proporsional pada viewport smartphone (375px), bebas dari *horizontal overflow*.
   * Mengintegrasikan deteksi rute otomatis pada `ResponsiveNav` agar navbar publik secara elegan disembunyikan saat pengguna berada di area panel admin atau halaman 404 kustom.
   * Memastikan kartu 3D interaktif **Lanyard** termuat langsung secara stabil dan dapat diinteraksikan secara langsung di section About Me.
   * Merapikan skema database SQL (`supabase_schema.sql`) untuk eksekusi one-click di Supabase SQL Editor.
   * Memastikan seluruh proyek lolos kompilasi produksi `npm run build` dengan status **Exit Code 0**.

---

## 👨‍💻 Profil Pengembang

* **Nama:** Goldie Gladwin
* **Sekolah:** SMKN 1 Pasuruan (Jurusan Rekayasa Perangkat Lunak / RPL)
* **GitHub:** [@GoldieGladwin](https://github.com/GoldieGladwin)
* **Status Proyek:** Tugas Modul Pemrograman Web Next.js Selesai & Terverifikasi ✅
