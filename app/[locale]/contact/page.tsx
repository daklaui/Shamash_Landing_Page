import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import {
  HeroBadge,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroSection,
  HeroTitle,
  HeroVisual
} from "@/components/ui/Hero";
import { createPageMetadata } from "@/lib/localizedMetadata";
import { RouteMessages } from "@/components/RouteMessages";
import { isInterest } from "@/lib/contact-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "contact", "/contact");
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const t = await getTranslations("contact");
  const common = await getTranslations("common");
  const interest = (await searchParams).interest;
  return (
    <HeroSection tone="neutral">
      <HeroContainer>
        <HeroContent>
          <HeroBadge>{t("hero.eyebrow")}</HeroBadge>
          <HeroTitle>
            {t("hero.title")}
          </HeroTitle>
          <HeroDescription>
            {t("hero.description")}
          </HeroDescription>
          <div className="mt-8 space-y-4 text-sm font-semibold text-shamash-navy">
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.location")}
            </p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.email")}
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.availability")}
            </p>
          </div>
        </HeroContent>
        <HeroVisual>
          <RouteMessages namespace="contact"><ContactForm initialInterest={isInterest(interest) ? interest : ""} /></RouteMessages>
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
}
