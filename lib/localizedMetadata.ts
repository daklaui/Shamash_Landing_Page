import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { isAppLocale } from "@/i18n/config";
import type { SolutionId } from "@/data/localized";
import { createMetadata } from "./seo";
import { rawMessage } from "@/i18n/raw";

export async function createSolutionMetadata(localeValue: string, id: SolutionId, path: string) {
  if (!isAppLocale(localeValue)) notFound();
  const t = await getTranslations({ locale: localeValue, namespace: "solutions" });
  const items = rawMessage<Record<SolutionId, { metadata: { title: string; description: string } }>>(t, "items");
  return createMetadata({ ...items[id].metadata, path, locale: localeValue });
}

export async function createPageMetadata(
  localeValue: string,
  namespace: "home" | "about" | "contact" | "services" | "industries" | "resources",
  path = "/"
) {
  if (!isAppLocale(localeValue)) notFound();
  const t = await getTranslations({ locale: localeValue, namespace });
  const metadata = rawMessage<{ title: string; description: string }>(t, "metadata");
  return createMetadata({ ...metadata, path, locale: localeValue });
}
