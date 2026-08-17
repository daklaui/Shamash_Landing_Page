import { SolutionPage } from "@/components/SolutionPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "ai-automation", "/solutions/ai-automation");
}

export default function AiAutomationPage() {
  return <SolutionPage solutionId="ai-automation" />;
}
