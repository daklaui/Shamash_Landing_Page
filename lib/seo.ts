import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const siteName = "Shamash IT";
const baseUrl = "https://www.shamash-it.com";

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
  const languages = Object.fromEntries(
    locales.map((language) => [
      language === "tn" ? "ar-TN" : language,
      new URL(`/${language}${normalizedPath}`, baseUrl).toString()
    ])
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": new URL(`/fr${normalizedPath}`, baseUrl).toString()
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
