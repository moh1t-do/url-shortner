/** @type {import('next').NextConfig} */
import dotev from 'dotenv';

dotev.config();
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL
    }
};

export default nextConfig;
