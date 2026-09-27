import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dznrxxcvvovcuaokyrbh.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bnJ4eGN2dm92Y3Vhb2t5cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTczMjUsImV4cCI6MjEwNTE3MzMyNX0.MPi8wZO3zhTW3a-bdH81zNebzepfqxt9LSEZt6KBOHc';

// Standard Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Browser client factory for SSR client-side components
export function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
