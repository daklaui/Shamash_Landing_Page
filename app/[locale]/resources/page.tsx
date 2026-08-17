import { useTranslations } from "next-intl";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FaqAccordion } from "@/components/FaqAccordion";
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
import { useLocalizedSolutions } from "@/data/localized";
import { createPageMetadata } from "@/lib/localizedMetadata";
import { rawMessage } from "@/i18n/raw";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "resources", "/resources");
}

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const solutions = useLocalizedSolutions();
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
              metric={`${solutions.length}`}
              metricLabel={t("hero.metricLabel")}
              items={solutions.slice(0, 4).map((solution) => solution.name)}
              chips={rawMessage<string[]>(t, "hero.chips")}
            />
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <MotionItem as="article" key={solution.id} className="card-base">
              <p className="eyebrow-text">{solution.audience}</p>
              <h2 className="mt-3 text-xl font-bold text-shamash-navy">{t("briefTitle", { name: solution.name })}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-text">{solution.summary}</p>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <MotionItem>
            <p className="eyebrow-text">{t("faq.eyebrow")}</p>
            <h2 className="heading-section mt-3">
              {t("faq.title")}
            </h2>
          </MotionItem>
          <FaqAccordion />
        </div>
      </MotionSection>
      <FinalCTA title={t("finalCta")} />
    </>
  );
}
