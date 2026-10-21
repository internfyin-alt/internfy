# Internfy backend — Supabase Edge Functions

The enquiry backend now runs in Supabase Edge Functions (Deno), with data in Supabase PostgreSQL. There is no Express/Render deployment requirement. The Next.js frontend on Vercel keeps its existing same-origin API adapters and admin session cookies.

## Deploy to your existing Supabase project

1. Open Supabase SQL Editor. Your existing `public.service_enquiries` table can be reused; existing records are preserved. For a fresh project, first run `supabase/migrations/001_service_enquiries.sql`. Then run `supabase/migrations/002_admin_read_access.sql` in both existing and fresh projects. Anonymous and authenticated direct table access stays revoked.
2. Open Supabase **Edge Functions → Secrets**. Add `ADMIN_API_SECRET` using the exact value already in `frontend/.env.local`. Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the function automatically. Do not upload your whole local `.env` file.
3. In PowerShell, run:

   ```powershell
   cd E:\internfy\interfy\backend
   npx.cmd supabase login
   npx.cmd supabase functions deploy internfy-api --project-ref YOUR_PROJECT_REF --use-api
   ```

   Replace `YOUR_PROJECT_REF` with the ID in your Supabase project URL, for example the `abc` in `https://abc.supabase.co`. The supplied `supabase/config.toml` disables the gateway's legacy JWT verification because the handler authenticates its server-to-server callers using the shared secret. Do not remove the handler's authorization check. API deployment does not require Docker.
4. Open `https://YOUR_PROJECT_REF.supabase.co/functions/v1/internfy-api/health`. Expect `{"status":"ok"}`. Health confirms the function is deployed; a form submission verifies database access.
5. In Vercel, configure these server-only environment variables for Production and any Preview deployment you use:

   | Variable | Value |
   |---|---|
   | `SUPABASE_URL` | Your project's `https://YOUR_PROJECT_REF.supabase.co` URL |
   | `ADMIN_API_SECRET` | Exactly the value saved in Supabase Edge Function Secrets |
   | `ADMIN_EMAIL` | Existing admin email |
   | `ADMIN_PASSWORD_HASH` | Existing complete salt:hash value |
   | `ADMIN_SESSION_SECRET` | Existing session-signing secret |
   | `SITE_URL` | Your actual public website origin |

   `BACKEND_URL` is no longer used for enquiries. Database service/secret keys are not required on Vercel and must never be exposed through `NEXT_PUBLIC_` settings.
6. Commit and push the updated code, then deploy the Vercel frontend with Root Directory `frontend` and framework Next.js.
7. Submit one enquiry and verify it in Supabase Table Editor and `/admin/dashboard`. Admin login still uses the existing email/password and signed HttpOnly cookie in Next.js. It is not a Supabase Auth account.

## Local frontend

Set `SUPABASE_URL` and the matching `ADMIN_API_SECRET` in `frontend/.env.local`, along with the existing admin session settings. Deploy the function first, then run:

```powershell
cd E:\internfy\interfy\frontend
npm.cmd run dev
```

Local frontend submissions use the deployed Supabase function and therefore write to the configured real database. The standalone Node.js/Express server has been removed. Node.js is still required by the Next.js frontend and by `npx` when using the Supabase CLI that way.

## Edge API

The function base URL is `/functions/v1/internfy-api`:

- `GET /health`: deployment status; public, does not expose credentials or enquiry details.
- `POST /enquiries`: requires server-only `Authorization: Bearer ADMIN_API_SECRET`; accepts `{ "name", "mobile", "city", "service" }`. Validates all fields, normalizes mobile numbers, stores only allowed fields, and responds 201 only after a successful database write. JSON bodies are limited to 8 KB.
- `GET /admin/enquiries?page=1`: requires the same server credential. Returns 50 records per page with an exact count, sorted newest first. The Next.js adapter additionally requires a valid admin session before calling this endpoint.

The browser calls same-origin Next.js adapters. It never receives the API secret or database credential. Since Edge Functions are called server-to-server, browser CORS configuration is not needed. Failures return generic messages and never log visitor data or secrets.

## Checks

```powershell
cd E:\internfy\interfy\backend
deno task test
```

Install Deno to run the tests. Tests cover the Edge handler using Web APIs, the Next.js adapter, normalization, input limits, unauthorized reads and writes, pagination, database failures, and admin session behavior. They use fake storage and do not write to Supabase. The tests use Deno's built-in compatibility for `node:test` and `node:assert`; no npm dependencies or Express server are required.

The backend contains only Supabase functions, SQL migrations, and tests. Supabase runs `supabase/functions/internfy-api/index.ts` using Deno; `deno.json` defines the local test task. Keep real secrets in Supabase Edge Function Secrets and the frontend's server-only environment settings.

Official references: [Edge deployment](https://supabase.com/docs/guides/functions/deploy), [function secrets](https://supabase.com/docs/guides/functions/secrets), [function configuration](https://supabase.com/docs/guides/functions/function-configuration).
