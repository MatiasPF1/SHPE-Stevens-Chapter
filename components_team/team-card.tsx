"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  description?: string;
}

export default function TeamCard({ name, role, image, linkedin, email, description }: TeamCardProps) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-[0_20px_56px_rgba(12,35,64,0.18)] hover:-translate-y-1.5"
      style={{ height: '370px', boxShadow: '0 2px 8px rgba(12,35,64,0.07), 0 6px 24px rgba(12,35,64,0.06)' }}
      onClick={() => setShowBio((v) => !v)}
    >
      {/* ── Top accent bar (gradient, animates left→right on hover) ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#A32035] via-[#d63658] to-[#A32035] w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>

      {/* ── Portrait fills entire card ── */}
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      {/* Stronger vignette on hover */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Name + role overlaid at bottom */}
      <div className="absolute bottom-0 inset-x-0 px-5 pb-5 text-left">
        <p className="font-bold text-white text-[15px] leading-tight tracking-tight">{name}</p>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/90 mt-1">{role}</p>
        {/* View Bio */}
        <div className="h-4 overflow-hidden mt-2">
          <div className="flex items-center gap-1.5 translate-y-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d63658]">View Bio →</span>
          </div>
        </div>
      </div>

      {/* ── Bio overlay ── */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-6 text-left transition-all duration-300 ease-out ${
          showBio ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(160deg, #0C2340 70%, #1a3a5c 100%)' }}
      >
        <div className="w-8 h-[2px] bg-[#A32035] mb-4 rounded-full" />
        <p className="font-bold text-white text-[15px] leading-tight">{name}</p>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#d63658] mt-1">{role}</p>
        {description && (
          <p className="text-white/70 text-[11px] mt-3 leading-relaxed">{description}</p>
        )}
        <div className="mt-5 flex gap-2">
          {linkedin && linkedin.length > 0 && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <div className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white flex items-center justify-center transition-colors duration-200 group/icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white group-hover/icon:fill-[#0A66C2] transition-colors">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </a>
          )}
          {email && email.length > 0 && (
            <a href={`mailto:${email}`} onClick={(e) => e.stopPropagation()}>
              <div className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white flex items-center justify-center transition-colors duration-200 group/icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white group-hover/icon:text-[#374151] transition-colors">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
