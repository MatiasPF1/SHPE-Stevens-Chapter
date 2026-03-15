import TeamCard from "@/components_team/team-card";

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-10 text-center">
        <h2 className="text-4xl font-bold text-[#0C2340]">Meet the Team</h2>

        {/* Year selector — add future years here */}
        <div className="mt-8 flex justify-center gap-3">
          <button className="px-6 py-1.5 rounded-full border-2 border-[#0C2340] text-[#0C2340] font-semibold text-sm hover:bg-[#0C2340] hover:text-white transition-colors duration-200">
            2025 / 2026
          </button>
        </div>

        {/* Team grid */}
        <div className="mt-12 flex flex-wrap justify-center gap-16">
          <TeamCard name="Eve Gutierrez"          role="President"               image="/Eve_President.jpg"             linkedin="https://www.linkedin.com/in/eve-gutierrez-07333724a/" />
          <TeamCard name="Sabrina Elgazzar"       role="Internal Vice President" image="/Sabrina_VP.jpg"                linkedin="https://www.linkedin.com/in/sabrinaelgazzar/" />
          <TeamCard name="Nicolas Buendia"        role="External Vice President" image="/Nicolas_VP.jpg"                linkedin="https://www.linkedin.com/in/nicolas-buendia/" />
          <TeamCard name="Emmanuel Madera"        role="Treasurer"               image="/Emanuel_Treasurer.jpg"         linkedin="https://www.linkedin.com/in/emmanuel-madera/" />
          <TeamCard name="Leonel Andrade"         role="Chief Web Officer"       image="/Leone_WebChief.jpg"            linkedin="https://www.linkedin.com/in/leonel-andrade-ba9763212/" />
          <TeamCard name="Matias Freire"          role="Website Developer"       image="/MatiasFreire_WebDeveloper.jpg" linkedin="https://www.linkedin.com/in/matias43/" />
          <TeamCard name="Jesus Monegro"          role="Secretary"               image="/Jesus_Secretary.jpg"           linkedin="https://www.linkedin.com/in/jesusmonegrojimenez/" />
          <TeamCard name="Ines V. Nuñez"          role="SHPEtina Head"           image="/Ines_SHPETINA.jpg"             linkedin="https://www.linkedin.com/in/inesnunez1/" />
          <TeamCard name="Emely Vargas"           role="External Relations"      image="/Emely_ExternalRel.jpg"         linkedin="https://www.linkedin.com/in/emely-vargas1/" />
          <TeamCard name="Luis Alejandro Ruiz"    role="Recruitment Chair"       image="/Luis_Recruitmentchair.jpg"     linkedin="https://www.linkedin.com/in/luis-alejandro-ruiz-20xx/" />
          <TeamCard name="Isabella Chiang"        role="Public Relations"        image="/Isabella_PublicRel.jpg"        linkedin="https://www.linkedin.com/in/ichiang12/" />
          <TeamCard name="Diego Sanabriga"        role="Pre-Collegiate Chair"    image="/Diego_prechair.jpg"            linkedin="https://www.linkedin.com/in/diego-sanabriga-41545831b/" />
          <TeamCard name="Naomi Fernandez"        role="Pre-Collegiate Chair"    image="/Naomi_prechair.jpg"            linkedin="https://www.linkedin.com/in/naomi-fernandez-b43b72207/" />
          <TeamCard name="Tomas Gonzalez Bonilla" role="Academic Chair"          image="/ThomasAcademichair.jpg"        linkedin="https://www.linkedin.com/in/tomas-gonzalezbonilla/" />
        </div>
      </div>
    </section>
  );
}
