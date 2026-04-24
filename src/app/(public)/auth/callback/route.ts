"use server"
import { NextResponse } from 'next/server';
import { createBrowserClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { envVars } from '@/src/config/env';

export async function GET(request: Request) {
  
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  const next = searchParams.get('next') ?? '/login';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createBrowserClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL!,
      envVars.NEXT_PUBLIC_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set({ name, value, ...options });
            });
          },

        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
 
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Session exchange failed:", error.message);
    }
  }

  // If something went wrong, send them back to the login page
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}