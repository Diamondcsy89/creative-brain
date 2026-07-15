# packaging-submission-page

## When to Use

Use this skill when the user needs a platform packaging submission or packaging review page from packaging assets and dimension data, especially for gift boxes, product bundles, membership kits, retail packaging, or internal packaging approval previews.

Use it when inputs include one or more of:

- Outer package front cover image.
- Outer package side image.
- Hero or overview arrangement image.
- Inner tray layout image.
- Inner item package images.
- Width, height, and depth dimensions for the outer box or inner packs.

Do not use this skill for legal, regulatory, labeling, trademark, or print-production compliance certification. This skill only helps generate a clear packaging submission page and check whether the page presents the provided materials and dimensions coherently.

## Required Inputs

Prefer these assets when available:

- `hero-overview.jpg`: overview image for the page header.
- `outer-cover.jpg`: outer package front image.
- `outer-side.jpg`: outer package side image.
- `inner-tray-layout.jpg`: real inner tray layout image.
- `inner-*.jpg`: inner pack front images.
- `inner-*-side.jpg` or `inner-*-depth.jpg`: real side/depth images for inner packs.

Required data:

- Product name.
- Submission version.
- Submission status.
- Outer package dimensions.
- Inner pack names and dimensions: `widthCm`, `heightCm`, and `depthCm`.
- Submission notes and next action.

## Page Generation Flow

1. Inventory available assets and identify missing images.
2. Create or update centralized packaging data in `data/submissions.ts`.
3. Prefer the multi-page structure: root submission index plus one route per submission.
4. Build each submission page using the default structure in `references/page-structure.md`.
5. Apply the visual rules in `references/visual-rules.md`.
6. Apply asset fallback rules in `references/asset-priority.md`.
7. Apply dimension rendering rules in `references/dimension-rules.md`.
8. Keep real images for visual preview only.
9. Use independent schematic components for dimension relationships.
10. Verify the page with the required build command.

## Build Verification

After generating or modifying a packaging submission page, run:

```bash
pnpm --dir apps/packaging-pilot build
```

Fix any TypeScript, Next.js, image path, or build errors before handoff.

## Output Standard

The final page should:

- Feel like a Xiaomi-style packaging submission or engineering review page.
- Use a restrained white and light-gray system with black/gray text and Xiaomi orange accents.
- Present true assets clearly without pretending schematic elements are real renders.
- Keep dimensions accurate and sourced from `data/submissions.ts`.
- Avoid complex audit tables unless the user explicitly requests them.
- Clearly separate visual preview images from dimension schematics.

## Compliance Boundary

Do not claim final legal, regulatory, print, platform, trademark, or packaging compliance. Phrase outputs as submission-page preparation, material completeness support, visual review support, or dimension presentation support.
