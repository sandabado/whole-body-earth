import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/pillars/studios/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
