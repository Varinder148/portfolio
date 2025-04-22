const isDev = process.env.NODE_ENV !== "production";

const isVercel = process.env.DEPLOYMENT_TARGET === "VERCEL";

const nextConfig = {
  reactStrictMode: true,
  images: !isVercel
    ? {
        loader: "custom",
        loaderFile: "./imgLoader.ts",
      }
    : {
        unoptimized: true,
      },
  assetPrefix: !isDev && !isVercel ? "/portfolio/" : "",
  basePath: !isDev && !isVercel ? "/portfolio" : "",
  output: "export",
};

export default nextConfig;
