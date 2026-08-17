import { cn } from "@/lib/cn";

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("text-xs font-black uppercase tracking-[0.18em]", inverse ? "text-shamash-blue" : "text-shamash-indigo")}>{eyebrow}</p>
      <h2 className={cn("mt-4 text-3xl font-black leading-[1.08] tracking-[-0.025em] sm:text-4xl lg:text-5xl", inverse ? "text-white" : "text-shamash-navy")}>{title}</h2>
      <p className={cn("mt-5 text-base leading-7 sm:text-lg", inverse ? "text-white/70" : "text-neutral-text")}>{description}</p>
    </div>
  );
}
