import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session lookup error:", error.message);
    return NextResponse.json({ message: "Tidak dapat memeriksa sesi." }, { status: 500 });
  }
}
