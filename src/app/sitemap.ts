import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase/client';
import { projects } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldi.my.id';

  const projectIds = new Set<string>();

  try {
    const { data: daftarProyek } = await supabase.from('proyek').select('id');
    if (daftarProyek && Array.isArray(daftarProyek)) {
      daftarProyek.forEach((item) => {
        if (item?.id) {
          projectIds.add(String(item.id));
        }
      });
    }
  } catch (error) {
    console.error('Peringatan: Gagal memuat proyek Supabase untuk sitemap:', error);
  }

  // Masukkan juga proyek lokal/statis jika ada yang belum terdaftar di database
  projects.forEach((item) => {
    if (item?.id) {
      projectIds.add(String(item.id));
    }
  });

  const halamanProyek: MetadataRoute.Sitemap = Array.from(projectIds).map((id) => ({
    url: `${BASE_URL}/proyek/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/proyek`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...halamanProyek,
  ];
}
