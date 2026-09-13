# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js component playground: each route under `src/app/` renders one or more standalone demo components from `src/components/` to showcase a UI pattern (carousels, dropdowns, tables, breadcrumbs, media galleries, a tracking stepper). There is no backend, no data layer, and no test suite — it's a visual sandbox, not a product app.

## Commands

Package manager is Yarn (`yarn.lock` present; don't add `package-lock.json`).

- `yarn dev` — start the dev server (http://localhost:3000)
- `yarn build` — production build
- `yarn start` — run the production build
- `yarn lint` — ESLint via `next lint` (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` and `next/typescript`)

There are no tests configured in this repo.

## Architecture

- **App Router** (`src/app/`): one directory per demo route (`carousel/`, `dropdown/`, `table/`, `media/`, `breadcrumb/`, `tracking-stepper/`, `not-found/`). Each `page.tsx` is a thin wrapper that imports and lays out one or more feature components — put actual UI logic in `src/components/`, not in the page files.
- **Feature components** (`src/components/<Feature>/`): grouped by feature in PascalCase directories (e.g. `Carousels/`, `DropDowns/`, `Table/`, `Stepper/`). Multiple alternate implementations of the same widget commonly live side by side (e.g. `Carousels/` has six different carousel variants — `SlideLeft`, `ThumbnailCarousel`, `SwiperCarousel`, `AutoSlider`, `WindowCarousel`, `AchievementsCarousel`). When adding a new variant, follow this pattern rather than replacing an existing one.
- **shadcn/ui primitives** (`src/components/ui/`): generated via the shadcn CLI per `components.json` (style: `new-york`, base color: `neutral`, icon library: `lucide`). Regenerate/add primitives with the shadcn CLI rather than hand-rolling them, so they stay consistent with the configured style.
- **Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).
- **Utils duplication**: `src/lib/utils.tsx` is the canonical `cn()` helper used by shadcn components and referenced by the `@/lib/utils` alias in `components.json` — import from here. `src/app/lib/utils.tsx` is a stray duplicate; don't add new shared utilities there.
- Client-interactive components (state, effects, animation, event handlers) are marked `"use client"` at the top of the file, per standard App Router convention — check existing components in the same feature directory before deciding whether a new one needs it.
- Styling is Tailwind CSS v4 (via `@tailwindcss/postcss`), composed with `class-variance-authority` + `clsx` + `tailwind-merge` (the `cn()` helper) for conditional class merging, matching shadcn conventions.
- Animation uses `framer-motion`; icons come from both `lucide-react` (shadcn primitives) and `react-icons` (feature components).
