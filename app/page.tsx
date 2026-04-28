import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components_Main/hero-section-2";
import { Logos3 } from "@/components_Main/logos_carousel/logos3";

const AboutSection = dynamic(() => import("@/components_Main/about-section"));
const ElegantCarousel = dynamic(() => import("@/components_Main/elegant-carousel"));
const TestimonialsSection = dynamic(() => import("@/components_Main/testimonials"));
const SocialsSection = dynamic(() => import("@/components_Main/socials-section"));

export const metadata: Metadata = {
  title: "SHPE Stevens | Society of Hispanic Professional Engineers",
  description:
    "SHPE Stevens empowers Hispanic students at Stevens Institute of Technology through STEM awareness, academic support, and professional development.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM awareness, access, support, and development.",
    url: "https://stevensshpe.org/",
    type: "website",
    images: [{ url: "/branding/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM awareness, access, support, and development.",
    images: ["/branding/og-image.png"],
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection
        title={ <> Society of Hispanic <br /> Professional Engineers </> }
        subtitle="Stevens SHPE builds professional excellence through leadership, community engagement, and sustainable innovation in engineering, empowering the next generation of Hispanic STEM professionals."
        callToAction={{
          text: "JOIN NATIONAL CHAPTER →",
          href: "https://shpe.org/membership/become-a-member/",
        }}
        backgroundImage="/events/SHPE2025.jpg"
        contactInfo={{
          address: "1 Castle Point Terrace, Hoboken, NJ",
        }}
      />
      <Logos3 />
      <div className="-translate-y-11">
      <AboutSection />
      </div>

      <div className="-translate-y-11">
      <ElegantCarousel />
      </div>
      <div className="-translate-y-25">
      <TestimonialsSection />
      </div>
      <div className="-translate-y-35">
      <SocialsSection />
      </div>
    </main>
  );
}
