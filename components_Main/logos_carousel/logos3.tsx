"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components_Main/logos_carousel/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  logosTop?: Logo[];
  logosBottom?: Logo[];
  className?: string;
}

const Logos3 = ({
  logosTop = [
    { id: "nvidia", description: "NVIDIA", image: "/logos/NVDA_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "microsoft", description: "Microsoft", image: "/logos/microsoft 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "meta", description: "Meta", image: "/logos/META_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "intel", description: "Intel", image: "/logos/intel 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "ibm", description: "IBM", image: "/logos/IBM 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "honeywell", description: "Honeywell", image: "/logos/HON_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "goldman", description: "Goldman Sachs", image: "/logos/GS 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
  ],
  logosBottom = [
    { id: "dell", description: "Dell", image: "/logos/DELL 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "apple", description: "Apple", image: "/logos/apple-dark 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "boa", description: "Bank of America", image: "/logos/bankofamerica-dark 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "boeing", description: "Boeing", image: "/logos/BA_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "cat", description: "Caterpillar", image: "/logos/CAT 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "capitalOne", description: "Capital One", image: "/logos/COF_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "lockheed", description: "Lockheed Martin", image: "/logos/LMT 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
  ],
}: Logos3Props) => {
  return (
    <section className="py-10 space-y-15 overflow-hidden relative" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cline x1='0' y1='60' x2='120' y2='60' stroke='%230C2340' stroke-width='0.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='120' stroke='%230C2340' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='0' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='0' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='120' cy='120' r='1.5' fill='%230C2340'/%3E%3Ccircle cx='60' cy='60' r='3' fill='none' stroke='%230C2340' stroke-width='0.8'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%230C2340'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='0' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='0' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3Cline x1='120' y1='120' x2='60' y2='60' stroke='%230C2340' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          opacity: 0.06,
        }}
      />
      {/* Top row - scrolls right */}
      <div className="relative mx-auto flex items-center justify-center">
        <Carousel
          opts={{ loop: true, watchDrag: false }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.2 })]}
        >
          <CarouselContent className="ml-0">
            {logosTop.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-10 flex shrink-0 items-center justify-center h-[50px] w-[160px]">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
      </div>

      {/* Bottom row - scrolls left */}
      <div className="relative mx-auto flex items-center justify-center">
        <Carousel
          opts={{ loop: true, watchDrag: false }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.2, direction: "backward" })]}
        >
          <CarouselContent className="ml-0">
            {logosBottom.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-10 flex shrink-0 items-center justify-center h-[50px] w-[160px]">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
};

export { Logos3 };
