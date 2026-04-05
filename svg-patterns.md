# SVG Background Patterns — SHPE Stevens

All patterns were added as absolutely-positioned `<div>` elements with `aria-hidden="true"` and `opacity: 0.06`.
The exact block inserted in each file is identical (except elegant-carousel adds `z-0`):

```jsx
{/* Subtle background pattern */}
<div
  aria-hidden="true"
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cline x1='0' y1='60' x2='120' y2='60' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='120' stroke='%230C2340' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='0' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='60' cy='60' r='3' fill='none' stroke='%230C2340' stroke-width='0.8'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%230C2340'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='0' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '120px 120px',
    opacity: 0.06,
  }}
/>
```

## Per-file reversals

### 1. components_Main/about-section.tsx
- Section was changed from:
  `<section className="py-16 px-6 overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>`
  to:
  `<section className="py-16 px-6 overflow-hidden relative" style={{ backgroundColor: 'var(--page-bg)' }}>`
- Inner container changed from `<div className="max-w-6xl mx-auto">` to `<div className="max-w-6xl mx-auto relative">`
- Pattern div inserted BEFORE the inner container. Remove it to revert.

### 2. components_Main/testimonials.tsx
- Section changed from `<section className="py-28 bg-(--page-bg)">` to `<section className="py-28 bg-(--page-bg) relative overflow-hidden">`
- Pattern div inserted as first child of section.

### 3. components_Main/socials-section.tsx
- Section changed from `<section className="py-12 text-center bg-(--page-bg)">` to `<section className="py-12 text-center bg-(--page-bg) relative overflow-hidden">`
- Pattern div inserted as first child of section.

### 4. components_Main/elegant-carousel.tsx
- Wrapper div changed from `className="carousel-wrapper"` to `className="carousel-wrapper relative overflow-hidden"`
- Pattern div identical but has extra `z-0` class: `className="absolute inset-0 pointer-events-none z-0"`
- Pattern div inserted as first child of carousel-wrapper div.

## Team page (different pattern)

### components_team/team-section.tsx
- A `const blueprintBg = \`url(...)\`` variable was added before the component (line ~64).
- Section style has 3 extra keys: `backgroundImage: blueprintBg`, `backgroundRepeat: 'repeat'`, `backgroundSize: '160px 160px'`
- To remove: delete the `blueprintBg` const and those 3 style keys. Section background stays `backgroundColor: '#F9FAFB'`.
