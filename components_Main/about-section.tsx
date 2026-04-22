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
          <h2 className="font-[family-name:var(--font-raleway)] text-6xl md:text-7xl font-black text-[#0C2340] leading-tight text-center">
            Who Are We?
          </h2>

          {/* Eyebrow + body */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="w-16 h-px bg-[#A32035]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A32035] whitespace-nowrap">About Us</p>
              <span className="w-16 h-px bg-[#A32035]" />
            </div>

            {/* Triangle text — 3 layers, wide → narrow */}
            <div className="flex flex-col items-center text-center text-base text-[#3D4F5F] leading-[1.9]">
              {/* Layer 1 — widest */}
              <p className="w-full">
                The{" "}
                <span className="font-bold text-[#0C2340]">Society of Hispanic Professional Engineers</span>{" "}
                at Stevens empowers students to succeed{" "}
                <span className="font-bold text-[#0C2340]">professionally</span>,{" "}
                <span className="font-bold text-[#0C2340]">academically</span>, and{" "}
                <span className="font-bold text-[#0C2340]">socially</span>.
              </p>
              {/* Layer 2 — medium */}
              <p className="max-w-[72%]">
                We are a family built on{" "}
                <span className="font-bold italic text-[#0C2340]">excellence</span>{" "}
                and{" "}
                <span className="font-bold italic text-[#0C2340]">community</span>.
              </p>
              {/* Layer 3 — narrowest */}
              <p className="max-w-[42%]">
                Together, we rise.
              </p>
            </div>
          </div>
        </div>

        {/* Tilted Cards */}
        <div className="flex flex-row flex-nowrap justify-center gap-8 mt-20">
          <TiltedCard
            imageSrc="/Competition.png"
            altText="Competititon"
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
