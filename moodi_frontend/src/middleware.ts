import { AuthApiServiceImplementation } from "@/lib/api/auth/auth.api.service";
import { NextRequest, NextResponse } from "next/server";
import { useUserNameStore } from "./lib/stores/useUserNameStore";
import { Emoji } from "./lib/types/moodiusers.types";

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("moodisessionid")?.value;
  const { pathname } = request.nextUrl;

  const redirectRoutes = ["/"];

  const publicRoutes = ["/", "/login"];

  const protectedRoutes = ["/feed", "/profile"];


  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route)
  )
  const isRedirectRoute = redirectRoutes.some(route =>
    pathname === route || pathname.startsWith(route)
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const authApiService = new AuthApiServiceImplementation();



  if (isProtectedRoute) {
    if (sessionId) {
      const sessionResult = await authApiService.validateSession(sessionId);
      if (!sessionResult.valid) {
        console.log(`session validation failed: ${sessionResult.reason}`);

        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);

        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("moodisessionid");
        return response;
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", sessionResult.userId?.toString() || "");
      requestHeaders.set("x-username", sessionResult.username || "");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);

      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("moodisessionid");
      return response;
    }
  }

  if (isPublicRoute && sessionId) {
    const sessionResult = await authApiService.validateSession(sessionId);

    if (sessionResult.valid) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  if (isRedirectRoute) {
    if (sessionId) {
      const sessionResult = await authApiService.validateSession(sessionId);
      if (sessionResult.valid) {
        return NextResponse.redirect(new URL("/feed", request.url));
      } else {
        const loginUrl = new URL("/login", request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("moodisessionid");
        return response;
      }
    } else {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("moodisessionid");
      return response;
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|feed).*)',
  ]
}