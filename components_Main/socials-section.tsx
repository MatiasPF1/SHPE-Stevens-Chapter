import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function SocialsSection() {
  return (
    <section className="py-12 text-center">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
        Stay Connected
      </p>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Follow us on our socials
      </h2>
      <div className="flex justify-center gap-6">
        <a
          href="https://www.instagram.com/shpe_stevens/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="w-14 h-14 text-pink-500" />
        </a>

        <a
          href="https://www.linkedin.com/in/shpe-at-sit/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-14 h-14 text-[#0A66C2]" />
        </a>
      </div>
    </section>
  );
}
