import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import { languageAlternates, siteIndexable, siteOrigin } from "./site";

const siteName = "Shamash IT";
const baseUrl = siteOrigin;

export function createMetadata({
  title,
  description,
  path = "/",
  locale = "fr"
}: {
  title: string;
  description: string;
  path?: string;
  locale?: AppLocale;
}): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const url = new URL(`/${locale}${normalizedPath}`, baseUrl).toString();
  const languages = languageAlternates(normalizedPath);
  const cleanTitle = title.replace(/^Shamash IT\s*\|\s*/i, "").replace(/(?:\s*\|\s*Shamash IT)+\s*$/i, "");
  const brandedTitle = /Shamash IT/i.test(cleanTitle) ? cleanTitle : `${cleanTitle} | ${siteName}`;
  const socialImage = { url: `${baseUrl}/images/hero-xpertfactor.png`, alt: "Xpert Factor — Shamash IT" };

  return {
    title: { absolute: brandedTitle },
    description,
    robots: { index: siteIndexable, follow: siteIndexable },
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": new URL(`/fr${normalizedPath}`, baseUrl).toString()
      }
    },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName,
      type: "website",
      images: [socialImage]
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [socialImage]
    }
  };
}
