"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { motion, type Easing } from 'motion/react';
const heroImages = ["/SHPE2025.jpg", "/Kahoot.png", "/tips.jpg", "/tip2.jpg"];

// Icon component for contact details
const InfoIcon = ({ type }: { type:'address' }) => {
    const icons = {
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#D4380D]">
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
          "relative flex min-h-screen w-full flex-col overflow-hidden md:flex-row",
          className
        )}
        //#0C2340
        //#A32035 
        //#faf8f8;

        style={{ background: 'var(--page-bg)', color: '#0C2340' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-center px-8 py-10 md:w-[45%] md:px-12 md:py-10 lg:w-[42%] lg:pl-20 lg:pr-12 lg:pt-10 lg:pb-16">
            {/* Top Section: Logo & Main Content */}
            <div>
                <motion.header className="mb-6" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                            <div>
                                {logo.text && <p className="text-lg font-bold text-[#0C2340]">{logo.text}</p>}
                                {slogan && <p className="text-xs tracking-wider text-[#0C2340]/50">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants}>
                    <motion.h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0C2340] md:text-5xl lg:text-[3.6rem]" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    <motion.p className="font-body mt-8 mb-8 max-w-md text-base font-normal leading-[1.8] tracking-wide text-[#3D4F5F]" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.a
                      href={callToAction.href}
                      className="font-body group inline-flex items-center gap-2 rounded-full bg-[#A32035] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:bg-[#8a1c2e] hover:gap-3 hover:shadow-xl"
                      variants={itemVariants}
                    >
                        {callToAction.text.replace(' →', '')}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>

                    <motion.div className="font-body mt-8 flex flex-wrap gap-6 text-sm tracking-wide text-[#3D4F5F]" variants={itemVariants}>
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
                    </motion.div>
                </motion.main>
            </div>
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
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
              priority={index === 0}
            />
          ))}
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export { HeroSection };
