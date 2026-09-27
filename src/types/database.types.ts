export interface Proyek {
  id: string;
  slug?: string;
  title: string;
  kategori: string;
  role?: string;
  deskripsi: string;
  deskripsi_lengkap?: string;
  fitur_kunci?: string[];
  teknologi: string[];
  gambar_url: string;
  link_github?: string;
  link_demo?: string;
  link_deploy?: string;
  urutan?: number;
  created_at?: string;
}

export interface Profile {
  id: string;
  role: 'admin' | 'user';
  created_at?: string;
}
