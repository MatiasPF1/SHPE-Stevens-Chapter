"use client";
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion, type Easing } from 'framer-motion';
const heroImages = ["/SHPE2025.jpg", "/Kahoot.png", "/tips.jpg", "/tip2.jpg"];

// Icon component for contact details
const InfoIcon = ({ type }: { type:'address' }) => {
    const icons = {
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 shrink-0">{icons[type]}</div>;
};


// Prop types for the HeroSection component
interface HeroSectionProps {
  className?: string;
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website?: string;
    phone?: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo }, ref) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }, []);

    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as Easing,
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex min-h-[calc(100vh-5rem)] w-full flex-col overflow-hidden bg-gray-900 text-white md:flex-row",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between px-8 py-10 md:w-[45%] md:px-12 md:py-14 lg:w-[42%] lg:pl-20 lg:pr-12 lg:py-16">
            {/* Top Section: Logo & Main Content */}
            <div>
                <motion.header className="mb-12" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                            <div>
                                {logo.text && <p className="text-lg font-bold text-white">{logo.text}</p>}
                                {slogan && <p className="text-xs tracking-wider text-gray-400">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants}>
                    <motion.h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.6rem]" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    <motion.p className="font-body mt-8 mb-8 max-w-md text-[0.95rem] font-light leading-[1.8] tracking-wide text-gray-300" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.a
                      href={callToAction.href}
                      className="font-body group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:gap-3 hover:text-red-400"
                      variants={itemVariants}
                    >
                        {callToAction.text.replace(' →', '')}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>
                </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-auto pt-10 w-full" variants={itemVariants}>
                <div className="font-body flex flex-wrap gap-6 text-xs tracking-wide text-gray-400">
                    {contactInfo.website && (
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>{contactInfo.website}</span>
                    </div>
                    )}
                    {contactInfo.phone && (
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>{contactInfo.phone}</span>
                    </div>
                    )}
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>{contactInfo.address}</span>
                    </div>
                </div>
            </motion.footer>
        </div>

        {/* Right Side: Image Carousel with one-time clip-path reveal */}
        <motion.div 
          className="relative w-full md:w-[55%] lg:w-[58%] overflow-hidden"
          style={{ minHeight: '500px' }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export { HeroSection };
