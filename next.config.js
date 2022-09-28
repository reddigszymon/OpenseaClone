/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io", "gateway.ipfscdn.io"],
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_TOKEN: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    NEXT_PUBLIC_CMC_API_KEY: process.env.NEXT_PUBLIC_CMC_API_KEY,
  },
};

module.exports = nextConfig;
