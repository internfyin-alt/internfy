import { sameOrigin, sessionCookie } from "../../../../lib/admin-auth.js";

export const runtime = "nodejs";
export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ message: "Invalid request origin." }, { status: 403 });
  return Response.json({ message: "Logged out." }, { headers: { "Cache-Control": "no-store", "Set-Cookie": sessionCookie("", 0) } });
}
