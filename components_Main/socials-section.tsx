import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function SocialsSection() {
  return (
    <section className="py-12 text-center bg-(--page-bg) relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cline x1='0' y1='60' x2='120' y2='60' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='120' stroke='%230C2340' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='0' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='60' cy='60' r='3' fill='none' stroke='%230C2340' stroke-width='0.8'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%230C2340'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='0' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          opacity: 0.06,
        }}
      />
      <p className="text-xs font-semibold tracking-widest text-red-500 uppercase mb-2">
        Stay Connected
      </p>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Follow our journey
      </h2>
      <div className="flex justify-center gap-16">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/shpe_stevens/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-2xl border-2 border-gray-900 flex items-center justify-center transition-all duration-200 group-hover:border-pink-500 group-hover:text-pink-500">
            <FaInstagram className="w-8 h-8 text-gray-900 group-hover:text-pink-500 transition-colors duration-200" />
          </div>
          <div className="w-10 h-px bg-gray-900 group-hover:bg-pink-500 transition-colors duration-200" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/shpe-at-sit/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-2xl border-2 border-gray-900 flex items-center justify-center transition-all duration-200 group-hover:border-[#0A66C2] group-hover:text-[#0A66C2]">
            <FaLinkedinIn className="w-8 h-8 text-gray-900 group-hover:text-[#0A66C2] transition-colors duration-200" />
          </div>
          <div className="w-10 h-px bg-gray-900 group-hover:bg-[#0A66C2] transition-colors duration-200" />
        </a>
      </div>
    </section>
  );
}
