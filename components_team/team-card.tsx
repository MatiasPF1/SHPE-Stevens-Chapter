interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
}

export default function TeamCard({ name, role, image, linkedin, email }: TeamCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200 w-full h-[320px]">
      {/* Full-bleed photo */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top-right icon buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        {linkedin && linkedin.length > 0 && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </a>
        )}
        {email && email.length > 0 && (
          <a href={`mailto:${email}`}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </a>
        )}
      </div>

      {/* Bottom name + role */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
        <p className="font-bold text-white text-base leading-tight">{name}</p>
        <p className="text-white/80 text-sm mt-0.5">{role}</p>
      </div>
    </div>
  );
}
