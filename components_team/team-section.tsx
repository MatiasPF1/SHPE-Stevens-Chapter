import TeamCard from "@/components_team/team-card";

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-300 mx-auto px-10 text-center">
        <h2 className="text-4xl font-bold text-[#0C2340]">Meet the Team</h2>

        {/* Year selector — add future years here */}
        <div className="mt-8 flex justify-center gap-3">
          <button className="px-6 py-1.5 rounded-full border-2 border-[#0C2340] text-[#0C2340] font-semibold text-sm hover:bg-[#0C2340] hover:text-white transition-colors duration-200">
            2025 / 2026
          </button>
        </div>

        {/* Team grid */}
        <div className="mt-12 grid grid-cols-4 gap-5">
          <TeamCard name="Eve Gutierrez"          role="President"               image="/team/Eve_President.jpg"             linkedin="https://www.linkedin.com/in/eve-gutierrez-07333724a/"   email="egutier1@stevens.edu"   description="Leads the chapter, sets the vision, and represents SHPE Stevens to the campus and national organization." />
          <TeamCard name="Sabrina Elgazzar"       role="Internal Vice President" image="/team/Sabrina_VP.jpg"                linkedin="https://www.linkedin.com/in/sabrinaelgazzar/"           email="selgazza@stevens.edu"   description="Oversees member engagement, internal events, and the well-being of the chapter community." />
          <TeamCard name="Nicolas Buendia"        role="External Vice President" image="/team/Nicolas_VP.jpg"                linkedin="https://www.linkedin.com/in/nicolas-buendia/"           email="nbuendia@stevens.edu"   description="Manages corporate partnerships, professional events, and external chapter representation." />
          <TeamCard name="Emmanuel Madera"        role="Treasurer"               image="/team/Emanuel_Treasurer.jpg"         linkedin="https://www.linkedin.com/in/emmanuel-madera/"           email="emadera@stevens.edu"    description="Maintains the chapter budget, manages funding, and ensures financial transparency." />
          <TeamCard name="Leonel Andrade"         role="Chief Web Officer"       image="/team/Leone_WebChief.jpg"            linkedin="https://www.linkedin.com/in/leonel-andrade-ba9763212/"  email="landrade1@stevens.edu"  description="Books rooms for chapter events and manages attendance tracking for all meetings and activities." />
          <TeamCard name="Jesus Monegro"          role="Secretary"               image="/team/Jesus_Secretary.jpg"           linkedin="https://www.linkedin.com/in/jesusmonegrojimenez/"       email="jmonegro1@stevens.edu"  description="Keeps records, manages communication channels, and coordinates meeting logistics." />
          <TeamCard name="Ines V. Nuñez"          role="SHPEtina Head"           image="/team/Ines_SHPETINA.jpg"             linkedin="https://www.linkedin.com/in/inesnunez1/"                email="inunez1@stevens.edu"    description="Empowers Latina women in STEM through mentorship, networking, and dedicated programming." />
          <TeamCard name="Emely Vargas"           role="External Relations"      image="/team/Emely_ExternalRel.jpg"         linkedin="https://www.linkedin.com/in/emely-vargas1/"             email="evargas2@stevens.edu"   description="Cultivates relationships with alumni, industry partners, and the broader STEM community." />
          <TeamCard name="Luis Alejandro Ruiz"    role="Recruitment Chair"       image="/team/Luis_Recruitmentchair.jpg"     linkedin="https://www.linkedin.com/in/luis-alejandro-ruiz-20xx/"  email="lruiz1@stevens.edu"     description="Develops initiatives to attract and welcome new members into the chapter." />
          <TeamCard name="Isabella Chiang"        role="Public Relations"        image="/team/Isabella_PublicRel.jpg"        linkedin="https://www.linkedin.com/in/ichiang12/"                 email="ichiang@stevens.edu"   description="Manages social media, press outreach, and the chapter's public image." />
          <TeamCard name="Diego Sanabriga"        role="Pre-Collegiate Chair"    image="/team/Diego_prechair.jpg"            linkedin="https://www.linkedin.com/in/diego-sanabriga-41545831b/"  email="dsanabri@stevens.edu"  description="Inspires K–12 students to pursue STEM through community outreach and mentorship programs." />
          <TeamCard name="Naomi Fernandez"        role="Pre-Collegiate Chair"    image="/team/Naomi_prechair.jpg"            linkedin="https://www.linkedin.com/in/naomi-fernandez-b43b72207/"  email="nfernan3@stevens.edu"  description="Inspires K–12 students to pursue STEM through community outreach and mentorship programs." />
          <TeamCard name="Tomas Gonzalez Bonilla" role="Academic Chair"          image="/team/ThomasAcademichair.jpg"        linkedin="https://www.linkedin.com/in/tomas-gonzalezbonilla/"    email="tgonzale1@stevens.edu"  description="Organizes tutoring, study resources, and academic events to support member success." />
        </div>
      </div>
    </section>
  );
}
