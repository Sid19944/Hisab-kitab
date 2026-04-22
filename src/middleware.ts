import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!token && url.pathname.startsWith("/land-detail")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!token && url.pathname.startsWith("/salary")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!token && url.pathname.startsWith("/workers")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!token && url.pathname.startsWith("/attendance")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if(token && token.isVerified && url.pathname.startsWith("/verify")){
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*","/land-detail/:path*","/salary/:path*","/workers/:path*","/attendance/:path*"],
};
