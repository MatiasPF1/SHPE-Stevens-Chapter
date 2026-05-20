"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Sponsor = {
  id: string;
  name: string;
  image_url: string;
  width: number;
  height: number;
};

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSponsors() {
      try {
        const { data, error } = await supabase
          .from("sponsors")
          .select("id, name, image_url, width, height")
          .order("display_order", { ascending: true });

        if (error) throw error;
        setSponsors(data || []);
      } catch (err) {
        console.error("Failed to load sponsors:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSponsors();
  }, []);

  if (loading) {
    return (
      <section className="py-20" style={{ backgroundColor: "var(--color-page-bg)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-4xl font-extrabold mb-9 -translate-y-4"
            style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
          >
            Thank You to Our Sponsors
          </h2>
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--color-crimson)", borderTopColor: "transparent" }} />
          </div>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 
          className="text-3xl md:text-4xl font-extrabold mb-9 -translate-y-4"
          style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
        >
          Thank You to Our Sponsors
        </h2>
        <p 
          className="text-base md:text-lg mb-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          We are incredibly grateful for the support of our sponsors, who make our mission possible.
        </p>
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="transition-all duration-300 flex justify-center items-center">
              <Image
                src={sponsor.image_url}
                alt={`${sponsor.name} Logo`}
                width={sponsor.width || 200}
                height={sponsor.height || 100}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
