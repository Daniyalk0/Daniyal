"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Moon, Sun, Circle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

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
  onClick 
}: { 
  item: NavItem; 
  isActive?: boolean; 
  onClick?: () => void 
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
        {(isActive) && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-neutral-900 dark:text-neutral-100"
          >
            ✦
          </motion.span>
        )}
        {!isActive && (
          <motion.span
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 }
            }}
            className="text-neutral-400"
          >
            ◇
          </motion.span>
        )}
      </AnimatePresence>
      
      <motion.span
        variants={{
          initial: { y: 0 },
          hover: { y: -2 }
        }}
        transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
        className={`text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
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

  return () =>
    window.removeEventListener("hashchange", updateActiveSection);
}, []);


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out border-b ${
        scrolled 
          ? "py-4 bg-[#FDFCFB]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-sm border-neutral-200 dark:border-neutral-800" 
          : "py-8 bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        <nav className="flex items-center justify-between" role="navigation">
          
          {/* Left: Identity Block */}
          <Link href="/" className="group flex flex-col">
            <span className="text-2xl font-serif tracking-tight text-neutral-900 dark:text-[#EAE8E4] leading-none">
              Daniyal
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-bold mt-1.5 transition-colors group-hover:text-neutral-600">
              Full-Stack Developer
            </span>
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
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-400"></span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium italic">
                Available for projects
              </span>
            </div>

            {/* Mobile "INDEX" Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-900 hover:text-white transition-all"
            >
              Index
            </button>
            
           <ThemeToggle/>
          </div>
        </nav>
      </div>

      {/* Full-Screen Editorial Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#FDFCFB] dark:bg-[#0F0F0F] p-8 flex flex-col"
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
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">Current Status</p>
                  <p className="text-sm font-serif italic text-neutral-600">Building Greenova</p>
                </div>
                {/* <button className="p-4 rounded-full border border-neutral-200 dark:border-neutral-800">
                
                  <Moon size={20} strokeWidth={1} />
                </button> */}
                <ThemeToggle className="p-4 rounded-full border border-neutral-200 dark:border-neutral-800"/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}