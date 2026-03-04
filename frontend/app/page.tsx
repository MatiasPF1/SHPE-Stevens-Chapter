import { HeroSection } from "@/components_Main/hero-section-2";
import ElegantCarousel from "@/components_Main/elegant-carousel";
import AboutSection from "@/components_Main/about-section";
import { Logos3 } from "@/components_Main/companies_carrousel_componenent/logos3";

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Society of Hispanic <br />
            Professional Engineers
          </>
        }
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
      <AboutSection />
      <ElegantCarousel />
    </div>
  );
}
