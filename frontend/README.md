# Internfy frontend — Next.js

The existing Internfy interface now runs on Next.js App Router. The pages, Tailwind styles, animations, fixed navbar, responsive layouts, images, logo, and video are retained.

## Run locally

Requires Node.js 20.9 or newer.

```powershell
cd E:\internfy\interfy\frontend
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. On Windows PowerShell, `npm.cmd` avoids the execution-policy restriction on `npm.ps1`.

## Production

```powershell
npm.cmd run build
npm.cmd start
```

Deploy this folder as a Next.js application (for example, on Vercel or a Node.js host). Build command: `npm run build`; start command: `npm start`. Next.js creates `.next`; the former Vite `dist` output is no longer used.

## Project layout

- `src/app`: Next.js routes and the root layout/metadata.
- `src/views`: original page interfaces, marked as client components where interaction is needed.
- `src/components`: shared interface, navigation, animations, and floating contact buttons.
- `src/index.css`: existing global/Tailwind styling.
- `public/assets`: original images and video, with unchanged file contents.
- `public/business`: existing page background images.
- `public/internfy-logo.png`: the logo used throughout the site.
- `services/api.js`: existing Axios client and backend endpoints.

Public pages: `/`, `/about`, `/services`, `/training`, `/staffing`, `/career`, `/contact`, `/cloudservice`, `/webservice`, `/apiservice`, `/backendservice`.

The existing admin and certificate screens are also available at `/admin/login`, `/admin/dashboard`, and `/verify-certificate`. They expect the original admin/certificate API; the new enquiry backend does not implement those endpoints. The existing privacy/terms footer links have no page content in the provided project.

## Backend configuration

The home-page enquiry form uses the separate [`../backend`](../backend/README.md) Node.js service and Supabase. Start that service alongside Next.js. Its README includes the database SQL migration and credentials setup. Until Supabase is configured, the form shows an error instead of reporting a saved submission. Set server-only `BACKEND_URL` in this frontend's `.env.local` when the backend is hosted elsewhere (default `http://localhost:5000`).

Copy `.env.example` to `.env.local` if you need a different API URL:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The default API URL is unchanged. `NEXT_PUBLIC_API_URL` replaces the old `REACT_APP_API_URL` setting. This is a public browser setting; do not put secrets in it. Restart development or rebuild production after changing it.

Routing follows the [Next.js App Router documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages). Tailwind v4 uses the [PostCSS integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Search engine configuration

Visible page content and styling are unchanged by the SEO configuration. Each public marketing route has its own title, description and social metadata. Admin routes use noindex; robots.txt permits crawling them so crawlers can read that directive. API routes are excluded from crawling. Certificate verification and admin routes are omitted from the marketing sitemap.

The owner-confirmed canonical origin is https://internfy.in. Canonical URLs, sitemap entries and the robots.txt sitemap reference use this domain by default. Server-only SITE_URL can override it when needed. Do not use a localhost, preview, or guessed domain. Rebuild after changing it.

After deployment, check /robots.txt and /sitemap.xml, verify the domain in Google Search Console, submit the sitemap and inspect the home and training URLs. Those account actions are not performed by the code. The owner confirmed Patna, Bihar as the target city; home and contact metadata target internship enquiries there. No rankings, ratings, placement guarantees or unverified office addresses were added. Titles and metadata help search engines understand pages but do not guarantee indexing or rankings.

## Loading performance

Images referenced by the pages use lossless WebP versions with content hashes; original PNGs remain available. These hashed assets have immutable one-year caching. Preserve the content hash naming when replacing them so browsers receive updated content. Navbar/footer logos and business icons use responsive Next.js image optimization; offscreen gallery images load lazily and the home hero background is preloaded. The favicon is a dedicated 48px image.

Measure page and navigation performance with a production build (npm.cmd run build followed by npm.cmd start). Development mode compiles routes on demand and is not a production speed benchmark. The changes passed production HTTP checks for all 11 marketing routes; no browser Core Web Vitals or live deployment speed score was measured.
