// lib/supabase-server.ts
// Dipakai di Server Component, Server Action, dan Middleware
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dznrxxcvvovcuaokyrbh.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bnJ4eGN2dm92Y3Vhb2t5cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTczMjUsImV4cCI6MjEwNTE3MzMyNX0.MPi8wZO3zhTW3a-bdH81zNebzepfqxt9LSEZt6KBOHc';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Diabaikan jika dipanggil dari Server Component yang tidak bisa menulis cookie
          }
        },
      },
    }
  );
}
