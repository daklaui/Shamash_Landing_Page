"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { startTransition, useEffect, useId, useRef, useState } from "react";
import { localeConfig, locales, type AppLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({
  inverse = false,
  className,
  placement = "bottom"
}: {
  inverse?: boolean;
  className?: string;
  placement?: "top" | "bottom";
}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = Boolean(useReducedMotion());
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(() => locales.indexOf(locale));

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  const closeMenu = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openMenu = (moveFocus = false) => {
    const selectedIndex = locales.indexOf(locale);
    setFocusedIndex(selectedIndex);
    setOpen(true);
    if (moveFocus) window.requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
  };

  const switchLocale = (nextLocale: AppLocale) => {
    closeMenu();
    if (nextLocale === locale) {
      triggerRef.current?.focus();
      return;
    }

    persistLocale(nextLocale);
    const href = `${pathname}${window.location.search}${window.location.hash}`;
    startTransition(() => router.replace(href, { locale: nextLocale, scroll: false }));
  };

  const focusOption = (index: number) => {
    const nextIndex = (index + locales.length) % locales.length;
    setFocusedIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div ref={rootRef} className={cn("relative inline-flex w-full min-w-0 sm:w-auto", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t("language.currentLabel", { language: localeConfig[locale].label })}
        onClick={() => open ? closeMenu() : openMenu()}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) closeMenu();
            else openMenu(true);
          }
        }}
        className={cn(
          "group flex min-h-11 w-full items-center justify-between gap-2 rounded-full border px-2.5 py-1.5 text-sm font-black outline-none transition duration-snappy ease-premium sm:w-auto",
          "focus-visible:ring-2 focus-visible:ring-shamash-blue focus-visible:ring-offset-2",
          inverse
            ? "border-white/18 bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/30 hover:bg-white/14 focus-visible:ring-offset-shamash-navy"
            : "border-shamash-navy/10 bg-white/86 text-shamash-navy shadow-[0_8px_26px_rgba(36,40,80,0.09),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl hover:-translate-y-px hover:border-shamash-blue/35 hover:shadow-[0_12px_30px_rgba(36,40,80,0.13)]"
        )}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <LanguageEmblem locale={locale} />
          <span className="truncate">{localeConfig[locale].shortLabel}</span>
        </span>
        <span className={cn(
          "grid size-7 shrink-0 place-items-center rounded-full transition duration-snappy ease-premium",
          inverse ? "bg-white/10" : "bg-shamash-navy/[0.055] group-hover:bg-shamash-blue/10"
        )}>
          <ChevronDown aria-hidden="true" className={cn("size-3.5 transition duration-snappy ease-premium", open && "rotate-180")} />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="listbox"
            aria-label={t("language.selectorLabel")}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: placement === "top" ? 8 : -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closeMenu(true);
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                focusOption(focusedIndex + 1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusOption(focusedIndex - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                focusOption(0);
              } else if (event.key === "End") {
                event.preventDefault();
                focusOption(locales.length - 1);
              } else if (event.key === "Tab") {
                setOpen(false);
              }
            }}
            className={cn(
              "absolute end-0 z-[80] w-full min-w-[17rem] overflow-hidden rounded-[1.35rem] border border-shamash-navy/10 bg-white/95 p-2 text-shamash-navy shadow-[0_24px_70px_rgba(20,27,64,0.22)] backdrop-blur-2xl",
              placement === "top" ? "bottom-[calc(100%+0.75rem)]" : "top-[calc(100%+1.25rem)]"
            )}
          >
            <div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-shamash-blue/55 to-transparent" />
            {locales.map((item, index) => {
              const selected = item === locale;

              return (
                <button
                  key={item}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  aria-label={t("language.switchTo", { language: localeConfig[item].label })}
                  tabIndex={index === focusedIndex ? 0 : -1}
                  onFocus={() => setFocusedIndex(index)}
                  onClick={() => switchLocale(item)}
                  className={cn(
                    "group/option flex min-h-[3.65rem] w-full items-center gap-3 rounded-2xl px-3 text-start outline-none transition duration-snappy ease-premium",
                    "focus-visible:bg-shamash-blue/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-shamash-blue",
                    selected ? "bg-shamash-navy text-white shadow-[0_8px_24px_rgba(36,40,80,0.16)]" : "hover:bg-shamash-blue/[0.075]"
                  )}
                >
                  <LanguageEmblem locale={item} large />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.92rem] font-black leading-5">{localeConfig[item].label}</span>
                    <span className={cn(
                      "mt-0.5 block text-[0.64rem] font-extrabold uppercase tracking-[0.16em]",
                      selected ? "text-shamash-blue" : "text-shamash-navy/45"
                    )}>{item}</span>
                  </span>
                  <span className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border transition",
                    selected ? "border-shamash-blue/40 bg-shamash-blue text-white" : "border-shamash-navy/10 text-transparent group-hover/option:border-shamash-blue/30"
                  )}>
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function LanguageEmblem({ locale, large = false }: { locale: AppLocale; large?: boolean }) {
  const sizeClass = large ? "size-9" : "size-7";
  const sharedClass = cn(sizeClass, "shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_8px_rgba(36,40,80,0.18)]");

  if (locale === "fr") {
    return (
      <svg aria-hidden="true" viewBox="0 0 30 30" className={sharedClass}>
        <rect width="10" height="30" fill="#1A47B8" />
        <rect x="10" width="10" height="30" fill="#fff" />
        <rect x="20" width="10" height="30" fill="#F93939" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg aria-hidden="true" viewBox="0 0 30 30" className={sharedClass}>
        <rect width="30" height="30" fill="#173F8A" />
        <path d="M0 3.3 26.7 30H30v-3.3L3.3 0H0v3.3Zm30 0L3.3 30H0v-3.3L26.7 0H30v3.3Z" fill="#fff" />
        <path d="M0 1.2 28.8 30H30v-1.2L1.2 0H0v1.2Zm30 0L1.2 30H0v-1.2L28.8 0H30v1.2Z" fill="#D82838" />
        <path d="M11.5 0h7v30h-7zM0 11.5h30v7H0z" fill="#fff" />
        <path d="M13 0h4v30h-4zM0 13h30v4H0z" fill="#D82838" />
      </svg>
    );
  }

  if (locale === "tn") {
    return (
      <svg aria-hidden="true" viewBox="0 0 30 30" className={sharedClass}>
        <rect width="30" height="30" fill="#E70013" />
        <circle cx="15" cy="15" r="8.2" fill="#fff" />
        <circle cx="15.8" cy="15" r="5.4" fill="#E70013" />
        <circle cx="17.7" cy="15" r="4.5" fill="#fff" />
        <path d="m18.7 11.6.8 2.2h2.3l-1.8 1.4.7 2.2-2-1.3-1.9 1.3.7-2.2-1.8-1.4H18l.7-2.2Z" fill="#E70013" />
      </svg>
    );
  }

  return (
    <span aria-hidden="true" className={cn(sharedClass, "grid place-items-center bg-gradient-to-br from-emerald-600 to-emerald-800 text-sm font-black text-white", large && "text-base")}>
      ع
    </span>
  );
}

function persistLocale(locale: AppLocale) {
  document.cookie = `shamash_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}
