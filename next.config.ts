import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com','is1-ssl.mzstatic.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/itunes/:path*', // Captura cualquier solicitud que empiece con /api/itunes/
        destination: 'http://itunes.apple.com/:path*', // Redirige internamente a la API de iTunes
      },
    ];
  },
};

export default nextConfig;
