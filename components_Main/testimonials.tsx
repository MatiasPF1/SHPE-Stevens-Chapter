'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Mauricio Sanchez",
    designation: "System Design Intern at NVIDIA",
    companyLogo: "/Testimonials/Nvidia.png",
    quote:
      "I chose SHPE because I wanted to join a community that would help me develop both professionally and personally. The connections I've made through SHPE have shaped where I am today.",
    src: "/Testimonials/Mauricio.jpg",
  },

   {
    name: "Nataly Jimenez-Cruz",
    designation: "AI/ML Engineer Intern at Collins Aerospace",
    companyLogo: "/Testimonials/Collins.png",
    quote:
      "SHPE gave me opportunities I would not have had otherwise, attending the National Convention, becoming a mentor, and building a network that has directly shaped my career. I am genuinely grateful for all of it.",
    src: "/Testimonials/Nathaly.jpg",
  },


  {
    name: "Matias Freire",
    designation: "Software Engineer Intern at Wabtec",
    companyLogo: "/Testimonials/Wabtec.png",
    quote:
      "SHPE provided me with an invaluable mentor and network that helped me land my first internship. As an immigrant, I felt I was in a community that understood my background and supported my growth.",
    src: "/Testimonials/MatiasFreire_WebDeveloper.jpeg",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const t = testimonials[active];

  const prev = () => {
    setDir('left');
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDir('right');
    setActive((a) => (a + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#FAFAF8]">
      {/* Section header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A32035] mb-5">Student Success</p>
        <h2 className="text-5xl font-bold text-[#0C2340] leading-tight mb-6">Latino Success</h2>
        <div className="w-12 h-0.5 bg-[#A32035] mx-auto mb-8" />
        <p className="text-lg text-[#3D4F5F] font-light leading-[1.9] italic">
          Per aspera Ad Astra &mdash;{" "}
          <span className="text-lg text-[#3D4F5F] font-light leading-[1.9] italic">Through hardships to the stars</span>
        </p>
       
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-center">

          {/* Photo */}
          <div className="relative h-120 rounded-2xl overflow-hidden shadow-lg">
            <img
              key={t.src + active}
              src={t.src}
              alt={t.name}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x700/0C2340/ffffff?text=${encodeURIComponent(t.name)}`;
                e.currentTarget.onerror = null;
              }}
            />
            {/* subtle navy fade at bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0C2340]/50 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center py-6">
            <span className="text-[#A32035] text-7xl font-serif leading-none select-none -mb-2">&ldquo;</span>

            <p
              key={active}
              className="text-[#0C2340] text-xl font-medium leading-relaxed mt-4"
            >
              {t.quote}
            </p>

            <div className="mt-8 h-px w-16 bg-[#A32035]" />

            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="text-[#A32035] font-bold text-lg">{t.name}</p>
                <p className="text-[#3D4F5F] text-sm font-medium mt-0.5">{t.designation}</p>
              </div>
              {t.companyLogo && (
                <img
                  src={t.companyLogo}
                  alt={t.designation}
                  className="h-16 w-auto max-w-[160px] object-contain opacity-90"
                />
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C2340] text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C2340] text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



