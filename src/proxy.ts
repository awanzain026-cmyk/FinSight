import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/api/health"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((p) => path === p);

  if (isPublic) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get("finsight_session");

  if (!hasSession) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/insights/:path*"],
};
