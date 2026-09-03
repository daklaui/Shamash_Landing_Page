import { RecouvrementPage as RecouvrementExperience } from "@/components/recouvrement/RecouvrementPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "recouvrement-creances", "/solutions/recouvrement-creances");
}

export default function RecouvrementPage() {
  return <RecouvrementExperience />;
}
