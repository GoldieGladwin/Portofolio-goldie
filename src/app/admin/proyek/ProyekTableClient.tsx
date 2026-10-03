'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
  Eye,
  Settings,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Check,
  RefreshCw
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Komponen Homepage untuk Live Duplikasi
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import ClientRiview from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import SectionHeading from '@/components/common/SectionHeading';

// Server Actions
import {
  tambahProyekAction,
  editProyekAction,
  hapusProyekAction,
  tambahPengalamanAction,
  editPengalamanAction,
  hapusPengalamanAction,
} from './actions';

export type ProyekItem = {
  id: number | string;
  judul: string;
  deskripsi: string;
  teknologi: string;
  link: string | null;
  link_deploy?: string | null;
  kategori?: string | null;
  image?: string | null;
  role?: string | null;
  created_at?: string;
};

export type PengalamanItem = {
  id: number | string;
  tipe: string;
  judul: string;
  perusahaan: string;
  periode: string;
  deskripsi: string;
  teknologi: string;
  created_at?: string;
};

const PRESET_THUMBNAILS = [
  { label: 'School Admin', url: '/images/managemens.png' },
  { label: 'Internship System', url: '/images/managementm.png' },
  { label: 'Game Rental', url: '/images/pinjam.png' },
  { label: 'Developer App', url: '/images/My app.png' },
  { label: 'Coding Workspace', url: '/images/coding.jpg' },
  { label: 'Study & Reading', url: '/images/reading.jpg' },
];

interface ThumbnailPickerProps {
  initialImage?: string | null;
}

