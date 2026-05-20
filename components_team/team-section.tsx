"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TeamCard from "@/components_team/team-card";
import { supabase } from "@/lib/supabase";

type Member = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  description?: string;
};

type EBoard = {
  year: string;
  groupPhoto?: string;
  members: Member[];
};

// ─────────────────────────────────────────────────────────────────────────────

export default function TeamSection() {
  const [eBoards, setEBoards] = useState<EBoard[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch from Supabase on mount
  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("eboard_years")
          .select("year, group_photo_url, eboard_members(*)")
          .order("created_at", { ascending: true });

        if (error) throw error;

        const boards: EBoard[] = (data ?? []).map((y: any) => ({
          year: y.year,
          groupPhoto: y.group_photo_url ?? undefined,
          members: (y.eboard_members ?? [])
            .sort((a: any, b: any) => a.display_order - b.display_order)
            .map((m: any) => ({
              name: m.name,
              role: m.role,
              image: m.image_url ?? "",
              linkedin: m.linkedin ?? undefined,
              email: m.email ?? undefined,
              description: m.description ?? undefined,
            })),
        }));

        setEBoards(boards);
        // Default to the latest year
        setIndex(Math.max(0, boards.length - 1));
      } catch (err) {
        console.error("Failed to load E-Board data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-340 mx-auto px-4 md:px-10 text-center">
          <div className="mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-(--color-crimson)">Stevens Chapter</p>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-black text-(--color-navy) leading-tight tracking-tight">
              Meet the Team
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--color-crimson)", borderTopColor: "transparent" }} />
          </div>
        </div>
      </section>
    );
  }

  if (eBoards.length === 0) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-340 mx-auto px-4 md:px-10 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-black text-(--color-navy) leading-tight tracking-tight">
            Meet the Team
          </h2>
          <p className="mt-8 text-sm" style={{ color: "var(--color-text-muted)" }}>No team data available yet.</p>
        </div>
      </section>
    );
  }

  const board = eBoards[index];
  const hasPrev = index > 0;
  const hasNext = index < eBoards.length - 1;

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-340 mx-auto px-4 md:px-10 text-center">

        {/* Header */}
        <div className="mb-14">
          {/* Eyebrow with flanking lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-(--color-crimson)">Stevens Chapter</p>
          </div>

          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-black text-(--color-navy) leading-tight tracking-tight">
            Meet the Team
          </h2>

    
          {/* Year navigator */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setIndex((i) => i - 1)}
              disabled={!hasPrev}
              aria-label="Previous year"
              className="w-9 h-9 rounded-full border-2 border-(--color-navy) flex items-center justify-center
                         text-(--color-navy) hover:bg-(--color-crimson) hover:text-white hover:border-(--color-crimson) transition-all duration-200
                         disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-4 h-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="px-6 py-1.5 rounded-full border-2 border-(--color-navy) text-(--color-navy) font-semibold text-sm min-w-[120px] tracking-wide">
              {board.year}
            </span>

            <button
              onClick={() => setIndex((i) => i + 1)}
              disabled={!hasNext}
              aria-label="Next year"
              className="w-9 h-9 rounded-full border-2 border-(--color-navy) flex items-center justify-center
                         text-(--color-navy) hover:bg-(--color-crimson) hover:text-white hover:border-(--color-crimson) transition-all duration-200
                         disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-4 h-4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-20">
          {board.members.map((m) => (
            <TeamCard key={m.name + m.role} {...m} />
          ))}
        </div>

        {/* Group photo */}
        {board.groupPhoto && (
          <div className="mt-16 relative mx-auto w-full max-w-[480px] h-[200px] md:h-[270px] rounded-xl overflow-hidden shadow-md">
            <Image
              src={board.groupPhoto}
              alt={`${board.year} E-Board`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
