import { RecouvrementPage as RecouvrementExperience } from "@/components/recouvrement/RecouvrementPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";
import { RouteMessages } from "@/components/RouteMessages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "recouvrement-creances", "/solutions/recouvrement-creances");
}

export default function RecouvrementPage() {
  return <RouteMessages namespace="recouvrementCreances"><RecouvrementExperience /></RouteMessages>;
}
