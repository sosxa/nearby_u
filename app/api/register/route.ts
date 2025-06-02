import { createClient } from '@supabase/supabase-js'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

export async function POST(req: Request) {
    // Check if email exists in profiles table
    async function isEmailAvailable(email: string): Promise<{ available: boolean, error?: string }> {
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error('Database error:', error);
            return { available: false, error: 'Database error' };
        }
        return { available: !data };
    }

    try {
        const userInfo = await req.json();

        // 1. Check email availability
        const { available, error } = await isEmailAvailable(userInfo.email);
        if (error) {
            return new Response(
                JSON.stringify({ error: 'Service unavailable' }),
                { status: 503 }
            );
        }
        if (!available) {
            return new Response(
                JSON.stringify({ error: 'Email already registered' }),
                { status: 409 }
            );
        }

        // 2. Create account
        const { data, error: signUpError } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
            options: {
                emailRedirectTo: `${process.env.WEBSITE_DOMAIN}/auth/callback`,
                data: {
                    display_name: userInfo.firstName,
                }
            }
        });

        if (signUpError) {
            // console.error('Signup error:', signUpError);
            return new Response(
                JSON.stringify({ error: signUpError.message }),
                { status: 400 }
            );
        }

        // 3. Success response
        return new Response(
            JSON.stringify({
                success: true,
                userId: data.user?.id
            }),
            { status: 201 }
        );

    } catch (error) {
        // console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}