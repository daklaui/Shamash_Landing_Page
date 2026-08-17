"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLocalizedNavigation } from "@/data/localized";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function SiteFooter() {
  const t = useTranslations("common");
  const { footer } = useLocalizedNavigation();
  return (
    <footer className="bg-shamash-navy text-white">
      <div className="container-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3"><BrandLogo inverse /></Link>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">{t("footer.description")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact">{t("actions.requestConsultation")}</Button>
              <Button href="/services" variant="secondary">{t("actions.viewServices")}</Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title={t("footer.solutions")} items={footer.solutions} />
            <FooterColumn title={t("footer.services")} items={footer.services} />
            <FooterColumn title={t("footer.company")} items={footer.company} />
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/15 pt-8 text-sm leading-6 text-white/70 md:grid-cols-3">
          <p className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4 text-shamash-blue" />{t("contactInfo.location")}</p>
          <p className="flex items-center gap-2"><Mail aria-hidden="true" className="h-4 w-4 text-shamash-blue" />{t("contactInfo.email")}</p>
          <p className="flex items-center gap-2"><Phone aria-hidden="true" className="h-4 w-4 text-shamash-blue" />{t("contactInfo.availability")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow-text text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => <li key={`${title}-${item.label}`}><Link href={item.href} className="rounded-sm text-sm text-white/72 transition duration-snappy ease-premium hover:text-white focus-visible:text-white">{item.label}</Link></li>)}
      </ul>
    </nav>
  );
}
