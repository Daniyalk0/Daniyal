"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

// --- Types ---

interface Fragment {
  id: number;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  date?: string;
  rotation: number;
  top: string;
  left: string;
  zIndex: number;
  size: "sm" | "md" | "lg";
}

// --- Data Structure ---

const GALLERY_FRAGMENTS: Fragment[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Morning light in a studio",
    caption: "The first light of day.",
    location: "Somewhere in the Woods",
    // date: "2024",
    rotation: -4,
    top: "10%",
    left: "15%",
    zIndex: 10,
    size: "md",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    alt: "Coffee and notes",
    caption: "Ideas often start here.",
    location: "Local Café",
    rotation: 6,
    top: "20%",
    left: "55%",
    zIndex: 20,
    size: "sm",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1574848296471-28f79a036f79?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Minimalist architecture",
    caption: "Observing structure.",
    location: "Apartments",
    // date: "2023",
    rotation: -2,
    top: "55%",
    left: "10%",
    zIndex: 30,
    size: "lg",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1570596129250-1d1dc5b9fa51?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Street in the rain",
    caption: "Rainy days for deep focus.",
    location: "Foggy weather",
    rotation: 3,
    top: "60%",
    left: "60%",
    zIndex: 15,
    size: "md",
  },
];

// --- Sub-Components ---

const PaperFragment = ({ item }: { item: Fragment }) => {
  const sizeClasses = {
    sm: "w-32 md:w-48",
    md: "w-48 md:w-64",
    lg: "w-64 md:w-80",
  };

  return (
    <motion.div
      style={{ top: item.top, left: item.left, zIndex: item.zIndex }}
      initial={{ opacity: 0, scale: 0.9, rotate: item.rotation + 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
      viewport={{ once: true }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05, 
        zIndex: 50,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
      }}
      className={`absolute cursor-pointer group p-3 pb-8 shadow-xl border bg-zinc-100 dark:bg-zinc-800 border-zinc-200/50 dark:border-white/5 ${sizeClasses[item.size]}`}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 30vw, 20vw"
        />
      </div>
      
      <div className="mt-3 px-1 space-y-1">
        <p className="text-[10px] md:text-[11px] font-serif italic text-zinc-800 dark:text-zinc-200 leading-tight">
          {item.caption}
        </p>
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[8px] uppercase tracking-tighter text-zinc-400">
            {item.location}
          </span>
          <span className="text-[8px] uppercase tracking-tighter text-zinc-400">
            {item.date}
          </span>
        </div>
      </div>

      {/* Subtle Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />
    </motion.div>
  );
};

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      id='about'
      className="relative min-h-screen w-full py-24 overflow-hidden transition-colors duration-700"
    >
      {/* Background Texture Overlay */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" /> */}

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-12 group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-end justify-end mb-4">

              <h2 className="text-sm font-sans font-semibold tracking-[0.3em] uppercase text-zinc-400 mb-2">
                The person behind the code
              </h2>
               <div className="h-[1px] w-20 bg-zinc-300 dark:bg-zinc-800 mt-1 group-hover:w-full transition-all duration-500" />
              </div>
              <h3 className="text-5xl md:text-7xl font-serif italic tracking-tight text-zinc-900 dark:text-zinc-100 ">
                About
              </h3>
            </motion.div>

            <motion.div 
              className="space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-xl font-serif italic text-zinc-800 dark:text-zinc-200 ">
                Building digital experiences that feel as intentional as a well-bound book.
              </p>

              <div className="space-y-6 max-w-md ">
                <p>
                  My journey into software wasn’t driven by a love for machines, but a curiosity for how humans interact with complexity. I believe that every line of code is an opportunity to create clarity in a world that is increasingly cluttered.
                </p>
                <p>
                  As a developer, I sit at the intersection of rigid engineering and fluid design. I approach a codebase with the same reverence a carpenter has for wood—respecting the grain, understanding the limits, and aiming for a finish that lasts.
                </p>
                <p>
                  Currently, I’m focused on the nuances of motion and how micro-interactions can transform a static screen into a tactile conversation.
                </p>
              </div>
            </motion.div>

            {/* Oversized Pull Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-12"
            >
              <span className="absolute -top-4 -left-6 text-8xl font-serif text-zinc-200 dark:text-zinc-800/50 select-none">“</span>
              <blockquote className="text-3xl md:text-4xl font-serif italic leading-snug text-zinc-800 dark:text-zinc-100 relative z-10">
                Software should feel as <span className="text-zinc-400">carefully crafted</span> as the experience it creates.
              </blockquote>
              <div className="mt-8 w-24 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </motion.div>
          </div>

          {/* Right Column: Floating Paper Fragment Gallery */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] mt-12 lg:mt-0">
            {/* Ambient Mouse-follow container would wrap this for the subtle reaction */}
            <div className="relative w-full h-full">
              {GALLERY_FRAGMENTS.map((item) => (
                <PaperFragment key={item.id} item={item} />
              ))}

              {/* Decorative Text Elements */}
              <motion.div 
                className="absolute bottom-10 right-0 text-right hidden md:block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                <p className="text-[10px] font-mono tracking-widest text-zinc-300 dark:text-zinc-700 uppercase vertical-text transform rotate-180">
                  Visual Journal // Collected Moments
                </p>
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Decorative Section Divider */}
      {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f5f5f3] dark:from-[#050505] to-transparent pointer-events-none" /> */}
      
      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}