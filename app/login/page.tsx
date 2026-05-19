"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase auth logic goes here
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-page-bg)" }}
    >
      {/* Background accent blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-(--color-crimson) opacity-5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-(--color-navy) opacity-5 blur-3xl" />

      <div
        className="relative w-full max-w-md rounded-3xl border border-(--color-border) shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        {/* Top crimson accent bar */}

        <div className="px-8 pt-10 pb-10 flex flex-col gap-6">

          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/branding/Stevens Institute of Technology.svg"
                alt="SHPE Stevens"
                width={220}
                height={220}
                className="h-auto w-72"
                style={{ filter: "var(--logo-filter)" }}
                priority
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-(--color-border)" />
            <span className="text-xs font-semibold tracking-widest uppercase text-(--color-crimson)">Admin Access</span>
            <div className="flex-1 h-px bg-(--color-border)" />
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-(--color-navy)">Welcome back</h1>
            <p className="text-sm text-(--color-text-muted)">Sign in to your SHPE Stevens account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value="shpe.sit@gmail.com"
                readOnly
                className="w-full rounded-xl border border-(--color-border) px-4 py-3 text-sm
                           bg-(--color-page-bg) text-(--color-navy) opacity-60 cursor-not-allowed
                           focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-(--color-border) px-4 py-3 pr-11 text-sm
                             bg-(--color-page-bg) text-(--color-navy) placeholder:text-(--color-text-muted)
                             focus:outline-none focus:ring-2 focus:ring-(--color-crimson) transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) hover:text-(--color-navy) transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 w-full rounded-full bg-(--color-crimson) text-white
                         text-sm font-semibold py-3 shadow-md hover:shadow-[0_0_22px_rgba(163,32,53,0.5)]
                         hover:bg-(--color-crimson-hover) transition-all duration-200"
            >
              <LogIn size={16} />
              Log In
            </button>
          </form>

          {/* Back link */}
          <p className="text-center text-xs text-(--color-text-muted)">
            <Link href="/" className="hover:text-(--color-crimson) transition-colors duration-200">
              ← Back to home
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
