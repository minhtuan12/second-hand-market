/** @[action] {import('next').NextConfig} */

import sitemap from "./next-sitemap.config.js";

const nextConfig = sitemap({
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
        ],
    },
    siteUrl: "https://chodocu.vercel.app",
    generateRobotsTxt: true,
});

export default nextConfig;
