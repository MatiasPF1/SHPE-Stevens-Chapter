export default function Navbar() {
  return (
    // Navbar Container
    <div className="flex h-20 items-center justify-between border-b border-gray-700 bg-gray-900 px-10">
      {/* Left Section - Stevens SHPE Logo */}
      <div className="flex items-center">
        <img
          src="/Stevens Institute of Technology.svg"
          alt="Stevens Institute of Technology"
          className="w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110 translate-y-2 brightness-0 invert"
        />
      </div>

      {/* Right Section - Hyperlinks to different sections */}
      <div className="flex items-center gap-8 font-semibold text-gray-200">
        <a
          href="#eboard"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Team
        </a>
        <a
          href="#sponsors"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Sponsors
        </a>
        <a
          href="#shpejr"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          SHPEJR
        </a>
        <a
          href="#shepetina"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          SHEPtina
        </a>
        <a
          href="#contact"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Contact Us
        </a>
        <a
          href="#conference"
          className="hover:text-red-500 transition-colors duration-300 ease-in-out hover:scale-110"
        >
          Conference
        </a>
      </div>
    </div>
  );
}
