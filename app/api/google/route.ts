import { OAuth2Client } from 'google-auth-library';
import { supabaseServer } from './supabase-server';
import { NextResponse } from 'next/server';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
    const { token } = await request.json();

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) throw new Error("No payload from Google");

        const { email, name, picture, sub } = payload;
        const supabase = await supabaseServer(); // Add await here

        // Sign in with OAuth using the token
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: await `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
                scopes: 'openid email profile',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                skipBrowserRedirect: true,
            },
        });

        if (error) throw error;
        if (!data?.url) throw new Error("No redirect URL returned");

        return NextResponse.json({
            url: data.url,
            email,
            name,
            picture
        });

    } catch (error) {
        console.error('Google auth error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        );
    }
}