/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  // Remove standalone output
  // Add these configurations for better routing and handling
  async redirects() {
    return [
      {
        source: '/',
        destination: '/booking',
        permanent: true
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

module.exports = nextConfig;
