import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["http://localhost:3000"] },
    serverComponentsExternalPackages: ["mongoose"],
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
