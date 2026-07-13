# App Motion Library 1.0

App Motion Library is a premium interaction reference for app buttons, AI product surfaces, commerce flows, and experimental interface systems.

## Scope

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion via `motion/react`
- Dark, restrained, product-grade interface direction

## Information Architecture

- Home page with category overview and static search/filter surface
- Motion card grid driven by `data/motions.ts`
- Detail pages at `/buttons/[slug]`
- Preview rendering through `lib/motion-registry.tsx`

## Categories

- `Apple`: native-feeling Apple-style interaction references
- `System`: foundational app button feedback
- `Commerce`: download, save, purchase, and conversion actions
- `Experimental`: spatial, live activity, and future interface behaviors

## Development

```bash
pnpm --dir apps/button-library build
```

The app is kept deployable as the motion library surface for `motion.csyformiq.com`.
