# Component Architecture

## Goal

Build the website with reusable, data-driven components so the design remains consistent and easy to maintain.

Avoid hardcoding repeated product cards, service cards, navigation menus, FAQ entries, or feature groups directly inside page components.

## Suggested Project Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  solutions/
    xpertfactor/page.tsx
    factorix/page.tsx
    document-management/page.tsx
    ai-automation/page.tsx
    web-mobile-development/page.tsx
  services/page.tsx
  industries/page.tsx
  about/page.tsx
  resources/page.tsx
  contact/page.tsx
components/
  layout/
    SiteHeader.tsx
    MegaMenu.tsx
    MobileNav.tsx
    SiteFooter.tsx
  home/
    HeroSlider.tsx
    AudienceRouter.tsx
    TrustBar.tsx
    ServicePillars.tsx
    ProductShowcaseList.tsx
    IndustryGrid.tsx
    ProcessTimeline.tsx
    FinalCTA.tsx
  ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    SectionHeader.tsx
    IconBadge.tsx
    DashboardMockup.tsx
data/
  navigation.ts
  heroSlides.ts
  audiences.ts
  solutions.ts
  services.ts
  industries.ts
  process.ts
  faqs.ts
lib/
  cn.ts
  seo.ts
```

## Data Models

### Hero Slide

```ts
export type HeroSlide = {
  id: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  capabilities: string[];
  visualType:
    | "factoring-dashboard"
    | "erp-dashboard"
    | "document-workflow"
    | "automation-orchestration"
    | "web-mobile-architecture";
};
```

### Solution

```ts
export type Solution = {
  id: string;
  name: string;
  audience: string;
  href: string;
  headline: string;
  summary: string;
  outcomes: string[];
  features: {
    title: string;
    description: string;
  }[];
  ctaLabel: string;
};
```

### Audience Route

```ts
export type AudienceRoute = {
  id: string;
  title: string;
  problem: string;
  recommendedSolution: string;
  href: string;
  tags: string[];
  ctaLabel: string;
};
```

### Service Pillar

```ts
export type ServicePillar = {
  id: string;
  title: string;
  result: string;
  description: string;
  capabilities: string[];
  relatedTechnologies?: string[];
  href: string;
};
```

## Required Components

### `HeroSlider`

Responsibilities:

- Render all five required slides from `data/heroSlides.ts`.
- Provide previous, next, and indicator controls.
- Support touch swipe and keyboard arrows.
- Pause on hover.
- Respect reduced motion.

### `AudienceRouter`

Responsibilities:

- Render audience cards from `data/audiences.ts`.
- Route users to the correct solution.
- Make each card scannable and conversion-focused.

### `ServicePillars`

Responsibilities:

- Render four large primary service pillars.
- Include supporting service chips or compact rows.
- Make services visually prominent.

### `ProductShowcaseList`

Responsibilities:

- Render solution highlight sections from `data/solutions.ts`.
- Alternate text and visual layout on desktop.
- Stack cleanly on mobile.

### `DashboardMockup`

Responsibilities:

- Render believable branded mockups using HTML/CSS/SVG, not random stock images.
- Support visual variants for each solution.
- Preserve one Shamash color system.

## Tailwind Theme

Configure brand tokens in `tailwind.config.ts`:

```ts
colors: {
  shamash: {
    blue: "#35A8DE",
    indigo: "#505CA2",
    gold: "#E9AE11",
    navy: "#242850",
  },
  neutral: {
    page: "#F8FAFC",
    gray: "#F3F4F6",
    border: "#E5E7EB",
    text: "#374151",
    muted: "#6B7280",
    heading: "#111827",
  },
}
```

## State and Interaction

Use React state only where required:

- Hero slider active index
- Mobile navigation open state
- Mega menu active state
- FAQ accordion state

Avoid unnecessary global state.

## Implementation Quality

- Keep components small and readable.
- Keep content in data files.
- Keep visual variants controlled by explicit props.
- Use semantic elements.
- Avoid duplicated markup for each solution.
- Use strong TypeScript types for all content data.

