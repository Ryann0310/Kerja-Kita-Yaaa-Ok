import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { findDemoUserByRole, isDemoEnabled } from "../../../../lib/demo-users";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "../../../../lib/session";

const demoEmails = {
  applicant: "pelamar@kerjakita.test",
  company: "perusahaan@kerjakita.test",
  admin: "admin@kerjakita.test",
};

export async function POST(request) {
  if (!isDemoEnabled()) {
    return NextResponse.json({ message: "Login demo dinonaktifkan." }, { status: 404 });
  }

  try {
    const { role } = await request.json();
    if (!Object.hasOwn(demoEmails, role)) {
      return NextResponse.json({ message: "Role demo tidak valid." }, { status: 400 });
    }

    // 1) Coba akun demo di PostgreSQL (hasil npm run db:seed).
    let user = null;
    try {
      const result = await query(
        "SELECT id, name, email, role, created_at FROM users WHERE email = $1 AND role = $2 LIMIT 1",
        [demoEmails[role], role],
      );
      user = result.rows[0] || null;
    } catch (dbError) {
      console.warn("Demo login: database tidak tersedia, memakai akun demo bawaan.", dbError.message);
    }

    // 2) Jika database belum siap / belum di-seed, pakai akun demo bawaan (tanpa database).
    if (!user) user = findDemoUserByRole(role);
    if (!user) {
      return NextResponse.json({ message: "Akun demo tidak ditemukan." }, { status: 404 });
    }

    const response = NextResponse.json({ message: "Berhasil masuk ke akun demo.", user });
    response.cookies.set(SESSION_COOKIE, createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Demo login error:", error.message);
    return NextResponse.json({ message: "Login demo gagal." }, { status: 500 });
  }
}
