import TiltedCard from './about-section/AboutReactBit';

export default function AboutSection() {
  return (
    <section className="py-16 px-6 overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top row: label + body text (left) | big heading (right) */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* Left — eyebrow + body */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A32035] mb-5">About Us</p>

            <p className="text-base text-[#3D4F5F] leading-[1.9]">
              The{" "}
              <span className="font-bold text-[#0C2340]">Society of Hispanic Professional Engineers</span>{" "}
              at Stevens empowers students to succeed{" "}
              <span className="font-bold text-[#0C2340]">professionally</span>,{" "}
              <span className="font-bold text-[#0C2340]">academically</span>, and{" "}
              <span className="font-bold text-[#0C2340]">socially</span>. We are a family built on{" "}
              <span className="font-bold italic text-[#A32035]">excellence</span> and{" "}
              <span className="font-bold italic text-[#2D6A4F]">community</span>.
            </p>
          </div>

          {/* Right — large heading */}
          <div className="md:w-1/2 flex items-center justify-end">
            <h2 className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl font-black text-[#0C2340] leading-tight text-right">
              Who Are<br />We?
            </h2>
          </div>
        </div>

        {/* Tilted Cards */}
        <div className="flex flex-row flex-nowrap justify-center gap-8 mt-12">
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
