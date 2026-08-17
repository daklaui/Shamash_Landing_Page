import { SolutionPage } from "@/components/SolutionPage";
import { createSolutionMetadata } from "@/lib/localizedMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createSolutionMetadata((await params).locale, "document-management", "/solutions/document-management");
}

export default function DocumentManagementPage() {
  return <SolutionPage solutionId="document-management" />;
}
