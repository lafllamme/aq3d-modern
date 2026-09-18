# AQ3D Server Status

A Nuxt 4 single-page app that shows the live AdventureQuest 3D server list with population charts. It is a modern rewrite of [AQ3D-Server-App](https://github.com/lafllamme/AQ3D-Server-App), reduced to the part that is actually useful: what is online, how full it is, and where.

## What it includes

- A server table with live status per server.
- Charts for total players online, capacity, average occupancy, and distribution by region.
- A manual refresh without a full page reload.
- A server route that proxies the official AQ3D server list and caches the response.

## Tech stack

- Nuxt 4 and Vue 3
- TypeScript
- UnoCSS
- Nitro with the Netlify preset

## Getting started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server runs at `http://localhost:3000`.

## Useful commands

```bash
npm run build      # Build for production
npm run generate   # Build a static output
npm run preview    # Preview the production build
```

## How the data is fetched

The client never calls the game API directly. [`server/api/servers.get.ts`](server/api/servers.get.ts) requests `game.aq3d.com/api/game/ServerList` server-side and returns the result with a `stale-while-revalidate` cache header; the route additionally carries a 60-second SWR rule in the Nitro config. A failed upstream request surfaces as a 502 rather than a broken page.

The app runs with `ssr: false`, so it deploys as a static SPA plus that one serverless route.

## Project structure

```text
app/
├── components/   # ServerTable and ServerCharts
├── pages/        # Single status page
└── assets/       # Styles

server/api/       # Proxy for the AQ3D server list
types/            # Server payload types
```

## Status

Small and deliberately narrow in scope. It does one thing and is not planned to grow into a full dashboard. The upstream API is unofficial and may change without notice.

## License

No open-source license has been declared yet. Until a license is added, reuse and redistribution are not granted by default.

Made with love by [Laflamme](https://github.com/lafllamme).
