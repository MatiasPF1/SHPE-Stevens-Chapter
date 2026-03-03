import { HeroSection } from "@/components/ui/hero-section-2";

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Society of Hispanic <br />
            <span className="text-primary">Professional Engineers</span>
          </>
        }
        subtitle="The Society of Hispanic Professional Engineers at Stevens Institute of Technology, empowers the Hispanic community to realize its fullest potential through STEM awareness, access, support, and development."
        callToAction={{
          text: "JOIN NATIONAL CHAPTER →",
          href: "https://shpe.org/membership/become-a-member/",
        }}
        backgroundImage="/SHPE2025.jpg"
        contactInfo={{
          address: "1 Castle Point Terrace, Hoboken, NJ",
        }}
      />
    </div>
  );
}
