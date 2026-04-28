"use client";

import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    // Navbar Container
    <nav
      aria-label="Main navigation"
      className="flex h-20 items-center justify-between px-10 border-b border-(--color-border)"
      style={{ backgroundColor: "var(--color-navbar-bg)" }}
    >
      {/* Left Section - Stevens SHPE Logo → links to home */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/branding/Stevens Institute of Technology.svg"
            alt="Stevens Institute of Technology"
            width={320}
            height={60}
            className="w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110 translate-y-2"
            style={{ height: "auto", filter: "var(--logo-filter)" }}
            priority
          />
        </Link>
      </div>

      {/* Right Section - Hyperlinks to different sections */}
      <div className="flex items-center gap-8 font-semibold text-(--color-navy)">
        {[
          { label: "Team", href: "/team" },
          { label: "Sponsors", href: "/sponsors" },
          { label: "Contact Us", href: "/contact" },
        ].map(({ label, href }) => (
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
    </nav>
  );
}
