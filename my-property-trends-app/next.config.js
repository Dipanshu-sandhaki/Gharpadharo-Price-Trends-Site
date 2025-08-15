/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ This will skip ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ This will skip type checking during production builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
