import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ This will skip ESLint errors during production builds (e.g., Vercel)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
