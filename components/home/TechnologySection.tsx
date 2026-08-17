import { Database, LockKeyhole, Network, ServerCog } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { useTranslations } from "next-intl";
import { rawMessage } from "@/i18n/raw";

const capabilityMeta = [
  { id: "security", icon: LockKeyhole },
  { id: "integration", icon: Network },
  { id: "operations", icon: ServerCog },
  { id: "data", icon: Database }
] as const;

export function TechnologySection() {
  const t = useTranslations("services");
  const messages = rawMessage<Record<string, { title: string; description: string }>>(t, "technology.items");
  const capabilities = capabilityMeta.map((item) => ({ ...item, ...messages[item.id] }));
  return (
    <MotionSection className="section-standard bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow={t("technology.eyebrow")}
          title={t("technology.title")}
          description={t("technology.description")}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <MotionItem as="article" key={capability.title} className="card-base interactive-lift bg-neutral-page hover:bg-white">
                <span className="motion-node grid h-11 w-11 place-items-center rounded-md bg-white text-shamash-indigo shadow-sm">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-shamash-navy">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-text">{capability.description}</p>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
