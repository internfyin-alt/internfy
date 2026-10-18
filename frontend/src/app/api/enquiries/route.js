export const runtime = "nodejs";

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ message: "Send the form as JSON." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > 8192) {
    return Response.json({ message: "The submitted form is too large." }, { status: 413 });
  }
  let body;
  try {
    body = await request.text();
    if (Buffer.byteLength(body) > 8192) return Response.json({ message: "The submitted form is too large." }, { status: 413 });
    JSON.parse(body);
  } catch {
    return Response.json({ message: "The submitted form contains invalid JSON." }, { status: 400 });
  }
  try {
    const base = process.env.BACKEND_URL || "http://localhost:5000";
    const response = await fetch(`${base.replace(/\/$/, "")}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (response.status === 201) return Response.json({ message: result.message }, { status: 201 });
    if (response.status === 400) return Response.json({ message: result.message, errors: result.errors }, { status: 400 });
    return Response.json({ message: "We could not save your enquiry. Please try again shortly or contact us by phone." }, { status: 503 });
  } catch {
    return Response.json({ message: "Online enquiries are temporarily unavailable. Please contact us by phone or WhatsApp." }, { status: 503 });
  }
}
