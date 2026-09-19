# Toolhive

A MERN (MongoDB, Express, React, Node.js) site of free, browser-based tools —
word counter, case converter, Lorem Ipsum generator, calculators (percentage,
BMI, tip, age), developer tools (JSON formatter, Unix timestamp converter,
password generator, UUID generator), and visual tools (HEX/RGB/HSL color
converter, QR code generator).

Every tool runs client-side — nothing typed into a tool is ever uploaded.

## Project structure

```
toolhive/
  server/   Express API, MongoDB models, tool catalog, sitemap/robots, SEO meta injection
  client/   Vite + React app — pages, tool widgets, design system
```

## Requirements

- Node.js 18+
- MongoDB (local install or a free Atlas cluster) — optional; the site runs
  on a built-in JSON tool catalog even without a database. Only the contact
  form and anonymous usage events need MongoDB.

## Local setup

1. Install dependencies for both apps:

   ```bash
   npm run install:all
   ```

2. Copy the environment file examples and fill them in:

   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

   - `server/.env` → set `MONGODB_URI` if you have MongoDB available
     (optional — leave unset to run without a database).
   - `client/.env` → leave `VITE_ADSENSE_CLIENT_ID` blank until AdSense
     approves the site.

3. (Optional) Seed the 13 tools into MongoDB:

   ```bash
   npm run seed
   ```

4. Run both apps together:

   ```bash
   npm run dev
   ```

   - Client: http://localhost:5173 (proxies `/api` to the server)
   - Server: http://localhost:5000

## Production build

```bash
npm run build     # builds client/dist
npm start         # starts the Express server, which serves client/dist
                   # and injects per-page <title>/<meta>/JSON-LD for crawlers
```

Set `CLIENT_URL` in `server/.env` to your real domain before deploying, so
the sitemap and canonical URLs are correct.

## Environment variables

| File          | Variable              | Purpose                                             |
|---------------|------------------------|------------------------------------------------------|
| server/.env   | `PORT`                | Server port (default 5000)                          |
| server/.env   | `CLIENT_URL`           | Public site URL, used for CORS, sitemap, canonicals  |
| server/.env   | `MONGODB_URI`          | MongoDB connection string (optional)                 |
| client/.env   | `VITE_ADSENSE_CLIENT_ID` | Google AdSense publisher ID (blank until approved) |

## AdSense checklist (after this build)

1. Buy a domain and deploy the site with HTTPS (e.g. Render, Railway, or any
   Node host for the API + static client).
2. Submit the sitemap (`/sitemap.xml`) to Google Search Console.
3. Confirm About, Privacy, Terms, and Contact pages are live and reachable.
4. Apply for AdSense on your domain.
5. Once approved, set `VITE_ADSENSE_CLIENT_ID` in `client/.env` to your
   publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) and rebuild the client — the
   `AdSlot` component will automatically switch from placeholder boxes to
   live ad units.

AdSense approval is entirely Google's decision, based on their policies at
the time you apply — this project makes the site eligible but can't
guarantee approval or income.

## Notes

- The tool catalog lives in `server/data/tools.json` and is used directly if
  MongoDB isn't configured, or seeded into MongoDB with `npm run seed`. Edit
  that file (and re-seed) to add or change a tool's copy, FAQ, or related
  links.
- `server/middleware/metaInject.js` rewrites `<title>`, meta description,
  canonical URL, and JSON-LD in the built `index.html` per route, so search
  engines see correct per-page metadata without a full SSR/Next.js rewrite.
