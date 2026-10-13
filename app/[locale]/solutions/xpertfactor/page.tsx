import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { XpertFactorPage as XpertFactorProductPage } from "@/components/xpertfactor/XpertFactorPage";
import { isAppLocale } from "@/i18n/config";
import { rawMessage } from "@/i18n/raw";
import { createMetadata } from "@/lib/seo";
import { RouteMessages } from "@/components/RouteMessages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "xpertFactor" });
  const metadata = rawMessage<{ title: string; description: string }>(t, "metadata");
  return createMetadata({ ...metadata, locale, path: "/solutions/xpertfactor" });
}

export default function XpertFactorPage() {
  return <RouteMessages namespace="xpertFactor"><XpertFactorProductPage /></RouteMessages>;
}
