'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Mauricio Sanchez",
    role: "SHPE Member Spotlight",
    designation: "System Design Intern at NVIDIA",
    companyLogo: "/Testimonials/Nvidia.png",
    quote:
      "I chose SHPE because I wanted to join a community that would help me develop both professionally and personally. The connections I've made through SHPE have shaped where I am today.",
    src: "/Testimonials/Mauricio.jpg",
    affiliation: "Stevens Institute of Technology",
    focus: "Electrical Engineering",
    impactText:
      "Mauricio proves that a strong network is the real competitive edge. SHPE gave him the community and the confidence to walk into NVIDIA as a first generation engineer.",
  },
  {
    name: "Nataly Jimenez-Cruz",
    role: "SHPE Member Spotlight",
    designation: "AI/ML Engineer Intern at Collins Aerospace",
    companyLogo: "/Testimonials/Collins.png",
    quote:
      "SHPE has provided direct connections to career opportunities that have been instrumental to my growth. I'm looking forward to giving back to this community and supporting the next generation of tech professionals.",
    src: "/Testimonials/Nathaly.jpg",
    affiliation: "Stevens Institute of Technology",
    focus: "Computer Science",
    impactText:
      "Nataly didn't just find an internship through SHPE, she found a blueprint for leadership. Her path to Collins Aerospace started with showing up for her community.",
  },
  {
    name: "Matias Freire",
    role: "SHPE Member Spotlight",
    designation: "Software Engineer Intern at Wabtec",
    companyLogo: "/Testimonials/Wabtec.png",
    quote:
      "SHPE provided me with an invaluable mentor and network that helped me land my first internship. As an immigrant, I felt I was in a community that understood my background and supported my growth.",
    src: "/Testimonials/MatiasFreire_WebDeveloper.jpeg",
    affiliation: "Stevens Institute of Technology",
    focus: "Computer Science",
    impactText:
      "Moving to a new country and breaking into tech is no small feat. SHPE gave Matias the mentorship and belonging that turned an uncertain path into a career at Wabtec.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="py-24 bg-[#FAFAF8]">
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-16 text-center mb-16">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A32035] mb-5">Stevens SHPE Member Spotlight</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,12vw,5rem)] font-black text-[#0C2340]  leading-[0.95] tracking-tight mb-8">Hispanic Success</h2>
        <p className="font-[family-name:var(--font-playfair)] text-xl text-[#3D4F5F] font-light leading-[1.9] italic">
          Per aspera Ad Astra
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-start">

          {/* Left — Photo */}
          <div className="relative min-h-[480px] rounded-2xl overflow-hidden">
            <img
              key={t.src + active}
              src={t.src}
              alt={t.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x700/0C2340/ffffff?text=${encodeURIComponent(t.name)}`;
                e.currentTarget.onerror = null;
              }}
            />
            {/* Dark gradient overlay at bottom for name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-bold text-lg leading-tight">{t.name}</p>
              <p className="text-gray-300 text-xs uppercase tracking-[0.15em] mt-1">{t.designation}</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col justify-between py-4">
            <div>
              {/* Decorative closing-quote mark */}
              <div className="flex justify-end">
                <span className="text-[#A32035] text-7xl font-serif leading-none select-none">&rdquo;</span>
              </div>

              {/* Quote */}
              <blockquote
                key={active}
                className="text-[#0C2340] text-xl font-bold italic leading-snug mt-2"
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Impact */}
              <h3 className="mt-6 text-[#0C2340] font-bold text-base">The SHPE Impact</h3>
              <p className="mt-2 text-[#3D4F5F] text-sm leading-relaxed">{t.impactText}</p>
            </div>

            {/* Metadata row */}
            <div className="mt-10 flex items-end justify-between">
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#3D4F5F] font-medium">Affiliation</p>
                  <p className="mt-1 text-[#0C2340] font-bold text-sm">{t.affiliation}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#3D4F5F] font-medium">Major</p>
                  <p className="mt-1 text-[#0C2340] font-bold text-sm">{t.focus}</p>
                </div>
              </div>

              {/* Company logo */}
              {t.companyLogo && (
                <img
                  src={t.companyLogo}
                  alt={t.designation}
                  className="h-10 w-auto max-w-[120px] object-contain opacity-80"
                />
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-8 justify-center">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C2340] text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#A32035]' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C2340] text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}