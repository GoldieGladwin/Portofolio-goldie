'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';

/**
 * Memproses foto thumbnail baik dari file unggahan (upload) ataupun URL gambar teks
 */
async function handleThumbnailUpload(formData: FormData): Promise<{ url: string | null; error?: string }> {
    const imageFile = formData.get('image_file') as File | null;
    const imageUrl = (formData.get('image') as string)?.trim();

    // 1. Jika pengguna mengunggah file foto baru
    if (imageFile && imageFile instanceof File && imageFile.size > 0 && imageFile.name) {
        // Validasi ukuran file (maksimal 10MB)
        if (imageFile.size > 10 * 1024 * 1024) {
            return { url: null, error: 'Ukuran file gambar maksimal 10MB.' };
        }

        const originalName = imageFile.name.toLowerCase();
        const ext = path.extname(originalName) || '.png';
        const cleanBase = path.basename(originalName, ext).replace(/[^a-z0-9_-]/gi, '_').slice(0, 25);
        const fileName = `proyek-${Date.now()}-${cleanBase}${ext}`;

        // Opsi A: Coba upload ke Supabase Storage (bucket 'proyek') jika sudah dibuat
        try {
            const supabase = await createSupabaseServerClient();
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('proyek')
                .upload(fileName, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (!uploadError && uploadData) {
                const { data: publicUrlData } = supabase
                    .storage
                    .from('proyek')
                    .getPublicUrl(fileName);
                if (publicUrlData?.publicUrl) {
                    return { url: publicUrlData.publicUrl };
                }
            }
        } catch {
            // Lanjut ke fallback penyimpanan lokal
        }

        // Opsi B: Simpan ke folder public/uploads di server lokal
        try {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            await fs.promises.mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileName);
            await fs.promises.writeFile(filePath, buffer);
            return { url: `/uploads/${fileName}` };
        } catch (fsErr) {
            console.warn('Gagal menyimpan file ke disk lokal, mencoba data URL:', fsErr);
            // Opsi C: Fallback data URL jika environment serverless read-only
            if (imageFile.size < 3 * 1024 * 1024) {
                const bytes = await imageFile.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const mimeType = imageFile.type || 'image/png';
                return { url: `data:${mimeType};base64,${buffer.toString('base64')}` };
            }
        }
    }

    // 2. Jika ada URL gambar teks atau preset galeri yang dipilih
    if (imageUrl && imageUrl.length > 0) {
        return { url: imageUrl };
    }

    return { url: null };
}

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

    // Proses upload / URL foto thumbnail
    const thumbnailRes = await handleThumbnailUpload(formData);
    if (thumbnailRes.error) {
        return { success: false, error: thumbnailRes.error };
    }

    const payload: Record<string, any> = {
        judul,
        deskripsi,
        teknologi,
        link,
        kategori,
        image: thumbnailRes.url || '/images/managemens.png',
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

    // Proses upload / URL foto thumbnail baru jika diubah
    const thumbnailRes = await handleThumbnailUpload(formData);
    if (thumbnailRes.error) {
        return { success: false, error: thumbnailRes.error };
    }

    const payload: Record<string, any> = {
        judul,
        deskripsi,
        teknologi,
        link,
        kategori,
        link_deploy,
    };

    if (thumbnailRes.url !== null) {
        payload.image = thumbnailRes.url;
    } else if (formData.has('image')) {
        const rawImage = (formData.get('image') as string)?.trim();
        payload.image = rawImage || null;
    }

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

