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
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
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

  // Allow static files, api routes, or public auth pages if any
  const isPublicPath =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/unauthorized";

  if (isPublicPath) {
    return NextResponse.next();
  }

  // All dashboard routes are protected and strictly require admin role
  if (!token) {
    const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
    const loginRedirect = new URL(`${webUrl}/login`);
    loginRedirect.searchParams.set("from", request.nextUrl.href);
    return NextResponse.redirect(loginRedirect);
  }

  const payload = parseJwtPayload(token);
  const nowInSeconds = Math.floor(Date.now() / 1000);

  if (!payload || (payload.exp && payload.exp < nowInSeconds)) {
    const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
    const loginRedirect = new URL(`${webUrl}/login`);
    loginRedirect.searchParams.set("from", request.nextUrl.href);
    const response = NextResponse.redirect(loginRedirect);
    response.cookies.delete("accessToken");
    return response;
  }

  // Role verification: Admin only
  if (payload.role !== "admin") {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    return NextResponse.rewrite(unauthorizedUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-role", payload.role);
  requestHeaders.set("x-user-id", payload.sub || "");
  requestHeaders.set("x-user-name", payload.name || "");
  requestHeaders.set("x-user-email", payload.email || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
