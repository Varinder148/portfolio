import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: !isDev ? "/portfolio/" : "",
  basePath: !isDev ? "/portfolio" : "",
  output: "export",
};

export default nextConfig;
