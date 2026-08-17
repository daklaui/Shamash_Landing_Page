"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const LOGO_SOURCE = "/logos/shamash-logo-v2.webp";

export function SiteLoader() {
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const finishStartedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    finishStartedRef.current = false;
    root.classList.add("site-loader-active");
    body.classList.add("site-loader-active");

    const releasePage = () => {
      root.classList.remove("site-loader-active");
      body.classList.remove("site-loader-active");
    };

    const finish = () => {
      if (finishStartedRef.current) return;
      finishStartedRef.current = true;

      const completionTime = prefersReducedMotion ? 0 : 620;
      const exitTime = prefersReducedMotion ? 120 : 720;

      setIsReady(true);
      timersRef.current.push(window.setTimeout(() => setIsExiting(true), completionTime));
      timersRef.current.push(
        window.setTimeout(() => {
          releasePage();
          setIsHidden(true);
        }, completionTime + exitTime)
      );
    };

    if (document.readyState === "complete") {
      timersRef.current.push(window.setTimeout(finish, 0));
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // A stalled third-party request must never trap visitors behind the loader.
    timersRef.current.push(window.setTimeout(finish, 8000));

    return () => {
      window.removeEventListener("load", finish);
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
      releasePage();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={cn(
        "site-loader",
        isReady && "site-loader--ready",
        isExiting && "site-loader--exiting"
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading Shamash Information Technology"
    >
      <div className="site-loader__atmosphere" aria-hidden="true" />

      <div className="site-loader__logo-wrap" aria-hidden="true">
        <svg
          className="site-loader__logo"
          viewBox="0 0 1982 917"
          role="presentation"
          focusable="false"
          shapeRendering="geometricPrecision"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="shamash-loader-compass-clip">
              <rect x="132" y="48" width="228" height="224" />
            </clipPath>
            <clipPath id="shamash-loader-s-clip">
              <rect x="0" y="0" width="522" height="838" />
            </clipPath>
            <clipPath id="shamash-loader-wordmark-clip">
              <rect x="518" y="350" width="1464" height="420" />
            </clipPath>
            <clipPath id="shamash-loader-tagline-clip">
              <rect x="810" y="770" width="1172" height="147" />
            </clipPath>
            <mask id="shamash-loader-s-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="530" height="850">
              <rect width="530" height="850" fill="black" />
              <path
                className="site-loader__s-path site-loader__s-path--upper"
                d="M 496 258 C 496 126 390 22 260 22 C 128 22 22 128 22 260 C 22 392 126 493 259 495"
                fill="none"
                stroke="white"
                strokeWidth="76"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="site-loader__s-path site-loader__s-path--lower"
                d="M 22 570 C 22 705 126 808 258 808 C 390 808 496 703 496 571 C 496 450 407 350 259 332"
                fill="none"
                stroke="white"
                strokeWidth="76"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="site-loader__s-path site-loader__s-path--inner"
                d="M 355 453 C 392 493 411 534 411 576 C 411 658 345 723 258 723 C 232 723 210 719 191 709"
                fill="none"
                stroke="white"
                strokeWidth="70"
                strokeLinecap="butt"
                strokeLinejoin="round"
              />
            </mask>
            <mask id="shamash-loader-logo-alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1982" height="917">
              <image href={LOGO_SOURCE} x="0" y="0" width="1982" height="917" />
            </mask>
            <linearGradient id="shamash-loader-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.48" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="0.52" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g clipPath="url(#shamash-loader-compass-clip)">
            <g className="site-loader__compass">
              <image href={LOGO_SOURCE} x="0" y="0" width="1982" height="917" />
            </g>
          </g>

          <g clipPath="url(#shamash-loader-s-clip)" mask="url(#shamash-loader-s-mask)">
            <image href={LOGO_SOURCE} x="0" y="0" width="1982" height="917" />
          </g>

          <g clipPath="url(#shamash-loader-wordmark-clip)">
            <g className="site-loader__wordmark">
              <image href={LOGO_SOURCE} x="0" y="0" width="1982" height="917" />
            </g>
          </g>

          <g clipPath="url(#shamash-loader-tagline-clip)">
            <g className="site-loader__tagline">
              <image href={LOGO_SOURCE} x="0" y="0" width="1982" height="917" />
            </g>
          </g>

          <g clipPath="url(#shamash-loader-wordmark-clip)" mask="url(#shamash-loader-logo-alpha)">
            <rect
              className="site-loader__sheen"
              x="-520"
              y="340"
              width="340"
              height="450"
              fill="url(#shamash-loader-sheen)"
            />
          </g>
        </svg>

        <div
          className="site-loader__progress"
          role="progressbar"
          aria-label="Website loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isReady ? 100 : undefined}
          aria-valuetext={isReady ? "Ready" : "Loading"}
        >
          <span className="site-loader__progress-track">
            <span className="site-loader__progress-fill" />
            <span className="site-loader__progress-complete" />
          </span>
        </div>
      </div>

      <span className="sr-only">Loading Shamash Information Technology</span>
    </div>
  );
}
