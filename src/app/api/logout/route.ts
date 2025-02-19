import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Create response object
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Delete authentication cookie
  response.cookies.delete("authToken");

  return response;
}
