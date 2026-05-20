import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIX = "/AdminPortal";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard AdminPortal routes
  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Build a server-side Supabase client that can read/write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // getUser() revalidates the JWT with the Supabase Auth server on every request.
  // getSession() only reads the cookie and trusts it blindly — revoked tokens would pass.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    // Preserve the original destination so login can redirect back after auth
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  // Run on all /AdminPortal routes, including nested ones
  matcher: ["/AdminPortal", "/AdminPortal/:path*"],
};
