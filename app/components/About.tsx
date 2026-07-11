"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView , useReducedMotion} from 'motion/react';

// --- Types ---

interface Fragment {
  id: number;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  date?: string;
  rotation: number;
  // Updated to support responsive values
  top: { mobile: string; desktop: string };
  left: { mobile: string; desktop: string };
  zIndex: number;
  size: "sm" | "md" | "lg";
}

const GALLERY_FRAGMENTS: Fragment[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1170&auto=format&fit=crop",
    alt: "Morning light",
    caption: "The first light of day.",
    location: "Woods",
    date: "2024",
    rotation: -4,
    // Increased mobile left from 5% to 15% to keep it on screen
    top: { mobile: "-10%", desktop: "10%" },
    left: { mobile: "0%", desktop: "12%" },
    zIndex: 50,
    size: "md",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    alt: "Coffee",
    caption: "Ideas often start here.",
    location: "Local Café",
    date: "2024",
    rotation: 6,
    top: { mobile: "10%", desktop: "18%" },
    left: { mobile: "50%", desktop: "58%" },
    zIndex: 20,
    size: "sm",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1574848296471-28f79a036f79?q=80&w=764&auto=format&fit=crop",
    alt: "Architecture",
    caption: "Observing structure.",
    location: "Apartments",
    date: "2023",
    rotation: -2,
    top: { mobile: "45%", desktop: "52%" },
    left: { mobile: "-4%", desktop: "10%" },
    zIndex: 30,
    size: "lg",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1570596129250-1d1dc5b9fa51?q=80&w=687&auto=format&fit=crop",
    alt: "Rainy street",
    caption: "Deep focus days.",
    location: "Foggy weather",
    date: "2024",
    rotation: 4,
    top: { mobile: "62%", desktop: "58%" },
    left: { mobile: "40%", desktop: "62%" },
    zIndex: 15,
    size: "md",
  },
];

const PaperFragment = ({ item }: { item: Fragment }) => {
const sizeClasses = {
  sm: "w-38 sm:w-32 md:w-52",
  md: "w-48 sm:w-40 md:w-64",
  lg: "w-52 sm:w-52 md:w-80",
};

  return (
    <motion.div
      style={{ 
        "--top-mob": item.top.mobile,
        "--left-mob": item.left.mobile,
        "--top-desk": item.top.desktop,
        "--left-desk": item.left.desktop,
        zIndex: item.zIndex 
      } as any}
      // Responsive Positioning
      className={`absolute top-[var(--top-mob)] left-[var(--left-mob)] md:top-[var(--top-desk)] md:left-[var(--left-desk)] 
        cursor-pointer group bg-white dark:bg-zinc-900 
        p-2 pb-2 md:p-3 md:pb-12
        shadow-[0_4px_12px_rgba(0,0,0,0.1),0_15px_35px_-5px_rgba(0,0,0,0.2)]
        hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)]
        transition-shadow duration-300 ${sizeClasses[item.size]}`}
      
      // Card movement: SNAPPY
      initial={{ opacity: 0, y: 20, rotate: item.rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.02, 
        zIndex: 50,
        transition: { duration: 0.2, ease: "easeOut" } // Fast card movement
      }}
    >
      {/* Visual Detail: Matte Washi Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 dark:bg-zinc-800/30 backdrop-blur-md border border-white/20 rotate-1 group-hover:-translate-y-1 transition-transform duration-300" />

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
        {/* Continuous Slow Zoom Image */}
        <motion.div 
          className="w-full h-full"
          whileHover={{ 
            scale: 1.2,
            transition: { duration: 10, ease: "linear" } // Continues zooming as long as hovered
          }}
          transition={{ duration: 0.6, ease: "easeOut" }} // Reset zoom speed
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        </motion.div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>
      
      {/* Card Info */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-[12px] md:text-sm font-serif italic text-zinc-800 dark:text-zinc-200 text-center px-2">
          "{item.caption}"
        </p>
        
        <div className="w-full mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">
            {item.location}
          </span>
          <span className="text-[8px] font-mono text-zinc-400">
            #{item.id}
          </span>
        </div>
      </div>
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

              <h2 className="text-xs sm:text-sm font-sans font-semibold tracking-[0.3em] uppercase text-zinc-400 mb-2">
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
              className="relative pt-2 md:pt-10"
            >
              <span className="absolute -top-4 -left-6 text-8xl font-serif text-zinc-200 dark:text-zinc-800/50 select-none">“</span>
              <blockquote className="text-3xl md:text-4xl font-serif italic leading-snug text-zinc-800 dark:text-zinc-100 relative z-10">
                Software should feel as <span className="text-zinc-400">carefully crafted</span> as the experience it creates.
              </blockquote>
              <div className="mt-8 w-24 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </motion.div>
          </div>

          {/* Right Column: Floating Paper Fragment Gallery */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] mt-0 md:mt-10 lg:mt-0">
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