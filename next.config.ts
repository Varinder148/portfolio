import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const isVercel = process.env.DEPLOYMENT_TARGET === "VERCEL";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: !isVercel
    ? {
        loader: "custom",
        loaderFile: "./imgLoader.ts",
      }
    : {},
  assetPrefix: !isDev && !isVercel ? "/portfolio/" : "",
  basePath: !isDev && !isVercel ? "/portfolio" : "",
  output: "export",
};

export default nextConfig;
