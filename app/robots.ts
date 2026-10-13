import type { MetadataRoute } from "next";
import { siteIndexable, siteOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteIndexable ? {
      userAgent: "*",
      allow: "/"
    } : { userAgent: "*", disallow: "/" },
    sitemap: siteIndexable ? `${siteOrigin}/sitemap.xml` : undefined
  };
}
