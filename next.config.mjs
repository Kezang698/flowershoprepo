/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    serverActions: true,
  },
  // Ensure API routes are properly handled during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
}

export default nextConfig;
