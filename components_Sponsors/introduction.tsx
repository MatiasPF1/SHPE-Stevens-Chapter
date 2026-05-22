"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Introduction() {
  const [mainImageUrl, setMainImageUrl] = useState<string>("/sponsors/SHPE_SPONSORS.jpg");

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("sponsors_content")
          .select("main_image_url")
          .limit(1)
          .single();
          
        if (error) throw error;
        if (data?.main_image_url) {
          setMainImageUrl(data.main_image_url);
        }
      } catch (err) {
        console.error("Failed to load sponsors content:", err);
      }
    }
    fetchContent();
  }, []);

  return (
    <section
      style={{ backgroundColor: "var(--color-page-bg)" }}
      className="w-full py-10 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
          >
            Empowering the Next Generation of{" "}
            <span style={{ color: "var(--color-crimson)" }}>Hispanic Leaders</span>
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Join us in our mission to foster diversity and excellence in STEM.
            Together, we can build a stronger, more inclusive future for
            engineering.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-10 mt-2">
            <div className="flex flex-col">
              <span
                className="text-4xl font-extrabold"
                style={{ color: "var(--color-crimson)" }}
              >
                80+
              </span>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                Active Members
              </span>
            </div>

            <div className="flex flex-col">
              <span
                className="text-4xl font-extrabold"
                style={{ color: "var(--color-crimson)" }}
              >
                15+
              </span>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                Represented Countries
              </span>
            </div>

            <div className="flex flex-col">
              <span
                className="text-4xl font-extrabold"
                style={{ color: "var(--color-crimson)" }}
              >
                40+
              </span>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                Annual Events
              </span>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-lg aspect-[800/560]"
            style={{ borderColor: "var(--color-border)", border: "1px solid var(--color-border)" }}
          >
            <Image
              src={mainImageUrl}
              alt="SHPE Stevens Chapter sponsors event"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
