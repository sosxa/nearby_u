// app/utils/supabase-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types'

// For Server Components and API Routes
export function supabaseServer() {
  const cookieStore = cookies() 
  return createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  })
}
