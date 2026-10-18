import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "../src/app.js";
import { POST } from "../../frontend/src/app/api/enquiries/route.js";

const valid = { name: "Test Visitor", mobile: "+91 98765-43210", city: "Noida", service: "Web Development" };

async function withApi(options, run) {
  const server = createApp(options).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try { await run((body, contentType = "application/json") => fetch(`${base}/api/enquiries`, { method: "POST", headers: { "Content-Type": contentType }, body: typeof body === "string" ? body : JSON.stringify(body) }), base); }
  finally { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)); }
}

test("validated submissions save only the allowed fields, normalize phone numbers, and await storage", async () => {
  const saved = [];
  await withApi({ saveEnquiry: async (data) => { await new Promise((resolve) => setTimeout(resolve, 10)); saved.push(data); } }, async (post) => {
    const response = await post({ ...valid, name: "  Test   Visitor  ", city: "  Noida  ", admin: true });
    assert.equal(response.status, 201);
    assert.deepEqual(saved, [{ name: "Test Visitor", mobile: "+919876543210", city: "Noida", service: "Web Development" }]);
    assert.match((await response.json()).message, /received/);
  });
});

test("bad fields never reach storage and return useful field errors", async () => {
  let writes = 0;
  await withApi({ saveEnquiry: async () => { writes++; } }, async (post) => {
    for (const input of [null, [], {}, { ...valid, name: " " }, { ...valid, city: "X" }, { ...valid, mobile: "not-a-phone" }, { ...valid, mobile: "123" }, { ...valid, service: "Unlisted" }, { ...valid, name: "X".repeat(101) }]) {
      const response = await post(input);
      assert.equal(response.status, 400);
      assert.ok((await response.json()).errors);
    }
    assert.equal(writes, 0);
  });
});

test("unconfigured Supabase never produces a success response", async () => {
  await withApi({ configured: false }, async (post, base) => {
    assert.equal((await post(valid)).status, 503);
    assert.equal((await (await fetch(`${base}/api/health`)).json()).databaseConfigured, false);
  });
});

test("database failure preserves privacy and returns a retryable error", async () => {
  const logged = [];
  await withApi({ saveEnquiry: async () => { throw Object.assign(new Error("private database information"), { code: "DB_ERROR" }); }, logger: { error: (...args) => logged.push(args) } }, async (post) => {
    const response = await post(valid);
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /private database information|Test Visitor/);
    assert.deepEqual(logged, [["Enquiry could not be saved:", "DB_ERROR"]]);
  });
});

test("malformed, oversized, and non-JSON requests are rejected", async () => {
  await withApi({ saveEnquiry: async () => assert.fail("must not write") }, async (post) => {
    assert.equal((await post("{bad-json")).status, 400);
    assert.equal((await post(JSON.stringify({ name: "X".repeat(9000) }))).status, 413);
    assert.equal((await post("hello", "text/plain")).status, 415);
  });
});

test("visitors cannot list saved enquiries", async () => {
  await withApi({}, async (post, base) => {
    assert.equal((await fetch(`${base}/api/enquiries`)).status, 404);
    const { services } = await (await fetch(`${base}/api/services`)).json();
    assert.ok(["Web Development", "Internship", "Digital Marketing", "Other"].every((value) => services.includes(value)));
  });
});

test("Next.js forwards valid submissions to the backend and preserves validation errors", async () => {
  const saved = [];
  await withApi({ saveEnquiry: async (data) => saved.push(data) }, async (post, base) => {
    const previous = process.env.BACKEND_URL;
    process.env.BACKEND_URL = base;
    const request = (data) => new Request("http://localhost/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    try {
      assert.equal((await POST(request(valid))).status, 201);
      assert.equal(saved.length, 1);
      const invalid = await POST(request({ ...valid, service: "Unlisted" }));
      assert.equal(invalid.status, 400);
      assert.ok((await invalid.json()).errors.service);
      assert.equal(saved.length, 1);
    } finally {
      if (previous === undefined) delete process.env.BACKEND_URL;
      else process.env.BACKEND_URL = previous;
    }
  });
});
