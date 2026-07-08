"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { VintageSection, VintageWrapper } from "./VintageWrapper";
import PremiumHeroStack from "./HeroStack";
import InteractiveHeroMedia from "./HeroStack";
import DepthStackHero from "./HeroStack";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

// --- Types ---
interface EditorialButtonProps {
  label: string;
  secondary?: boolean;
}

// --- Sub-components ---

export const GrainOverlay = () => {
  return (
    <div
      className="
        pointer-events-none 
        absolute 
        inset-0 
        z-[100] 
        /* 1. This URL is a high-contrast, rough grain texture */
        bg-[url('https://res.cloudinary.com/dpiv8cr7i/image/upload/v1685472261/noise-texture_v76p8i.png')]
        bg-repeat
        bg-[length:200px_200px]
        
        /* 2. Visibility Control */
        opacity-[0.20] 
        dark:opacity-[0.15]
        
        /* 3. The secret sauce for visibility on white/black */
        mix-blend-multiply 
        dark:mix-blend-screen
        
        /* 4. Adding extra roughness */
        contrast-[150%]
        brightness-[100%]
      "
    />
  );
};

const EditorialButton = ({
  label,
  secondary = false,
}: EditorialButtonProps) => (
  <motion.button
    whileHover={{ y: -2 }}
    className={`group relative w-full sm:w-auto px-8 py-3 text-sm border-b-[1px] border-neutral-300 dark:border-neutral-800 border-l-[1px]  font-medium transition-all duration-300 ${
      secondary
        ? "text-neutral-600 dark:text-neutral-400"
        : "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
    }`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {label}
      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
    </span>
    {/* {secondary && (
      <span className="absolute bottom-2 left-8 right-8 h-px bg-neutral-300 dark:bg-neutral-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    )} */}
  </motion.button>
);

const SocialIcon = ({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ y: -2 }}
    className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
  >
    <Icon size={18} strokeWidth={1.5} />
  </motion.a>
);

// --- Main Section ---

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    // <VintageWrapper>
    <section className=" relative min-h-[95vh] w-full flex flex-col  text-neutral-900 dark:text-[#EAE8E4] selection:bg-neutral-200 dark:selection:bg-neutral-800 px-6 md:px-10 pt-16 pb-12 overflow-hidden">
      {/* <GrainOverlay /> */}

      {/* Thin Grid Layout Lines (Editorial Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="container mx-auto h-full w-full border-x border-neutral-200/60 dark:border-neutral-600/50 relative">
          {/* Horizontal Line 1 - Top 1/4 */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-neutral-300/60 dark:bg-neutral-600/50">
            {/* Left Intersection Marker */}
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-neutral-600 dark:bg-neutral-600 rounded-full" />
            {/* Right Intersection Marker */}
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-neutral-600 dark:bg-neutral-600 rounded-full" />
          </div>

          {/* Horizontal Line 2 - Top 3/4 */}
          <div className="absolute top-3/4 left-0 w-full h-px bg-neutral-200/60 dark:bg-neutral-600/50">
            {/* Left Intersection Marker */}
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
            {/* Right Intersection Marker */}
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
          </div>

          {/* Optional: Add a vertical "scanning" accent line to break the monotony */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-neutral-300/50 dark:bg-neutral-900/20 hidden lg:block" />
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-0"
        >
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center md:mb-13 mt-5 md:mt-0">
            {" "}
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-500 dark:text-neutral-500 mb-8"
            >
              {" "}
              Independent Full-Stack Developer{" "}
            </motion.p>{" "}
            <motion.h1
              variants={fadeInUp}
              className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-serif mb-10 max-w-4xl tracking-tight"
            >
              {" "}
              Modern Software. <br />{" "}
              <span className="italic opacity-80">Timeless Design.</span>{" "}
            </motion.h1>{" "}
            <motion.div variants={fadeInUp} className="max-w-xl space-y-6">
              {" "}
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                {" "}
                I build full-stack web applications using{" "}
                <span className="text-neutral-900 dark:text-neutral-200">
                  {" "}
                  Next.js, TypeScript, and PostgreSQL.{" "}
                </span>{" "}
                Focused on creating performant software that balances technical
                excellence with thoughtful design.{" "}
              </p>{" "}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                {" "}
                <EditorialButton label="View Work" />{" "}
                <EditorialButton label="Get In Touch" secondary />{" "}
              </div>{" "}
            </motion.div>{" "}
            {/* Social Link Sidebar (Desktop only) or Footer (Mobile) */}{" "}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex items-center gap-8 border-t border-neutral-200 dark:border-neutral-800 pt-8 w-fit"
            >
              {" "}
              <div className="flex gap-6">
                {" "}
                <SocialIcon href="#" icon={FaGithub} label="GitHub" />{" "}
                <SocialIcon href="#" icon={FaLinkedin} label="LinkedIn" />{" "}
                <SocialIcon href="#" icon={FaEnvelope} label="Email" />{" "}
              </div>{" "}
              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800" />{" "}
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                {" "}
                Available for projects 2025{" "}
              </p>{" "}
            </motion.div>{" "}
          </div>

          {/* Right Column: Featured Project Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-end lg:pl-12 relative group">
            {/* The "Broken" Border Decoration */}
            <div className="absolute left-0 top-0 w-px h-12 bg-neutral-300 dark:bg-neutral-700" />{" "}
            {/* Top left notch */}
            <div className="absolute left-0 top-0 w-12 h-px bg-neutral-300 dark:bg-neutral-700" />{" "}
            {/* Top left notch */}
            <div className="absolute left-0 bottom-0 w-px h-full bg-neutral-100 dark:bg-neutral-900 lg:border-l lg:border-dashed border-neutral-300 dark:border-neutral-800" />
            <motion.div variants={fadeInUp} className="relative py-8 lg:py-10">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-6">
                01 — Featured Project
              </span>

              <div className="space-y-4">
                <h2 className="text-3xl font-serif tracking-tight text-neutral-900 dark:text-neutral-50">
                  Greenova
                </h2>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-tighter">
                  Full-Stack E-Commerce Platform
                </p>

                <div className="space-y-2 pt-4">
                  {[
                    "Authentication",
                    "Database Integration",
                    "Product Management",
                    "Responsive Design",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 italic"
                    >
                      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="pt-8 cursor-pointer w-fit">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                    Read Case Study
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                  <div className="h-px w-20 bg-neutral-900 dark:bg-white mt-1 group-hover:w-full transition-all duration-500" />
                </div>
              </div>

              {/* Visual Preview Container */}
              {/* <div className="mt-12 relative w-full aspect-[4/5] bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex items-center justify-center transition-all duration-700">
                <div
                  className="absolute inset-0 z-0 
          
            opacity-60 grayscale 
            
            dark:opacity-30 
            
            group-hover:opacity-100 group-hover:grayscale-0 
            bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800')] 
            bg-cover bg-center transition-all duration-700 scale-105 group-hover:scale-100"
                />

                <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-700" />

                <span className="relative z-10 text-[8px] font-bold tracking-[0.5em] text-neutral-500 dark:text-neutral-400 uppercase rotate-90 mix-blend-difference">
                  Visual Preview
                </span>

                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-neutral-400/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-neutral-400/30" />
              </div> */}
              <DepthStackHero/>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

    // </VintageWrapper>
  );
}
