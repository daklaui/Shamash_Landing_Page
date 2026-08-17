"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main section",
  "main article",
  "main .interface-theater",
  "main [data-reveal-item]"
].join(", ");

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element, index) => {
      element.dataset.reveal = "true";
      element.style.setProperty("--reveal-index", String(Math.min(index % 8, 7)));

      if (prefersReducedMotion) {
        element.dataset.revealState = "in";
      }
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.revealState = "in";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.revealState = "in";
            observer.unobserve(target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
