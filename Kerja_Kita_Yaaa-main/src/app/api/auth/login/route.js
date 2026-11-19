import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/password";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "../../../../lib/session";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan kata sandi wajib diisi." }, { status: 400 });
    }
    if (email.length > 255 || password.length > 128) {
      return NextResponse.json({ message: "Email atau kata sandi tidak valid." }, { status: 400 });
    }

    const result = await query(
      "SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = $1 LIMIT 1",
      [email],
    );
    const user = result.rows[0];
    const validPassword = user ? await verifyPassword(password, user.password_hash) : false;

    if (!user || !validPassword) {
      return NextResponse.json({ message: "Email atau kata sandi tidak sesuai." }, { status: 401 });
    }

    const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role, created_at: user.created_at };
    const response = NextResponse.json({ message: "Berhasil masuk.", user: publicUser });
    response.cookies.set(SESSION_COOKIE, createSessionToken(publicUser), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    return NextResponse.json({ message: "Login gagal. Periksa koneksi dan konfigurasi database." }, { status: 500 });
  }
}
