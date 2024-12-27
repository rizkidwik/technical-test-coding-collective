import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
        protocol: 'http',
        hostname: '192.168.2.21',
        port: '3001',
        pathname: '/uploads/**',
        search: '',
      },]
  }
};

export default nextConfig;
