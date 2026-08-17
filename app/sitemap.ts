import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const baseUrl = "https://www.shamash-it.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/industries", "/about", "/resources", "/contact"];
  const solutionRoutes = ["/solutions/xpertfactor", "/solutions/factorix", "/solutions/document-management", "/solutions/ai-automation", "/solutions/web-mobile-development"];

  return locales.flatMap((locale) =>
    [...staticRoutes, ...solutionRoutes].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((item) => [item === "tn" ? "ar-TN" : item, `${baseUrl}/${item}${route}`])),
          "x-default": `${baseUrl}/fr${route}`
        }
      }
    }))
  );
}
