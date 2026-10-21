import { validateEnquiry } from "../_shared/enquiries.js";

const json = (body, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

async function equalSecret(left, right) {
  const digest = (value) => crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  const [a, b] = await Promise.all([digest(left), digest(right)]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < x.length; i++) difference |= x[i] ^ y[i];
  return difference === 0;
}

async function readJson(request) {
  if (Number(request.headers.get("content-length")) > 8192) throw 413;
  const reader = request.body?.getReader();
  if (!reader) throw 400;
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 8192) { await reader.cancel(); throw 413; }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw 400; }
}

export function createHandler({ env, fetcher = fetch, logger = console }) {
  return async function handler(request) {
    const path = new URL(request.url).pathname.replace(/^.*\/internfy-api/, "").replace(/\/$/, "") || "/";
    if (path === "/health" && request.method === "GET") return json({ status: "ok" });
    // Both endpoints are called by the Next.js server. The browser never receives this secret.
    const secret = env("ADMIN_API_SECRET");
    if (!secret) return json({ message: "Backend has not been configured." }, 503);
    if (!await equalSecret(request.headers.get("authorization") || "", `Bearer ${secret}`)) {
      return json({ message: "Unauthorized." }, 401);
    }
    const submission = path === "/enquiries" && request.method === "POST";
    const listing = path === "/admin/enquiries" && request.method === "GET";
    if (!submission && !listing) return json({ message: "Endpoint not found." }, 404);
    let data;
    let page;
    if (submission) {
      if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
        return json({ message: "Send the form as JSON." }, 415);
      }
      let input;
      try { input = await readJson(request); } catch (status) {
        return json({ message: status === 413 ? "The submitted form is too large." : "Invalid JSON." }, status === 413 ? 413 : 400);
      }
      const result = validateEnquiry(input);
      if (result.errors) return json({ message: "Please check your details.", errors: result.errors }, 400);
      data = result.data;
    } else {
      const value = new URL(request.url).searchParams.get("page") || "1";
      page = Number(value);
      if (!/^\d{1,6}$/.test(value) || !Number.isSafeInteger(page) || page < 1 || page > 100000) {
        return json({ message: "Invalid page." }, 400);
      }
    }
    const base = env("SUPABASE_URL");
    // Supabase supplies these environment variables inside hosted Edge Functions.
    const key = env("SUPABASE_SERVICE_ROLE_KEY");
    if (!base || !key) return json({ message: "Database has not been configured." }, 503);
    try {
      const url = new URL(`${base.replace(/\/$/, "")}/rest/v1/service_enquiries`);
      const headers = { apikey: key, Authorization: `Bearer ${key}` };
      if (listing) {
        url.searchParams.set("select", "id,name,mobile,city,service,created_at");
        url.searchParams.set("order", "created_at.desc,id.desc");
        url.searchParams.set("offset", String((page - 1) * 50));
        url.searchParams.set("limit", "50");
        headers.Prefer = "count=exact";
      } else {
        headers["Content-Type"] = "application/json";
        headers.Prefer = "return=minimal";
      }
      const response = await fetcher(url, {
        method: submission ? "POST" : "GET", headers,
        ...(submission ? { body: JSON.stringify(data) } : {}),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("database_error");
      if (submission) return json({ message: "Thank you! Your enquiry has been received. Our team will contact you soon." }, 201);
      const total = response.headers.get("content-range")?.split("/")[1];
      if (!total || !/^\d+$/.test(total)) throw new Error("database_count_error");
      return json({ enquiries: await response.json(), total: Number(total), page, pageSize: 50 });
    } catch {
      logger.error("Enquiry database operation failed.");
      return json({ message: "Enquiries are temporarily unavailable. Please try again shortly." }, 503);
    }
  };
}
