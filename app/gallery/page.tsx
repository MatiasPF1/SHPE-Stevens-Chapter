"use client";

import { Heart } from "lucide-react";

export default function GalleryPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center py-10 px-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-page-bg)" }}
    >
      <div className="max-w-3xl mx-auto text-center -translate-y-40">

        {/* Title: SHPE Stevens — 2025 Gallery (Erase @, Cornell -> Stevens) */}
        <h1 className="font-[family-name:var(--font-raleway)] text-4xl md:text-6xl font-black text-(--color-navy) leading-tight mb-6">
          SHPE Stevens Gallery
        </h1>

        {/* Description (Erase emojis) */}
        <p className="text-base md:text-lg text-(--color-slate) leading-relaxed mb-8 font-medium">
          Relive our favorite SHPE moments, a visual story of familia, leadership, and growth, captured con cariño by the SHPE Fam
        </p>


      </div>
    </main>
  );
}
