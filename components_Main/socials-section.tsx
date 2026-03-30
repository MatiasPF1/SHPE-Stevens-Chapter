import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function SocialsSection() {
  return (
    <section className="py-12 text-center bg-[#FAFAF8]">
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
