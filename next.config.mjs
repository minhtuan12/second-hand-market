/** @[action] {import('next').NextConfig} */

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
        ],
    },
};

export default nextConfig;
