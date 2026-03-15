export default function Navbar() {
  return (
    // Navbar Container
    <div className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-10 shadow-sm">
      {/* Left Section - Stevens SHPE Logo */}
      <div className="flex items-center">
        <img
          src="/Stevens Institute of Technology.svg"
          alt="Stevens Institute of Technology"
          className="w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110 translate-y-2"
        />
      </div>

      {/* Right Section - Hyperlinks to different sections */}
      <div className="flex items-center gap-8 font-semibold text-[#0C2340]">
        <a
          href="#eboard"
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
      </div>
    </div>
  );
}
