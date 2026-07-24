"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, Mail, Text } from "lucide-react";
// import { VintageSection, VintageWrapper } from "./VintageWrapper";
import PremiumHeroStack from "./HeroStack";
import InteractiveHeroMedia from "./HeroStack";
import DepthStackHero from "./HeroStack";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { ChatButton } from "./chat/ChatButton";
import { VintageAssistant } from "./chat/ChatConcierge";
import { useIntro } from "../context/IntroContext";
import { MaskedReveal } from "@/components/ui/Masked-reveal";
import { TextReveal } from "@/components/ui/Text-reveal";
import { RippleButton } from "@/components/ui/ripple-button";

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
  const href = secondary
    ? "mailto:getdaniyalkhan@gmail.com"
    : "/Daniyal's_CV.pdf";

  const content = (
    <motion.span
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden px-6 sm:px-8 py-3 text-sm font-medium transition-all duration-500 ${
        secondary
          ? "border-b border-[#d6c5a8] dark:border-[#2d261f] text-[#5c4d3c] dark:text-[#a3927e] hover:bg-[#f7f1e7] dark:hover:bg-[#1b1814]"
          : "bg-neutral-900 text-[#d5c0a8] shadow-lg shadow-black/10 dark:bg-neutral-100 dark:text-[#352d24] dark:shadow-white/5"
      }`}
    >
      {/* Animated light sweep */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {label}

        <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6" />
      </span>

      {/* Bottom accent */}
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-full ${
          secondary
            ? "bg-[#8a745b] dark:bg-[#a3927e]"
            : "bg-[#d5c0a8] dark:bg-[#352d24]"
        }`}
      />
    </motion.span>
  );

  return secondary ? (
    <motion.a href={href} whileHover={{}} className="inline-flex">
      {content}
    </motion.a>
  ) : (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      {content}
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
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="text-[#5c4d3c] dark:text-[#a3927e] hover:text-[#2f281f] dark:hover:text-neutral-100 transition-colors"
  >
    <Icon size={18} strokeWidth={1.5} />
  </motion.a>
);

