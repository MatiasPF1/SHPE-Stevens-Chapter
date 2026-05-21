"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type EventGallery = {
  id: string;
  title: string;
  caption: string;
  images: string[];
};

function EventCarousel({ event }: { event: EventGallery }) {
  const [index, setIndex] = useState(0);
  const total = event.images.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="flex flex-col ">
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
        style={{ backgroundColor: "var(--color-card-bg)" }}>
        {total > 0 ? (
          <Image
            src={event.images[index]}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ color: "var(--color-text-muted)" }}>
            <span className="text-xs font-medium">No photos yet</span>
          </div>
        )}

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Counter + caption */}
      <div className="mt-3 text-center">
        <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
          {index + 1} / {total}
        </p>
        <p className="font-[family-name:var(--font-raleway)] font-black italic text-lg leading-tight"
          style={{ color: "var(--color-navy)" }}>
          {event.title}
        </p>
        <p className="italic text-sm mt-0.5" style={{ color: "var(--color-slate)" }}>
          {event.caption}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [events, setEvents] = useState<EventGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("gallery_events")
        .select("id, title, caption, display_order, gallery_photos(public_url, display_order, created_at)")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (!error && data) {
        setEvents(
          data.map((e: any) => ({
            id: e.id,
            title: e.title,
            caption: e.caption,
            images: (e.gallery_photos ?? [])
              .sort((a: any, b: any) => a.display_order - b.display_order)
              .map((p: any) => p.public_url),
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main
      className="min-h-screen py-16 px-36 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-page-bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-[family-name:var(--font-raleway)] text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: "var(--color-navy)" }}
          >
            SHPE Stevens Gallery
          </h1>
          <p className="text-base md:text-lg leading-relaxed font-medium"
            style={{ color: "var(--color-slate)" }}>
            Relive our favorite SHPE moments, a visual story of familia, leadership, and growth, captured con cariño by the SHPE Family
          </p>
        </div>

        {/* 2-column grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "var(--color-crimson) transparent var(--color-crimson) transparent" }} />
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-base font-medium py-20" style={{ color: "var(--color-text-muted)" }}>
            No events yet — check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-26 gap-y-20">
            {events.map((event) => (
              <EventCarousel key={event.id} event={event} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
