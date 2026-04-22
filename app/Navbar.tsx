import Image from "next/image";

export default function Navbar() {
  return (
    // Navbar Container
    <div className="flex h-20 items-center justify-between bg-[var(--page-bg)] px-10 shadow-sm">
      {/* Left Section - Stevens SHPE Logo → links to home */}
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/Stevens Institute of Technology.svg"
            alt="Stevens Institute of Technology"
            width={320}
            height={60}
            className="w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110 translate-y-2"
            style={{ height: 'auto' }}
            priority
          />
        </a>
      </div>

      {/* Right Section - Hyperlinks to different sections */}
      <div className="flex items-center gap-8 font-semibold text-[#0C2340]">
        {[
          { label: "Team", href: "/team" },
          { label: "Sponsors", href: "/sponsors" },
          { label: "Contact Us", href: "#contact" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="relative inline-block text-[#0C2340] text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#A32035] group"
          >
            {label}
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-[#A32035] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <a
          href="https://shpe.org/membership/become-a-member/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-5 py-2 rounded-full bg-[#A32035] text-white text-sm font-semibold overflow-hidden
                     shadow-md hover:shadow-[0_0_18px_rgba(163,32,53,0.5)] transition-all duration-300
                     before:absolute before:inset-0 before:bg-white/10 before:-translate-x-full before:skew-x-[-20deg]
                     hover:before:translate-x-[200%] before:transition-transform before:duration-500"
        >
          Join SHPE
        </a>
      </div>
    </div>
  );
}
