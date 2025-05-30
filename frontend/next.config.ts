import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.example.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },

        ],

        formats: ['image/webp'],
        minimumCacheTTL: 60,
    },

};

export default nextConfig;