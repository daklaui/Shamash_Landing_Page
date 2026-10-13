import { FactorixPage as FactorixExperience } from "@/components/factorix/FactorixPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";
import { RouteMessages } from "@/components/RouteMessages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "factorix", "/solutions/factorix");
}

export default function FactorixPage() {
  return <RouteMessages namespace="factorix"><FactorixExperience /></RouteMessages>;
}
