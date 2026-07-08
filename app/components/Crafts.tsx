"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Sparkle } from 'lucide-react';

// --- Types ---

interface Technology {
  id: string;
  name: string;
  description: string;
  category: string;
}

// --- Data ---

const CRAFT_ITEMS: Technology[] = [
  { id: 'next', name: 'Next.js', category: 'Frontend', description: 'My preferred framework for building fast, scalable production-ready React applications.' },
  { id: 'react', name: 'React', category: 'Frontend', description: 'Crafting declarative, component-based user interfaces with modern state patterns.' },
  { id: 'ts', name: 'TypeScript', category: 'Frontend', description: 'Ensuring codebase stability and developer velocity through rigorous type safety.' },
  { id: 'tw', name: 'Tailwind', category: 'Frontend', description: 'Building bespoke design systems with utility-first CSS and refined constraints.' },
  { id: 'node', name: 'Node.js', category: 'Backend', description: 'Architecting scalable server-side logic and high-performance API services.' },
  { id: 'prisma', name: 'Prisma', category: 'Backend', description: 'My preferred ORM for type-safe database modeling and intuitive migrations.' },
  { id: 'supabase', name: 'Supabase', category: 'Backend', description: 'Leveraging PostgreSQL, real-time engines, and secure authentication.' },
  { id: 'pg', name: 'PostgreSQL', category: 'Backend', description: 'The reliable relational backbone for complex data-driven applications.' },
  { id: 'git', name: 'Git', category: 'Tools', description: 'Maintaining clean version history and collaborative development workflows.' },
  { id: 'vercel', name: 'Vercel', category: 'Tools', description: 'Optimized deployment pipelines and global edge network performance.' },
  { id: 'figma', name: 'Figma', category: 'Tools', description: 'Bridging the gap between high-fidelity design and technical execution.' },
];

const CATEGORIES = ['Frontend', 'Backend', 'Tools'];

// --- Components ---

export default function CraftSection() {
  const [activeTech, setActiveTech] = useState<Technology>(CRAFT_ITEMS[0]);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Onboarding Animation: Highlights the first item once when the section is scrolled into view
  useEffect(() => {
    if (isInView && !hasOnboarded) {
      const timer = setTimeout(() => {
        setHasOnboarded(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasOnboarded]);

  return (
    <section 
      ref={sectionRef}
      id='skills'
      className="scroll-mt-48 relative w-full border-y border-zinc-200/60 dark:border-white/5 transition-colors duration-500 overflow-hidden lg:py-5"
    >
      {/* Subtle Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 md:py-16 min-h-[260px] lg:max-h-[380px] flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-start">
          
          {/* Left: Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-1"
          >
            <h2 className="text-2xl md:text-3xl font-serif italic text-zinc-900 dark:text-zinc-100">
              Craft
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] font-sans text-zinc-400">
              The tools behind the work.
            </p>
          </motion.div>

          {/* Center: Technology Groups */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-300 dark:text-zinc-700">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {CRAFT_ITEMS.filter(t => t.category === cat).map((tech) => (
                    <TechItem 
                      key={tech.id}
                      tech={tech}
                      isActive={activeTech.id === tech.id}
                      onSelect={() => setActiveTech(tech)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Persistent Information Panel */}
          <div className="lg:col-span-4 h-full flex items-center lg:pl-12 lg:border-l border-zinc-200/60 dark:border-white/5">
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -5, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkle className="w-3 h-3 text-zinc-400 fill-zinc-400" />
                    <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      {activeTech.name}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg font-serif italic text-zinc-700 dark:text-zinc-300 leading-snug">
                    {activeTech.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Section Divider Fine Line */}
      {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" /> */}
    </section>
  );
}

// --- Sub-Component: TechItem ---

function TechItem({ 
  tech, 
  isActive, 
  onSelect 
}: { 
  tech: Technology; 
  isActive: boolean; 
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className="relative flex items-center group py-0.5 outline-none"
      aria-label={`View details for ${tech.name}`}
    >
      {/* Animated Marker */}
      {isActive && (
        <motion.div
          layoutId="tech-marker"
          className="absolute -left-4 flex items-center justify-center pointer-events-none"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Sparkle className="w-2.5 h-2.5 text-zinc-400 fill-zinc-400" />
        </motion.div>
      )}

      <motion.span
        animate={{ 
          y: isActive ? -2 : 0,
          opacity: isActive ? 1 : 0.4,
          fontWeight: isActive ? 500 : 400 
        }}
        className={`text-sm md:text-base font-sans transition-colors duration-300 ${
          isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        {tech.name}
      </motion.span>

      {/* Highlight Background Pulse for Onboarding */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.1, 0], scale: [0.9, 1.1, 1.2] }}
          className="absolute inset-0 -z-10 bg-zinc-400 dark:bg-zinc-600 rounded-full blur-md pointer-events-none"
          transition={{ duration: 1.5 }}
        />
      )}
    </button>
  );
}