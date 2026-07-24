"use client";

import React, { useEffect, useState } from "react";
import {
  // motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  motion,
} from "motion/react";
import Image from "next/image";
import { Project, PROJECTS } from "./ProjectsData";
import { GrainOverlay } from "./Hero";
import Link from "next/link";
import { MaskedReveal } from "@/components/ui/Masked-reveal";
import { TextReveal } from "@/components/ui/Text-reveal";
// import { Project, PROJECTS } from "./projects-data";

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-20 py-5 px-6 md:px-10 text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-500 font-sans"
    >
      <GrainOverlay />
      <div className="container mx-auto">
        {/* Editorial Header */}
        <header className="mb-20 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <MaskedReveal delay={0.4} duration={1.7} direction="up" className="text-6xl text-[#393025] dark:text-[#f9ebdc] md:text-8xl font-serif tracking-tight mb-8">

          <h2
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            // className="text-6xl md:text-8xl font-serif tracking-tight mb-8"
            >
            Selected Work
          </h2>
            </MaskedReveal>
          {/* <p
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{
            //   duration: 0.8,
            //   delay: 0.1,
            //   ease: [0.215, 0.61, 0.355, 1],
            // }}
            className="max-w-xl text-md sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light italic"
          >
            A collection of selected projects spanning full-stack applications,
            business websites, and digital experiences.
          </p> */}
          <TextReveal className="max-w-xl text-md sm:text-xl text-[#82786e] leading-tight sm:leading-snug font-light italic" text="A collection of selected projects spanning full-stack applications, business websites, and digital experiences." />
        </header>

        {/* Project Archive */}
        <div className="flex flex-col max-w-7xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
      </div>
    </section>
  );
}

export function ProjectRow({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Floating image logic (Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 150);
    mouseY.set(e.clientY - rect.top - 100);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-40" />;

  return (
    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        whileTap={{ scale: 0.98 }} // Haptic feel on mobile tap
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative border-t border-neutral-200 dark:border-neutral-800 py-10 lg:py-16 px-4 lg:px-6 flex flex-col lg:flex-row items-start lg:items-center cursor-pointer transition-colors duration-500 hover:bg-[#f6f0e6] dark:hover:bg-[#12100e]"
      >
        {/* 01. ID & YEAR (Mobile Row) */}
        <div className="flex justify-between w-full lg:w-12 mb-4 lg:mb-0">
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-600">
            {project.id}
          </span>
          <span className="lg:hidden text-xs font-mono text-neutral-400 dark:text-neutral-600">
            [{project.year}]
          </span>
        </div>

        {/* 02. Title & Category */}
        <div className="flex-1 lg:pr-12 w-full">
          <MaskedReveal delay={0.2} duration={1.5} direction="up">

          <motion.h3 
            className="text-4xl md:text-5xl text-[#393025] dark:text-[#f9ebdc] lg:text-7xl font-serif tracking-tight mb-2 transition-transform duration-500 lg:group-hover:translate-x-4"
            >
            {project.title}
          </motion.h3>
            </MaskedReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#82786e] font-semibold">
            {project.category}
          </p>
        </div>

        {/* 03. Year (Desktop Only) */}
        <div className="hidden lg:block w-32 text-sm font-mono text-neutral-400 dark:text-neutral-600">
          [{project.year}]
        </div>

        {/* 04. Mobile Image Reveal (Replacing the static one) */}
        <motion.div 
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-8 w-full aspect-[16/10] lg:hidden overflow-hidden rounded-sm"
        >
          <motion.div
            whileInView={{ scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* 05. Description & Tech */}
        <div className="flex-1 max-w-md mt-8 lg:mt-0">
          <TextReveal text={project.description} className="text-[#82786e] mb-6 leading-relaxed hidden lg:block text-sm"/>
          {/* <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed hidden lg:block text-sm">
            {project.description}
          </p> */}
         {/* Tech Stack - Vintage Archive Style */}
{/* Tech Stack - 1950s Vintage Style */}
<div className="mt-8 flex flex-wrap gap-3">
  {project.technologies.map((tech : any, i: any) => (
    <motion.div
      key={tech}
      initial={{ rotate: i % 2 === 0 ? -1 : 1 }} // Subtle "manually stamped" tilt
      className="relative px-3 py-1 bg-[#fdfaf3] dark:bg-[#1a1816] border border-[#d6c5a8] dark:border-[#2d261f] shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)]"
    >
      {/* Texture Overlay (Grainy Paper Effect) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <span className="relative z-10 text-[10px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400">
        <span className="mr-1 opacity-40">№</span>
        {tech}
      </span>

      {/* Decorative "Punch Hole" or Dot for that 50s card look */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-[#d6c5a8] dark:border-[#2d261f]" />
    </motion.div>
  ))}
</div>
        </div>

        {/* 06. Action (Enhanced for Mobile) */}
        <div className="mt-8 lg:mt-0 lg:ml-12 w-full lg:w-auto border-t lg:border-none border-neutral-200 dark:border-neutral-800 pt-6 lg:pt-0">
          <div className="text-sm font-medium tracking-[0.2em] uppercase flex items-center justify-between lg:justify-start text-[#393025] dark:text-[#f9ebdc] ">
            <span className="italic font-serif normal-case text-xl tracking-normal">
              View Project
            </span>
            <motion.span 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Floating Image (Desktop Only) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              style={{ x, y }}
              className="pointer-events-none absolute left-0 top-0 z-50 hidden lg:block w-[400px] h-[250px] overflow-hidden rounded-sm shadow-2xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
