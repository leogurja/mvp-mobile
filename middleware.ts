import { NextResponse, type NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [{ source: "/admin", missing: [{ type: "cookie", key: "token" }] }],
};
