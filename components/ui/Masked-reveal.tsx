"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  // Allows you to slide from top, bottom, left, or right
  direction?: "up" | "down" | "left" | "right";
}

export const MaskedReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
}: MaskedRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Map directions to coordinates
  const directions = {
    up: { y: "100%", x: 0 },
    down: { y: "-100%", x: 0 },
    left: { x: "100%", y: 0 },
    right: { x: "-100%", y: 0 },
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        initial={directions[direction]}
        animate={isInView ? { x: 0, y: 0 } : directions[direction]}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for that "luxury" feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};