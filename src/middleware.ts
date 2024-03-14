import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const publicPaths = ['/sign-in', '/sign-up'];

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // If it's not a public path and not requesting static files or API routes
    if (!isPublicPath && !pathname.includes('/_next/static/') && !pathname.startsWith('/api/')) {
        // Here you can further expand your logic to check for authenticated users
        // For now, we simply redirect to the /sign-in page

        // Redirect to the sign-in page
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};