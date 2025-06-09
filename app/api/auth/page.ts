// app/auth/callback/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Callback() {
  const cookieStore = cookies() // Await cookies
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login?error=auth_failed')
  }
  
  redirect('/dashboard')
}