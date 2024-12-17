/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        licenseKey: process.env.GRAPEJS_API_KEY, // pulls from .env file
    },
}

module.exports = nextConfig
