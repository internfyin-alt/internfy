import assert from "node:assert/strict";
import { test } from "node:test";
import { createHandler } from "../supabase/functions/internfy-api/handler.js";
import { POST } from "../../frontend/src/app/api/enquiries/route.js";

const valid = { name: " Test   Visitor ", mobile: "+91 98765-43210", city: " Noida ", service: "Internship" };
const settings = { ADMIN_API_SECRET: "test-api-secret", SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "test-service-key" };
const request = (path = "/enquiries", { body = valid, token = settings.ADMIN_API_SECRET, method = "POST", contentType = "application/json" } = {}) => new Request(`https://example.supabase.co/functions/v1/internfy-api${path}`, {
  method, headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
  ...(method === "POST" ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
});
const make = (fetcher, values = settings) => createHandler({ env: (key) => values[key], fetcher, logger: { error() {} } });

test("Edge API rejects unauthenticated reads AND writes without touching the database", async () => {
  const handler = make(() => assert.fail("Database must not be called"));
  assert.equal((await handler(request("/enquiries", { token: "wrong" }))).status, 401);
  assert.equal((await handler(request("/admin/enquiries", { method: "GET", token: "" }))).status, 401);
  assert.equal((await make(fetch, {})(request())).status, 503);
});

test("Edge API validates, normalizes and stores only allowed fields", async () => {
  let writes = 0;
  const handler = make(async (url, options) => {
    writes++;
    assert.equal(String(url), "https://example.supabase.co/rest/v1/service_enquiries");
    assert.equal(options.headers.apikey, settings.SUPABASE_SERVICE_ROLE_KEY);
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), { name: "Test Visitor", mobile: "+919876543210", city: "Noida", service: "Internship" });
    return new Response(null, { status: 201 });
  });
  assert.equal((await handler(request("/enquiries", { body: { ...valid, admin: true } }))).status, 201);
  for (const body of [null, [], {}, { ...valid, mobile: "bad" }, { ...valid, service: "invalid" }]) {
    assert.equal((await handler(request("/enquiries", { body }))).status, 400);
  }
  assert.equal((await handler(request("/enquiries", { body: "{bad" }))).status, 400);
  assert.equal((await handler(request("/enquiries", { body: "x".repeat(9000) }))).status, 413);
  assert.equal((await handler(request("/enquiries", { contentType: "text/plain" }))).status, 415);
  assert.equal(writes, 1);
});

test("Edge admin list paginates with exact count and stable newest-first ordering", async () => {
  const handler = make(async (url, options) => {
    assert.equal(url.searchParams.get("offset"), "50");
    assert.equal(url.searchParams.get("limit"), "50");
    assert.equal(url.searchParams.get("order"), "created_at.desc,id.desc");
    assert.equal(options.headers.Prefer, "count=exact");
    return Response.json([{ id: "record" }], { headers: { "Content-Range": "50-50/51" } });
  });
  const response = await handler(request("/admin/enquiries?page=2", { method: "GET" }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { enquiries: [{ id: "record" }], total: 51, page: 2, pageSize: 50 });
  for (const page of ["0", "-1", "100001", "abc", "1.5"]) {
    assert.equal((await handler(request(`/admin/enquiries?page=${page}`, { method: "GET" }))).status, 400);
  }
});

test("Edge failures never claim a save or expose database details", async () => {
  for (const fetcher of [async () => new Response("private database error", { status: 403 }), async () => { throw new Error("private connection details"); }]) {
    const response = await make(fetcher)(request());
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /private|test-service-key/);
  }
  assert.equal((await make(fetch, { ADMIN_API_SECRET: settings.ADMIN_API_SECRET })(request())).status, 503);
});

test("Next.js forwards to Supabase Edge API, preserves validation, and hides credentials", async () => {
  const keys = ["SUPABASE_URL", "ADMIN_API_SECRET"];
  const previous = keys.map((key) => process.env[key]);
  const originalFetch = globalThis.fetch;
  let writes = 0;
  const handler = make(async () => { writes++; return new Response(null, { status: 201 }); });
  Object.assign(process.env, { SUPABASE_URL: settings.SUPABASE_URL, ADMIN_API_SECRET: settings.ADMIN_API_SECRET });
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://example.supabase.co/functions/v1/internfy-api/enquiries");
    return handler(new Request(url, options));
  };
  const post = (body) => POST(new Request("https://website.test/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
  try {
    const response = await post(valid);
    assert.equal(response.status, 201);
    assert.doesNotMatch(await response.text(), /test-api-secret|test-service-key/);
    const invalid = await post({ ...valid, service: "invalid" });
    assert.equal(invalid.status, 400);
    assert.ok((await invalid.json()).errors.service);
    assert.equal(writes, 1);
    delete process.env.SUPABASE_URL;
    assert.equal((await post(valid)).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; });
  }
});
