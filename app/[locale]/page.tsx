import { ClientReferences } from "@/components/home/ClientReferences";
import { ClientTestimonials } from "@/components/home/ClientTestimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SolutionsHub } from "@/components/home/SolutionsHub";
import { WhyShamash } from "@/components/home/WhyShamash";
import { createPageMetadata } from "@/lib/localizedMetadata";
import { RouteMessages } from "@/components/RouteMessages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "home");
}

export default function Home() {
  return (
    <RouteMessages namespace="home">
      <HeroSlider />
      <ClientReferences />
      <WhyShamash />
      <SolutionsHub />
      <HowItWorks />
      <ClientTestimonials />
      <FinalCTA />
    </RouteMessages>
  );
}
