//                         API Route for the contact form via EmailJS REST API
import { NextRequest, NextResponse } from "next/server"; // Next.js 13+ API route
const rateLimitMap = new Map<string, { count: number; resetAt: number }>(); // this rate limiter is in-memory and will reset on server restart.
const WINDOW_MS = 15 * 120 * 1000; // 15*120 seconds = 30 minutes per window
const MAX_REQUESTS = 2; // Max 2 submissions per IP per window

// Function 1: Simple in-memory rate limiter based on IP address
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


// Input sanitizer — trims, caps length, strips < > to prevent header injection
function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength).replace(/[<>]/g, "");
}

//all thsi are the contact form stuff that email askss
const ALLOWED_GOALS = [
  "Provide a suggestion",
  "Ask a question",
  "Report a problem",
  "Account concerns (activation/deletion/questions)",
];


// Post Request --> Handle form validation/rate limiting --> Send email via EmailJS REST API
export async function POST(req: NextRequest) {
  //Rate limit
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 }
    );
  }

  // Parse body to seend to emailjs and sanitize inputs
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, title, message } = body as Record<string, unknown>;
  const cleanName = sanitize(name, 100);
  const cleanEmail = sanitize(email, 254);
  const cleanTitle = sanitize(title, 100);
  const cleanMessage = sanitize(message, 500);

  // ── Server-side validation
  if (!cleanName) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!ALLOWED_GOALS.includes(cleanTitle)) {
    return NextResponse.json({ error: "Invalid goal selected." }, { status: 400 });
  }
  if (!cleanMessage) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  // Read keys from server env vars
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS environment variables are not configured.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  // ── Send via EmailJS REST API 
  try {
    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: cleanName,
          email: cleanEmail,
          title: cleanTitle,
          message: cleanMessage,
        },
      }),
    });
    if (!emailRes.ok) {
      console.error("EmailJS error:", await emailRes.text());
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
