"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Variants } from "framer-motion";
import Image from "next/image";
import type { CSSProperties, KeyboardEvent, RefObject } from "react";
import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePlatformHubItems } from "@/data/localized";

type HubButtonRefs = Array<HTMLButtonElement | null>;

const HUB_SIZE = 320;
const HUB_CENTER = HUB_SIZE / 2;
const ORBIT_RADIUS = 130;
const BADGE_SIZE = 40;

const orbitPositions = Array.from({ length: 5 }, (_, index) => {
  const angle = -90 + index * 72;
  const radians = (angle * Math.PI) / 180;
  const centerX = HUB_CENTER + ORBIT_RADIUS * Math.cos(radians);
  const centerY = HUB_CENTER + ORBIT_RADIUS * Math.sin(radians);

  return {
    angle,
    centerX,
    centerY,
    left: centerX - BADGE_SIZE / 2,
    top: centerY - BADGE_SIZE / 2
  };
});

const hubEntranceVariants = (reducedMotion: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: reducedMotion
      ? { duration: 0 }
      : {
          delayChildren: 0,
          staggerChildren: 0.06
        }
  }
});

const emblemEntranceVariants = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }
  }
});

const badgeEntranceVariants = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.68 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }
  }
});

const ringDrawVariants = (reducedMotion: boolean): Variants => ({
  hidden: { pathLength: reducedMotion ? 1 : 0 },
  visible: {
    pathLength: 1,
    transition: { duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }
  }
});

export function SolutionsHub() {
  const t = useTranslations("home");
  const platformHubItems = usePlatformHubItems();
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<HubButtonRefs>([]);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const ringMaskId = `platform-hub-ring-${useId().replaceAll(":", "")}`;
  const activeItem = platformHubItems[activeIndex];
  const activePosition = orbitPositions[activeIndex];

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    refs: RefObject<HubButtonRefs>
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % platformHubItems.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + platformHubItems.length) % platformHubItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = platformHubItems.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    refs.current?.[nextIndex]?.focus();
  };

  const panelInitial = prefersReducedMotion ? false : { opacity: 0, y: 12 };
  const panelAnimate: TargetAndTransition = {
    opacity: 1,
    y: 0,
    transition: { duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }
  };
  const panelExit: TargetAndTransition = {
    opacity: prefersReducedMotion ? 1 : 0,
    y: prefersReducedMotion ? 0 : -6,
    transition: { duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 1, 1] }
  };

  return (
    <section className="platform-hub-section bg-white" aria-labelledby="platform-hub-title">
      <div className="container-shell">
        <div className="platform-hub-heading">
          <p className="eyebrow-text">{t("platformHub.eyebrow")}</p>
          <h2 id="platform-hub-title" className="platform-hub-title">
            {t("platformHub.title")}
          </h2>
          <p className="platform-hub-copy">
            {t("platformHub.description")}
          </p>
        </div>

        <div className="platform-hub-layout">
          <div
            className="platform-hub-list"
            role="tablist"
            aria-label={t("platformHub.selectorLabel")}
            aria-orientation="vertical"
          >
            {platformHubItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  id={`platform-hub-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="platform-hub-detail-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`why-selector-row platform-hub-row${isActive ? " why-selector-row--active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index, buttonRefs)}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="platform-hub-active-accent"
                      className="why-selector-row__accent"
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="why-selector-row__number">{item.number}</span>
                  <span className="why-selector-row__label">{item.label}</span>
                  <Icon className="why-selector-row__icon" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="platform-hub-stage" aria-hidden="true">
            <motion.div
              className="platform-hub-visual"
              variants={hubEntranceVariants(prefersReducedMotion)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <svg className="platform-hub-svg" viewBox="0 0 320 320">
                <defs>
                  <mask id={ringMaskId}>
                    <motion.circle
                      cx={HUB_CENTER}
                      cy={HUB_CENTER}
                      r="150"
                      fill="none"
                      stroke="white"
                      strokeWidth="7"
                      variants={ringDrawVariants(prefersReducedMotion)}
                    />
                  </mask>
                </defs>
                <circle
                  className="platform-hub-ring"
                  cx={HUB_CENTER}
                  cy={HUB_CENTER}
                  r="150"
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="7 9"
                  mask={`url(#${ringMaskId})`}
                />
                <AnimatePresence initial={false} mode="wait">
                  {!prefersReducedMotion ? (
                    <motion.line
                      key={activeItem.id}
                      x1={HUB_CENTER}
                      y1={HUB_CENTER}
                      x2={activePosition.centerX}
                      y2={activePosition.centerY}
                      className="platform-hub-connector"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </AnimatePresence>
              </svg>

              <motion.div
                className="platform-hub-emblem-shell"
                variants={emblemEntranceVariants(prefersReducedMotion)}
              >
                <motion.div
                  key={activeItem.id}
                  className="platform-hub-emblem"
                  animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.06, 1] }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/logos/shamash-logo-v2.webp"
                    alt="Shamash IT"
                    width={519}
                    height={207}
                    sizes="72px"
                    className="platform-hub-emblem__logo"
                  />
                </motion.div>
              </motion.div>

              {platformHubItems.map((item, index) => {
                const Icon = item.icon;
                const position = orbitPositions[index];
                const isActive = index === activeIndex;
                const positionStyle = {
                  "--orbit-left": `${position.left}px`,
                  "--orbit-top": `${position.top}px`
                } as CSSProperties;

                return (
                  <motion.div
                    key={item.id}
                    className="platform-hub-badge-slot"
                    style={positionStyle}
                    variants={badgeEntranceVariants(prefersReducedMotion)}
                  >
                    <motion.div
                      className={`platform-hub-badge${isActive ? " platform-hub-badge--active" : ""}`}
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div
            id="platform-hub-detail-panel"
            className="platform-hub-panel"
            role="tabpanel"
            aria-labelledby={`platform-hub-tab-${activeItem.id}`}
            tabIndex={0}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeItem.id}
                className="platform-hub-panel__content"
                initial={panelInitial}
                animate={panelAnimate}
                exit={panelExit}
              >
                  <p className="platform-hub-panel__eyebrow">{t("platformHub.eyebrow")} {activeItem.number}</p>
                <h3 className="platform-hub-panel__title">{activeItem.title}</h3>
                <p className="platform-hub-panel__description">{activeItem.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
