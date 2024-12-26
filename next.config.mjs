/** @[action] {import('next').NextConfig} */

import { hostname } from "os";

const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL,
        APP_ENV: process.env.APP_ENV,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: 'lh3.googleusercontent.com'
            }
        ],
    },
};

export default nextConfig;
