import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function BrandLogo({
  inverse = false,
  compact = false,
  className
}: {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const t = useTranslations("common");

  return (
    <span className="inline-flex items-center">
      <span
        className={cn(
          "relative block",
          compact
            ? "h-[3.5rem] w-[clamp(11rem,45vw,14rem)]"
            : "h-[clamp(3.35rem,5.15vw,4.65rem)] w-[clamp(13rem,20vw,18.75rem)]",
          inverse && "drop-shadow-[0_1px_10px_rgba(255,255,255,0.18)]",
          className
        )}
      >
        <Image
          src="/logos/shamash-logo-v2.webp"
          alt={t("brand.logoAlt")}
          fill
          sizes={compact ? "(max-width: 480px) 45vw, 224px" : "(max-width: 1179px) 240px, 300px"}
          className="object-contain object-left"
          preload
        />
      </span>
    </span>
  );
}
