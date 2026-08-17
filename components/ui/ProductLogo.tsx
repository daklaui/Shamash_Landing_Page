import Image from "next/image";
import { solutionIdentity, type SolutionIdentityId } from "@/data/preparedInformation";
import { cn } from "@/lib/cn";
import { SolutionMark } from "./SolutionMark";
import { useLocalizedSolution } from "@/data/localized";

export function ProductLogo({
  id,
  className,
  priority = false
}: {
  id: SolutionIdentityId;
  className?: string;
  priority?: boolean;
}) {
  const identity = solutionIdentity[id];
  const localized = useLocalizedSolution(id);

  if (!identity.logo) {
    return <SolutionMark id={id} size="lg" showLabel className={className} />;
  }

  return (
    <div className={cn("relative h-16 w-full max-w-80", className)}>
      <Image
        src={identity.logo}
        alt={localized.name}
        fill
        sizes="320px"
        className="object-contain object-left rtl:object-right"
        preload={priority}
      />
    </div>
  );
}
