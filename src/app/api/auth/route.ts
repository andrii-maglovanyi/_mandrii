import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD_SECRET) {
    const secureCookie = serialize("auth", password, {
      httpOnly: true, 
      
// Accessible site-wide
maxAge: 60 * 60 * 24, 
      


// Prevent CSRF attacks
path: "/", 
      


// Secure in production
sameSite: "strict", 
      
// Prevents JavaScript access
secure: process.env.NODE_ENV === "production", // 1 day expiration (in seconds)
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.headers.set("Set-Cookie", secureCookie);
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
