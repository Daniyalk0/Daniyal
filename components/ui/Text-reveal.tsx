"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string; // The words you want to color differently
  highlightClass?: string;
}

export const TextReveal = ({ text, className, delay = 0, highlight, highlightClass }: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        // Check if this word is part of the highlight string
        const isHighlighted = highlight && highlight.includes(word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,""));
        
        return (
          <span key={i} className="relative inline-flex overflow-hidden mr-[0.25em] py-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={isHighlighted ? highlightClass : ""}
            >
              {word === "" ? "\u00A0" : word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};