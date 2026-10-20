import { configured, createSession, sameOrigin, sessionCookie, validCredentials } from "../../../../lib/admin-auth.js";

export const runtime = "nodejs";
const attempts = new Map();

export async function POST(request) {
  const headers = { "Cache-Control": "no-store" };
  if (!sameOrigin(request)) return Response.json({ message: "Invalid request origin." }, { status: 403, headers });
  if (!configured()) return Response.json({ message: "Admin login has not been configured." }, { status: 503, headers });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ message: "Send credentials as JSON." }, { status: 415, headers });
  let body;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 4096) return Response.json({ message: "Request too large." }, { status: 413, headers });
    body = JSON.parse(text);
  } catch { return Response.json({ message: "Invalid login request." }, { status: 400, headers }); }
  // Bound credential attempts for this server instance without trusting client IP headers.
  const now = Date.now();
  const window = Math.floor(now / (15 * 60 * 1000));
  for (const key of attempts.keys()) if (key !== window) attempts.delete(key);
  const count = attempts.get(window) || 0;
  if (count >= 20) return Response.json({ message: "Too many login attempts. Try again in 15 minutes." }, { status: 429, headers: { ...headers, "Retry-After": "900" } });
  attempts.set(window, count + 1);
  if (!validCredentials(body?.email, body?.password)) return Response.json({ message: "Incorrect email or password." }, { status: 401, headers });
  return Response.json({ message: "Logged in." }, { headers: { ...headers, "Set-Cookie": sessionCookie(createSession()) } });
}
