import type { MetadataRoute } from "next";
const isVercel = process.env.DEPLOYMENT_TARGET === "VERCEL";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: isVercel
        ? "https://varinder.vercel.app/sitemap.xml"
        : "https://varinder148.github.io/portfolio/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
