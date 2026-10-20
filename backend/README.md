# Internfy backend

Node.js/Express API for the home-page service enquiry form, backed by Supabase. Requires Node.js 22.9+ (the installed Node.js 24 works).

## Start locally

```powershell
cd E:\internfy\interfy\backend
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The API listens on port 5000. Without Supabase credentials, it starts normally but responds with HTTP 503 to submissions; it does not claim that a record was saved.

In another terminal, start the frontend:

```powershell
cd E:\internfy\interfy\frontend
npm.cmd run dev
```

Open http://localhost:3000. The lead form is on the right side of the home-page hero and stacks below the introduction on mobile; Get Started scrolls to it. The browser posts to the Next.js `/api/enquiries` endpoint, which forwards to this backend. No Supabase credentials are sent to the browser.

## Connect Supabase when ready

1. In the intended Supabase project, open SQL Editor and run `supabase/migrations/001_service_enquiries.sql` from this backend folder. This creates `public.service_enquiries` with `id`, `name`, `mobile`, `city`, `service`, and `created_at`.
2. Open `backend/.env` privately and set `SUPABASE_URL` to the project URL and `SUPABASE_SECRET_KEY` to the server secret key. A legacy key can instead be set as `SUPABASE_SERVICE_ROLE_KEY`. Do not use an anon/publishable key here.
3. Restart the backend and submit the form. Check the `service_enquiries` table in Supabase Table Editor to see saved enquiries.

The SQL migration is prepared locally; it has not been run against a live project. No live database write can be verified until project credentials are configured.

Row Level Security is enabled and anonymous/authenticated database access is revoked. Only the server writes submissions. No public API lists visitors’ details. See [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys) and [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## API

- `GET /api/health`: server status and whether database credentials are present (not a database connectivity check).
- `GET /api/services`: dropdown options.
- `POST /api/enquiries`: accepts JSON `{ "name": "Your name", "mobile": "9876543210", "city": "Noida", "service": "Web Development" }`.
- Successful database insert: HTTP 201. Invalid fields: HTTP 400. Database unavailable: HTTP 503. Request body limit: 8 KB.

The mobile number accepts 10–15 digits with an optional `+` country prefix. Spaces, parentheses, and hyphens are removed before storing. All four fields are required; services are validated against the dropdown allowlist.

## Production

Deploy `backend` as a Node.js service using `npm ci` and `npm start`. Set its Supabase credentials in the hosting environment. In the frontend hosting environment, set server-only `BACKEND_URL` to this service’s HTTPS origin. The frontend's existing `NEXT_PUBLIC_API_URL` setting is independent and remains available for its older admin API integrations.

The admin panel at `/admin/login` lists saved home-page enquiries at `/admin/dashboard`. Login uses server-only `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (salt:hex scrypt hash, 64 bytes), and `ADMIN_SESSION_SECRET` in `frontend/.env.local`. Set the same random `ADMIN_API_SECRET` in both frontend and backend environments. Sessions last eight hours and use signed HttpOnly cookies; passwords and database credentials stay on the server. Restart both services after changing environment settings. Login attempts are limited per server instance; multiple production replicas should use a shared rate limiter at the gateway.

The protected `GET /api/admin/enquiries?page=1` endpoint returns 50 records per page, newest first, with the total count. Only the Next.js server calls this endpoint using `ADMIN_API_SECRET`. The public `/api/enquiries` endpoint remains submission-only. The panel supports viewing, searching within each page, pagination, refresh and logout; the older certificate, enrollment, and quote APIs are not implemented.

Run the API validation and failure-handling checks with `npm test`. Tests use an injected database adapter and do not write to a real Supabase project.
