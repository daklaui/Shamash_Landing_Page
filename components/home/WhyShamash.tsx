"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useWhyShamashItems } from "@/data/localized";
import type { JourneyVisual, WhyShamashJourneyItem } from "@/data/whyShamash";

const easeOut = [0.22, 1, 0.36, 1] as const;

function JourneyMiniVisual({ variant }: { variant: JourneyVisual }) {
  return (
    <span className={`transformation-card__visual transformation-card__visual--${variant}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function JourneyStep({ item, index }: { item: WhyShamashJourneyItem; index: number }) {
  const stepRef = useRef<HTMLLIElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isInView = useInView(stepRef, { once: true, amount: 0.3, margin: "-4% 0px -16% 0px" });
  const isLeft = index % 2 === 0;
  const entryFromLeft = useLocale() === "ar" ? !isLeft : isLeft;

  return (
    <li
      ref={stepRef}
      className={`transformation-step ${isLeft ? "transformation-step--left" : "transformation-step--right"}`}
    >
      <div className="transformation-step__marker" aria-hidden="true">
        <motion.span
          className="transformation-step__node"
          initial={false}
          animate={
            isInView
              ? {
                  scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
                  backgroundColor: "#35a8de",
                  borderColor: "#ffffff",
                  boxShadow: "0 0 0 6px rgba(53, 168, 222, 0.14), 0 8px 20px rgba(36, 40, 80, 0.16)"
                }
              : {
                  scale: 1,
                  backgroundColor: "#ffffff",
                  borderColor: "#cbd5e1",
                  boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.9)"
                }
          }
          transition={{ duration: prefersReducedMotion ? 0 : 0.46, ease: easeOut }}
        />
        <motion.span
          className="transformation-step__connector"
          initial={false}
          animate={{ scaleX: isInView ? 1 : 0, opacity: isInView ? 1 : 0.35 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.56, ease: easeOut, delay: prefersReducedMotion ? 0 : 0.1 }}
        />
      </div>

      <motion.article
        className="transformation-card"
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                x: entryFromLeft ? "calc(clamp(24px, 4vw, 58px) * -1)" : "clamp(24px, 4vw, 58px)",
                scale: 0.97
              }
        }
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25, margin: "-5% 0px -12% 0px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.74, ease: easeOut }}
      >
        <div className="transformation-card__topline">
          <span className="transformation-card__icon" aria-hidden="true">
            <item.icon />
          </span>
          <span className="transformation-card__category">{item.category}</span>
          <span className="transformation-card__number">{item.number}</span>
        </div>

        <div className="transformation-card__body">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>

        <div className="transformation-card__footer">
          <span>{item.supportingLabel}</span>
          <JourneyMiniVisual variant={item.visual} />
        </div>
      </motion.article>
    </li>
  );
}

export function WhyShamash() {
  const t = useTranslations("home");
  const whyShamashItems = useWhyShamashItems();
  const journeyRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 62%", "end 48%"]
  });
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <section className="why-shamash-section bg-neutral-page" aria-labelledby="why-shamash-title">
      <div className="container-shell">
        <header className="transformation-heading">
          <p className="eyebrow-text">{t("why.eyebrow")}</p>
          <h2 id="why-shamash-title">{t("why.title")}</h2>
          <p>{t("why.description")}</p>
        </header>

        <div className="transformation-journey-shell">
          <span className="transformation-journey__path" aria-hidden="true" />
          <motion.span
            className="transformation-journey__progress"
            style={{ scaleY: prefersReducedMotion ? 1 : pathProgress }}
            aria-hidden="true"
          />
          <ol ref={journeyRef} className="transformation-journey" aria-label={t("why.journeyLabel")}>
            {whyShamashItems.map((item, index) => (
              <JourneyStep key={item.id} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
