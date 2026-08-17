# AI Agent Instructions for Shamash IT Website

You are building the Shamash IT website from this build pack. Treat these files as the source of truth.

## Mission

Create a premium enterprise website that helps visitors quickly identify the Shamash IT solution that fits their organization.

The homepage must answer within five seconds:

> Which Shamash IT solution is right for me?

## Required Outcome

Build a complete, polished, responsive, accessible, high-performance Next.js website using TypeScript and Tailwind CSS.

The site must feel like an enterprise software company and digital-transformation partner, not a basic web agency.

## Strategic Positioning

Shamash IT is positioned between:

- An enterprise software company
- A FinTech specialist
- A digital-transformation consultancy
- A managed technology partner

The brand must feel:

- Professional
- Premium
- Reliable
- Modern
- Intelligent
- Enterprise-focused
- Human
- Confident
- Secure
- Technically strong

## Visual Non-Negotiables

Use one unified Shamash IT brand system across all products.

Do not create separate dominant product palettes for XpertFactor, Factorix, Document Management, AI Automation, or Web and Mobile.

Use this ratio:

- 70% white and neutral surfaces
- 20% Shamash Blue `#35A8DE`
- 8% Enterprise Indigo `#505CA2`
- 2% Compass Gold `#E9AE11`

Use Midnight Navy `#242850` for headings, footer, selected premium panels, and high-contrast sections.

## Forbidden Visuals

Do not use:

- Generic corporate buildings
- Decorative skyscraper scenes
- Generic robots
- Cyberpunk visuals
- Dark full-page technology backgrounds
- Futuristic city stock imagery
- Floating AI cubes
- Random stock photos of people
- Overly colorful product themes
- Low-cost agency design patterns
- Cartoonish illustrations
- Visuals that do not explain a product, workflow, interface, or business result

## Required Homepage Priorities

1. Bright enterprise hero slider with five solution slides.
2. Audience-based routing directly below or integrated into the first viewport.
3. Prominent services section with large service pillars.
4. Product highlight sections for every main solution.
5. Industry credibility and business outcomes.
6. Strong conversion sections for demo, consultation, and contact.

## Required Technical Principles

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use semantic HTML.
- Use reusable components.
- Use data arrays or content configuration files for repeated content.
- Keep solution, service, industry, testimonial, FAQ, and navigation content data-driven.
- Make keyboard navigation work.
- Respect `prefers-reduced-motion`.
- Optimize Core Web Vitals.
- Use responsive layouts at mobile, tablet, laptop, and desktop sizes.

## Implementation Style

Prefer clear component names:

- `SiteHeader`
- `MegaMenu`
- `HeroSlider`
- `AudienceRouter`
- `ServicePillars`
- `ProductShowcase`
- `DashboardMockup`
- `IndustryGrid`
- `ProcessTimeline`
- `TrustBar`
- `CTASection`
- `SiteFooter`

Prefer content files:

- `data/navigation.ts`
- `data/heroSlides.ts`
- `data/audiences.ts`
- `data/solutions.ts`
- `data/services.ts`
- `data/industries.ts`
- `data/faqs.ts`

## Delivery Standard

Before delivery, verify:

- The homepage looks bright, premium, and enterprise-focused.
- The hero slider includes all five required slides.
- The services section is visually prominent.
- Audience routing is clear.
- The site works on mobile and desktop.
- No forbidden visuals are present.
- Color usage follows the approved Shamash IT brand system.
- Lighthouse and accessibility basics are respected.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
