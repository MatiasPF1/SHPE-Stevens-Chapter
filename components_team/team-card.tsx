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
      className="group relative bg-white cursor-pointer"
      style={{ boxShadow: '0 24px 64px -16px rgba(12,35,64,0.13), 0 4px 18px -4px rgba(12,35,64,0.07)' }}
      onClick={() => setShowBio((v) => !v)}
    >
      {/* ── Edge-to-edge portrait with diagonal bottom cut ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '260px', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* ── White info section ── */}
      <div className="bg-white px-5 pt-3 pb-5">
        {/* Red accent line + Name */}
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-[18px] bg-[#A32035] rounded-full shrink-0" />
          <p className="font-bold text-[#0C2340] text-[15px] leading-tight tracking-tight">{name}</p>
        </div>

        {/* Role */}
        <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#3D4F5F]/55 mt-1.5 ml-[15.5px]">
          {role}
        </p>

        {/* View Bio — slides up on hover */}
        <div className="ml-[15.5px] mt-3 h-4 overflow-hidden">
          <div className="flex items-center gap-1.5 translate-y-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.25" stroke="#A32035" strokeWidth="0.75" />
              <path d="M4 6h4M8 6L6 4M8 6L6 8" stroke="#A32035" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A32035]">View Bio</span>
          </div>
        </div>
      </div>

      {/* ── Bio overlay ── */}
      <div
        className={`absolute inset-0 bg-[#0C2340]/96 flex flex-col justify-center px-6 text-left transition-all duration-300 ease-out ${
          showBio ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-[2px] bg-[#A32035] mb-4 rounded-full" />
        <p className="font-bold text-white text-[15px] leading-tight">{name}</p>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#A32035] mt-1">{role}</p>
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
