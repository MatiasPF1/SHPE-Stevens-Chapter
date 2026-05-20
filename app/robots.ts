import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/AdminPortal", "/login"],
      },
    ],
    sitemap: "https://stevensshpe.org/sitemap.xml",
  };
}
