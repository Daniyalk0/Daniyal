"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Moon, Sun, Circle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MorphingText } from "@/components/ui/morphing-text";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// --- Sub-components ---

const NavLink = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className="group relative flex items-center gap-2 py-2 overflow-hidden"
      whileHover="hover"
      initial="initial"
    >
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-[#393025] dark:text-[#f9ebdc]"
          >
            ✦
          </motion.span>
        )}
        {!isActive && (
          <motion.span
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 },
            }}
            className="text-[#393025] dark:text-[#f9ebdc]"
          >
            ◇
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        variants={{
          initial: { y: 0 },
          hover: { y: -2 },
        }}
        transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
        className={`text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
          isActive
            ? "text-[#393025] dark:text-[#f9ebdc]"
            : "text-neutral-500 group-hover:text-[#393025] dark:group-hover:text-[#f9ebdc]"
        }`}
      >
        {item.label}
      </motion.span>
    </motion.a>
  );
};

export default function EditorialNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#Work");

  // Editorial Scroll Transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      setActiveSection(window.location.hash || "#work");
    };

    updateActiveSection();

    window.addEventListener("hashchange", updateActiveSection);

    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[80px] z-[500] overflow-hidden pointer-events-none">
        <header
        
          className={`relative w-full pointer-events-auto border-b ${
            scrolled
              ? "py-4 bg-[#f8f2e7] dark:bg-[#12100e]  backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
              : "py-8 bg-transparent border-transparent"
          }`}
        >
          <div className="container mx-auto px-6 max-w-[1400px]">
            <nav
              className="flex items-center justify-between"
              role="navigation"
            >
              {/* Left: Identity Block */}
              <Link href="/" className="group flex flex-col">
                <span className="text-2xl font-serif tracking-tight text-[#393025] dark:text-[#f9ebdc] leading-none">
                  Daniyal
                </span>
           <MorphingText
    texts={["Full-Stack Developer", "Software Engineer", "Frontend Developer"]}
    className="text-[9px] uppercase ml-[2px] tracking-[0.25em] text-[#928471] dark:text-[#918476] font-bold mt-1.5 transition-colors group-hover:text-neutral-600"
  />
              </Link>

              {/* Center: Desktop Links */}
              <div className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    item={item}
                    isActive={activeSection === item.href}
                  />
                ))}
              </div>

              {/* Right: Status & Toggle */}
              <div className="flex items-center gap-8">
              <div className="hidden lg:flex">
  <div className="group relative overflow-hidden flex items-center gap-3 rounded-full border border-[#d6c5a8] dark:border-[#2d261f] bg-[#faf8f5]/70 dark:bg-[#181614]/70 px-4 py-2">
    {/* Constant shimmer */}
    <span className="absolute inset-0 -translate-x-full animate-[shimmer_3.5s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />

    {/* Status dot */}
    <div className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
    </div>

    <span className="relative text-[10px] uppercase tracking-[0.25em] text-[#82786e] font-medium">
      Available for projects
    </span>
  </div>
</div>

                {/* Mobile "INDEX" Trigger */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="md:hidden text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-[#d6c5a8] dark:border-[#2d261f]  rounded-full  transition-all text-[#393025] dark:text-[#f9ebdc]"
                >
                  Index
                </button>

                <ThemeToggle />
              </div>
            </nav>
          </div>

          {/* Full-Screen Editorial Mobile Menu */}
        </header>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#f8f2e7] dark:bg-[#12100e]  p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="font-serif text-2xl italic">Navigation Index</div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
              >
                [ Close ]
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-serif hover:italic transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto border-t border-neutral-100 dark:border-neutral-900 pt-8 flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    Current Status
                  </p>
                  <p className="text-sm font-serif italic text-neutral-600">
                    Building Greenova
                  </p>
                </div>
                {/* <button className="p-4 rounded-full border border-neutral-200 dark:border-neutral-800">
                
                  <Moon size={20} strokeWidth={1} />
                </button> */}
                <ThemeToggle className="p-4 rounded-full border border-neutral-200 dark:border-neutral-800" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
