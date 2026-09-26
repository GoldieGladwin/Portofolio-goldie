'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function tambahProyekAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const judul = (formData.get('judul') as string)?.trim();
    const deskripsi = (formData.get('deskripsi') as string)?.trim();
    const teknologi = (formData.get('teknologi') as string)?.trim();
    const link = (formData.get('link') as string)?.trim() || null;
    const link_deploy = (formData.get('link_deploy') as string)?.trim() || null;
    const kategori = (formData.get('kategori') as string)?.trim() || 'Web';

    if (!judul || !deskripsi || !teknologi) {
        return { success: false, error: 'Judul, deskripsi, dan teknologi wajib diisi.' };
    }

    const payload: Record<string, any> = {
        judul,
        deskripsi,
        teknologi,
        link,
        kategori,
    };
    if (link_deploy) {
        payload.link_deploy = link_deploy;
    }

    let { error } = await supabase.from('proyek').insert(payload);

    // Fallback anggun jika kolom link_deploy belum ditambahkan di Supabase
    if (error && error.message?.includes('link_deploy')) {
        delete payload.link_deploy;
        const retry = await supabase.from('proyek').insert(payload);
        error = retry.error;
    }

    if (error) {
        console.error('Gagal menambah proyek:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    revalidatePath('/');
    return { success: true };
}

export async function editProyekAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const id = formData.get('id');
    const judul = (formData.get('judul') as string)?.trim();
    const deskripsi = (formData.get('deskripsi') as string)?.trim();
    const teknologi = (formData.get('teknologi') as string)?.trim();
    const link = (formData.get('link') as string)?.trim() || null;
    const link_deploy = (formData.get('link_deploy') as string)?.trim() || null;
    const kategori = (formData.get('kategori') as string)?.trim() || 'Web';

    if (!id || !judul || !deskripsi || !teknologi) {
        return { success: false, error: 'Data tidak lengkap.' };
    }

    const payload: Record<string, any> = {
        judul,
        deskripsi,
        teknologi,
        link,
        kategori,
        link_deploy,
    };

    let { error } = await supabase
        .from('proyek')
        .update(payload)
        .eq('id', id);

    // Fallback jika kolom link_deploy belum ditambahkan di Supabase
    if (error && error.message?.includes('link_deploy')) {
        delete payload.link_deploy;
        const retry = await supabase
            .from('proyek')
            .update(payload)
            .eq('id', id);
        error = retry.error;
    }

    if (error) {
        console.error('Gagal mengubah proyek:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    revalidatePath('/');
    return { success: true };
}

export async function hapusProyekAction(id: string | number) {
    const supabase = await createSupabaseServerClient();

    if (!id) {
        return { success: false, error: 'ID proyek tidak valid.' };
    }

    const { error } = await supabase.from('proyek').delete().eq('id', id);

    if (error) {
        console.error('Gagal menghapus proyek:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    return { success: true };
}

export async function tambahPengalamanAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const judul = (formData.get('judul') as string)?.trim();
    const perusahaan = (formData.get('perusahaan') as string)?.trim();
    const periode = (formData.get('periode') as string)?.trim();
    const deskripsi = (formData.get('deskripsi') as string)?.trim() || '';
    const teknologi = (formData.get('teknologi') as string)?.trim() || '';
    const tipe = (formData.get('tipe') as string)?.trim() || 'work';

    if (!judul || !perusahaan || !periode) {
        return { success: false, error: 'Judul, perusahaan, dan periode wajib diisi.' };
    }

    const { error } = await supabase.from('pengalaman').insert({
        judul,
        perusahaan,
        periode,
        deskripsi,
        teknologi,
        tipe,
    });

    if (error) {
        console.error('Gagal menambah pengalaman:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/');
    return { success: true };
}

export async function editPengalamanAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const id = formData.get('id');
    const judul = (formData.get('judul') as string)?.trim();
    const perusahaan = (formData.get('perusahaan') as string)?.trim();
    const periode = (formData.get('periode') as string)?.trim();
    const deskripsi = (formData.get('deskripsi') as string)?.trim() || '';
    const teknologi = (formData.get('teknologi') as string)?.trim() || '';
    const tipe = (formData.get('tipe') as string)?.trim() || 'work';

    if (!id || !judul || !perusahaan) {
        return { success: false, error: 'Data tidak lengkap.' };
    }

    const { error } = await supabase
        .from('pengalaman')
        .update({
            judul,
            perusahaan,
            periode,
            deskripsi,
            teknologi,
            tipe,
        })
        .eq('id', id);

    if (error) {
        console.error('Gagal mengubah pengalaman:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/');
    return { success: true };
}

export async function hapusPengalamanAction(id: string | number) {
    const supabase = await createSupabaseServerClient();

    if (!id) {
        return { success: false, error: 'ID pengalaman tidak valid.' };
    }

    const { error } = await supabase.from('pengalaman').delete().eq('id', id);

    if (error) {
        console.error('Gagal menghapus pengalaman:', error.message);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/');
    return { success: true };
}

