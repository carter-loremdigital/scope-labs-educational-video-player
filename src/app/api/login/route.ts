import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse request body for user's ID
  const { userId } = await request.json();

  // Create response object
  const response = NextResponse.json({ message: "Logged in successfully" });

  // Set a secure, HttpOnly cookie to store the user's ID
  response.cookies.set("authToken", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // Cookie expires in one week
  });

  return response;
}
