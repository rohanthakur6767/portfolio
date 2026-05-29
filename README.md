# Rohan Thakur — Portfolio

A production-grade portfolio for an AI/ML Engineer. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and a Gemini-powered AI assistant.

> "Engineer-first, model-aware." — agentic AI, RAG, and shipped systems.

---

## Highlights

- **Next.js 14 App Router** with React Server Components, edge-rendered OG images, sitemap, robots.
- **Gemini 1.5 Flash chatbot** behind a secure API route, with automatic demo-mode fallback when no API key is set.
- **Live GitHub stats** (repos, stars, forks, top languages, contribution graph) cached server-side for 1 hour.
- **Deep-black + electric-violet aesthetic** with glassmorphism, animated particle field, gradient borders, scroll progress bar.
- **Section-by-section content driven from `lib/data.ts`** — single source of truth, easy to update.
- **Recruiter-focused content** — featured projects with metrics, architecture deep-dive, certifications, availability badge.
- **Mobile-first responsive**, accessible focus states, SEO meta, Vercel Analytics + Speed Insights.

---

## Tech stack

| Layer            | Choice                                                  |
| ---------------- | ------------------------------------------------------- |
| Framework        | Next.js 14 (App Router) + TypeScript                    |
| Styling          | Tailwind CSS + custom design tokens + tailwindcss-animate |
| Components       | shadcn/ui style primitives + Radix Slot/Tabs            |
| Animation        | Framer Motion                                           |
| Icons            | lucide-react                                            |
| AI               | Google Gemini 1.5 Flash (`@google/generative-ai`)       |
| Analytics        | `@vercel/analytics` + `@vercel/speed-insights`          |

---

## Folder structure

```
app/
  api/chat/route.ts           # Gemini-powered chatbot endpoint
  api/github/route.ts         # Cached GitHub stats endpoint
  layout.tsx                  # Root layout, fonts, metadata
  page.tsx                    # Single-page portfolio
  globals.css                 # Tailwind layers + design tokens
  opengraph-image.tsx         # Dynamic OG image (Edge runtime)
  sitemap.ts / robots.ts
components/
  sections/                   # Hero, About, Skills, Projects, ...
  ui/                         # button, card, badge, input, textarea, tabs
  shared/                     # Navbar, Footer, ParticleField, SectionHeading...
  chatbot/                    # Floating Gemini chat widget
lib/
  data.ts                     # All resume content + types
  gemini-context.ts           # System prompt for the assistant
  utils.ts                    # cn() and helpers
public/
  resume.pdf                  # Drop your resume here for the download button
```

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY (optional — works in demo mode without)

# 3. Drop your resume PDF for the "Download Resume" button
# Copy your resume to: public/resume.pdf

# 4. Run dev server
npm run dev
# → http://localhost:3000
```

### Environment variables

| Key                       | Required | Purpose                                                   |
| ------------------------- | -------- | --------------------------------------------------------- |
| `GEMINI_API_KEY`          | No\*     | Enables the live AI assistant. Without it, demo mode.     |
| `GITHUB_TOKEN`            | No       | Raises GitHub API rate limit from 60/hr → 5000/hr.        |
| `NEXT_PUBLIC_SITE_URL`    | Prod     | Used by sitemap, robots, and OG metadata.                 |

\*Without `GEMINI_API_KEY`, the chatbot returns intelligent canned answers — the page never crashes, the widget still demos.

Get a Gemini API key: <https://aistudio.google.com/apikey>

---

## Deployment to Vercel

```bash
# Option A — CLI
npm i -g vercel
vercel
vercel --prod

# Option B — GitHub
# 1. Push this repo to GitHub
# 2. Import it on https://vercel.com/new
# 3. Add the env vars below in the Vercel dashboard
```

In the Vercel dashboard → **Settings → Environment Variables**:

- `GEMINI_API_KEY` (Production + Preview)
- `GITHUB_TOKEN` (optional but recommended)
- `NEXT_PUBLIC_SITE_URL` = your deployed URL

That's it. The `vercel.json` in this repo handles framework detection, security headers, and API caching policy.

---

## Customising the content

Everything recruiters see is in **`lib/data.ts`**:

- `profile` — name, contact links, taglines, bio
- `metrics` — the four KPIs in the hero card
- `skills` — categorised skill stacks (with proficiency)
- `projects` — full project entries with problem/features/architecture/metrics/links
- `experience` — work history
- `education`, `certifications`, `specializations`
- `navLinks` — top-nav anchors

The chatbot's knowledge is derived automatically from this file via `lib/gemini-context.ts` — when you update the data, the assistant updates with it.

---

## Scripts

| Command            | What it does                       |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Dev server with hot reload         |
| `npm run build`    | Production build                   |
| `npm run start`    | Serve the production build         |
| `npm run lint`     | ESLint                             |
| `npm run typecheck`| TypeScript no-emit check           |

---

## Credits

Built by [Rohan Thakur](https://github.com/rohanthakur6767).
Design language inspired by Anthropic, Linear, and Vercel.
