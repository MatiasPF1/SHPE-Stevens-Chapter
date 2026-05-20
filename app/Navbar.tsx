"use client";

import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const navLinks = [
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="relative border-b border-(--color-border)"
      style={{ backgroundColor: "var(--color-navbar-bg)" }}
    >
      {/* Main bar */}
      <div className="flex h-20 items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="block w-fit">
            <Image
              src="/branding/Stevens Institute of Technology.svg"
              alt="Stevens Institute of Technology"
              width={320}
              height={60}
              className="w-58 sm:w-64 md:w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-105 translate-y-1 md:translate-y-2"
              style={{ height: "auto", filter: "var(--logo-filter)" }}
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-(--color-navy)">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative inline-block text-(--color-navy) text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-(--color-crimson) group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-(--color-crimson) transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <a
            href="https://shpe.org/membership/become-a-member/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2 rounded-full bg-(--color-crimson) text-white text-sm font-semibold overflow-hidden
                       shadow-md hover:shadow-[0_0_18px_rgba(163,32,53,0.5)] transition-all duration-300
                       before:absolute before:inset-0 before:bg-white/10 before:-translate-x-full before:skew-x-[-20deg]
                       hover:before:translate-x-[200%] before:transition-transform before:duration-500"
          >
            Join SHPE
          </a>

          {session ? (
            <>
              <Link
                href="/AdminPortal"
                className="px-5 py-2 rounded-full border border-(--color-navy) text-(--color-navy) text-sm font-semibold
                           hover:bg-(--color-navy) hover:text-white transition-all duration-200"
              >
                Admin Portal
              </Link>
              <button
                onClick={() => supabase.auth.signOut()}
                className="cursor-pointer px-5 py-2 rounded-full bg-(--color-crimson) text-white text-sm font-semibold
                           hover:bg-(--color-crimson-hover) transition-all duration-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-(--color-navy) text-(--color-navy) text-sm font-semibold
                         hover:bg-(--color-navy) hover:text-white transition-all duration-200"
            >
              Log In
            </Link>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border)
                       text-(--color-navy) hover:bg-(--color-crimson) hover:text-white
                       hover:border-(--color-crimson) transition-all duration-200"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2 shrink-0 relative z-20">
          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border)
                       text-(--color-navy) hover:bg-(--color-crimson) hover:text-white
                       hover:border-(--color-crimson) transition-all duration-200"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border)
                       text-(--color-navy) hover:bg-(--color-crimson) hover:text-white
                       hover:border-(--color-crimson) transition-all duration-200"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-(--color-border) px-6 py-5 flex flex-col gap-5 relative z-20"
          style={{ backgroundColor: "var(--color-navbar-bg)" }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-(--color-navy) text-sm font-semibold tracking-wide hover:text-(--color-crimson) transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://shpe.org/membership/become-a-member/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-5 py-2 rounded-full bg-(--color-crimson) text-white text-sm font-semibold shadow-md"
          >
            Join SHPE
          </a>
          {session ? (
            <>
              <Link
                href="/AdminPortal"
                onClick={() => setMenuOpen(false)}
                className="w-fit px-5 py-2 rounded-full border border-(--color-navy) text-(--color-navy) text-sm font-semibold"
              >
                Admin Portal
              </Link>
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  setMenuOpen(false);
                }}
                className="w-fit text-left px-5 py-2 rounded-full bg-(--color-crimson) text-white text-sm font-semibold"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-fit px-5 py-2 rounded-full border border-(--color-navy) text-(--color-navy) text-sm font-semibold"
            >
              Log In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
