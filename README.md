# The Daily Pulse — React News Publication

A modern news publication website built with **React 18 + Vite + React Router**.
Articles stream in **live from free news APIs** — no hardcoded content required.

## Features

- 🗞️ **Live news** — real-time headlines streamed from BBC News & The Guardian RSS feeds
  (optional **NewsAPI.org** source via a free API key)
- 📰 Homepage with hero lead story, latest-news grid and trending list
- 🗂️ 7 category desks: World, Politics, Business, Technology, Sports, Health, Culture
- 🔎 Full-text search across all live stories
- 🌗 Light / dark mode (persisted), responsive layout, breaking-news ticker
- 🛟 **Automatic fallback** — if live feeds are unreachable (offline, proxy blocked),
  the site shows its saved edition with an "Offline" banner and a Retry button

## Getting started

```bash
npm install
npm run dev        # → http://localhost:5173
```

## How the live news layer works

| Source | Requires API key | Rate limit |
|---|---|---|
| **RSS** (default) — BBC News + The Guardian via public CORS proxies | No | Generous (free) |
| **NewsAPI.org** — set `VITE_NEWSAPI_KEY` in `.env` | Yes (free) | 100 requests/day |

1. On load, the app fetches every category feed in parallel.
2. Feeds are parsed in the browser (XML → article objects) and deduplicated by URL.
3. The newest stories are promoted to *featured / breaking / trending* automatically.
4. A **Live · Refresh** status bar shows the current sources and lets readers refresh on demand.

### Optional: use NewsAPI.org instead

```bash
copy .env.example .env        # then paste your key
# .env  →  VITE_NEWSAPI_KEY=your-key-here
npm run dev
```

> NewsAPI's free plan allows development use on `localhost` only. For a public
> deployment, use the default RSS source (no key) or a paid NewsAPI plan.

### Production builds & deployments

- `.env.production` (committed to git) holds `VITE_NEWSAPI_KEY`. Vite loads it
  automatically for `npm run build`, so production deployments always get the
  key even if the gitignored local `.env` is absent or not pushed.
- `fetchLiveNews()` now falls back automatically:
  **NewsAPI (if key) → RSS feeds → saved edition**. If NewsAPI rejects the
  request (e.g. free plan used from a public domain), the site streams the
  live BBC / Guardian feeds instead of showing stale content.
- Build and ship `dist/`:
  ```bash
  npm run build      # → dist/ (embeds the .env.production key)
  npm run preview    # test the production build locally
  ```
  Then upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages,
  XAMPP/Apache…). Remember the SPA re-write rule so deep links like
  `/article/…` don't 404 (see the host's docs; e.g. Netlify `_redirects`
  with `/* /index.html 200`).

## Project structure

```
src/
├── api/
│   ├── newsApi.js        # Live fetching: RSS via CORS proxies + optional NewsAPI
│   └── selectors.js      # Pure array-based selectors (featured/trending/search…)
├── context/
│   └── NewsContext.jsx   # Loads & caches live articles; falls back gracefully
├── data/
│   └── articles.js       # Categories + saved edition (rendered instantly, used as fallback)
├── components/           # Header, Navbar, NewsStatusBar, Cards, Newsletter, Footer
├── pages/                # Home, Category, Article, Search, NotFound
└── index.css             # Design system (responsive, dark mode)
```

## Build for production

```bash
npm run build      # → dist/
npm run preview    # serve the production build
```