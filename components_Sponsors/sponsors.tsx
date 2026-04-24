import Image from "next/image";

export default function Sponsors() {
  const sponsorLogos = [
    { name: "Merck", src: "/Merck.webp", width: 200, height: 100 },
    { name: "Bank Of America", src: "/BOFA.png", width: 300, height: 300 },
     { name: "Whiting Turner", src: "/wt.png", width: 120, height: 100 },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 
          className="text-4xl font-extrabold mb-9 -translate-y-4"
          style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
        >
          Thank You to Our Sponsors
        </h2>
        <p 
          className="text-lg mb-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          We are incredibly grateful for the support of our sponsors, who make our mission possible.
        </p>
        <div className="flex justify-center items-center gap-16 flex-wrap">
          {sponsorLogos.map((sponsor) => (
            <div key={sponsor.name} className="transition-all duration-300 flex justify-center items-center">
              <Image
                src={sponsor.src}
                alt={`${sponsor.name} Logo`}
                width={sponsor.width}
                height={sponsor.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
