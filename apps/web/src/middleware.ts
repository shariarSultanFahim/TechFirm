import { NextResponse, type NextRequest } from "next/server";

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
  exp: number;
}

function parseJwtPayload(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    if (!base64Url) return null;
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedPath = pathname.startsWith("/account") || pathname.startsWith("/dashboard");

  if (isProtectedPath) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = parseJwtPayload(token);
    const nowInSeconds = Math.floor(Date.now() / 1000);

    // Check if token is invalid or expired
    if (!payload || (payload.exp && payload.exp < nowInSeconds)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      // Clear stale token
      response.cookies.delete("accessToken");
      return response;
    }

    // Forward role in custom header for server components if helpful
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-role", payload.role || "user");
    requestHeaders.set("x-user-id", payload.sub || "");
    requestHeaders.set("x-user-name", payload.name || "");

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"]
};
