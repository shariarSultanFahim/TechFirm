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

  // 1. Allow public static assets and metadata
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const payload = token ? parseJwtPayload(token) : null;
  const isTokenValid = Boolean(payload && payload.exp && payload.exp >= nowInSeconds);

  // 2. Handle Login Route (on port 3001)
  if (pathname === "/login" || pathname.startsWith("/login")) {
    if (isTokenValid && payload?.role === "admin") {
      return NextResponse.redirect(new URL("/overview", request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected Dashboard Routes: Must have valid token
  if (!isTokenValid || !payload) {
    const loginRedirect = new URL("/login", request.url);
    if (pathname !== "/" && pathname !== "/overview") {
      loginRedirect.searchParams.set("from", pathname);
    }
    const response = NextResponse.redirect(loginRedirect);
    if (token) {
      response.cookies.delete("accessToken");
    }
    return response;
  }

  // 4. Role verification: Admin only
  if (payload.role !== "admin") {
    const loginRedirect = new URL("/login", request.url);
    loginRedirect.searchParams.set("error", "unauthorized_role");
    const response = NextResponse.redirect(loginRedirect);
    response.cookies.delete("accessToken");
    return response;
  }

  // 5. Forward admin headers to server components
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
