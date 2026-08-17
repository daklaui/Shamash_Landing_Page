"use client";

import type { ReactNode } from "react";
import { MotionItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";

type HeroSectionProps = {
  children: ReactNode;
  tone?: "white" | "neutral";
  className?: string;
};

type HeroContainerProps = {
  children: ReactNode;
  variant?: "split" | "center";
  visualPosition?: "right" | "left";
  className?: string;
};

export function HeroSection({ children, tone = "white", className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "hero-section",
        tone === "neutral" ? "bg-neutral-page" : "bg-white",
        className
      )}
    >
      {children}
    </section>
  );
}

export function HeroContainer({
  children,
  variant = "split",
  visualPosition = "right",
  className
}: HeroContainerProps) {
  return (
    <div
      className={cn(
        "hero-container",
        variant === "center" ? "hero-container--center" : "hero-container--split",
        visualPosition === "left" && "hero-container--visual-left",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroContent({ children, className }: { children: ReactNode; className?: string }) {
  return <MotionItem className={cn("hero-content", className)}>{children}</MotionItem>;
}

export function HeroBadge({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("hero-badge", className)}>{children}</p>;
}

export function HeroTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("hero-title text-balance", className)}>{children}</h1>;
}

export function HeroDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("hero-description", className)}>{children}</p>;
}

export function HeroActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("hero-actions", className)}>{children}</div>;
}

export function HeroVisual({
  children,
  bleed = false,
  className
}: {
  children: ReactNode;
  bleed?: boolean;
  className?: string;
}) {
  return (
    <MotionItem className={cn("hero-visual", bleed && "hero-visual--bleed", className)}>
      {children}
    </MotionItem>
  );
}

export function HeroSignalPanel({
  eyebrow,
  title,
  metric,
  metricLabel,
  items,
  chips,
  className
}: {
  eyebrow: string;
  title: string;
  metric?: string;
  metricLabel?: string;
  items: string[];
  chips?: string[];
  className?: string;
}) {
  return (
    <div className={cn("hero-signal-panel", className)} aria-hidden="true">
      <div className="hero-signal-panel__glow" />
      <div className="relative">
        <p className="hero-badge text-shamash-blue">{eyebrow}</p>
        <h2 className="mt-4 text-[clamp(1.35rem,2vw,2rem)] font-black leading-tight text-white">
          {title}
        </h2>
        {metric && metricLabel ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-[0.72fr_1.28fr] sm:items-end">
            <p className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-none text-white">
              {metric}
            </p>
            <p className="pb-2 text-sm font-semibold leading-6 text-white/72">{metricLabel}</p>
          </div>
        ) : null}
        <div className="mt-7 grid gap-3">
          {items.map((item, index) => (
            <div key={item} className="hero-signal-panel__row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        {chips?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="hero-signal-panel__chip">
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
