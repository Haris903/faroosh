import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Yeh Unsplash ke tamam image paths ko allow karta hai
      },
    ],
  },
};

export default nextConfig;
