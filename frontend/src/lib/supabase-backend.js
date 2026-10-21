// Server-only helper. Never import this module into a client component.
export function backendRequest(path, options = {}) {
  const base = process.env.SUPABASE_URL;
  const secret = process.env.ADMIN_API_SECRET;
  if (!base || !secret) throw new Error("Supabase backend has not been configured.");
  return fetch(`${base.replace(/\/$/, "")}/functions/v1/internfy-api${path}`, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${secret}` },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
}
