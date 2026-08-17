# Responsive and Accessibility Requirements

## Responsive Principles

The website must work beautifully on:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors
- Wide desktop screens

Do not design only for desktop.

## Breakpoints

Use Tailwind's default breakpoints unless the project already defines another system:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Mobile Requirements

On mobile:

- Header becomes a drawer menu.
- Hero slide stacks text above visual.
- Slider controls remain reachable.
- Audience cards stack vertically or become a controlled horizontal scroll.
- Product sections stack vertically.
- Service pillars stack as cards.
- CTA buttons wrap cleanly.
- Text never overflows its container.
- Dashboard mockups remain readable or become simplified.

## Tablet Requirements

On tablet:

- Use two-column layouts where comfortable.
- Keep hero visual smaller than desktop.
- Audience cards can use two columns.
- Services can use two columns.

## Desktop Requirements

On desktop:

- Hero can use a two-column layout.
- Navbar plus Hero must fill the first visible viewport as one balanced composition.
- Use a shared `--header-height` token so the Hero can use the remaining viewport height instead of a blind `100vh`.
- The complete heading, description, CTAs, product visual, and slider indicators must remain visible on common laptop viewports.
- The next section should begin immediately after the first viewport, without a large blank gap or early overlap.
- Product showcase sections can alternate direction.
- Services should use four prominent pillars.
- Header can include mega menus.

## Critical Laptop Viewports

Explicitly test:

- `1024 x 768`
- `1280 x 720`
- `1280 x 800`
- `1366 x 768`
- `1440 x 900`
- `1536 x 864`

For short laptop heights, use compact-height rules to reduce vertical rhythm, title maximum size, description spacing, CTA spacing, and visual dimensions while keeping the product visual prominent and fully visible.

## Accessibility Requirements

Use semantic HTML:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`
- Correct heading order

## Keyboard Support

Required:

- Header navigation reachable by keyboard.
- Mega menus open and close predictably.
- Mobile menu can be opened and closed by keyboard.
- Hero slider controls are real buttons.
- Audience cards have clear focus states.
- CTAs are links or buttons according to behavior.

## Hero Slider Accessibility

- Label slider region.
- Use buttons for previous, next, and indicators.
- Provide clear accessible labels.
- Do not auto-advance aggressively.
- Respect `prefers-reduced-motion`.
- Avoid announcing every timed slide change loudly.

## Color Contrast

Ensure sufficient contrast for:

- Body text
- Headings
- Buttons
- Links
- Focus rings
- Badge text
- Footer links

Do not place light blue text on white unless contrast is verified.

## Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is active:

- Disable auto-rotation or make it user-controlled.
- Remove large transitions.
- Keep hover effects simple.

## Images and Visuals

All meaningful images need:

- Useful `alt` text
- Empty `alt=""` only for decorative elements

Dashboard mockups built with HTML/CSS do not need image alt text, but the surrounding section must explain their purpose.

## Forms

Contact and demo forms should include:

- Labels
- Required field indicators
- Error states
- Success state
- Keyboard-accessible controls
- Accessible validation messages

## Testing Checklist

Test:

- Keyboard-only navigation
- Mobile drawer
- Slider controls
- CTA focus states
- Screen width around 320px
- Screen width around 768px
- Screen width around 1440px
- Reduced motion mode
- High zoom level, at least 200%
