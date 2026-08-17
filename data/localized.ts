import {
  BarChart3,
  Database,
  LockKeyhole,
  Network,
  RefreshCw,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Workflow
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { VisualType } from "./solutions";
import { rawMessage } from "@/i18n/raw";

export const solutionIds = [
  "xpertfactor",
  "factorix",
  "document-management",
  "ai-automation",
  "web-mobile-development"
] as const;

export type SolutionId = (typeof solutionIds)[number];

const solutionMeta: Record<SolutionId, { href: string; visualType: VisualType }> = {
  xpertfactor: { href: "/solutions/xpertfactor", visualType: "factoring-dashboard" },
  factorix: { href: "/solutions/factorix", visualType: "erp-dashboard" },
  "document-management": { href: "/solutions/document-management", visualType: "document-workflow" },
  "ai-automation": { href: "/solutions/ai-automation", visualType: "automation-orchestration" },
  "web-mobile-development": { href: "/solutions/web-mobile-development", visualType: "web-mobile-architecture" }
};

export type LocalizedSolution = {
  id: SolutionId;
  name: string;
  audience: string;
  href: string;
  headline: string;
  summary: string;
  outcomes: string[];
  features: { title: string; description: string }[];
  workflow: string[];
  integrations: string[];
  visualType: VisualType;
  ctaLabel: string;
  metadata: { title: string; description: string };
};

export function useLocalizedSolutions(): LocalizedSolution[] {
  const t = useTranslations("solutions");
  const items = rawMessage<Record<SolutionId, Omit<LocalizedSolution, "id" | "href" | "visualType" | "features"> & { features: Record<string, { title: string; description: string }> }>>(t, "items");

  return solutionIds.map((id) => ({
    id,
    ...items[id],
    ...solutionMeta[id],
    features: Object.values(items[id].features)
  }));
}

export function useLocalizedSolution(id: SolutionId) {
  return useLocalizedSolutions().find((solution) => solution.id === id)!;
}

const serviceIds = ["enterprise-software", "ai-automation", "cloud-security", "managed-it"] as const;
export type ServiceId = (typeof serviceIds)[number];

export function useLocalizedServices() {
  const t = useTranslations("services");
  const items = rawMessage<Record<ServiceId, { title: string; result: string; description: string; capabilities: string[]; technologies: string[] }>>(t, "items");
  return serviceIds.map((id) => ({ id, ...items[id], relatedTechnologies: items[id].technologies, href: "/services" }));
}

export function useSupportingServices() {
  return rawMessage<string[]>(useTranslations("services"), "supporting");
}

const industryIds = ["banking", "sme", "enterprise", "administration", "technology", "executives"] as const;

export function useLocalizedIndustries() {
  const items = rawMessage<Record<(typeof industryIds)[number], { name: string; description: string; needs: string[] }>>(useTranslations("industries"), "items");
  return industryIds.map((id) => ({ id, ...items[id] }));
}

const heroMeta: Record<SolutionId, { primaryHref: string; secondaryHref: string; image: string; visualType: VisualType }> = {
  xpertfactor: { primaryHref: "/solutions/xpertfactor", secondaryHref: "/contact", image: "/images/hero-xpertfactor.png", visualType: "factoring-dashboard" },
  factorix: { primaryHref: "/solutions/factorix", secondaryHref: "/contact", image: "/images/hero-factorix.png", visualType: "erp-dashboard" },
  "document-management": { primaryHref: "/solutions/document-management", secondaryHref: "/contact", image: "/images/hero-document-management.png", visualType: "document-workflow" },
  "ai-automation": { primaryHref: "/solutions/ai-automation", secondaryHref: "/resources", image: "/images/hero-ai-automation.png", visualType: "automation-orchestration" },
  "web-mobile-development": { primaryHref: "/solutions/web-mobile-development", secondaryHref: "/services", image: "/images/hero-web-mobile-development.png", visualType: "web-mobile-architecture" }
};

export function useLocalizedHeroSlides() {
  const items = rawMessage<Record<SolutionId, {
    category: string; title: string; headline: string; description: string; primaryCta: string; secondaryCta: string;
    capabilities: string[]; imageAlt: string; metrics: { label: string; value: string }[];
  }>>(useTranslations("home"), "hero.slides");
  return solutionIds.map((id) => ({
    id,
    ...items[id],
    primaryCta: { label: items[id].primaryCta, href: heroMeta[id].primaryHref },
    secondaryCta: { label: items[id].secondaryCta, href: heroMeta[id].secondaryHref },
    image: { src: heroMeta[id].image, alt: items[id].imageAlt },
    visualType: heroMeta[id].visualType
  }));
}

const whyMeta = [
  { id: "connect-systems", number: "01", icon: Network, visual: "integration" },
  { id: "automate-work", number: "02", icon: Workflow, visual: "workflow" },
  { id: "centralize-information", number: "03", icon: Database, visual: "data" },
  { id: "real-time-visibility", number: "04", icon: BarChart3, visual: "visibility" },
  { id: "secure-operations", number: "05", icon: ShieldCheck, visual: "security" },
  { id: "scale-simply", number: "06", icon: TrendingUp, visual: "scale" }
] as const;

export function useWhyShamashItems() {
  const items = rawMessage<Record<string, { category: string; title: string; description: string; supportingLabel: string }>>(useTranslations("home"), "why.items");
  return whyMeta.map((meta) => ({ ...meta, ...items[meta.id] }));
}

const platformMeta = [
  { id: "deployment-speed", number: "01", icon: Rocket },
  { id: "process-automation", number: "02", icon: RefreshCw },
  { id: "compliance-traceability", number: "03", icon: ShieldCheck },
  { id: "system-security", number: "04", icon: LockKeyhole },
  { id: "operational-roi", number: "05", icon: BarChart3 }
] as const;

export function usePlatformHubItems() {
  const items = rawMessage<Record<string, { label: string; title: string; description: string }>>(useTranslations("home"), "platformHub.items");
  return platformMeta.map((meta) => ({ ...meta, ...items[meta.id] }));
}

const deliveryIds = ["understand", "design", "integrate", "support"] as const;
export function useDeliverySteps() {
  const items = rawMessage<Record<(typeof deliveryIds)[number], { title: string; summary: string }>>(useTranslations("home"), "how.steps");
  return deliveryIds.map((id, index) => ({ id, number: String(index + 1).padStart(2, "0"), ...items[id] }));
}

const processIds = ["discover", "design", "build", "integrate", "support"] as const;
export function useProcessSteps() {
  const items = rawMessage<Record<(typeof processIds)[number], { title: string; description: string }>>(useTranslations("services"), "process.steps");
  return processIds.map((id) => ({ id, ...items[id] }));
}

const testimonialIds = ["nt", "amara-bouzayani", "abir-jalouli", "haithem-ben-moulehom"] as const;
export function useLocalizedTestimonials() {
  const items = rawMessage<Record<(typeof testimonialIds)[number], { name: string; role: string; organization: string; theme: string[]; copy: string }>>(useTranslations("home"), "testimonials.items");
  return testimonialIds.map((id, index) => ({ id, ...items[id], status: "approved" as const, featured: index === 0 }));
}

export function useLocalizedFaqs() {
  const items = rawMessage<Record<string, { question: string; answer: string }>>(useTranslations("common"), "faq.items");
  return Object.entries(items).map(([id, item]) => ({ id, ...item }));
}

export type NavigationItem = {
  id: "solutions" | "services" | "resources" | "company";
  label: string;
  href: string;
  overviewHref?: string;
  items: {
    id: string;
    label: string;
    href: string;
    eyebrow: string;
    description: string;
    icon?:
      | { kind: "solution"; id: SolutionId }
      | { kind: "service"; id: ServiceId };
  }[];
};

export function useLocalizedNavigation() {
  const common = useTranslations("common");
  const solutions = useLocalizedSolutions();
  const services = useLocalizedServices();
  const navigationSolutions = solutions.filter((item) => item.id !== "web-mobile-development");
  const navigationServices = services.filter((item) => item.id !== "ai-automation");
  const solutionNavigationLabel = (item: LocalizedSolution) =>
    item.id === "ai-automation" ? common("navigation.automationWorkflows") : item.name;

  const main: NavigationItem[] = [
    {
      id: "solutions",
      label: common("navigation.solutions"),
      href: solutions[0].href,
      items: navigationSolutions.map((item) => ({
        id: item.id,
        label: solutionNavigationLabel(item),
        href: item.href,
        eyebrow: item.audience,
        description: item.summary,
        icon: { kind: "solution", id: item.id }
      }))
    },
    {
      id: "services",
      label: common("navigation.services"),
      href: "/services",
      overviewHref: "/services",
      items: navigationServices.map((item) => ({
        id: item.id,
        label: item.title,
        href: item.href,
        eyebrow: common("navigation.strategicCapability"),
        description: item.description,
        icon: { kind: "service", id: item.id }
      }))
    },
    { id: "resources", label: common("navigation.resources"), href: "/resources", items: [] },
    { id: "company", label: common("navigation.company"), href: "/about", overviewHref: "/about", items: [
      { id: "about", label: common("navigation.about"), href: "/about", eyebrow: common("navigation.company"), description: common("navigation.aboutDescription") },
      { id: "contact", label: common("navigation.contact"), href: "/contact", eyebrow: common("navigation.consultation"), description: common("navigation.contactDescription") }
    ] }
  ];

  return {
    main,
    footer: {
      solutions: navigationSolutions.map((item) => ({ label: solutionNavigationLabel(item), href: item.href })),
      services: navigationServices.map(({ title: label, href }) => ({ label, href })),
      company: [
        { label: common("navigation.resources"), href: "/resources" },
        { label: common("navigation.about"), href: "/about" },
        { label: common("navigation.contact"), href: "/contact" }
      ]
    }
  };
}
