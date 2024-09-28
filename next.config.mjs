/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1'], // Add any other domains you need here
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/in',
        permanent: true, // Set to true for a permanent redirect, or false for a temporary one
      },
    ];
  },
};

export default nextConfig;