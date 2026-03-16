export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A32035] mb-5 text-center">About Us</p>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-[#0C2340] leading-tight text-center mb-8">
          Who Are We?
        </h2>

        {/* Thin divider */}
        <div className="w-12 h-0.5 bg-[#A32035] mx-auto mb-10" />

        {/* Body */}
        <p className="text-lg text-[#3D4F5F] leading-[1.9] text-center font-light">
          The Society of Hispanic Professional Engineers at Stevens Institute of Technology
          empowers Hispanic STEM students to succeed{" "}
          <span className="font-semibold text-[#0C2340]">professionally</span>,{" "}
          <span className="font-semibold text-[#0C2340]">academically</span>, and{" "}
          <span className="font-semibold text-[#0C2340]">socially</span>.
          Our chapter is guided by four core values that define who we are and what we stand for.
        </p>

  
      </div>
    </section>
  );
}
