import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/password";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "../../../../lib/session";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const role = body.role;

    if (name.length < 2 || name.length > 140) {
      return NextResponse.json({ message: "Nama harus terdiri dari 2 sampai 140 karakter." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return NextResponse.json({ message: "Format email belum benar." }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ message: "Kata sandi harus terdiri dari minimal 8 karakter." }, { status: 400 });
    }
    if (!(["applicant", "company"].includes(role))) {
      return NextResponse.json({ message: "Role pendaftaran tidak valid." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const result = await query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, passwordHash, role],
    );
    const user = result.rows[0];
    const response = NextResponse.json({ message: "Akun berhasil dibuat.", user }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Email tersebut sudah terdaftar. Gunakan email lain atau masuk." }, { status: 409 });
    }
    console.error("Register error:", error.message);
    return NextResponse.json({ message: "Pendaftaran gagal. Pastikan database sudah disiapkan dan coba lagi." }, { status: 500 });
  }
}
