import TiltedCard from './Events-Reactbits/AboutReactBit';

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
          <h2 className="font-[family-name:var(--font-raleway)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-(--color-navy) leading-tight text-center">
            Who Are We?
          </h2>

          {/* Eyebrow + body */}
          <div className="flex flex-col">
       

            {/*  description for SEO and readability */}
            <div className="mt-4 max-w-3xl mx-auto flex flex-col items-center gap-2">
              <p className="text-sm text-(--color-slate) leading-relaxed text-center">
                A student-run chapter of the{" "}
                <span className="font-semibold text-(--color-navy)">Society of Hispanic Professional Engineers</span>{" "}
                at Stevens Institute of Technology, Hoboken NJ, empowering Hispanic students in STEM.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  "Career Fairs & Recruiting",
                  "Mentorship Programs",
                  "Alumni Networking",
                  "Community Service",
                  "Academic Workshops",
                ].map((label) => (
                  <span
                    key={label}
                    className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase cursor-default select-none border border-(--color-navy)/20 text-(--color-navy) hover:bg-(--color-navy) hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tilted Cards */}
        <div className="flex flex-row flex-nowrap justify-start md:justify-center gap-8 mt-20 overflow-x-auto pb-4 md:overflow-x-visible md:pb-0 ">
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
