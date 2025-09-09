import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get("sessionCartId")) {
    response.cookies.set("sessionCartId", crypto.randomUUID());
  }

  return response;
}

// Optionally scope the middleware to specific paths to keep it light
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
