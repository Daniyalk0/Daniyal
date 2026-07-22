"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
// import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal";

export function ModernHeroIntro() {
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    // Wait 2 seconds, then move the text to its final position
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const textStyles = "text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-serif tracking-tight block";
  const customColors = ["#000000", "#64748b", "#94a3b8", "#1e293b"];

  return (
    // This container manages the position transition
    <motion.div
      layout
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] // Smooth "out-quint" easing
      }}
      className={
        isIntro
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white" // Big Centered State
          : "relative flex flex-col items-start p-8 max-w-4xl" // Original Layout State
      }
    >
      <div className={isIntro ? "text-center" : "text-left"}>
        {/* Line 1 */}
        <DiaTextReveal
          className={textStyles}
          colors={customColors}
          text="Modern Software."
          delay={0.2}
          duration={1.2}
        />

        {/* Line 2 */}
        <div className="italic opacity-80">
          <DiaTextReveal
            className={textStyles}
            colors={customColors}
            text="Timeless Design."
            delay={0.8} // Staggered delay
            duration={1.2}
          />
        </div>
      </div>
    </motion.div>
  );
}