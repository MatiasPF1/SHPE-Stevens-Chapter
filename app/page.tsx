import { HeroSection } from "@/components_Main/hero-section-2";
import ElegantCarousel from "@/components_Main/elegant-carousel";
import AboutSection from "@/components_Main/about-section";
import { Logos3 } from "@/components_Main/logos_carousel/logos3";
import SocialsSection from "@/components_Main/socials-section";

export default function Home() {
  return (
    <div>
      <HeroSection
        title={ <> Society of Hispanic <br /> Professional Engineers </> }
        subtitle="Stevens SHPE builds professional excellence through leadership, community engagement, and sustainable innovation in engineering, empowering the next generation of Hispanic STEM professionals."
        callToAction={{
          text: "JOIN NATIONAL CHAPTER →",
          href: "https://shpe.org/membership/become-a-member/",
        }}
        backgroundImage="/SHPE2025.jpg"
        contactInfo={{
          address: "1 Castle Point Terrace, Hoboken, NJ",
        }}
      />
      <Logos3 />
      <div className="-translate-y-8">
        <AboutSection />
      </div>
        <div className="-translate-y-12">
        <ElegantCarousel />
      </div>
      <div className="-translate-y-12">
      <SocialsSection />
      </div>
    </div>
  );
}
