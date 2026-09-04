"use client";

import { ChevronDown, ChevronRight, Mail, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocalizedNavigation } from "@/data/localized";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavigationItemIcon } from "./MegaMenu";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("common");
  const { main: navigation } = useLocalizedNavigation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>("[data-mobile-close]")?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-shamash-navy/62 backdrop-blur-sm min-[1180px]:hidden">
      <button type="button" aria-label={t("navigation.closeBackdrop")} className="absolute inset-0 cursor-default" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t("navigation.dialogLabel")} className="relative ms-auto flex h-dvh w-full max-w-[28rem] flex-col overflow-hidden bg-shamash-navy text-white shadow-premium">
        <div className="flex min-h-[4.5rem] items-center justify-between border-b border-white/10 px-5 sm:px-6">
          <Link href="/" onClick={onClose} className="font-bold"><BrandLogo inverse compact /></Link>
          <button type="button" data-mobile-close onClick={onClose} aria-label={t("navigation.closeMenu")} className="grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/8 text-white transition duration-snappy ease-premium hover:bg-white/14 focus-visible:bg-white/14">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-6">
          <nav aria-label={t("navigation.mobileLabel")} className="space-y-6">
            {navigation.map((item) => (
              <div key={item.id} className="border-b border-white/10 pb-3 last:border-b-0">
                {item.items.length > 0 ? (
                  <button
                    type="button"
                    aria-expanded={expandedItem === item.id}
                    aria-controls={`mobile-accordion-${item.id}`}
                    onClick={() => setExpandedItem((current) => current === item.id ? null : item.id)}
                    className="flex min-h-12 w-full items-center justify-between rounded-md text-start text-lg font-black text-white transition duration-snappy ease-premium hover:text-shamash-blue focus-visible:text-shamash-blue"
                  >
                    <span>{item.label}</span>
                    <ChevronDown aria-hidden="true" className={`h-5 w-5 text-shamash-blue transition-transform duration-snappy ${expandedItem === item.id ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link href={item.href} onClick={onClose} className="flex min-h-12 items-center justify-between rounded-md text-lg font-black text-white transition duration-snappy ease-premium hover:text-shamash-blue focus-visible:text-shamash-blue">
                    <span>{item.label}</span><ChevronRight aria-hidden="true" className="h-5 w-5 text-shamash-blue rtl:rotate-180" />
                  </Link>
                )}
                {item.items.length > 0 && expandedItem === item.id ? (
                  <div id={`mobile-accordion-${item.id}`} className="mt-2 grid gap-2 pb-1">
                    {item.items.map((subItem) => (
                      <Link key={`${item.id}-${subItem.id}`} href={subItem.href} onClick={onClose} className="block rounded-lg border border-white/12 bg-white/6 px-3.5 py-3.5 text-sm leading-6 text-white/74 transition duration-snappy ease-premium hover:border-shamash-blue/50 hover:bg-white/10 focus-visible:border-shamash-blue/60 focus-visible:bg-white/10">
                        <span className="flex items-start gap-3">
                          <NavigationItemIcon icon={subItem.icon} />
                          <span className="min-w-0">
                            <span className="block font-black text-white">{subItem.label}</span>
                            <span className="mt-1 block line-clamp-2 text-xs leading-5 text-white/68">{subItem.description}</span>
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6">
            <Button href="/contact" onClick={onClose} className="w-full !min-h-12 text-sm">{t("actions.bookDemo")}</Button>
            <LanguageSwitcher inverse placement="top" className="w-full" />

            <address className="mt-3 grid gap-3 border-t border-white/10 pt-5 text-sm not-italic">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-shamash-blue">
                {t("navigation.contact")}
              </p>
              <a
                href={`mailto:${t("contactInfo.email")}`}
                className="flex min-h-11 items-center gap-3 rounded-lg border border-white/12 bg-white/6 px-3.5 text-white/78 transition duration-snappy ease-premium hover:border-shamash-blue/50 hover:bg-white/10 hover:text-white focus-visible:border-shamash-blue/60 focus-visible:bg-white/10 focus-visible:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-shamash-blue" />
                <span className="break-all">{t("contactInfo.email")}</span>
              </a>
              <a
                href="tel:+21698675013"
                className="flex min-h-11 items-center gap-3 rounded-lg border border-white/12 bg-white/6 px-3.5 text-white/78 transition duration-snappy ease-premium hover:border-shamash-blue/50 hover:bg-white/10 hover:text-white focus-visible:border-shamash-blue/60 focus-visible:bg-white/10 focus-visible:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-shamash-blue" />
                <span>{t("contactInfo.phone")}</span>
              </a>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
