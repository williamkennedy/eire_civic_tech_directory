# Éire 2.0

A curated directory of Irish civic tech projects — tools, platforms, and initiatives that empower citizens and strengthen democratic participation across Ireland.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

---

## 🗂️ Project Structure

```text
/
├── public/                          # Static assets
├── src/
│   ├── content/
│   │   └── projects/                # Project markdown files (one per project)
│   │       └── example-project.md
│   ├── layouts/
│   │   └── Layout.astro             # Shared page layout
│   ├── pages/
│   │   ├── index.astro              # Home page
│   │   ├── about.astro            # About page
│   │   └── project/
│   │       └── [slug].astro         # Dynamic project detail pages
│   └── styles/
│       └── global.css               # Tailwind + custom Irish theme colours
├── astro.config.mjs
├── src/content.config.ts            # Content collection schema
└── package.json
```

---

## 📝 How to Add a Project

Each project lives as a **Markdown file** inside `src/content/projects/`. Follow the steps below.

### 1. Create a new Markdown file

Create a new file in `src/content/projects/` using a URL-friendly slug as the filename, e.g.

```
src/content/projects/my-new-project.md
```

> Use lowercase letters, numbers, and hyphens only. Avoid spaces.

### 2. Add the frontmatter

Every project file **must** contain the following YAML frontmatter between triple dashes:

```yaml
---
title: My New Project
category: Democracy
owner: My Organisation
description: A short, compelling summary of what the project does.
status: true
link: https://example.com
---
```

### 3. Field reference

| Field       | Type      | Required | Description                                                                    |
| :---------- | :-------- | :------- | :----------------------------------------------------------------------------- |
| `title`     | `string`  | Yes      | The display name of the project.                                               |
| `category`  | `string`  | Yes      | Broad area the project operates in, e.g. `Democracy`, `Finance`, `Geospatial`. |
| `owner`     | `string`  | Yes      | The person or organisation that runs the project.                              |
| `description` | `string` | Yes    | A concise summary (1–2 sentences). Used in cards, meta descriptions & SEO.   |
| `status`    | `boolean` | Yes      | `true` if the project is active/live, `false` if it is inactive or deprecated. |
| `link`      | `string`  | Yes      | The live project URL. Must be a valid URL including `https://`.                |

### 4. Add body content (optional)

You can write extra Markdown content below the frontmatter. It will appear on the project's dedicated detail page.

```markdown
---
title: My New Project
category: Democracy
owner: My Organisation
description: A short, compelling summary of what the project does.
status: true
link: https://example.com
---

My New Project was founded in 2024 to help Irish citizens engage with local government. It provides tools for tracking public consultations, submitting feedback, and visualising community issues on an interactive map.
```

### 5. Full example

```markdown
---
title: How Ireland Votes
category: Governance
owner: Glen
description: Election results tracker.
status: true
link: https://www.irelandvotes.com/
---

Comprehensive election results tracker covering Dáil, Seanad, European, local and presidential elections in Ireland.
```

### 6. Build & preview

Run the build to generate the new project page and verify everything works:

```sh
npm run build
```

Each project automatically gets:

- A card on the home page
- Its own dedicated page at `/project/{slug}` with full SEO metadata
- Open Graph and Twitter Card tags
- Structured data (JSON-LD)

---

## 🚀 Deployment

This project is deployed to **Cloudflare Pages** using the Astro Cloudflare adapter.

### Environment variables

The `wrangler.jsonc` config references a KV namespace via an environment variable:

| Variable            | Description                              |
| :------------------ | :--------------------------------------- |
| `SESSION_KV_ID`     | ID of your Cloudflare KV namespace for sessions |

1. Copy the example env file:
   ```sh
   cp .env.example .env
   ```
2. Replace `your-kv-namespace-id-here` with your actual KV namespace ID.
3. The `.env` file is already gitignored — never commit it.

### Manual deploy

```sh
npm run build
npx wrangler deploy
```

---

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Installs dependencies                            |
| `npm run dev`     | Starts local dev server at `localhost:4321`      |
| `npm run build`   | Build your production site to `./dist/`          |
| `npm run preview` | Preview your build locally, before deploying     |

---

## 🎨 Colour Theme

The site uses the colours of the Irish flag:

| Token             | Hex       | Usage                         |
| :---------------- | :-------- | :---------------------------- |
| `--irish-green`   | `#169B62` | Primary buttons, active badges, header |
| `--irish-orange`  | `#FF883E` | Accents, gradients            |
| `--irish-cream`   | `#FAFAF8` | Page background               |
| `--irish-stone`   | `#E8E6E1` | Card borders, dividers        |
| `--irish-charcoal`| `#1F2937` | Text, footer background       |

Custom colours are defined in `src/styles/global.css` using Tailwind v4 `@theme`.
