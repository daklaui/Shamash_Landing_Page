import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { languageAlternates, siteIndexable, siteOrigin } from "@/lib/site";

const baseUrl = siteOrigin;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];
  const staticRoutes = ["", "/services", "/industries", "/about", "/resources", "/contact"];
  const solutionRoutes = ["/solutions/xpertfactor", "/solutions/factorix", "/solutions/recouvrement-creances", "/solutions/document-management", "/solutions/ai-automation", "/solutions/web-mobile-development"];

  return locales.flatMap((locale) =>
    [...staticRoutes, ...solutionRoutes].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(route)
      }
    }))
  );
}
