import TiltedCard from './about-section/AboutReactBit';

export default function AboutSection() {
  return (
    <section
      className="py-16 px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Top: big heading | Below: label + body text */}
        <div className="flex flex-col gap-6">

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

            {/*  description for SEO and readability */}
            <div className="mt-4 max-w-3xl mx-auto flex flex-col items-center gap-2">
              <p className="text-sm text-(--color-slate) leading-relaxed text-center">
                A student-run chapter of the{" "}
                <span className="font-semibold text-(--color-navy)">Society of Hispanic Professional Engineers</span>{" "}
                at Stevens Institute of Technology, Hoboken NJ, empowering Hispanic students in STEM.
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex justify-center gap-10">
                  {["Career Fairs & Recruiting", "Mentorship Programs", "Alumni Networking"].map((item) => (
                    <span key={item} className="flex items-center gap-2 text-sm text-(--color-slate)">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-crimson) shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-10">
                  {["Community Service", "Academic Workshops"].map((item) => (
                    <span key={item} className="flex items-center gap-2 text-sm text-(--color-slate)">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-crimson) shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tilted Cards */}
        <div className="flex flex-row flex-nowrap justify-center gap-8 mt-20">
          <TiltedCard
            imageSrc="/about/Competition.png"
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
            imageSrc="/about/Service.png"
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
            imageSrc="/about/Mentorship.png"
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
            imageSrc="/about/ProffesionalDevelopment.png"
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
