import TiltedCard from './about-section/AboutReactBit';

export default function AboutSection() {
  return (
    <section
      className="py-16 px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Top: big heading | Below: label + body text */}
        <div className="flex flex-col gap-15">

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-raleway)] text-6xl md:text-7xl font-black text-(--color-navy) leading-tight text-center">
            Who Are We?
          </h2>

          {/* Eyebrow + body */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="w-16 h-px bg-(--color-crimson)" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-(--color-crimson) whitespace-nowrap">About Us</p>
              <span className="w-16 h-px bg-(--color-crimson)" />
            </div>

            {/* Triangle text — 3 layers, wide → narrow */}
            <div className="flex flex-col items-center text-center text-base text-(--color-slate) leading-[1.9]">
              {/* Layer 1 — widest */}
              <p className="w-full">
                The{" "}
                <span className="font-bold text-(--color-navy)">Society of Hispanic Professional Engineers</span>{" "}
                at Stevens empowers students to succeed{" "}
                <span className="font-bold text-(--color-navy)">professionally</span>,{" "}
                <span className="font-bold text-(--color-navy)">academically</span>, and{" "}
                <span className="font-bold text-(--color-navy)">socially</span>.
              </p>
              {/* Layer 2 — medium */}
              <p className="max-w-[72%]">
                We are a family built on{" "}
                <span className="font-bold italic text-(--color-navy)">excellence</span>{" "}
                and{" "}
                <span className="font-bold italic text-(--color-navy)">community</span>.
              </p>
              {/* Layer 3 — narrowest */}
              <p className="max-w-[42%]">
                Together, we rise.
              </p>
            </div>

            {/* Extended description for SEO and readability */}
            <div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-(--color-border) rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-(--page-bg) px-8 py-7 flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-(--color-crimson)">Our Story</span>
                <p className="text-sm text-(--color-slate) leading-relaxed">
                  Founded at <span className="font-semibold text-(--color-navy)">Stevens Institute of Technology</span> in
                  Hoboken, NJ, SHPE Stevens is a student-run chapter of the national Society of Hispanic Professional
                  Engineers. Our mission is to advance STEM careers for Hispanic students through mentorship, networking,
                  and hands-on professional experiences.
                </p>
              </div>
              <div className="bg-(--page-bg) px-8 py-7 flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-(--color-crimson)">What We Do</span>
                <p className="text-sm text-(--color-slate) leading-relaxed">
                  We host <span className="font-semibold text-(--color-navy)">50+ annual events</span> including career
                  fairs, company visits, hackathons, community service projects, and academic workshops. Members gain
                  direct access to top recruiters, alumni networks, and leadership opportunities, building the skills and
                  connections needed to thrive in engineering and technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tilted Cards */}
        <div className="flex flex-row flex-nowrap justify-center gap-8 mt-20">
          <TiltedCard
            imageSrc="/Competition.png"
            altText="SHPE Stevens students competing at an engineering competition"
            captionText="Competititon"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '13px' }}>Competition</p>
            }
          />
          <TiltedCard
            imageSrc="/Service.png"
            altText="Community Service Event"
            captionText="Community Service"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '13px' }}>Community Service</p>
            }
          />
          <TiltedCard
            imageSrc="/Mentorship.png"
            altText="Mentorship Event"
            captionText="Mentorship"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '13px' }}>Mentorship</p>
            }
          />
          <TiltedCard
            imageSrc="/ProffesionalDevelopment.png"
            altText="Professional Development Event"
            captionText="Professional Development"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '13px' }}>Professional Development</p>
            }
          />
        </div>

      </div>
    </section>
  );
}
