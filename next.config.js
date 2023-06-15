/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "img.clerk.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
