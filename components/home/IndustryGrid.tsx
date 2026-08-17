import { useTranslations } from "next-intl";
import { useLocalizedIndustries } from "@/data/localized";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, MotionSection } from "@/components/ui/Motion";

export function IndustryGrid() {
  const t = useTranslations("industries");
  const industries = useLocalizedIndustries();
  return (
    <MotionSection className="section-standard bg-white" aria-labelledby="industries-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          description={t("section.description")}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <MotionItem as="article" key={industry.id} className="card-base interactive-lift">
              <h3 className="text-xl font-bold text-shamash-navy">{industry.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-text">{industry.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.needs.map((need) => (
                  <span key={need} className="rounded-full bg-shamash-blue/10 px-3 py-1 text-xs font-semibold text-shamash-navy">
                    {need}
                  </span>
                ))}
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
