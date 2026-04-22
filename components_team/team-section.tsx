"use client";

import { useState } from "react";
import Image from "next/image";
import TeamCard from "@/components_team/team-card";

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

// ── Add future e-boards here ──────────────────────────────────────────────────
const eBoards: EBoard[] = [
  {
    year: "2025 / 2026",
    groupPhoto: "/SHPE_2025-2026.png",
    members: [
      { name: "Eve Gutierrez",          role: "President",               image: "/team/Eve_President.jpg",             linkedin: "https://www.linkedin.com/in/eve-gutierrez-07333724a/",   email: "egutier1@stevens.edu",   description: "Leads the chapter, sets the vision, and represents SHPE Stevens to the campus and national organization." },
      { name: "Sabrina Elgazzar",       role: "Internal Vice President", image: "/team/Sabrina_VP.jpg",                linkedin: "https://www.linkedin.com/in/sabrinaelgazzar/",           email: "selgazza@stevens.edu",   description: "Oversees member engagement, internal events, and the well-being of the chapter community." },
      { name: "Nicolas Buendia",        role: "External Vice President", image: "/team/Nicolas_VP.jpg",                linkedin: "https://www.linkedin.com/in/nicolas-buendia/",           email: "nbuendia@stevens.edu",   description: "Manages corporate partnerships, professional events, and external chapter representation." },
      { name: "Emmanuel Madera",        role: "Treasurer",               image: "/team/Emanuel_Treasurer.jpg",         linkedin: "https://www.linkedin.com/in/emmanuel-madera/",           email: "emadera@stevens.edu",    description: "Maintains the chapter budget, manages funding, and ensures financial transparency." },
      { name: "Leonel Andrade",         role: "Chief Web Officer",       image: "/team/Leone_WebChief.jpg",            linkedin: "https://www.linkedin.com/in/leonel-andrade-ba9763212/",  email: "landrade1@stevens.edu",  description: "Books rooms for chapter events and manages attendance tracking for all meetings and activities." },
      { name: "Jesus Monegro",          role: "Secretary",               image: "/team/Jesus_Secretary.jpg",           linkedin: "https://www.linkedin.com/in/jesusmonegrojimenez/",       email: "jmonegro1@stevens.edu",  description: "Keeps records, manages communication channels, and coordinates meeting logistics." },
      { name: "Ines V. Nuñez",          role: "SHPEtina Head",           image: "/team/Ines_SHPETINA.jpg",             linkedin: "https://www.linkedin.com/in/inesnunez1/",                email: "inunez1@stevens.edu",    description: "Empowers Latina women in STEM through mentorship, networking, and dedicated programming." },
      { name: "Emely Vargas",           role: "External Relations",      image: "/team/Emely_ExternalRel.jpg",         linkedin: "https://www.linkedin.com/in/emely-vargas1/",             email: "evargas2@stevens.edu",   description: "Cultivates relationships with alumni, industry partners, and the broader STEM community." },
      { name: "Luis Alejandro Ruiz",    role: "Recruitment Chair",       image: "/team/Luis_Recruitmentchair.jpg",     linkedin: "https://www.linkedin.com/in/luis-alejandro-ruiz-20xx/",  email: "lruiz1@stevens.edu",     description: "Develops initiatives to attract and welcome new members into the chapter." },
      { name: "Isabella Chiang",        role: "Public Relations",        image: "/team/Isabella_PublicRel.jpg",        linkedin: "https://www.linkedin.com/in/ichiang12/",                 email: "ichiang@stevens.edu",    description: "Manages social media, press outreach, and the chapter's public image." },
      { name: "Diego Sanabriga",        role: "Pre-Collegiate Chair",    image: "/team/Diego_prechair.jpg",            linkedin: "https://www.linkedin.com/in/diego-sanabriga-41545831b/", email: "dsanabri@stevens.edu",   description: "Inspires K–12 students to pursue STEM through community outreach and mentorship programs." },
      { name: "Naomi Fernandez",        role: "Pre-Collegiate Chair",    image: "/team/Naomi_prechair.jpg",            linkedin: "https://www.linkedin.com/in/naomi-fernandez-b43b72207/", email: "nfernan3@stevens.edu",   description: "Inspires K–12 students to pursue STEM through community outreach and mentorship programs." },
      { name: "Tomas Gonzalez Bonilla", role: "Academic Chair",          image: "/team/ThomasAcademichair.jpg",        linkedin: "https://www.linkedin.com/in/tomas-gonzalezbonilla/",     email: "tgonzale1@stevens.edu",  description: "Organizes tutoring, study resources, and academic events to support member success." },
    ],
  },
  {
    year: "2026 / 2027",
    groupPhoto: "/SHPE_2026-2027.png",
    members: [
      // ── 2025/2026members (images reused) ───────────────────────────────────
      { name: "Sabrina Elgazzar",         role: "President",                      image: "/team/Sabrina_VP.jpg",          linkedin: "https://www.linkedin.com/in/sabrinaelgazzar/",           email: "selgazza@stevens.edu",  description: "Leads the chapter, sets the vision, and represents SHPE Stevens to the campus and national organization." },
      { name: "Emely Vargas",             role: "Internal Vice President",        image: "/team/Emely_ExternalRel.jpg",   linkedin: "https://www.linkedin.com/in/emely-vargas1/",             email: "evargas2@stevens.edu",  description: "Oversees member engagement, internal events, and the well-being of the chapter community." },
      { name: "Emmanuel Madera",          role: "External Vice President",        image: "/team/Emanuel_Treasurer.jpg",   linkedin: "https://www.linkedin.com/in/emmanuel-madera/",           email: "emadera@stevens.edu",   description: "Manages corporate partnerships, professional events, and external chapter representation." },
      { name: "Leonel Andrade",           role: "Treasurer",                      image: "/team/Leone_WebChief.jpg",      linkedin: "https://www.linkedin.com/in/leonel-andrade-ba9763212/",  email: "landrade1@stevens.edu", description: "Maintains the chapter budget, manages funding, and ensures financial transparency." },
      { name: "Isabella Chiang",          role: "Secretary",                      image: "/team/Isabella_PublicRel.jpg",  linkedin: "https://www.linkedin.com/in/ichiang12/",                 email: "ichiang@stevens.edu",   description: "Keeps records, manages communication channels, and coordinates meeting logistics." },
      { name: "Diego Sanabriga",          role: "Pre-Collegiate Chair",           image: "/team/Diego_prechair.jpg",      linkedin: "https://www.linkedin.com/in/diego-sanabriga-41545831b/", email: "dsanabri@stevens.edu",  description: "Fosters internal community and coordinates member-facing events and initiatives." },
      { name: "Ines V. Nuñez",            role: "SHPEtina Chair",                 image: "/team/Ines_SHPETINA.jpg",       linkedin: "https://www.linkedin.com/in/inesnunez1/",                email: "inunez1@stevens.edu",   description: "Empowers Latina women in STEM through mentorship, networking, and dedicated programming." },
      // ── new members for ────────────────
      { name: "Matias Freire",            role: "Chief Web Officer",              image: "/team/MatiasFreire_ChiefWebOfficer.jpg", linkedin: "https://www.linkedin.com/in/matias43/", email: "mfreire@stevens.edu", description: "Builds and maintains the chapter website, ensuring a great digital experience for members and visitors." },
      { name: "Angel Zarate",             role: "Academic Chair",                 image: "/team/AngelZarate.jpg",              linkedin: "https://www.linkedin.com/in/angel-zarate29/",  email: "azarate@stevens.edu",  description: "Organizes tutoring, study resources, and academic events to support member success." },
      { name: "Antony Saldana",           role: "External Relations",             image: "/team/AnthonySaldana_ExternalRelations.png",              linkedin: "https://www.linkedin.com/in/antony-saldana/",  email: "asaldana1@stevens.edu",  description: "Cultivates relationships with alumni, industry partners, and the broader STEM community." },
      { name: "Joe Simon",                role: "Public Relations Chair",         image: "/team/JoeSimon_PublicRelations.jpg",              linkedin: "https://www.linkedin.com/in/joe-simon-622236374/",  email: "jsimon8@stevens.edu",  description: "Manages social media, press outreach, and the chapter's public image." },
      { name: "Andrea Manzanares Claros", role: "Public Relations Chair",         image: "/team/AndreaManzanares.jpg",              linkedin: "https://www.linkedin.com/in/andreamzrc/",  email: "amanzana@stevens.edu",  description: "Manages social media, press outreach, and the chapter's public image." },
      { name: "Jean Reyes",               role: "Recruitment Chair",              image: "/team/JeanReyes_RecruitmentChair1.jpg",              linkedin: "https://www.linkedin.com/in/jeanreyes02/",  email: "jreyes8@stevens.edu",  description: "Develops initiatives to attract and welcome new members into the chapter." },

    ],
  },
  
];
// ─────────────────────────────────────────────────────────────────────────────



