import { SolutionPage } from "@/components/SolutionPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "web-mobile-development", "/solutions/web-mobile-development");
}

export default function WebMobileDevelopmentPage() {
  return <SolutionPage solutionId="web-mobile-development" />;
}
