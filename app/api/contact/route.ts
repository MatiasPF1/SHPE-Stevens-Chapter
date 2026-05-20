import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter — resets on server restart
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 2;           // per IP per window

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

/** Escapes HTML special characters to prevent XSS in email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",").at(-1)!.trim()
    : req.headers.get("x-real-ip") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).name !== "string" ||
    typeof (body as Record<string, unknown>).email !== "string" ||
    typeof (body as Record<string, unknown>).title !== "string" ||
    typeof (body as Record<string, unknown>).message !== "string"
  ) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { name, email, title, message } = body as Record<string, string>;

  // Basic field length limits
  if (name.length > 200 || email.length > 254 || title.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: "One or more fields exceed the allowed length." }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeTitle   = escapeHtml(title);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { error } = await resend.emails.send({
    from: "SHPE Stevens Contact <contact@stevensshpe.org>",
    to: "shpe.sit@gmail.com",
    replyTo: email,
    subject: `[Contact Form] ${safeTitle} — from ${safeName}`,
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Topic:</strong> ${safeTitle}</p>
      <hr />
      <p>${safeMessage}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
