'use client';

import { useState } from 'react';
import Image from 'next/image';


const testimonials = [
  {
    name: "Nataly Jimenez-Cruz",
    role: "SHPE Member Spotlight",
    shortRole: "ML/AI Intern",
    designation: "AI/ML Engineer Intern at Collins Aerospace",
    companyLogo: "/Testimonials/Collins.png",
    quote:
      "SHPE has provided direct connections to career opportunities that have been instrumental to my growth. I'm looking forward to giving back to this community and supporting the next generation of tech professionals.",
    src: "/Testimonials/Nathaly.jpg",
    nationality: "Peruvian",
    focus: "Computer Science",
    impactText:
      "Nataly didn't just find an internship through SHPE, she found a blueprint for leadership. Her path to Collins Aerospace started with showing up for her community.",
  },
  {
    name: "Mauricio Sanchez",
    role: "SHPE Member Spotlight",
    shortRole: "Systems Design Intern",
    designation: "System Design Intern at NVIDIA",
    companyLogo: "/Testimonials/Nvidia.png",
    quote:
      "I chose SHPE because I wanted to join a community that would help me develop both professionally and personally. The connections I've made through SHPE have shaped where I am today.",
    src: "/Testimonials/Mauricio.jpg",
    nationality: "Peruvian",
    focus: "Electrical Engineering",
    impactText:
      "Mauricio proves that a strong network is the real competitive edge. SHPE gave him the community and the confidence to walk into NVIDIA as a first generation engineer.",
  },
  {
    name: "Matias Freire",
    role: "SHPE Member Spotlight",
    shortRole: "SWE Intern",
    designation: "Software Engineer Intern at Wabtec",
    companyLogo: "/Testimonials/Wabtec.png",
    quote:
      "SHPE provided me with an invaluable mentor and network that helped me land my first internship. As an immigrant, I felt I was in a community that understood my background and supported my growth.",
    src: "/Testimonials/MatiasFreire_WebDeveloper.jpeg",
    nationality: "Ecuadorian",
    focus: "Computer Science",
    impactText:
      "Moving to a new country and breaking into tech is no small feat. SHPE gave Matias the mentorship and belonging that turned an uncertain path into a career at Wabtec.",
  },

  {
    name: "Brandon Peralta",
    role: "SHPE Member Spotlight",
    shortRole: "Systems Integration Intern",
    designation: "Systems Integration Intern at Raytheon",
    companyLogo: "/Testimonials/Collins.png",
    quote:
      "SHPE has been one of the most impactful parts of my college experience, connecting me with alumni who helped me land my first co-op with L3Harris. But beyond the career benefits, SHPE has shaped who I am. Because of everything this organization has given me, I feel a deep responsibility to give back and help the next generation of engineers find their path to success.",
    src: "/Testimonials/Brandon.jpg",
    nationality: "Ecuadorian",
    focus: "Mechanical Engineering",
    impactText:
      "SHPE didn't just open doors for Brandon, it shaped who he is. The alumni connections that led to his L3Harris co-op lit a fire in him to pay it forward and guide the next generation of engineers.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-28 bg-(--page-bg) relative overflow-hidden">
      {/* Section header */}
      <div className="max-w-3xl mx-auto px-8 text-center mb-20">
        <h2 className="font-[family-name:var(--font-raleway)] text-[clamp(3.5rem,10vw,5.5rem)] font-black text-[#0C2340] leading-[0.9] tracking-tight mb-7">Hispanic Success</h2>

        {/* Eyebrow with flanking rules */}
        <div className="flex items-center justify-center gap-4 translate-y-10">
          <div className="h-px w-10 bg-[#A32035]" />
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A32035] ">Stevens SHPE Member Spotlight</p>
          <div className="h-px w-10 bg-[#A32035]" />
        </div>

      </div>

      <div className="max-w-7.5xl mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_200px] gap-20 items-start">

          {/* Left — Photo */}
          <div className="relative min-h-[480px] rounded-2xl overflow-hidden">
            <Image
              key={t.src + active}
              src={t.src}
              alt={t.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-bold text-lg leading-tight">{t.name}</p>
              <p className="text-gray-300 text-xs uppercase tracking-[0.15em] mt-1">{t.designation}</p>
            </div>
          </div>

          {/* Center — Content */}
          <div className="flex flex-col gap-6 py-2">
            {/* Quote */}
            <div className="relative">
              <span className="font-[family-name:var(--font-playfair)] text-[7rem] text-[#A32035]/10 font-black leading-none absolute -top-6 -left-3 select-none pointer-events-none"></span>
              <blockquote key={active} className="font-[family-name:var(--font-playfair)] text-[#0C2340] text-xl font-bold italic leading-snug relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            {/* Impact */}
            <div>
              <h3 className="text-[#0C2340] font-bold text-sm">In Their Words</h3>
              <p className="mt-1.5 text-[#3D4F5F] text-sm leading-relaxed">{t.impactText}</p>
            </div>

            {/* Metadata rows */}
            <div className="flex flex-col divide-y divide-gray-100 mt-4 border-t border-gray-100">
              <div className="flex items-baseline gap-4 py-3">
                <span className="w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">Nationality</span>
                <span className="text-[#0C2340] font-[family-name:var(--font-playfair)] text-sm leading-snug">{t.nationality}</span>
              </div>
              <div className="flex items-baseline gap-4 py-3">
                <span className="w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">Major</span>
                <span className="text-[#0C2340] font-[family-name:var(--font-playfair)] text-sm leading-snug">{t.focus}</span>
              </div>
              <div className="flex items-center gap-4 py-3">
                <span className="w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">Interned At</span>
                {t.companyLogo && (
                  <Image
                    src={t.companyLogo}
                    alt={t.designation}
                    width={120}
                    height={40}
                    className="h-8 w-auto max-w-[110px] object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right — See More Stories sidebar */}
          <div className="hidden md:flex flex-col items-center gap-4 pt-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#0C2340]">
              More Stories
            </p>
            <div className="grid grid-cols-2 gap-12">
              {testimonials.map((story, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  disabled={i === active}
                  aria-label={`View ${story.name}'s story`}
                  className="group flex flex-col items-center gap-2 disabled:cursor-default"
                >
                  {/* Circle */}
                  <div className={`w-14 h-14 rounded-full overflow-hidden relative transition-all duration-300 ${
                    i === active
                      ? 'outline outline-3 outline-offset-2 outline-[#0C2340] shadow-md'
                      : 'outline outline-2 outline-offset-2 outline-transparent grayscale group-hover:grayscale-0 group-hover:outline-[#0C2340]/40 group-hover:scale-105'
                  }`}>
                    <Image
                      src={story.src}
                      alt={story.name}
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </div>
                  {/* Name */}
                  <p className={`text-[10px] font-semibold leading-tight transition-colors duration-200 ${
                    i === active ? 'text-[#0C2340]' : 'text-[#9CA3AF] group-hover:text-[#0C2340]'
                  }`}>
                    {story.name.split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}