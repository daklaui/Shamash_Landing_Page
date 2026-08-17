import { useTranslations } from "next-intl";
import { FinalCTA } from "@/components/home/FinalCTA";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  HeroBadge,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroSection,
  HeroSignalPanel,
  HeroTitle,
  HeroVisual
} from "@/components/ui/Hero";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { useLocalizedIndustries } from "@/data/localized";
import { createPageMetadata } from "@/lib/localizedMetadata";
import { rawMessage } from "@/i18n/raw";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "industries", "/industries");
}

export default function IndustriesPage() {
  const t = useTranslations("industries");
  const industries = useLocalizedIndustries();
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
          <HeroBadge>{t("hero.eyebrow")}</HeroBadge>
          <HeroTitle>
            {t("hero.title")}
          </HeroTitle>
          <HeroDescription>
            {t("hero.description")}
          </HeroDescription>
          </HeroContent>
          <HeroVisual>
            <HeroSignalPanel
              eyebrow={t("hero.panelEyebrow")}
              title={t("hero.panelTitle")}
              metric={`${industries.length}`}
              metricLabel={t("hero.metricLabel")}
              items={industries.slice(0, 4).map((industry) => industry.name)}
              chips={rawMessage<string[]>(t, "hero.chips")}
            />
          </HeroVisual>
        </HeroContainer>
      </HeroSection>
      <IndustryGrid />
      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeader
            eyebrow={t("needs.eyebrow")}
            title={t("needs.title")}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <MotionItem as="article" key={industry.id} className="card-base">
                <h2 className="text-xl font-bold text-shamash-navy">{industry.name}</h2>
                <ul className="mt-5 space-y-3">
                  {industry.needs.map((need) => (
                    <li key={need} className="text-sm font-semibold text-neutral-text">
                      <span className="me-2 text-shamash-blue">•</span>
                      {need}
                    </li>
                  ))}
                </ul>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>
      <FinalCTA title={t("finalCta")} />
    </>
  );
}
