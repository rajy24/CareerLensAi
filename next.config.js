/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure Next.js doesn't try to build the backup directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    serverComponentsExternalPackages: ['unpdf', 'mammoth'],
  },
};

module.exports = nextConfig;
