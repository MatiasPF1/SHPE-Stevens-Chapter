// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components_Main/companies_carrousel_componenent/carousel";

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
    { id: "company-1", description: "Chase", image: "/Company1.png", className: "max-h-[40px] max-w-[150px] object-contain" },
    { id: "company-2", description: "Bank of America", image: "/Company2.png", className: "max-h-[45px] max-w-[50px] object-contain" },
    { id: "company-3", description: "NVIDIA", image: "/Company3.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "company-4", description: "GE", image: "/Company4.png", className: "max-h-[45px] max-w-[120px] object-contain" },
    { id: "company-5", description: "GM", image: "/Company5.png", className: "max-h-[35px] max-w-[160px] object-contain" },
    { id: "company-6", description: "Microsoft", image: "/Company6.png", className: "max-h-[40px] max-w-[150px] object-contain" },
    { id: "company-7", description: "Honda", image: "/Company7.png", className: "max-h-[45px] max-w-[45px] object-contain" },
    { id: "company-8", description: "Company 8", image: "/Company8.png", className: "max-h-[45px] max-w-[45px] object-contain" },
  ],
  logosBottom = [
    { id: "company-9", description: "Company 9", image: "/Company9.png", className: "max-h-[40px] max-w-[130px] object-contain" },
    { id: "company-10", description: "Company 10", image: "/Company10.png", className: "max-h-[45px] max-w-[70px] object-contain" },
    { id: "company-11", description: "PSE&G", image: "/Company11.png", className: "max-h-[35px] max-w-[160px] object-contain" },
    { id: "company-12", description: "Apple", image: "/Company12.png",
      className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "company-13", description: "Autodesk", image: "/Company13.png", className: "max-h-[40px] max-w-[140px] object-contain" },
    { id: "company-14", description: "Lockheed Martin", image: "/Compnay14.png", className: "max-h-[35px] max-w-[160px] object-contain" },
    { id: "company-15", description: "Verizon", image: "/Company15.png", className: "max-h-[45px] max-w-[45px] object-contain" },
    { id: "company-16", description: "Johnson & Johnson", image: "/Company16.png", className: "max-h-[40px] max-w-[140px] object-contain" },
  ],
}: Logos3Props) => {
  return (
    <section className="py-10 space-y-8 overflow-hidden">
      {/* Top carousel - scrolls right */}
      <div className="overflow-hidden">
        <div className="relative flex items-center w-full">
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
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>

      {/* Bottom carousel - scrolls left */}
      <div className="overflow-hidden">
        <div className="relative flex items-center w-full">
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
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
