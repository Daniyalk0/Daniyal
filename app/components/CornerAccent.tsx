"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

type CornerAccentProps = {
  className?: string;
  /** 0: Top-Left, 90: Top-Right, 180: Bottom-Right, 270: Bottom-Left */
  rotation?: number;
  size?: number;
};

/**
 * Premium Stationary Corner Accent
 * - Faded ends via SVG masking.
 * - Simultaneous glisten pulse.
 * - Optimized for dark/light mode.
 */
export default function CornerAccent({
  className = "",
  rotation = 0,
  size = 120,
}: CornerAccentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const pathData = `M 0 ${size} L 0 24 Q 0 0 24 0 L ${size} 0`;
  
  // Unique IDs for multiple instances on one page
  const maskId = React.useId();

  const glints = React.useMemo(
  () =>
    Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      duration: 2.2 + Math.random() * 2,
      delay: Math.random() * 5,
      segment: 0.12 + Math.random() * 0.05,
      start: i * 0.25 + Math.random() * 0.08, // keeps them separated
    })),
  []
);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none z-30 ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <defs>
          {/* This mask creates the "faded away" effect at the ends of the lines */}
          <mask id={maskId}>
            <motion.path
              d={pathData}
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1 0" // Necessary for some browser masking engines
              style={{
                // Mask gradient: Black at ends (transparent), white in center (visible)
                // We use a CSS mask-image fallback approach for the "fade"
              }}
            />
            {/* Linear gradients don't curve, so we use a radial mask or layered gradient */}
            <linearGradient id={`${maskId}-grad-x`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="20%" stopColor="white" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
            <linearGradient id={`${maskId}-grad-y`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" />
              <stop offset="80%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
          </mask>
        </defs>

        <g style={{ mask: `url(#${maskId})` }}>
          {/* 1. Stationary Base (Faded slightly more in dark mode) */}
          <path
            d={pathData}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-neutral-400 dark:text-neutral-800 opacity-40 dark:opacity-40"
          />

          {/* 2. Simultaneous Glisten Pulse */}
        {isInView &&
  glints.map((g) => (
    <motion.path
      key={g.id}
      d={pathData}
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      className="text-neutral-500 dark:text-white"
      pathLength={1}
      initial={{
        pathLength: g.segment,
        pathOffset: g.start,
        opacity: 0,
      }}
      animate={{
        pathOffset: [g.start, g.start + 1],
       opacity: [
    0,
    0.8 + Math.random() * 0.2,
    0.8 + Math.random() * 0.2,
    0,
]
      }}
      transition={{
        duration: g.duration,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        delay: g.delay,
        ease: "linear",
      }}
      style={{
      filter: `drop-shadow(0 0 ${3 + g.id}px rgba(255,255,255,.9))`
      }}
    />
  ))}
          
          {/* 3. Outer Bloom (Subtle glow) */}
          {isInView && (
            <motion.path
              d={pathData}
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-0"
              animate={{ opacity: [0, 0.4, 0.4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(6px)" }}
            />
          )}
        </g>
      </svg>
      
      {/* CSS-based Fading for the ends of the stroke */}
      <style jsx>{`
        svg {
          mask-image: linear-gradient(to right, transparent, black 20%), 
                      linear-gradient(to top, transparent, black 20%);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
        }
      `}</style>
    </div>
  );
}