// --- Main Section ---
export const customColors = ["#000000", "#64748b", "#94a3b8", "#1e293b"];
export const textStyles =
  "text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-serif tracking-tight ";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.1 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const [isIntro, setIsIntro] = useState(true);
  const { finishIntro } = useIntro();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
      finishIntro();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // const LuxuryLine = ({ children, delay = 0 }) => {
  //   return (
  //     <div className="relative overflow-hidden py-1">
  //       <motion.div
  //         initial={{ y: "100%", skewY: 7, opacity: 0 }}
  //         animate={{ y: 0, skewY: 0, opacity: 1 }}
  //         transition={{
  //           duration: 1.5,
  //           delay: delay,
  //           // This ease is the "Golden Ratio" of smooth luxury motion
  //           ease: [0.16, 1, 0.3, 1],
  //         }}
  //         className="origin-top-left"
  //       >
  //         {children}
  //       </motion.div>
  //     </div>
  //   );
  // };

  return (
    <section className="vintage-noise relative min-h-[95vh] w-full flex flex-col text-neutral-900 dark:text-[#EAE8E4] px-6 md:px-10 pt-16 pb-12 overflow-hidden">
      {/* <AnimatePresence>
        {isIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[3000] bg-[#fcf5ea] dark:bg-[#0f0e0d] bg-red-500 flex items-center justify-center"
          >
       
            <div className="container mx-auto">
           
              <div className="lg:col-span-6 text-center">
                <motion.div
                  layoutId="header-text"
                  className="inline-block" // Ensures the box only takes up the text space
                >
                  <h1 className={textStyles}>
                    <DiaTextReveal
                      className="inline-block whitespace-nowrap"
                      colors={customColors}
                      text="Modern Software."
                      delay={0.1}
                    />
                    <br />
                    <span className="italic opacity-80">
                      <DiaTextReveal
                        className="inline-block whitespace-nowrap"
                        colors={customColors}
                        text="Timeless Design."
                        delay={0.6}
                      />
                    </span>
                  </h1>
                </motion.div>
              </div>
            
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

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
          <div className="lg:col-span-6 flex flex-col justify-center sm:mb-16 mt-8 lg:mt-0 lg:-translate-y-[12vh]">
            <VintageAssistant variant="desktop-hero" />

            <div className="mb-10 min-h-[1.2em]">
              {!isIntro && (
                <motion.div
                  layoutId="header-text"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    layout: {
                      type: "tween",
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0 },
                  }}
                  className="text-left"
                >
                  <h1
                    className={`${textStyles} text-[#393025] dark:text-[#f9ebdc]`}
                  >
                    <span className="whitespace-nowrap">Modern Software.</span>
                    <br />
                    <span className="italic opacity-80 whitespace-nowrap">
                      Timeless Design.
                    </span>
                  </h1>
                </motion.div>
              )}

              {isIntro && (
                <h1
                  className={`${textStyles} invisible text-[#393025] dark:text-[#f9ebdc]`}
                >
                  Modern Software. <br />
                  Timeless Design.
                </h1>
              )}
            </div>
            {/* REST OF CONTENT: Fades in after the move starts */}
            <motion.div className="max-w-xl space-y-6">
              {/* Description with TextReveal */}
              <TextReveal
                delay={2.1}
                className="text-lg md:text-xl font-light leading-tight text-[#5c4d3c] dark:text-[#a3927e]"
                text="I build full-stack web applications using Next.js, TypeScript, and PostgreSQL to solve complex problems through clean code and intentional design."
              />

              {/* Buttons and Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 1 }}
              >
                <div className="flex items-center gap-6 pt-4">
                  <EditorialButton label="Resume" />
                  <EditorialButton label="Get In Touch" secondary />
                </div>

                {/* Social Links */}
                <div className="mt-16 flex items-center gap-8 border-t border-[#d6c5a8] dark:border-[#2d261f] pt-8 w-fit">
                  <div className="flex gap-6">
                    <SocialIcon
                      href="https://github.com/Daniyalk0"
                      icon={FaGithub}
                      label="GitHub"
                    />

                    <SocialIcon
                      href="https://www.linkedin.com/in/daniyal-k-648107263/"
                      icon={FaLinkedin}
                      label="LinkedIn"
                    />

                    <SocialIcon
                      href="mailto:getdaniyalkhan@gmail.com"
                      icon={FaEnvelope}
                      label="Email"
                    />
                  </div>
                  <div className="h-0 w-px bg-neutral-300 dark:bg-neutral-800" />
                  <TextReveal
                    className="text-[10px]  uppercase tracking-widest text-[#82786e]"
                    spanClass="!py-0"
                    delay={0.3}
                    text={`Available for projects ${new Date().getFullYear()}`}
                  />

                  {/* <p className="text-[10px] uppercase tracking-widest text-[#82786e]">
        Available for projects {new Date().getFullYear()}
      </p> */}
                </div>
              </motion.div>
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
              {/* Original Top Label */}
              <TextReveal
                delay={2.1}
                className="text-[10px] font-bold text-[#82786e] uppercase tracking-widest block mb-6"
                text="01 — Featured Project"
              />
              {/* <span className="text-[10px] font-bold text-[#82786e] uppercase tracking-widest block mb-6">
    01 — Featured Project
  </span> */}

              <div className="space-y-6">
                {/* Title using MaskedReveal */}
                <MaskedReveal delay={2.1} duration={1.2} direction="up">
                  <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#2a231b] dark:text-[#d6caba]">
                    Greenova
                  </h2>
                </MaskedReveal>

                {/* Subtitle using TextReveal */}
                <TextReveal
                  delay={2.1}
                  className="text-sm font-medium text-[#82786e] uppercase tracking-tighter"
                  text="Full-Stack E-Commerce Platform"
                />

                {/* The "Letter" Feature Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  // transition={{ delay: 0.3 }}
                  className="relative mt-8 p-6 md:p-8 max-w-xl 
                 bg-[#fdfbf7] dark:bg-[#1a1612]/40 
                 border border-[#d6c5a8]/60 dark:border-[#3d342b] 
                 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                >
                  {/* Paper Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

                  {/* Corner Decorative Brackets (The "Letter" feel) */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#d6c5a8]" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#d6c5a8]" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 relative z-10">
                    {[
                      "Authentication",
                      "Database Integration",
                      "Product Management",
                      "Responsive Design",
                      "Smooth Checkout Flow",
                      "Admin Dashboard",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.1 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-xs text-[#60584e] dark:text-[#aca296] italic font-serif"
                      >
                        {/* Ink-style bullet */}
                        <div className="w-1 h-1 rounded-full bg-[#8c7b65]/40" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Original Case Study Link */}
                <Link
                  href={`https://github.com/Daniyalk0/Greenova`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group pt-8 cursor-pointer w-fit block"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                    Read Case Study
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 2.1,
                      }}
                      viewport={{ once: true }}
                    >
                      →
                    </motion.span>
                  </div>

                  <div className="h-px w-20 bg-neutral-900 dark:bg-white mt-1 group-hover:w-full transition-all duration-500" />
                </Link>
              </div>
            </motion.div>
            <DepthStackHero />
          </div>
        </div>
      </div>
    </section>

    // </VintageWrapper>
  );
}
