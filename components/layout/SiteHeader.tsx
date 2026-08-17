"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocalizedNavigation, type NavigationItem } from "@/data/localized";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import { MobileNavController } from "./MobileNavController";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavigationItem["id"] | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations("common");
  const { main: navigation } = useLocalizedNavigation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const focusFirstMenuLink = (item: NavigationItem) => {
    setOpenMenu(item.id);
    requestAnimationFrame(() => {
      document.querySelector<HTMLAnchorElement>(`#site-mega-${item.id} [data-mega-menu-link]`)?.focus();
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "bg-shamash-navy text-white shadow-[0_16px_42px_rgba(15,23,42,0.2)]"
          : "bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,251,255,0.76)_100%)] text-shamash-navy shadow-none"
      )}
    >
      <div className="container-shell flex h-[var(--header-height)] items-center justify-between gap-3 py-2 min-[1180px]:gap-4 min-[1366px]:gap-5">
        <Link href="/" className="flex h-full shrink-0 items-center py-1 min-[1180px]:min-w-[14.75rem] min-[1440px]:min-w-[16rem]">
          <BrandLogo inverse />
        </Link>

        <nav ref={navRef} aria-label={t("navigation.primaryLabel")} className="hidden min-w-0 flex-1 items-center justify-center gap-3 min-[1180px]:flex min-[1366px]:gap-4 min-[1536px]:gap-6">
          {navigation.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.items.length > 0 && setOpenMenu(item.id)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) setOpenMenu(null);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && openMenu === item.id) {
                  event.preventDefault();
                  setOpenMenu(null);
                  event.currentTarget.querySelector<HTMLButtonElement>("[data-menu-trigger]")?.focus();
                }
              }}
            >
              {item.items.length > 0 ? (
                <button
                  type="button"
                  data-menu-trigger
                  aria-expanded={openMenu === item.id}
                  aria-controls={`site-mega-${item.id}`}
                  onClick={() => setOpenMenu((current) => current === item.id ? null : item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      focusFirstMenuLink(item);
                    }
                  }}
                  className={cn(
                    "group flex items-center gap-1.5 py-3 text-sm font-extrabold leading-5 transition duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[1440px]:text-[0.95rem]",
                    scrolled ? "text-white/90 hover:text-white focus-visible:outline-white" : "text-shamash-navy/90 hover:text-shamash-navy focus-visible:outline-shamash-blue"
                  )}
                >
                  <span className={cn(
                    "relative after:absolute after:-bottom-2 after:start-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-shamash-blue after:transition after:duration-snappy after:ease-premium rtl:after:origin-right",
                    openMenu === item.id ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-100"
                  )}>
                    {item.label}
                  </span>
                  <ChevronDown aria-hidden="true" className={cn(
                    "h-4 w-4 transition duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    openMenu === item.id && "rotate-180",
                    scrolled ? "text-white/70 group-hover:text-white" : "text-shamash-navy/60 group-hover:text-shamash-navy"
                  )} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center py-3 text-sm font-extrabold leading-5 transition duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[1440px]:text-[0.95rem]",
                    scrolled ? "text-white/90 hover:text-white focus-visible:outline-white" : "text-shamash-navy/90 hover:text-shamash-navy focus-visible:outline-shamash-blue"
                  )}
                >
                  <span className="relative after:absolute after:-bottom-2 after:start-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-shamash-blue after:transition after:duration-snappy after:ease-premium group-hover:after:scale-x-100 rtl:after:origin-right">
                    {item.label}
                  </span>
                </Link>
              )}
              <MegaMenu item={item} menuId={`site-mega-${item.id}`} open={openMenu === item.id} onNavigate={() => setOpenMenu(null)} />
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 min-[1180px]:flex min-[1366px]:gap-3 min-[1536px]:gap-4">
          <LanguageSwitcher inverse={scrolled} />
          <Button href="/contact" className="!min-h-[clamp(2.35rem,2.55vw,2.85rem)] gap-2 px-[clamp(0.95rem,1.15vw,1.45rem)] !py-2 text-[clamp(0.78rem,0.68vw,0.9rem)] [&_.button-icon]:!size-6 [&_.button-icon_svg]:!h-3.5 [&_.button-icon_svg]:!w-3.5">
            {t("actions.bookDemo")}
          </Button>
        </div>

        <MobileNavController scrolled={scrolled} />
      </div>
    </header>
  );
}
