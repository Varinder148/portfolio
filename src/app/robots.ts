import type { MetadataRoute } from "next";

const isVercel = process.env.DEPLOYMENT_TARGET === "VERCEL";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: isVercel
      ? "https://varinder.vercel.app/sitemap.xml"
      : "https://varinder148.github.io/portfolio/sitemap.xml",
  };
}
