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
    { id: "nvidia", description: "NVIDIA", image: "/NVDA_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "microsoft", description: "Microsoft", image: "/microsoft 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "meta", description: "Meta", image: "/META_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "intel", description: "Intel", image: "/intel 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "ibm", description: "IBM", image: "/IBM 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "honeywell", description: "Honeywell", image: "/HON_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "goldman", description: "Goldman Sachs", image: "/GS 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
  ],
  logosBottom = [
    { id: "dell", description: "Dell", image: "/DELL 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "apple", description: "Apple", image: "/apple-dark 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "boa", description: "Bank of America", image: "/bankofamerica-dark 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "boeing", description: "Boeing", image: "/BA_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "cat", description: "Caterpillar", image: "/CAT 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "capitalOne", description: "Capital One", image: "/COF_BIG 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "lockheed", description: "Lockheed Martin", image: "/LMT 1.png", className: "max-h-[40px] max-w-[140px] object-contain" },
  ],
}: Logos3Props) => {
  return (
    <section className="py-10 space-y-15 overflow-hidden">
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
