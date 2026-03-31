# Project knowledge

This file gives Codebuff context about your project: goals, commands, conventions, and gotchas.

## What is this project?

CryptoFaucet Hub — a React single-page application (crypto faucet automation platform UI). It is a frontend-only app with mock data (no backend). Bilingual (Spanish/English) with manual translation objects.

## Quickstart

- Install: `npm install`
- Dev: `npm run dev` (Vite dev server)
- Build: `npm run build` (produces single-file output via vite-plugin-singlefile)
- Preview: `npm run preview`
- Test: `npm test` (Vitest, single run) or `npm run test:watch` (watch mode)
- No linter is configured.

## Architecture

- **Entry:** `src/main.tsx` → `src/App.tsx`
- **Components:** `src/components/` — each feature tab is a standalone component (70+ components)
- **State:** Zustand store in `src/store/cryptoStore.ts`; most state is local in `App.tsx`
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin; utility helper `cn()` in `src/utils/cn.ts` (clsx + tailwind-merge)
- **Icons:** `lucide-react`
- **Charts:** `recharts`
- **i18n:** Manual translation objects in App.tsx (no i18n library)
- **Path alias:** `@/*` maps to `src/*`

## Conventions

- TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, `strict`)
- Tailwind utility classes for all styling (no CSS modules, no styled-components)
- Dark theme with purple/slate gradient palette throughout
- Components are default-exported or named-exported (mixed); check each file
- `App.tsx` is very large — contains inline sub-components (StatCard, NavTab, FaucetCard, etc.) and all top-level state/logic
- Tab-based navigation via `activeTab` state with a large union type `TabType`

## Gotchas

- Build output is a single HTML file (vite-plugin-singlefile) — no code splitting
- No router library; navigation is tab-switching via state
- The `TabType` union is enormous; adding a new tab requires updating it and adding a NavTab + conditional render in App.tsx
- Some components use `any` for props — prefer adding proper types when editing
