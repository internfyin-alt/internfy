import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "internfy_admin";
export const SESSION_SECONDS = 8 * 60 * 60;

function equal(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function configured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_API_SECRET);
}

export function validCredentials(email, password) {
  if (!configured() || typeof email !== "string" || typeof password !== "string" || password.length > 256) return false;
  const [salt, expected] = process.env.ADMIN_PASSWORD_HASH.split(":");
  if (!salt || !expected) return false;
  const hash = scryptSync(password, salt, 64).toString("hex");
  return equal(hash, expected) && equal(email.trim().toLowerCase(), process.env.ADMIN_EMAIL.toLowerCase());
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ email: process.env.ADMIN_EMAIL, expires: Date.now() + SESSION_SECONDS * 1000 })).toString("base64url");
  const signature = createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function authenticated(request) {
  if (!configured()) return false;
  const cookie = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  if (!cookie || cookie.length > 2048) return false;
  const [payload, signature, extra] = cookie.split(".");
  if (!payload || !signature || extra) return false;
  const expected = createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
  if (!equal(signature, expected)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString());
    return session.email === process.env.ADMIN_EMAIL && session.expires > Date.now();
  } catch { return false; }
}

export function sameOrigin(request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export function sessionCookie(value, maxAge = SESSION_SECONDS) {
  return `${ADMIN_COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}
