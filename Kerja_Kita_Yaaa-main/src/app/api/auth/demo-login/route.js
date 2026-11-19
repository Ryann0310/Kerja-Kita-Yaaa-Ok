import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "../../../../lib/session";

const demoEmails = {
  applicant: "pelamar@kerjakita.test",
  company: "perusahaan@kerjakita.test",
  admin: "admin@kerjakita.test",
};

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Login demo dinonaktifkan." }, { status: 404 });
  }

  try {
    const { role } = await request.json();
    if (!Object.hasOwn(demoEmails, role)) {
      return NextResponse.json({ message: "Role demo tidak valid." }, { status: 400 });
    }
    const result = await query(
      "SELECT id, name, email, role, created_at FROM users WHERE email = $1 AND role = $2 LIMIT 1",
      [demoEmails[role], role],
    );
    const user = result.rows[0];
    if (!user) {
      return NextResponse.json({ message: "Akun demo belum tersedia. Jalankan npm run db:seed terlebih dahulu." }, { status: 404 });
    }

    const response = NextResponse.json({ message: "Berhasil masuk ke akun demo.", user });
    response.cookies.set(SESSION_COOKIE, createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Demo login error:", error.message);
    return NextResponse.json({ message: "Login demo gagal. Periksa koneksi database." }, { status: 500 });
  }
}
