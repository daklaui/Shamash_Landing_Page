# Master Build Prompt for Coding Agents

You are an expert senior frontend engineer and product-minded UI/UX designer. Build the Shamash IT website using the complete instruction pack in this folder.

## Objective

Create a complete, polished, responsive, accessible, performant website for Shamash IT using Next.js App Router, TypeScript, and Tailwind CSS.

The site must position Shamash IT as a premium enterprise technology partner specializing in enterprise software, FinTech platforms, ERP, document management, AI automation, digital transformation, cloud infrastructure, cybersecurity, and managed IT services.

## Mandatory Source Files

Read and follow:

- `AGENTS.md`
- `brand-guidelines.md`
- `website-structure.md`
- `ui-ux-system.md`
- `content-guidelines.md`
- `hero-slider-spec.md`
- `component-architecture.md`
- `responsive-accessibility.md`
- `seo-performance.md`
- `implementation-plan.md`
- `acceptance-criteria.md`

## Brand Rules

Use a bright enterprise design.

Use this color system:

- Shamash Blue: `#35A8DE`
- Enterprise Indigo: `#505CA2`
- Compass Gold: `#E9AE11`
- Midnight Navy: `#242850`
- White and neutral surfaces

Respect this visual ratio:

- 70% white and neutral
- 20% Shamash Blue
- 8% Enterprise Indigo
- 2% Compass Gold

Do not introduce separate dominant product palettes.

## Visual Rules

Do not use:

- Generic buildings
- Generic robots
- Cyberpunk visuals
- Floating AI cubes
- Dark full-page technology backgrounds
- Random stock images
- Low-cost agency templates

Use:

- Product dashboard mockups
- Workflow diagrams
- Enterprise interface previews
- Clean icons
- Subtle blue-indigo gradients
- Minimal gold highlights

## Required Homepage

Build the homepage with:

1. Sticky header with clear navigation and mobile menu.
2. Hero slider with five required slides:
   - XpertFactor
   - Factorix
   - Document Management
   - AI Automation and Digital Transformation
   - Enterprise Web and Mobile
3. Audience router:
   - I am a Bank or Financial Institution -> XpertFactor
   - I Manage a Business or Company -> Factorix
   - I Need Document Management -> Document Management
   - I Want to Automate Processes -> AI Automation
   - I Need Custom Software or a Mobile App -> Enterprise Web and Mobile
4. Prominent services section with four large service pillars:
   - Enterprise Software Engineering
   - AI Automation and Digital Transformation
   - Cloud, Infrastructure and Cybersecurity
   - Managed IT and Long-Term Support
5. Product highlight sections for all five solution areas.
6. Industries section.
7. Process section.
8. Technology or capability section.
9. Final CTA.
10. Footer.

## Critical First-Screen Hero Requirement

On desktop and laptop screens, the initial visible viewport must be one intentional composition:

```text
Navbar + Hero = visible browser viewport
```

Do not solve this with a blind `height: 100vh`. Use a shared responsive header-height token and size the Hero against the remaining viewport, for example `calc(100svh - var(--header-height))`, adapted to the project architecture.

The first load must show the complete navbar, Hero heading, description, CTA buttons, primary product visual, and slider indicators without horizontal overflow or important content clipped below the fold. The next section should begin immediately after the first viewport.

Short laptop screens such as `1280 x 720`, `1366 x 768`, and `1536 x 864` require compact-height behavior: reduce header height, Hero padding, title scale, copy spacing, column gap, and visual bounds intelligently while preserving a dominant product visual. On tablet and mobile, prioritize usability and allow stacking when necessary rather than making text or visuals unusably small.

## Required Pages

Create these pages:

- `/`
- `/solutions/xpertfactor`
- `/solutions/factorix`
- `/solutions/document-management`
- `/solutions/ai-automation`
- `/solutions/web-mobile-development`
- `/services`
- `/industries`
- `/about`
- `/resources`
- `/contact`

## Technical Requirements

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use semantic HTML.
- Use data files for repeated content.
- Use reusable components.
- Add metadata for each page.
- Add responsive layouts.
- Add accessible controls.
- Respect `prefers-reduced-motion`.
- Keep performance strong.

## Suggested Files

Create:

- `data/navigation.ts`
- `data/heroSlides.ts`
- `data/audiences.ts`
- `data/solutions.ts`
- `data/services.ts`
- `data/industries.ts`
- `components/layout/SiteHeader.tsx`
- `components/layout/MegaMenu.tsx`
- `components/layout/MobileNav.tsx`
- `components/layout/SiteFooter.tsx`
- `components/home/HeroSlider.tsx`
- `components/home/AudienceRouter.tsx`
- `components/home/ServicePillars.tsx`
- `components/home/ProductShowcaseList.tsx`
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/DashboardMockup.tsx`

## Implementation Priorities

1. Create the brand tokens and global layout first.
2. Build the shared data files.
3. Build the layout components.
4. Build the homepage.
5. Build solution pages using shared patterns.
6. Build services and supporting pages.
7. Verify responsiveness and accessibility.
8. Verify the final result against `acceptance-criteria.md`.

## Final Delivery

Before finishing:

- Run linting and build checks.
- Inspect the site on mobile and desktop.
- Confirm the hero slider works.
- Confirm the services section is prominent.
- Confirm audience routing is immediately clear.
- Confirm there are no forbidden visuals.
- Confirm the color system is respected.

Deliver a concise summary of what was built, how to run it, and any remaining limitations.
