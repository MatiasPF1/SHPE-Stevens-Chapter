import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">

      {/* Top accent line */}
      <div className="h-1 w-full bg-[#dd5a36]" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-6">
        <div className="flex flex-col md:flex-row md:items-start gap-12 translate-y-20">

          {/* Left — Logo + tagline + socials */}
          <div className="flex flex-col gap-3 md:w-80 shrink-0 self-start md:-mt-8 -translate-y-14">
            <a href="/" className="inline-block -mt-1">
              <img
                src="/Stevens Institute of Technology.svg"
                alt="SHPE Stevens Institute of Technology"
                className="brightness-0 invert h-60 w-auto"
              />
            </a>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm -translate-y-25 translate-x-5">
              Empowering Hispanic students in STEM through professional
              development, networking, and community service.
            </p>

            <div className="flex items-center gap-3 -mt-1 -translate-y-22 translate-x-20">
              <a
                href="https://www.instagram.com/shpe.stevens/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-[#dd5a36] hover:text-white transition-all duration-200"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/shpe-stevens-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-[#dd5a36] hover:text-white transition-all duration-200"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:shpe@stevens.edu"
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-[#dd5a36] hover:text-white transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Right — link columns, evenly spread */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* Navigate */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#dd5a36]">Navigate</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                {[
                  { label: "Home", href: "/" },
                  { label: "Team", href: "/team" },
                  { label: "Sponsors", href: "#sponsors" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#dd5a36]">Programs</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                {[
                  { label: "SHPEtina", href: "#shepetina" },
                  { label: "SHPE Jr.", href: "#shpejr" },
                  { label: "Conference", href: "#conference" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#dd5a36]">Resources</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                <li>
                  <a href="https://shpe.org" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    National SHPE
                  </a>
                </li>
                <li>
                  <a href="https://www.stevens.edu/school-engineering-science" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    Stevens Engineering
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-5 text-xs text-zinc-500">
          <span>© 2026 SHPE Stevens. All rights reserved.</span>
        </div>
      </div>

    </footer>
  );
}
