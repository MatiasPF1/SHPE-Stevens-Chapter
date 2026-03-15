import { HeroSection } from "@/components_Main/hero-section-2";
import ElegantCarousel from "@/components_Main/elegant-carousel";
import AboutSection from "@/components_Main/about-section";

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
      <div className="-translate-y-8">
        <AboutSection />
      </div>
        <div className="-translate-y-12">
        <ElegantCarousel />
      </div>
    </div>
  );
}
