// lib/supabase-browser.ts
// Dipakai di Client Component
import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dznrxxcvvovcuaokyrbh.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bnJ4eGN2dm92Y3Vhb2t5cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTczMjUsImV4cCI6MjEwNTE3MzMyNX0.MPi8wZO3zhTW3a-bdH81zNebzepfqxt9LSEZt6KBOHc';

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}
