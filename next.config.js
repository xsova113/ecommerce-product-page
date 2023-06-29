/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "img.clerk.com", "cdn.sanity.io"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
