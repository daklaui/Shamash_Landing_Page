import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { localeConfig } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { siteIndexable, siteOrigin } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap", preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    ...createMetadata({ title: t("metadata.siteTitle"), description: t("metadata.siteDescription"), locale }),
    metadataBase: new URL(siteOrigin),
    title: { default: t("metadata.siteTitle"), template: "%s | Shamash IT" },
    robots: { index: siteIndexable, follow: siteIndexable }
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
    url: siteOrigin,
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
        <a href="#main-content" className="skip-link rounded-md bg-white px-4 py-3 font-semibold text-shamash-navy shadow-panel">{t("accessibility.skipToMain")}</a>
        <noscript><style>{`main [style*="opacity:0"], main [style*="opacity: 0"] { opacity: 1 !important; }`}</style></noscript>
        <NextIntlClientProvider locale={locale} messages={{ common: messages.common, solutions: messages.solutions, services: messages.services }}>
          <RouteProgress />
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
