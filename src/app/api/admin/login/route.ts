import { NextResponse } from "next/server";
import { getSessionCookieName, createSessionToken, validateCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };

    if (!body.username || !body.password || !validateCredentials(body.username, body.password)) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(getSessionCookieName(), createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Login failed" }, { status: 400 });
  }
}
