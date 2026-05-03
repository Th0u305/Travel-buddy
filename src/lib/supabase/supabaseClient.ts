import { envVars } from '@/src/config/env';
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL!,
      envVars.NEXT_PUBLIC_ANON_KEY!,
    );
}
