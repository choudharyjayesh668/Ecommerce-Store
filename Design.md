# Premium Editorial Commerce Visual System

## Intent

Create a calm, high-end, image-led store that feels like a contemporary catalogue rather than a generic marketplace. The signature is contrast between warm paper surfaces and cinematic near-black panels, oversized tightly tracked typography, square editorial image crops, and a sparse functional interface.

## Tokens

Use these as defaults, then adapt a single restrained accent to the target brand.

| Role | Default |
| --- | --- |
| Paper background | `#FAFAF9` |
| Ink | `#1C1917` |
| Near black | `#0A0A0A` |
| Interface muted | `#78716C` |
| Dark muted | `#A1A1AA` |
| Light text | `#FFFFFF` |
| Quiet divider | `rgba(255,255,255,.08)` on dark; `rgba(28,25,23,.12)` on light |
| Brand accent | One deep, low-saturation target-brand color |

Typography uses a clean modern grotesk such as Geist, Inter, or the established project sans. Headings are 700 weight with -0.025em to -0.05em tracking; body text stays 16–18px with 1.5–1.65 leading. Use one italic serif display moment only when it supports a key editorial pause; do not mix typefaces indiscriminately.

## Layout and rhythm

- Keep a centered content width around 1200–1280px with 16px mobile and 32px desktop shell gutters.
- Favor spacious vertical pacing: 96px mobile / 128px desktop for standard sections, 128px / 160–192px for visual statements.
- Use a 4px scale with 8, 16, 24, 32, 48, 64, 96, 128.
- Keep imagery and content blocks square-cornered. Use full-pill radius only for primary actions and compact category controls.
- Avoid conventional elevated-card shadows. Establish hierarchy through image crop, spacing, dark/light transitions, and overlays.

## Navigation and conversion

Keep navigation compact and product-oriented: wordmark, essential category/store links, search/cart/account if relevant, and one decisive CTA such as Shop products, Get a quote, or Contact sales. A transparent/fixed header may sit over a hero; introduce a subtle translucent solid background after scroll. On mobile, collapse non-essential links into an accessible drawer without hiding cart/search needs.

Buttons should be 44px minimum, 56px for hero CTAs, with simple color transitions—not hover lift. Use dark-on-paper as the standard primary treatment; invert to white-on-black in dark areas. Secondary actions are text or transparent pills with a soft contrasting hover fill.

## Product surfaces

Use product photography as the card surface. Keep image wrappers overflow-hidden, square-cornered, and `object-cover`; default to a consistent catalog ratio such as 4:5 or 3:4 unless the product requires a technical ratio. On hover/focus, scale imagery gently to 1.03–1.06 over 500–700ms and reveal useful action/metadata without obscuring price or product title.

Cards should always communicate product name, price or quote state, category/specification cues, availability where needed, and the appropriate cart/detail action. Industrial, hardware, and B2B products should favor dimensions, material, compatibility, warranty, and bulk-enquiry CTA over vague lifestyle descriptions.

## Page composition patterns

Choose an original sequence based on the product:

- **Consumer catalog:** hero → category entry points → featured products → value proposition → reviews → newsletter/support → footer.
- **Industrial/B2B catalog:** hero → product families → specifications/value proof → featured products → applications/industries → manufacturing/trust → quote CTA → footer.
- **Single-category store:** hero → filters/products → comparison/specifications → installation/use case → trust/warranty → cart or contact CTA.

Reserve dark immersive bands for brand claims, craftsmanship/manufacturing proof, testimonial emphasis, or conversion—not simply because the reference has a dark section. Use a mosaic only where category imagery benefits from editorial discovery; otherwise use a clear product grid.

## Motion, response, and accessibility

Use 150–300ms for controls, 500–700ms for image/copy reveal, and 700–1000ms only for large editorial imagery. Support `prefers-reduced-motion`. Do not rely on hover to expose vital information. At mobile sizes, stack grids, retain readable 36–48px display headings, preserve 44px targets, and let search/cart actions remain immediately available.

## Implementation approach

Create semantic design tokens for paper, ink, dark, muted, border, and brand accent; centralize them in the project styling system. Build reusable `Container`, `SectionHeader`, `Button`, `ProductCard`, `CategoryTile`, `TrustBlock`, and `Footer` primitives. Use responsive grid/flex patterns and data-driven arrays rather than per-page hard-coded repetition. Keep custom CSS small and organized around tokens and component states.
