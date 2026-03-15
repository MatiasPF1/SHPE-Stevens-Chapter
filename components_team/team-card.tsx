interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export default function TeamCard({ name, role, image, linkedin }: TeamCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md w-[220px] bg-white group">
      {/* Photo */}
      <img
        src={image}
        alt={name}
        className="w-full h-[260px] object-cover object-top"
      />

      {/* Name + Role bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div>
          <p className="font-bold text-[#D1472C] text-sm leading-tight">{name}</p>
          <p className="text-[#0C2340] text-xs mt-0.5">{role}</p>
        </div>
        {linkedin && linkedin.length > 0 && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 ml-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition-opacity">
              {/* LinkedIn "in" icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
