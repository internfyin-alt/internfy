import assert from "node:assert/strict";
import { test } from "node:test";
import { createHandler } from "../supabase/functions/internfy-api/handler.js";
import { SERVICES, validateEnquiry } from "../supabase/functions/_shared/enquiries.js";

const valid = { name: "Test Visitor", mobile: "+91 98765-43210", city: "Noida", service: "Web Development" };
const settings = { ADMIN_API_SECRET: "test-secret", SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "test-key" };
const request = (path, method = "GET", body) => new Request(`https://example.supabase.co/functions/v1/internfy-api${path}`, {
  method,
  headers: { Authorization: `Bearer ${settings.ADMIN_API_SECRET}`, "Content-Type": "application/json" },
  ...(body === undefined ? {} : { body: JSON.stringify(body) }),
});

test("shared validation rejects bad fields and retains all supported services", () => {
  for (const input of [null, [], {}, { ...valid, name: " " }, { ...valid, city: "X" }, { ...valid, mobile: "not-a-phone" }, { ...valid, mobile: "123" }, { ...valid, service: "Unlisted" }, { ...valid, name: "X".repeat(101) }]) {
    assert.ok(validateEnquiry(input).errors);
  }
  for (const service of SERVICES) assert.equal(validateEnquiry({ ...valid, service }).data.service, service);
});

test("Edge API waits for storage before reporting a successful submission", async () => {
  let release;
  const stored = new Promise((resolve) => { release = resolve; });
  let started;
  const writing = new Promise((resolve) => { started = resolve; });
  const handler = createHandler({ env: (key) => settings[key], fetcher: async () => {
    started();
    await stored;
    return new Response(null, { status: 201 });
  } });
  let completed = false;
  const response = handler(request("/enquiries", "POST", valid)).then((value) => { completed = true; return value; });
  await writing;
  assert.equal(completed, false);
  release();
  assert.equal((await response).status, 201);
});

test("health is public and other routes cannot read enquiries", async () => {
  const handler = createHandler({ env: (key) => settings[key], fetcher: () => assert.fail("must not access database") });
  const health = await handler(new Request("https://example.supabase.co/functions/v1/internfy-api/health"));
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });
  assert.equal((await handler(request("/enquiries"))).status, 404);
  assert.equal((await handler(request("/unknown"))).status, 404);
});
