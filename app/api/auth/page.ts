import { createSupabaseServerClient } from '../google/supabase-server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Callback() {
    const cookieStore = cookies()
    const supabase = createSupabaseServerClient() // Use server client

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
        redirect('/login?error=auth_failed')
    }

    redirect('/')
}