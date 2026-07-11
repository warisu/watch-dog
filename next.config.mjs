/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting runs in CI; don't fail Vercel builds on lint warnings.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
