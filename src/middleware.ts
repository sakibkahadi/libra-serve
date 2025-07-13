import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// The base domain of your app
export const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3000";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const host = request.headers.get("host");
    
    console.log("Middleware triggered:", { host, pathname: url.pathname });
    
    // Skip middleware for certain routes
    if (
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/_next') ||
        url.pathname.includes('.') ||
        url.pathname === '/not-found'
    ) {
        return NextResponse.next();
    }
    
    const hostParts = host?.split('.') || [];
    const subdomain = hostParts[0];
    
    console.log("Host analysis:", { host, hostParts, subdomain });
    
    // Handle main domain (production: yourdomain.com, dev: localhost:3000)
    if (!host || host === BASE_DOMAIN || subdomain === "www") {
        console.log("Main domain access");
        return NextResponse.next();
    }
    
    // Handle localhost without subdomain for local dev
    if (process.env.NODE_ENV === "development" && host?.includes('localhost') && !host.includes('.')) {
        console.log("Localhost without subdomain");
        return NextResponse.next();
    }
    
    // Handle subdomains
    if (hostParts.length > 1) {
        const isValid = isValidSlug(subdomain);
        
        if (!isValid) {
            console.log("Invalid subdomain:", subdomain);
            return NextResponse.redirect(new URL(`${protocol}://${BASE_DOMAIN}/not-found`, request.url));
        }
        
        console.log("Valid subdomain, rewriting:", subdomain);
        
        const newPath = `/clients/${subdomain}${url.pathname}${url.search}${url.hash}`;
        return NextResponse.rewrite(new URL(newPath, request.url));
    }
    
    return NextResponse.next();
}

// In production, you might want to fetch this from a database
async function isValidSlug(slug: string | undefined): Promise<boolean> {
    if (!slug) return false;
    
    // For production, consider fetching from database:
    // const client = await db.client.findUnique({ where: { slug } });
    // return !!client;
    
    // Static list for now
    const clients = ["client1", "client2", "sakib", "abc", "xyz", "kahadi", "lamptechs"];
    return clients.includes(slug);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}