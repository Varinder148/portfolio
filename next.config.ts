import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./imgLoader.ts",
  },
  assetPrefix: !isDev ? "/portfolio/" : "",
  basePath: !isDev ? "/portfolio" : "",
  output: "export",
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: "false",
// });

export default nextConfig;
