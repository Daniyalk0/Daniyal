"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
// import { VintageSection, VintageWrapper } from "./VintageWrapper";
import PremiumHeroStack from "./HeroStack";
import InteractiveHeroMedia from "./HeroStack";
import DepthStackHero from "./HeroStack";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { ChatButton } from "./chat/ChatButton";
import { VintageAssistant } from "./chat/ChatConcierge";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { ModernHeroIntro } from "./HeroIntro";

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
}: EditorialButtonProps) => {
  const href = secondary ? "mailto:getdaniyalkhan@gmail.com" : "/#work";

  const className = `group relative inline-flex w-full sm:w-auto px-8 py-3 text-sm border-b border-l border-neutral-300 dark:border-neutral-800 font-medium transition-all duration-300 ${
    secondary
      ? "text-neutral-600 dark:text-neutral-400"
      : "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
  }`;

  if (secondary) {
    return (
      <motion.a href={href} whileHover={{ y: -2 }} className={className}>
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-1 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
        </span>
      </motion.a>
    );
  }

  return (
    <Link href={href}>
      <motion.span whileHover={{ y: -2 }} className={className}>
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-1 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
        </span>
      </motion.span>
    </Link>
  );
};

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

  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const textStyles =
    "text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-serif tracking-tight";
  const customColors = ["#000000", "#64748b", "#94a3b8", "#1e293b"];

  return (
   <section className="relative min-h-[95vh] w-full flex flex-col text-neutral-900 dark:text-[#EAE8E4] px-6 md:px-10 pt-16 pb-12 overflow-hidden">
      
      {/* 1. THE INTRO LAYER (Fixed to viewport, sits above everything) */}
      <AnimatePresence>
        {isIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-neutral-950"
          >
            <motion.div 
              layoutId="header-text" // The "Magic" ID
              className="text-center"
            >
              <DiaTextReveal
                className={textStyles}
                colors={customColors}
                text="Modern Software."
                delay={0.1}
              />
              <div className="italic opacity-80">
                <DiaTextReveal
                  className={textStyles}
                  colors={customColors}
                  text="Timeless Design."
                  delay={0.6}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="container mx-auto h-full w-full border-x border-neutral-200/60 dark:border-neutral-600/50 relative">
          <div className="absolute top-1/4 left-0 w-full h-px bg-neutral-300/60 dark:bg-neutral-600/50" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-neutral-200/60 dark:bg-neutral-600/50" />
        </div>
      </div>

      {/* 3. THE MAIN LAYOUT */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-0">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center sm:mb-16 mt-16 lg:mt-0 lg:-translate-y-[9vh]">
            <VintageAssistant variant="desktop-hero" />

            {/* THE LANDING ZONE */}
            <div className="mb-10 min-h-[1.2em]">
              {!isIntro && (
             <motion.div 
  layoutId="header-text"
  // 1. ELIMINATE THE FADE: Set initial opacity to 1
  initial={{ opacity: 1 }} 
  animate={{ opacity: 1 }}
  transition={{
    // 2. CONTROL SPEED: Use 'tween' for exact duration or 'spring' for feel
    layout: { 
      type: "tween", 
      duration: 0.8,      // Lower = Faster (e.g., 0.5), Higher = Slower (e.g., 1.2)
      ease: [0.22, 1, 0.36, 1] // This is a "smooth stop" ease
    },
    // Ensure opacity doesn't animate during the layout move
    opacity: { duration: 0 } 
  }}
  className="text-left"
>
  <h1 className={textStyles}>
    Modern Software. <br />
    <span className="italic opacity-80">Timeless Design.</span>
  </h1>
</motion.div>
              )}
              {/* Keep a ghost hidden h1 if needed for layout stability */}
              {isIntro && <h1 className={`${textStyles} invisible`}>Modern Software. <br /> Timeless Design.</h1>}
            </div>

            {/* REST OF CONTENT: Fades in after the move starts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isIntro ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-xl space-y-6"
            >
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                I build full-stack web applications using{" "}
                <span className="text-neutral-900 dark:text-neutral-200">
                  Next.js, TypeScript, and PostgreSQL.
                </span>
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <EditorialButton label="View Work" />
                <EditorialButton label="Get In Touch" secondary />
              </div>

              {/* Social Links */}
              <div className="mt-16 flex items-center gap-8 border-t border-neutral-200 dark:border-neutral-800 pt-8 w-fit">
                <div className="flex gap-6">
                  <SocialIcon href="#" icon={FaGithub} label="GitHub" />
                  <SocialIcon href="#" icon={FaLinkedin} label="LinkedIn" />
                  <SocialIcon href="#" icon={FaEnvelope} label="Email" />
                </div>
                <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800" />
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                  Available for projects {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Project Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-end lg:pl-12 relative group">
            {/* ... (Keep your existing project code here) ... */}
            <div className="absolute left-0 top-0 w-px h-12 bg-neutral-300 dark:bg-neutral-700" />{" "}
            {/* Top left notch */}
            <div className="absolute left-0 top-0 w-12 h-px bg-neutral-300 dark:bg-neutral-700" />{" "}
            {/* Top left notch */}
            <div className="absolute left-0 bottom-0 w-px h-full bg-neutral-100 dark:bg-neutral-900 lg:border-l lg:border-dashed border-neutral-300 dark:border-neutral-800" />
            <motion.div variants={fadeInUp} className="relative py-5 lg:py-10">
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
                    "Smooth Checkout Flow",
                    "Admin Dashboard",
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
            </motion.div>
            <DepthStackHero />
          </div>
        </div>
      </div>
    </section>

    // </VintageWrapper>
  );
}
