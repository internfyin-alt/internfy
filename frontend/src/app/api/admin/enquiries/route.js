import { authenticated } from "../../../../lib/admin-auth.js";
import { backendRequest } from "../../../../lib/supabase-backend.js";

export const runtime = "nodejs";
export async function GET(request) {
  const headers = { "Cache-Control": "no-store" };
  if (!authenticated(request)) return Response.json({ message: "Please log in." }, { status: 401, headers });
  const page = new URL(request.url).searchParams.get("page") || "1";
  if (!/^\d{1,6}$/.test(page) || Number(page) < 1 || Number(page) > 100000) return Response.json({ message: "Invalid page." }, { status: 400, headers });
  try {
    const response = await backendRequest(`/admin/enquiries?page=${page}`);
    if (!response.ok) return Response.json({ message: "Enquiries could not be loaded. Please try again." }, { status: 503, headers });
    return Response.json(await response.json(), { headers });
  } catch { return Response.json({ message: "The enquiry server is unavailable. Please try again." }, { status: 503, headers }); }
}
