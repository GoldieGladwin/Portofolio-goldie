import { createSupabaseServerClient } from '@/lib/supabase-server';
import ProyekTableClient from './ProyekTableClient';

export default async function AdminProyekPage() {
  const supabase = await createSupabaseServerClient();

  // Ambil data proyek dari Supabase
  const { data: daftarProyek } = await supabase
    .from('proyek')
    .select('*')
    .order('id', { ascending: true });

  // Ambil data pengalaman dari Supabase
  const { data: daftarPengalaman } = await supabase
    .from('pengalaman')
    .select('*')
    .order('id', { ascending: true });

  return (
    <div className="w-full">
      {/* Studio Live Homepage Duplikasi Admin dengan Modal Pop Up Tambah, Edit, dan Hapus */}
      <ProyekTableClient
        initialProyek={daftarProyek || []}
        initialPengalaman={daftarPengalaman || []}
      />
    </div>
  );
}