export default function TeamSection() {
  const [index, setIndex] = useState(1);
  const board = eBoards[index];
  const hasPrev = index > 0;
  const hasNext = index < eBoards.length - 1;

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: '#F9FAFB' }}
    >
      {/* SHPE diamond logo motif — repeating background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cpolygon points='60,18 102,60 60,102 18,60' fill='none' stroke='%230C2340' stroke-width='0.8'/%3E%3Cpolygon points='60,34 86,60 60,86 34,60' fill='none' stroke='%230C2340' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='2.5' fill='none' stroke='%230C2340' stroke-width='0.8'/%3E%3Ccircle cx='60' cy='60' r='0.8' fill='%230C2340'/%3E%3Cline x1='60' y1='0' x2='60' y2='18' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='60' y1='102' x2='60' y2='120' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='0' y1='60' x2='18' y2='60' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='102' y1='60' x2='120' y2='60' stroke='%230C2340' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='60' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='0' cy='60' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='60' r='1.5' fill='%230C2340'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          opacity: 0.07,
        }}
      />
      <div className="max-w-340 mx-auto px-10 text-center">

        {/* Header */}
        <div className="mb-14">
          {/* Eyebrow with flanking lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#A32035]" />
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A32035]">Stevens Chapter</p>
            <div className="h-px w-12 bg-[#A32035]" />
          </div>

          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-black text-[#0C2340] leading-tight tracking-tight">
            Meet the Team
          </h2>

    
          {/* Year navigator */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setIndex((i) => i - 1)}
              disabled={!hasPrev}
              aria-label="Previous year"
              className="w-9 h-9 rounded-full border-2 border-[#0C2340] flex items-center justify-center
                         text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-all duration-200
                         disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-4 h-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="px-6 py-1.5 rounded-full border-2 border-[#0C2340] text-[#0C2340] font-semibold text-sm min-w-[120px] tracking-wide">
              {board.year}
            </span>

            <button
              onClick={() => setIndex((i) => i + 1)}
              disabled={!hasNext}
              aria-label="Next year"
              className="w-9 h-9 rounded-full border-2 border-[#0C2340] flex items-center justify-center
                         text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-all duration-200
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
        <div className="grid grid-cols-4 gap-20 ">
          {board.members.map((m) => (
            <TeamCard key={m.name + m.role} {...m} />
          ))}
        </div>

        {/* Group photo */}
        {board.groupPhoto && (
          <div className="flex justify-center mt-16">
            <div className="relative w-[480px] h-[270px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={board.groupPhoto}
                alt={`${board.year} E-Board`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
