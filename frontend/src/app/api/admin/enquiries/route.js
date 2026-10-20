import { authenticated } from "../../../../lib/admin-auth.js";

export const runtime = "nodejs";
export async function GET(request) {
  const headers = { "Cache-Control": "no-store" };
  if (!authenticated(request)) return Response.json({ message: "Please log in." }, { status: 401, headers });
  const page = new URL(request.url).searchParams.get("page") || "1";
  if (!/^\d{1,6}$/.test(page) || Number(page) < 1 || Number(page) > 100000) return Response.json({ message: "Invalid page." }, { status: 400, headers });
  try {
    const base = process.env.BACKEND_URL || "http://localhost:5000";
    const response = await fetch(`${base.replace(/\/$/, "")}/api/admin/enquiries?page=${page}`, {
      headers: { Authorization: `Bearer ${process.env.ADMIN_API_SECRET}` }, cache: "no-store", signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return Response.json({ message: "Enquiries could not be loaded. Please try again." }, { status: 503, headers });
    return Response.json(await response.json(), { headers });
  } catch { return Response.json({ message: "The enquiry server is unavailable. Please try again." }, { status: 503, headers }); }
}
