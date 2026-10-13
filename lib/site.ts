import { localeConfig, locales } from "@/i18n/config";

const configuredOrigin = new URL(process.env.SITE_ORIGIN || "https://www.shamash-it.com");
if (configuredOrigin.protocol !== "https:" || configuredOrigin.username || configuredOrigin.password || configuredOrigin.pathname !== "/" || configuredOrigin.search || configuredOrigin.hash) {
  throw new Error("SITE_ORIGIN must be an HTTPS origin without credentials, path, query or fragment.");
}
export const siteOrigin = configuredOrigin.origin;
export const siteIndexable = process.env.SITE_INDEXABLE === "true" || (process.env.SITE_INDEXABLE !== "false" && process.env.NODE_ENV === "production" && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"));

export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map(locale => [localeConfig[locale].htmlLang, `${siteOrigin}/${locale}${path}`])),
    "x-default": `${siteOrigin}/fr${path}`
  };
}
