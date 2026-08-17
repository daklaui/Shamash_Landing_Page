"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

export function MobileNavController({ scrolled = true }: { scrolled?: boolean }) {
  const t = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label={t("navigation.openMenu")}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full border transition duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[1180px]:hidden",
          scrolled
            ? "border-white/16 bg-white/8 text-white hover:bg-white/14"
            : "border-shamash-navy/12 bg-white/70 text-shamash-navy shadow-sm hover:bg-white"
        )}
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
