# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Éire 2.0** is a curated directory of Irish civic tech projects, served at `eire2.ie`. It is a content-driven static site built with **Astro 6** and **Tailwind CSS v4**, deployed to **Cloudflare** (Pages/Workers) via the `@astrojs/cloudflare` adapter. There is no database or CMS — every project entry is a Markdown file.

## Commands

Requires Node `>=22.12.0`. All commands run from the repo root.

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run generate-types` | Regenerate Cloudflare binding types (`wrangler types`) |
| `npx wrangler deploy` | Deploy (after `npm run build`) |

There is **no test runner and no linter configured**. Type checking comes from the strict `tsconfig.json` (`astro/tsconfigs/strict`) and runs as part of `astro build`. To verify a change, run `npm run build` — content schema violations and broken references fail the build.

## Architecture

The entire site is generated from one Astro content collection. Understanding the data flow is the key to being productive:

1. **Content source** — `src/content/projects/*.md`. One Markdown file per project. The filename (slug) becomes the route. The collection is defined in `src/content.config.ts`, which uses Astro's `glob` loader and a Zod schema enforcing this frontmatter on every file:
   - `title` (string), `category` (string), `owner` (string), `description` (string), `status` (boolean — active/inactive), `link` (valid URL).
   - Body Markdown below the frontmatter is optional and renders on the project detail page.

2. **Pages consume the collection** via `getCollection('projects')`:
   - `src/pages/index.astro` — home page. Renders the project grid and computes the stats bar (total / distinct categories / active count) directly from the collection.
   - `src/pages/project/[slug].astro` — dynamic detail page. `getStaticPaths()` maps each project to a route using **`project.id`** (the file slug) as both the `slug` param and the canonical URL segment. Note: routes use `project.id`, not a separate field.
   - `src/pages/about.astro` — static page.

3. **Layout & SEO** — `src/layouts/Layout.astro` wraps every page and is the single source of `<head>` metadata. It accepts `title`, `description`, `canonical`, `ogType`, and `schema` props and emits the `<title>`, meta description, Open Graph / Twitter Card tags, and a JSON-LD `<script>`. Pages that need rich structured data (e.g. `[slug].astro`) build their own `schema` object and pass it in; otherwise a default WebSite schema is used. The canonical domain `https://eire2.ie` and author/publisher details (William Kennedy / Helmet Head) are hardcoded here and in `[slug].astro`.

4. **Styling** — Tailwind v4 via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, no `tailwind.config.js`). The Irish-flag color palette is defined as CSS variables in `src/styles/global.css` under `@theme`, which exposes them as Tailwind utilities: `irish-green` (+`-dark`/`-light`), `irish-orange` (+variants), `irish-cream`, `irish-stone`, `irish-charcoal`. Use these tokens rather than raw hex values. `global.css` is imported once by `Layout.astro`.

## Adding a project

Create `src/content/projects/<slug>.md` (lowercase, hyphens, no spaces) with the required frontmatter (see schema above), then `npm run build`. The project automatically gets a home-page card, a `/project/<slug>` detail page, full SEO/OG/JSON-LD metadata, and is counted in the stats bar.

## Deployment / Cloudflare

`wrangler.jsonc` defines the Cloudflare config: it serves `./dist` as static assets and binds a **KV namespace** named `SESSION` whose ID is injected from the `SESSION_KV_ID` environment variable. Copy `.env.example` to `.env` and set `SESSION_KV_ID` to your KV namespace ID (`.env` is gitignored). After changing bindings, run `npm run generate-types` to refresh the generated binding types.
