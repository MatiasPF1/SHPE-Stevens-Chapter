import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter — resets on server restart
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 2;           // per IP addres per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 }
    );
  }

  // TODO: implement email sending
  return NextResponse.json({ success: true }, { status: 200 });
}
