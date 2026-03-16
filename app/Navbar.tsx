export default function Navbar() {
  return (
    // Navbar Container
    <div className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-10 shadow-sm backdrop-blur-md">
      {/* Left Section - Stevens SHPE Logo → links to home */}
      <div className="flex items-center">
        <a href="/">
          <img
            src="/Stevens Institute of Technology.svg"
            alt="Stevens Institute of Technology"
            className="w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110 translate-y-2"
          />
        </a>
      </div>

      {/* Right Section - Hyperlinks to different sections */}
      <div className="flex items-center gap-8 font-semibold text-[#0C2340]">
        <a
          href="/team"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Team
        </a>
        <a
          href="#sponsors"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Sponsors
        </a>
        <a
          href="#shpejr"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          SHPEJR
        </a>
        <a
          href="#shepetina"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          SHEPtina
        </a>
        <a
          href="#contact"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Contact Us
        </a>
        <a
          href="#conference"
          className="hover:text-[#D4380D] transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Conference
        </a>
        <a
          href="https://shpe.org/membership/become-a-member/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full bg-[#A32035] text-white text-sm font-semibold hover:bg-[#8a1c2e] transition-colors duration-300"
        >
          Join SHPE
        </a>
      </div>
    </div>
  );
}
