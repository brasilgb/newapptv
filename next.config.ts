import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  basePath: '/apptv',
  assetPrefix: '/apptv',
  webpack(config: { resolve: { fallback: any; }; }, { isServer }: any) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
