"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check, MapPin, Mail } from "lucide-react";

/**
 * UTILS & CONSTANTS
 */
const EMAIL = "getdaniyalkhan@gmail.com";
const SOCIAL_LINKS = [
  //   { name: "GitHub", href: "https://github.com", icon: Github },
  //   { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Location", value: "London, UK", icon: MapPin },
];

const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

/**
 * COMPONENTS
 */

const GrainTexture = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const ContactItem = ({
  label,
  value,
  href,
  isCopyable = false,
}: {
  label: string;
  value: string;
  href?: string;
  isCopyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const Content = (
    <div className="group relative flex items-center justify-between py-6 border-b border-stone-200 dark:border-stone-800 transition-colors duration-500">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium">
          {label}
        </span>
        <span className="text-lg md:text-xl font-serif text-stone-800 dark:text-stone-200 group-hover:translate-x-2 transition-transform duration-500 ease-out flex items-center gap-2">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-stone-400">
            ✦
          </span>
          {value}
        </span>
      </div>

      {isCopyable ? (
        <button
          onClick={handleCopy}
          className="relative cursor-pointer
           flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition-all duration-300"
          aria-label="Copy email"
        >
          <div className="relative w-4 h-4">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-stone-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 text-stone-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      ) : (
        href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition-all duration-300"
          >
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </a>
        )
      )}
    </div>
  );

  return Content;
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 selection:bg-stone-200 dark:selection:bg-stone-800"
    >
      {/* <GrainTexture /> */}

      {/* Top Border Line */}
      <div className="w-full h-px bg-stone-200 dark:bg-stone-800" />

      <div className="container mx-auto px-6 py-20 md:py-32 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* LEFT COLUMN: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
            >
              <h2 className="text-6xl  lg:text-[9rem] font-serif leading-[0.9] text-stone-900 dark:text-stone-50 transition-colors duration-500">
                Let&apos;s Build <br />
                <span className="italic">Something</span> <br />
                Meaningful.
              </h2>

              <div className="mt-12 max-w-md">
                <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed transition-colors duration-500">
                  I&apos;m currently available for freelance projects, creative
                  collaborations, and full-time opportunities. If you have an
                  idea you&apos;d like to bring to life, I&apos;d love to hear
                  about it.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm tracking-widest uppercase text-stone-500 dark:text-stone-500 font-medium">
                    Available for new projects — 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Contact Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              className="relative p-8 md:p-12 bg-zinc-100 dark:bg-[#141414] border border-stone-200 dark:border-stone-800 shadow-sm rounded-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: 0.2 }}
            >
              {/* Subtle Letterhead Decoration */}
              <div className="absolute top-0 right-12 w-px h-12 bg-stone-200 dark:bg-stone-800" />

              <div className="flex flex-col space-y-2 mb-12">
                <span className="text-xs uppercase tracking-tighter text-stone-400">
                  Correspondence
                </span>
                <h3 className="text-2xl font-serif italic text-stone-800 dark:text-stone-200">
                  Get in touch
                </h3>
              </div>

              <div className="flex flex-col">
                <ContactItem label="Primary Email" value={EMAIL} isCopyable />
                <ContactItem
                  label="LinkedIn"
                  value="Linkedin.com/Daniyal-khan"
                  href="https://www.linkedin.com/in/daniyal-k-648107263/"
                />
                <ContactItem
                  label="GitHub"
                  value="Github.com/Daniyalk0"
                  href="https://github.com/Daniyalk0"
                />
                <ContactItem
                  label="Current Location"
                  value="New Delhi, India"
                />
              </div>

              <div className="mt-16">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-serif text-stone-900 dark:text-stone-50 hover:italic transition-all duration-300"
                >
                  Send an Email
                  <div className="overflow-hidden">
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowUpRight className="w-8 h-8 stroke-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FOOTER INTEGRATION */}
      <footer className="w-full px-6 py-6 border-t border-stone-200 dark:border-stone-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium">
              © 2026 Daniyal
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-stone-400 font-serif italic">
                Handcrafted with care.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Designed & Developed by Me.
            </span>
            {/* Minimalist Signature Line */}
            <div className="w-24 h-px bg-stone-300 dark:bg-stone-700 mt-2 opacity-50" />
          </div>
        </div>
      </footer>
    </section>
  );
}
