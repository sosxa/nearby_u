import {
  createServerComponentClient,
  createRouteHandlerClient
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types'

// For Server Components
export function supabaseServer() {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
}

// For Server Components
export function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
}

// For API Routes
export function createSupabaseRouteHandlerClient() {
  const cookieStore = cookies()
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })
}