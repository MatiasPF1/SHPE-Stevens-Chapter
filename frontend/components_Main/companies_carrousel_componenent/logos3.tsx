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
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  logos = [
    { id: "company-1", description: "Company 1", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+1", className: "h-10 w-auto" },
    { id: "company-2", description: "Company 2", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+2", className: "h-10 w-auto" },
    { id: "company-3", description: "Company 3", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+3", className: "h-10 w-auto" },
    { id: "company-4", description: "Company 4", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+4", className: "h-10 w-auto" },
    { id: "company-5", description: "Company 5", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+5", className: "h-10 w-auto" },
    { id: "company-6", description: "Company 6", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+6", className: "h-10 w-auto" },
    { id: "company-7", description: "Company 7", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+7", className: "h-10 w-auto" },
    { id: "company-8", description: "Company 8", image: "https://placehold.co/120x40/1f2937/9ca3af?text=Company+8", className: "h-10 w-auto" },
  ],
}: Logos3Props) => {
  return (
    <section className="py-12">
      <div className="pt-12">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
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
