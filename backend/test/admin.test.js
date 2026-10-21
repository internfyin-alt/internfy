import assert from "node:assert/strict";
import { scryptSync } from "node:crypto";
import { test } from "node:test";
import { createHandler } from "../supabase/functions/internfy-api/handler.js";
import { authenticated, createSession, sessionCookie, validCredentials } from "../../frontend/src/lib/admin-auth.js";
import { POST as login } from "../../frontend/src/app/api/admin/login/route.js";
import { POST as logout } from "../../frontend/src/app/api/admin/logout/route.js";
import { GET as enquiries } from "../../frontend/src/app/api/admin/enquiries/route.js";

test("admin login, signed sessions, expiry, protected list and logout", async () => {
  const keys = ["ADMIN_EMAIL", "ADMIN_PASSWORD_HASH", "ADMIN_SESSION_SECRET", "ADMIN_API_SECRET", "SUPABASE_URL"];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  Object.assign(process.env, {
    ADMIN_EMAIL: "admin@example.test",
    ADMIN_PASSWORD_HASH: `test-salt:${scryptSync("strong-test-password", "test-salt", 64).toString("hex")}`,
    ADMIN_SESSION_SECRET: "test-session-secret",
    ADMIN_API_SECRET: "test-api-secret",
  });
  let reads = 0;
  process.env.SUPABASE_URL = "https://example.supabase.co";
  const settings = {
    ADMIN_API_SECRET: process.env.ADMIN_API_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: "test-service-key",
  };
  const handler = createHandler({
    env: (key) => settings[key],
    fetcher: async (url, options) => {
      reads++;
      assert.equal(url.pathname, "/rest/v1/service_enquiries");
      assert.equal(options.headers.apikey, settings.SUPABASE_SERVICE_ROLE_KEY);
      return Response.json([{ id: "test-record", name: "Test Visitor" }], { headers: { "Content-Range": "0-0/1" } });
    },
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (url, options) => handler(new Request(url, options));
  const request = (path, body, cookie, origin = "http://localhost") => new Request(`http://localhost/api/admin/${path}`, {
    method: body ? "POST" : "GET", headers: { origin, "Content-Type": "application/json", ...(cookie ? { cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}),
  });
  try {
    assert.equal((await fetch(`${process.env.SUPABASE_URL}/functions/v1/internfy-api/admin/enquiries`)).status, 401);
    assert.equal((await enquiries(request("enquiries"))).status, 401);
    assert.equal(reads, 0);
    assert.equal(validCredentials("admin@example.test", "wrong"), false);
    assert.equal((await login(request("login", { email: "admin@example.test", password: "wrong" }))).status, 401);
    const credentials = { email: "admin@example.test", password: "strong-test-password" };
    assert.equal((await login(request("login", credentials, undefined, "http://evil.test"))).status, 403);
    const response = await login(request("login", credentials));
    assert.equal(response.status, 200);
    const setCookie = response.headers.get("set-cookie");
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /SameSite=Strict/);
    const cookie = setCookie.split(";")[0];
    assert.equal(authenticated(request("enquiries", null, cookie)), true);
    assert.equal(authenticated(request("enquiries", null, cookie + "tampered")), false);
    const list = await enquiries(request("enquiries", null, cookie));
    assert.equal(list.status, 200);
    assert.equal(list.headers.get("cache-control"), "no-store");
    assert.equal((await list.json()).enquiries[0].id, "test-record");
    assert.equal(reads, 1);
    assert.equal((await enquiries(request("enquiries?page=0", null, cookie))).status, 400);
    const now = Date.now;
    let expired;
    try { Date.now = () => now() - 9 * 60 * 60 * 1000; expired = createSession(); } finally { Date.now = now; }
    assert.equal(authenticated(request("enquiries", null, sessionCookie(expired).split(";")[0])), false);
    const signedOut = await logout(request("logout", {}));
    assert.equal(signedOut.status, 200);
    assert.match(signedOut.headers.get("set-cookie"), /Max-Age=0/);
    assert.equal((await logout(request("logout", {}, undefined, "http://evil.test"))).status, 403);
    for (let i = 0; i < 18; i++) await login(request("login", { ...credentials, password: "wrong" }));
    assert.equal((await login(request("login", credentials))).status, 429);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; }
  }
});
