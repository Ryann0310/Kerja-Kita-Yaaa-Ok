import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "./db";

export const SESSION_COOKIE = "kerjakita_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET harus diisi dengan minimal 32 karakter pada .env.local.");
  }
  return secret;
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function signature(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(user) {
  const now = Math.floor(Date.now() / 1000);
  const payload = encode({
    sub: String(user.id),
    role: user.role,
    name: user.name,
    email: user.email,
    iat: now,
    exp: now + SESSION_MAX_AGE,
  });
  const unsigned = `v1.${payload}`;
  return `${unsigned}.${signature(unsigned)}`;
}

export function verifySessionToken(token) {
  try {
    if (typeof token !== "string") return null;
    const [version, payload, suppliedSignature] = token.split(".");
    if (version !== "v1" || !payload || !suppliedSignature) return null;
    const unsigned = `${version}.${payload}`;
    const expected = Buffer.from(signature(unsigned));
    const supplied = Buffer.from(suppliedSignature);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.sub || !data.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) return null;

  const result = await query(
    "SELECT id, name, email, role, created_at FROM users WHERE id = $1 LIMIT 1",
    [session.sub],
  );
  return result.rows[0] || null;
}

export async function requireRole(role) {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Gagal memverifikasi sesi KerjaKita:", error.message);
    redirect("/login?database=unavailable");
  }

  if (!user) redirect("/login");
  if (user.role !== role) redirect(role === "applicant" ? "/dashboard/pelamar" : role === "company" ? "/dashboard/perusahaan" : "/dashboard/admin");
  return user;
}
