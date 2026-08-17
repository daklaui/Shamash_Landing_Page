import { useTranslations } from "next-intl";
import { ServicePillars } from "@/components/home/ServicePillars";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TechnologySection } from "@/components/home/TechnologySection";
import { FinalCTA } from "@/components/home/FinalCTA";
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
import { useLocalizedServices, useSupportingServices } from "@/data/localized";
import { createPageMetadata } from "@/lib/localizedMetadata";
import { rawMessage } from "@/i18n/raw";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "services", "/services");
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const servicePillars = useLocalizedServices();
  const supportingServices = useSupportingServices();
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
              metric="5"
              metricLabel={t("hero.metricLabel")}
              items={servicePillars.map((service) => service.title)}
              chips={rawMessage<string[]>(t, "hero.chips")}
            />
          </HeroVisual>
        </HeroContainer>
      </HeroSection>
      <ServicePillars />
      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeader
            eyebrow={t("catalog.eyebrow")}
            title={t("catalog.title")}
            description={t("catalog.description")}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {supportingServices.map((service) => (
              <MotionItem as="article" key={service} className="card-base p-5 md:p-5">
                <h2 className="text-base font-bold text-shamash-navy">{service}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-text">
                  {t("catalog.itemDescription")}
                </p>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>
      <ProcessTimeline />
      <TechnologySection />
      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-5 lg:grid-cols-4">
          {servicePillars.map((service) => (
            <MotionItem as="article" key={service.id} className="card-base">
              <h2 className="text-xl font-bold text-shamash-navy">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-text">{service.result}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.relatedTechnologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-neutral-text">
                    {tech}
                  </span>
                ))}
              </div>
            </MotionItem>
          ))}
        </div>
      </MotionSection>
      <FinalCTA title={t("finalCta")} />
    </>
  );
}
