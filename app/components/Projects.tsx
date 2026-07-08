"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";
import Image from "next/image";
import { Project, PROJECTS } from "./ProjectsData";
import { GrainOverlay } from "./Hero";
import Link from "next/link";
// import { Project, PROJECTS } from "./projects-data";

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 py-5 px-6 md:px-10 text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-500 font-sans">
        <GrainOverlay/>
      <div className=" mx-auto">
        {/* Editorial Header */}
        <header className="mb-20 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-6xl md:text-8xl font-serif tracking-tight mb-8"
          >
            Selected Work
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
             className="max-w-xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light italic"
          >
            A collection of selected projects spanning full-stack applications, 
            business websites, and digital experiences.
          </motion.p>
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

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Floating image logic
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

  return (
    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="  group relative border-t border-neutral-200 dark:border-neutral-800 py-10 md:py-16 px-1 md:px-3 flex flex-col md:flex-row items-start md:items-center cursor-pointer transition-colors duration-500 hover:bg-neutral-50/50 dark:hover:bg-white/[0.02]"
      >
        {/* 01. ID */}
        
        <div className="w-12 text-sm font-mono text-neutral-400 dark:text-neutral-600 mb-4 md:mb-0">
          {project.id}
        </div>

        {/* 02. Title & Category */}
        <div className="flex-1 md:pr-12">
          <h3 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 transition-transform duration-500 group-hover:translate-x-4">
            {project.title}
          </h3>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 font-medium">
            {project.category}
          </p>
        </div>

        {/* 03. Year */}
        <div className="hidden lg:block w-32 text-sm font-mono text-neutral-400 dark:text-neutral-600">
          [{project.year}]
        </div>

        {/* 04. Description & Tech */}
        <div className="flex-1 max-w-md mt-6 md:mt-0">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed hidden md:block text-sm md:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="flex items-center">
                {tech}
                {i !== project.technologies.length - 1 && (
                  <span className="ml-4 opacity-30 dark:opacity-20">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 05. Action */}
        <div className="mt-8 md:mt-0 md:ml-12">
          <a 
            href={project.liveUrl} 
            className="text-sm font-medium tracking-[0.2em] uppercase flex items-center group/link"
          >
            <span className="mr-2 transition-transform duration-300 group-hover/link:translate-x-1 italic font-serif normal-case text-lg tracking-normal">Explore</span> 
            <span className="transition-opacity duration-300 group-hover/link:opacity-50">→</span>
          </a>
        </div>

        {/* Floating Image (Desktop Only) */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              style={{ x, y }}
              className="pointer-events-none absolute left-0 top-0 z-50 hidden lg:block w-[350px] h-[220px] overflow-hidden rounded-sm shadow-2xl border border-white/10"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Image (Mobile Only) */}
        <div className="mt-6 w-full lg:hidden overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={450}
            className="object-cover grayscale"
          />
        </div>
      </motion.div>
    </Link>
  );
}