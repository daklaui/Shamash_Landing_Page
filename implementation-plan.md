# Implementation Plan

## Phase 1: Project Setup

1. Create or confirm a Next.js App Router project.
2. Add TypeScript.
3. Add Tailwind CSS.
4. Configure brand colors in Tailwind.
5. Add a consistent font.
6. Set global layout, metadata defaults, and base CSS.

## Phase 2: Content Data

Create data files for:

- Navigation
- Hero slides
- Audience routes
- Solutions
- Services
- Industries
- Process steps
- FAQs
- CTA copy

Keep all repeated website content in data modules.

## Phase 3: Core Layout

Build:

- `SiteHeader`
- `MegaMenu`
- `MobileNav`
- `SiteFooter`
- Shared buttons
- Shared badges
- Shared cards
- Shared section headers

Verify desktop and mobile navigation before moving deeper.

## Phase 4: Homepage

Build homepage sections in this order:

1. Hero Slider
2. Audience Router
3. Trust Bar
4. Service Pillars
5. Product Showcase List
6. Industries
7. Process Timeline
8. Technology and capability groups
9. Final CTA

## Phase 5: Hero Slider

Implement all five slides:

- XpertFactor
- Factorix
- Document Management
- AI Automation and Digital Transformation
- Enterprise Web and Mobile

Add:

- Auto-rotation
- Pause on hover
- Previous and next controls
- Indicators
- Swipe support if feasible
- Keyboard support
- Reduced motion handling

## Phase 6: Product Visuals

Create dashboard and workflow mockups for:

- Factoring dashboard
- ERP dashboard
- Document management workflow
- AI automation workflow
- Web and mobile architecture

Use the unified Shamash brand palette.

Do not use generic buildings, robots, cyberpunk visuals, or unrelated stock imagery.

## Phase 7: Solution Pages

Create pages for:

- XpertFactor
- Factorix
- Document Management
- AI Automation
- Enterprise Web and Mobile

Use a shared solution page component or shared section patterns.

Each page should include:

- Hero
- Problem and audience
- Business outcomes
- Feature groups
- Workflow or architecture
- Integrations
- Security and support
- FAQ
- CTA

## Phase 8: Services and Supporting Pages

Create:

- Services page
- Industries page
- About page
- Resources page
- Contact page

The services page must make the four service pillars prominent.

## Phase 9: Accessibility and Responsive QA

Test:

- Mobile layout
- Tablet layout
- Desktop layout
- Keyboard navigation
- Focus states
- Reduced motion
- Text overflow
- Slider accessibility
- Form accessibility

## Phase 10: SEO and Performance

Add:

- Metadata for every page
- Sitemap
- Robots file
- Open Graph defaults
- JSON-LD where appropriate

Optimize:

- Images
- Font loading
- JavaScript bundle size
- Layout stability

## Phase 11: Final Review

Review against:

- `brand-guidelines.md`
- `hero-slider-spec.md`
- `responsive-accessibility.md`
- `seo-performance.md`
- `acceptance-criteria.md`

Do not deliver until the acceptance criteria pass.

