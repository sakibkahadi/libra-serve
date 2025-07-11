import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// The base domain of your app, configured via environment variable for flexibility.
// Defaults to localhost:3000 for local development.
export const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3000";

export function middleware(request: NextRequest) {
    // Clone the URL object so we can safely manipulate it if needed
    const url = request.nextUrl.clone();
const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    // Get the Host header from the incoming request, e.g. "xyz.localhost:3000"
    const host = request.headers.get("host");
    
    console.log("Middleware triggered:", { host, pathname: url.pathname });
    
    // Skip this middleware for certain routes:
    // - API routes, so backend logic is unaffected
    // - Next.js static files (_next folder)
    // - Requests for files (contain '.' like .js, .css, images)
    // - Explicit /not-found page route
    if (
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/_next') ||
        url.pathname.includes('.') ||
        url.pathname === '/not-found'
    ) {
        // Continue normally without interfering
        return NextResponse.next();
    }
    
    // Split host by dots to extract subdomain parts
    // e.g. "xyz.localhost:3000" → ["xyz", "localhost:3000"]
    const hostParts = host?.split('.') || [];
    // The first part is treated as the subdomain
    const subdomain = hostParts[0];
    
    console.log("Host analysis:", { host, hostParts, subdomain });
    
    // Handle requests to the main domain without subdomain
    // This includes requests directly to BASE_DOMAIN or "www"
    if (!host || host === BASE_DOMAIN || subdomain === "www") {
        console.log("Main domain access");
        // No rewrite needed, proceed as normal
        return NextResponse.next();
    }
    
    // Handle the special case of localhost without subdomain for local dev
    // "localhost" only (no dots) means local development without subdomain usage
    if (host?.includes('localhost') && !host.includes('.')) {
        console.log("Localhost without subdomain");
        // Skip subdomain logic for local dev convenience
        return NextResponse.next();
    }
    
    // If there is a subdomain (host has multiple parts)
    if (hostParts.length > 1) {
        // Validate that the subdomain is allowed (matches a known client slug)
        const isValid = isValidSlug(subdomain);
        
        if (!isValid) {
            // If subdomain is invalid, redirect to a not-found page on main domain
            console.log("Invalid subdomain:", subdomain);
            return NextResponse.redirect(new URL(`${protocol}://${BASE_DOMAIN}/not-found`, request.url));
        }
        
        // If valid subdomain, rewrite URL to internal route under /clients/[slug]
        console.log("Valid subdomain, rewriting:", subdomain);
        
        // Example: user visits http://xyz.localhost:3000/path → rewrite to /clients/xyz/path
        // This lets your Next.js app handle subdomain routing using dynamic routes
        const newPath = `/clients/${subdomain}${url.pathname}${url.search}${url.hash}`;
        
        // Perform internal rewrite without changing the URL seen in browser
        return NextResponse.rewrite(new URL(newPath, request.url));
    }
    
    // Default: continue normally if none of the above conditions match
    return NextResponse.next();
}

// Helper function to check if a given slug is allowed/valid.
// This helps prevent routing to unexpected subdomains.
function isValidSlug(slug: string | undefined): boolean {
    if (!slug) return false;
    // List of known client slugs - ideally keep this in sync with your data
    const clients = ["client1", "client2", "sakib", "abc", "xyz", "kahadi", "lamptechs"];
    return clients.includes(slug);
}

// Configure the middleware to match all routes except:
// - API routes
// - Next.js static files and images
// - favicon.ico request
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
