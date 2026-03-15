export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-1 w-16 rounded-full bg-[#D4380D]"></div>
          <h2 className="text-4xl font-bold text-[#0C2340]">Who Are We?</h2>
          <div className="h-1 w-16 rounded-full bg-[#D4380D]"></div>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          The Society of Hispanic Professional Engineers at Stevens Institute of Technology 
          empowers Hispanic STEM students to succeed professionally, academically, and socially. 
          Our chapter is guided by four core values that define who we are and what we stand for.
        </p>
      </div>
    </section>
  );
}