function ThumbnailPicker({ initialImage }: ThumbnailPickerProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [tab, setTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState<string>(initialImage || '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sinkronisasi jika initialImage berubah (misal ganti proyek yang diedit)
  useEffect(() => {
    setPreview(initialImage || null);
    setUrlInput(initialImage || '');
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [initialImage]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WebP, SVG).');
      return;
    }
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB.');
      return;
    }
    setFileName(file.name);
    setFileSize(`${sizeInMB} MB`);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
      handleFile(file);
    }
  };

  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    setPreview(val.trim() || null);
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = (url: string) => {
    setUrlInput(url);
    setPreview(url);
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUrlInput('');
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Foto Thumbnail Proyek
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-[11px] font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Hapus Foto
          </button>
        )}
      </div>

      {/* Live Preview Box */}
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 group shadow-sm">
          <div className="relative w-full h-40 sm:h-44 bg-slate-950 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/managemens.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
              <span className="text-[11px] font-medium bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/10 truncate max-w-[200px]">
                {fileName ? fileName : preview.startsWith('http') ? 'URL Online' : 'Aset Portfolio'}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" /> Siap Digunakan
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-1 p-3 text-center">
          <ImageIcon className="w-6 h-6 opacity-60 text-slate-400" />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Belum ada foto thumbnail dipilih
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Pilih opsi di bawah untuk mengunggah atau memilih gambar
          </p>
        </div>
      )}

      {/* Mode Selection Tabs */}
      <div className="flex rounded-xl bg-slate-200/70 dark:bg-slate-900 p-1 gap-1">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={cn(
            "flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            tab === 'upload'
              ? "bg-white dark:bg-slate-750 text-indigo-600 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Unggah File</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={cn(
            "flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            tab === 'url'
              ? "bg-white dark:bg-slate-750 text-indigo-600 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Input URL</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('presets')}
          className={cn(
            "flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            tab === 'presets'
              ? "bg-white dark:bg-slate-750 text-indigo-600 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Galeri Bawaan</span>
        </button>
      </div>

      {/* Tab 1: Upload File */}
      {tab === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all",
            isDragging
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
              : "border-slate-300 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500 bg-white dark:bg-slate-850"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="image_file"
            accept="image/png,image/jpeg,image/webp,image/jpg,image/svg+xml,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {fileName ? `File terpilih: ${fileName}` : 'Klik untuk pilih foto atau seret foto ke sini'}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Mendukung PNG, JPG, WEBP (Maksimal 10MB)
          </p>
        </div>
      )}

      {/* Tab 2: Input URL */}
      {tab === 'url' && (
        <div className="space-y-1">
          <div className="relative">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://... atau /images/namagambar.png"
              className="w-full text-xs border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
            <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>
          <p className="text-[11px] text-slate-500">
            URL gambar web (Unsplash, Supabase) atau path lokal di /images/
          </p>
        </div>
      )}

      {/* Tab 3: Presets */}
      {tab === 'presets' && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {PRESET_THUMBNAILS.map((item) => (
            <button
              key={item.url}
              type="button"
              onClick={() => handleSelectPreset(item.url)}
              title={item.label}
              className={cn(
                "relative rounded-lg overflow-hidden border-2 aspect-video group cursor-pointer transition-all",
                preview === item.url
                  ? "border-indigo-600 ring-2 ring-indigo-500/30 scale-102"
                  : "border-slate-200 dark:border-slate-700 hover:border-indigo-400"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
              {preview === item.url && (
                <div className="absolute inset-0 bg-indigo-600/50 flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Hidden input agar URL / preset / path terpilih terkirim di FormData */}
      <input
        type="hidden"
        name="image"
        value={preview?.startsWith('blob:') ? '' : (urlInput || '')}
      />
    </div>
  );
}

type Props = {
  initialProyek: ProyekItem[];
  initialPengalaman?: PengalamanItem[];
};

export default function ProyekTableClient({
  initialProyek,
  initialPengalaman = [],
}: Props) {
  const router = useRouter();

  // Mode Tampilan: 'live' (Homepage Visual Duplication) atau 'table' (Tabel Data)
  const [viewMode, setViewMode] = useState<'live' | 'table'>('live');

  // State Data Realtime (Otomatis update tanpa harus refresh manual)
  const [proyekList, setProyekList] = useState<ProyekItem[]>(initialProyek);
  const [pengalamanList, setPengalamanList] = useState<PengalamanItem[]>(initialPengalaman);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sinkronisasi data lokal jika props dari server component berubah
  useEffect(() => {
    setProyekList(initialProyek);
  }, [initialProyek]);

  useEffect(() => {
    setPengalamanList(initialPengalaman);
  }, [initialPengalaman]);

  // Fungsi Auto-Refresh Realtime: Sinkronisasi instan database Supabase & App Router
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Trigger App Router background revalidation
      router.refresh();

      // 2. Ambil data proyek terbaru langsung dari Supabase
      const { data: freshProyek } = await supabase
        .from('proyek')
        .select('*')
        .order('id', { ascending: true });
      if (freshProyek) {
        setProyekList(freshProyek);
      }

      // 3. Ambil data pengalaman terbaru langsung dari Supabase
      const { data: freshPengalaman } = await supabase
        .from('pengalaman')
        .select('*')
        .order('id', { ascending: true });
      if (freshPengalaman) {
        setPengalamanList(freshPengalaman);
      }
    } catch (err) {
      console.error('Gagal merefresh data realtime:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // State Modal Proyek
  const [isAddProyekOpen, setIsAddProyekOpen] = useState(false);
  const [editingProyek, setEditingProyek] = useState<ProyekItem | null>(null);
  const [deletingProyek, setDeletingProyek] = useState<ProyekItem | null>(null);

  // State Modal Pengalaman
  const [isAddPengalamanOpen, setIsAddPengalamanOpen] = useState(false);
  const [editingPengalaman, setEditingPengalaman] = useState<PengalamanItem | null>(null);
  const [deletingPengalaman, setDeletingPengalaman] = useState<PengalamanItem | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddProyekOpen(false);
        setEditingProyek(null);
        setDeletingProyek(null);
        setIsAddPengalamanOpen(false);
        setEditingPengalaman(null);
        setDeletingPengalaman(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler Proyek CRUD (Dengan Auto-Refresh Instan)
  const handleTambahProyekSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await tambahProyekAction(formData);

    setLoading(false);
    if (result.success) {
      setIsAddProyekOpen(false);
      setSuccessToast('Proyek baru berhasil ditambahkan!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal menambahkan proyek.');
    }
  };

  const handleEditProyekSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await editProyekAction(formData);

    setLoading(false);
    if (result.success) {
      setEditingProyek(null);
      setSuccessToast('Perubahan proyek berhasil disimpan!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal mengedit proyek.');
    }
  };

  const handleHapusProyekConfirm = async () => {
    if (!deletingProyek) return;
    setLoading(true);
    setErrorMessage(null);

    const result = await hapusProyekAction(deletingProyek.id);

    setLoading(false);
    if (result.success) {
      setDeletingProyek(null);
      setSuccessToast('Proyek berhasil dihapus!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal menghapus proyek.');
    }
  };

  // Handler Pengalaman CRUD (Dengan Auto-Refresh Instan)
  const handleTambahPengalamanSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await tambahPengalamanAction(formData);

    setLoading(false);
    if (result.success) {
      setIsAddPengalamanOpen(false);
      setSuccessToast('Pengalaman baru berhasil ditambahkan!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal menambahkan pengalaman.');
    }
  };

  const handleEditPengalamanSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await editPengalamanAction(formData);

    setLoading(false);
    if (result.success) {
      setEditingPengalaman(null);
      setSuccessToast('Perubahan pengalaman berhasil disimpan!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal mengedit pengalaman.');
    }
  };

  const handleHapusPengalamanConfirm = async () => {
    if (!deletingPengalaman) return;
    setLoading(true);
    setErrorMessage(null);

    const result = await hapusPengalamanAction(deletingPengalaman.id);

    setLoading(false);
    if (result.success) {
      setDeletingPengalaman(null);
      setSuccessToast('Pengalaman berhasil dihapus!');
      await refreshData();
    } else {
      setErrorMessage(result.error || 'Gagal menghapus pengalaman.');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
      {/* Toast Notifikasi Sukses */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-semibold">{successToast}</p>
        </div>
      )}

      {/* STICKY ADMIN CONTROL BAR DI BAGIAN ATAS */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Mode Admin */}
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Admin Live Studio
            </span>
            <span className="hidden md:inline text-xs text-slate-400">|</span>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <a href="#admin-projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Proyek ({proyekList.length})
              </a>
              <span>•</span>
              <a href="#admin-experience" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Pengalaman ({pengalamanList.length})
              </a>
            </div>
          </div>

          {/* Kontrol & View Switcher */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('live')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  viewMode === 'live'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                )}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Homepage</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                )}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Tabel Ringkas</span>
              </button>
            </div>

            {/* Tombol Refresh Data */}
            <button
              type="button"
              onClick={() => refreshData()}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh data langsung dari database Supabase"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-indigo-600")} />
              <span className="hidden sm:inline">{isRefreshing ? 'Memperbarui...' : 'Refresh'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setIsAddProyekOpen(true);
              }}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Proyek</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 TAMPILAN 1: LIVE HOMEPAGE DUPLICATION DENGAN TOMBOL REALTIME */}
      {/* ========================================================================= */}
      {viewMode === 'live' ? (
        <div className="overflow-x-clip">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Section */}
          <About />

          {/* 3. Skills Section */}
          <Skills />

          {/* 4. LIVE PROJECTS SECTION (DENGAN TOMBOL ADD DI ATAS & EDIT/DELETE DI BAWAH KARTU) */}
          <section id="admin-projects" className="py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-28 relative">
            {/* Banner Header Section dengan Tombol Tambah Proyek di Atas */}
            <div className="w-[85%] sm:w-[80%] mx-auto mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-indigo-200/80 dark:border-indigo-900/60 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>Proyek Portofolio</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold">
                        Realtime Live Mode
                      </span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Klik <strong>Tambah Proyek</strong> di samping atau gunakan tombol <strong>Edit</strong> / <strong>Hapus</strong> pada masing-masing kartu.
                    </p>
                  </div>
                </div>

                {/* Tombol Add di Atas Section Proyek */}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setIsAddProyekOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>
            </div>

            {/* Grid Kartu Proyek Portofolio */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
              {proyekList && proyekList.length > 0 ? (
                proyekList.map((project, index) => {
                  const techList = typeof project.teknologi === 'string'
                    ? project.teknologi.split(',').map((t) => t.trim()).filter(Boolean)
                    : [];

                  return (
                    <div
                      key={project.id || index}
                      className="group relative bg-white dark:bg-gray-800 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col border border-slate-200/80 dark:border-gray-700/80"
                    >
                      {/* Gambar Proyek */}
                      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-gray-900">
                        <Image
                          src={project.image || '/images/managemens.png'}
                          alt={project.judul}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {project.kategori && (
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                            {project.kategori}
                          </div>
                        )}
                      </div>

                      {/* Konten Utama Kartu */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl text-black dark:text-white font-semibold mb-2 group-hover:text-blue-500 transition-colors line-clamp-1">
                            {project.judul}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                            {project.deskripsi}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {techList.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-full bg-indigo-600/10 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tombol Publik Normal */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Link
                            href={`/proyek/${project.id}`}
                            target="_blank"
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1 text-xs')}
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1" />
                            Detail
                          </Link>
                          {project.link_deploy && (
                            <a
                              href={project.link_deploy}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'flex-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium')}
                            >
                              <ExternalLink className="w-3.5 h-3.5 mr-1" />
                              Kunjungi Proyek
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs')}
                            >
                              <FaGithub className="w-3.5 h-3.5 mr-1" />
                              GitHub
                            </a>
                          )}
                        </div>

                        {/* ⚙️ TOMBOL DI SEBELAH BAWAH PROYEK: EDIT & DELETE (ADMIN REALTIME) */}
                        <div className="pt-3 border-t border-slate-200 dark:border-gray-700 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setErrorMessage(null);
                              setEditingProyek(project);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 dark:text-blue-300 rounded-xl transition-all cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit Proyek</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setErrorMessage(null);
                              setDeletingProyek(project);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/60 dark:hover:bg-red-900/80 dark:text-red-400 rounded-xl transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-slate-300 dark:border-gray-700">
                  <p className="text-slate-500 dark:text-slate-400 mb-3">Belum ada proyek yang tersimpan.</p>
                  <button
                    type="button"
                    onClick={() => setIsAddProyekOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Proyek Sekarang
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 5. LIVE EXPERIENCE SECTION (DENGAN TOMBOL ADD DI ATAS & EDIT/DELETE DI BAWAH TIAP KARTU) */}
          <section id="admin-experience" className="py-16 bg-gray-100 dark:bg-gray-950 scroll-mt-28 relative">
            <div className="w-[85%] sm:w-[80%] mx-auto mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/80 dark:bg-gray-850/80 backdrop-blur-md border border-blue-200/80 dark:border-blue-900/60 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>Experience &amp; Education</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold">
                        Realtime Live Mode
                      </span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Kelola riwayat karir dan pendidikan Anda secara langsung.
                    </p>
                  </div>
                </div>

                {/* Tombol Add di Atas Section Pengalaman */}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setIsAddPengalamanOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengalaman</span>
                </button>
              </div>
            </div>

            {/* Timeline Pengalaman */}
            <div className="relative px-6 max-w-4xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-300 to-blue-900 md:-translate-x-px" />

              {initialPengalaman && initialPengalaman.length > 0 ? (
                initialPengalaman.map((item, index) => {
                  const techList = typeof item.teknologi === 'string'
                    ? item.teknologi.split(',').map((t) => t.trim()).filter(Boolean)
                    : [];

                  return (
                    <div
                      key={item.id ?? index}
                      className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                      {/* Node Icon */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 flex items-center justify-center z-10 shadow-sm">
                        {item.tipe === 'education' ? (
                          <GraduationCap className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Briefcase className="w-4 h-4 text-blue-500" />
                        )}
                      </div>

                      {/* Konten Kotak Pengalaman */}
                      <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
                        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-slate-200/80 dark:border-gray-800">
                          <div className="flex items-center gap-2 text-sm text-blue-500 mb-2">
                            <span className="px-3 py-1 rounded-full bg-blue-600/10 font-semibold text-xs">
                              {item.periode}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">
                            {item.judul}
                          </h3>
                          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
                            {item.perusahaan}
                          </p>
                          <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                            {item.deskripsi}
                          </p>

                          {/* Tech stack */}
                          {techList.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {techList.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] py-0.5 px-2 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* ⚙️ TOMBOL DI SEBELAH BAWAH PENGALAMAN: EDIT & DELETE */}
                          <div className="pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setErrorMessage(null);
                                setEditingPengalaman(item);
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 dark:text-blue-300 rounded-lg transition-all cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setErrorMessage(null);
                                setDeletingPengalaman(item);
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/60 dark:hover:bg-red-900/80 dark:text-red-400 rounded-lg transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500">
                  Belum ada data pengalaman. Klik <strong>Tambah Pengalaman</strong> di atas.
                </div>
              )}
            </div>
          </section>

          {/* 6. Client Review Section */}
          <ClientRiview />

          {/* 7. Contact Section */}
          <Contact />
        </div>
      ) : (
        /* ========================================================================= */
        /* 📋 TAMPILAN 2: TABEL RINGKAS (UNTUK DATA AUDIT) */
        /* ========================================================================= */
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Tabel Data Proyek</h3>
                <p className="text-xs text-slate-500">Total {initialProyek.length} proyek</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProyekOpen(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                Tambah Proyek
              </button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3 w-12 text-center">No</th>
                  <th className="px-4 py-3 w-20 text-center">Foto</th>
                  <th className="px-5 py-3">Judul Proyek</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Teknologi</th>
                  <th className="px-5 py-3 text-center w-36">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {initialProyek.map((proyek, index) => (
                  <tr key={proyek.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 text-center text-xs text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 mx-auto relative group shadow-2xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={proyek.image || '/images/managemens.png'}
                          alt={proyek.judul}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/managemens.png';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{proyek.judul}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{proyek.kategori || 'Web'}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{proyek.teknologi}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProyek(proyek)}
                          className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingProyek(proyek)}
                          className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-md"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 1: TAMBAH PROYEK BARU */}
      {/* ========================================================================= */}
      {isAddProyekOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Tambah Proyek Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProyekOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTambahProyekSubmit} className="p-6 space-y-4 overflow-y-auto">
              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/60">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Proyek *
                </label>
                <input
                  name="judul"
                  type="text"
                  required
                  placeholder="Contoh: E-Commerce Mobile App"
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              {/* 📷 INPUT & UPLOAD FOTO THUMBNAIL PROYEK */}
              <ThumbnailPicker />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    defaultValue="Web"
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option value="Web">Web Development</option>
                    <option value="Mobile">Mobile App</option>
                    <option value="IoT">IoT / Hardware</option>
                    <option value="UI/UX">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Link GitHub / Repo (Opsional)
                  </label>
                  <input
                    name="link"
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Link Deploy / Website Proyek (Opsional)
                </label>
                <input
                  name="link_deploy"
                  type="url"
                  placeholder="https://proyek-anda.vercel.app"
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Jika diisi, tombol &ldquo;Kunjungi Proyek&rdquo; akan otomatis muncul. Jika dikosongkan, tombol disembunyikan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Teknologi (Pisah dengan koma) *
                </label>
                <input
                  name="teknologi"
                  type="text"
                  required
                  placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Proyek *
                </label>
                <textarea
                  name="deskripsi"
                  rows={3}
                  required
                  placeholder="Jelaskan fitur dan fungsionalitas proyek..."
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddProyekOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 2: EDIT PROYEK */}
      {/* ========================================================================= */}
      {editingProyek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Edit Proyek</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProyek(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProyekSubmit} className="p-6 space-y-4 overflow-y-auto">
              <input type="hidden" name="id" value={editingProyek.id} />

              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/60">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Proyek *
                </label>
                <input
                  name="judul"
                  type="text"
                  required
                  defaultValue={editingProyek.judul}
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              {/* 📷 INPUT & UPLOAD FOTO THUMBNAIL PROYEK */}
              <ThumbnailPicker initialImage={editingProyek.image} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    defaultValue={editingProyek.kategori || 'Web'}
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  >
                    <option value="Web">Web Development</option>
                    <option value="Mobile">Mobile App</option>
                    <option value="IoT">IoT / Hardware</option>
                    <option value="UI/UX">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Link GitHub / Repo (Opsional)
                  </label>
                  <input
                    name="link"
                    type="url"
                    defaultValue={editingProyek.link ?? ''}
                    placeholder="https://github.com/..."
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Link Deploy / Website Proyek (Opsional)
                </label>
                <input
                  name="link_deploy"
                  type="url"
                  defaultValue={editingProyek.link_deploy ?? ''}
                  placeholder="https://proyek-anda.vercel.app"
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Jika diisi, tombol &ldquo;Kunjungi Proyek&rdquo; akan otomatis muncul. Jika dikosongkan, tombol disembunyikan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Teknologi (Pisah dengan koma) *
                </label>
                <input
                  name="teknologi"
                  type="text"
                  required
                  defaultValue={editingProyek.teknologi}
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Proyek *
                </label>
                <textarea
                  name="deskripsi"
                  rows={3}
                  required
                  defaultValue={editingProyek.deskripsi}
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProyek(null)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 3: KONFIRMASI HAPUS PROYEK */}
      {/* ========================================================================= */}
      {deletingProyek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Hapus Proyek Ini?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Apakah Anda yakin ingin menghapus proyek{' '}
              <strong className="text-slate-800 dark:text-slate-200">&ldquo;{deletingProyek.judul}&rdquo;</strong>?
            </p>
            {errorMessage && (
              <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl mb-4">
                {errorMessage}
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingProyek(null)}
                disabled={loading}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleHapusProyekConfirm}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus Proyek'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 4: TAMBAH PENGALAMAN BARU */}
      {/* ========================================================================= */}
      {isAddPengalamanOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Tambah Pengalaman Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPengalamanOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTambahPengalamanSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Posisi / Jurusan *
                </label>
                <input
                  name="judul"
                  type="text"
                  required
                  placeholder="Contoh: Frontend Engineer / Rekayasa Perangkat Lunak"
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Perusahaan / Sekolah *
                  </label>
                  <input
                    name="perusahaan"
                    type="text"
                    required
                    placeholder="Contoh: PT Teknologi Indonesia / SMK..."
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Periode *
                  </label>
                  <input
                    name="periode"
                    type="text"
                    required
                    placeholder="Contoh: 2024 - Sekarang"
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipe
                  </label>
                  <select
                    name="tipe"
                    defaultValue="work"
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  >
                    <option value="work">Pengalaman Kerja / Magang</option>
                    <option value="education">Pendidikan / Sekolah</option>
                    <option value="project">Project Pribadi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teknologi Terkait
                  </label>
                  <input
                    name="teknologi"
                    type="text"
                    placeholder="React, Next.js, Node.js"
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Pekerjaan / Peran
                </label>
                <textarea
                  name="deskripsi"
                  rows={3}
                  placeholder="Ceritakan peran dan pencapaian Anda..."
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddPengalamanOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Pengalaman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 5: EDIT PENGALAMAN */}
      {/* ========================================================================= */}
      {editingPengalaman && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Edit Pengalaman</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPengalaman(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditPengalamanSubmit} className="p-6 space-y-4">
              <input type="hidden" name="id" value={editingPengalaman.id} />

              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Posisi / Jurusan *
                </label>
                <input
                  name="judul"
                  type="text"
                  required
                  defaultValue={editingPengalaman.judul}
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Perusahaan / Sekolah *
                  </label>
                  <input
                    name="perusahaan"
                    type="text"
                    required
                    defaultValue={editingPengalaman.perusahaan}
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Periode *
                  </label>
                  <input
                    name="periode"
                    type="text"
                    required
                    defaultValue={editingPengalaman.periode}
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipe
                  </label>
                  <select
                    name="tipe"
                    defaultValue={editingPengalaman.tipe || 'work'}
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  >
                    <option value="work">Pengalaman Kerja / Magang</option>
                    <option value="education">Pendidikan / Sekolah</option>
                    <option value="project">Project Pribadi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teknologi Terkait
                  </label>
                  <input
                    name="teknologi"
                    type="text"
                    defaultValue={editingPengalaman.teknologi}
                    className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Pekerjaan / Peran
                </label>
                <textarea
                  name="deskripsi"
                  rows={3}
                  defaultValue={editingPengalaman.deskripsi}
                  className="w-full text-sm border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPengalaman(null)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛑 POP UP MODAL 6: KONFIRMASI HAPUS PENGALAMAN */}
      {/* ========================================================================= */}
      {deletingPengalaman && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Hapus Pengalaman Ini?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Apakah Anda yakin ingin menghapus pengalaman{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                &ldquo;{deletingPengalaman.judul} - {deletingPengalaman.perusahaan}&rdquo;
              </strong>
              ?
            </p>
            {errorMessage && (
              <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl mb-4">
                {errorMessage}
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingPengalaman(null)}
                disabled={loading}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleHapusPengalamanConfirm}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus Pengalaman'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
