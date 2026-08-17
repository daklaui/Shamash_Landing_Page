import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { localeConfig } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    ...createMetadata({ title: t("metadata.siteTitle"), description: t("metadata.siteDescription"), locale }),
    metadataBase: new URL("https://www.shamash-it.com"),
    title: { default: t("metadata.siteTitle"), template: "%s | Shamash IT" },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "common" });
  const config = localeConfig[locale];
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shamash IT",
    url: "https://www.shamash-it.com",
    description: t("metadata.organizationDescription"),
    areaServed: ["Tunisia", "Africa", "Europe"],
    knowsAbout: ["Enterprise software", "FinTech", "Factoring", "ERP", "AI", "Cloud", "Cybersecurity"]
  };

  return (
    <html lang={config.htmlLang} dir={config.direction} className={`${inter.variable} ${notoArabic.variable}`}>
      <body data-locale={locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteLoader />
          <RouteProgress />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
