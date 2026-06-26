import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n.client";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin panel and API routes are not localized — let them through untouched.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return;
  if (pathname.startsWith("/api/")) return;

  // Already prefixed with a locale — let it through.
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  if (hasLocale) return;

  // Otherwise send everyone to the default locale (Georgian),
  // preserving the rest of the path and query.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on every route except Next internals + static assets.
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
