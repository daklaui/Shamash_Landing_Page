import { useTranslations } from "next-intl";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
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
import { createPageMetadata } from "@/lib/localizedMetadata";
import { rawMessage } from "@/i18n/raw";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "about", "/about");
}

export default function AboutPage() {
  const t = useTranslations("about");
  const values = rawMessage<string[]>(t, "values");
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
              metric="4"
              metricLabel={t("hero.metricLabel")}
              items={values.slice(0, 4)}
              chips={rawMessage<string[]>(t, "hero.chips")}
            />
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-5 md:grid-cols-5">
          {values.map((value) => (
            <MotionItem as="article" key={value} className="card-base p-5 md:p-5">
              <h2 className="text-base font-bold leading-6 text-shamash-navy">{value}</h2>
            </MotionItem>
          ))}
        </div>
      </MotionSection>
      <ProcessTimeline />
      <FinalCTA title={t("finalCta")} />
    </>
  );
}
