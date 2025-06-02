import { createClient } from '@supabase/supabase-js'
// import { checkRateLimit } from '../rateLimiter';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})


export async function POST(req: Request) {

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

        // returns true if user isn't in db , and flase if the user 
        // let findUser = await isEmailAvailable(userInfo.email);

        const { available, error } = await isEmailAvailable(userInfo.email);
        if (error) {
            return new Response(
                JSON.stringify({ error: 'Service unavailable' }),
                { status: 503 }
            );
        }
        if (available) {
            return new Response(
                JSON.stringify({ error: 'Email does not exist, try making an account.' }),
                { status: 409 }
            );
        }

        // user is in db
        if (!available) {
            let email: string = userInfo.email;
            let password: string = userInfo.password;

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            // sign in error 
            if (signInError) {
                return new Response(
                    JSON.stringify({ error: signInError.message }),
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

        }

    }
    catch {
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}