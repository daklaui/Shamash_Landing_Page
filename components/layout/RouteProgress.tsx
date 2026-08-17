"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link) {
        return;
      }

      const url = new URL(link.href);
      const isSameOrigin = url.origin === window.location.origin;
      const isSamePath = url.pathname === window.location.pathname;
      const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      if (!isSameOrigin || isSamePath || isModified || link.target === "_blank") {
        return;
      }

      setActive(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setActive(false), 1400);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setActive(false));
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-inline-start-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-shamash-blue via-shamash-indigo to-shamash-gold transition-all duration-500 rtl:origin-right rtl:bg-gradient-to-l",
        active ? "w-full opacity-100" : "w-0 opacity-0"
      )}
    />
  );
}
