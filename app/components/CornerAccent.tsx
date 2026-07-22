"use client";

import React from "react";
import { motion } from "motion/react";

type CornerAccentProps = {
  className?: string;
  rotation?: number;
  size?: number;
  duration?: number; // Total time for the whole sequence (Top + Bottom)
  delayGroup?: "top" | "bottom"; 
  color?: string;
};

export default function CornerAccent({
  className = "",
  rotation = 0,
  size = 50,
  duration = 4,
  delayGroup = "top",
  color = "#34d399",
}: CornerAccentProps) {
  const pathData = `M 0 ${size} L 0 24 Q 0 0 24 0 L ${size} 0`;

  // Define keyframes based on which group this belongs to
  // If top: [Show, Show, Hide, Hide]
  // If bottom: [Hide, Hide, Show, Show]
  const opacityKeyframes = 
    delayGroup === "top" 
      ? [0, 1, 1, 0, 0, 0] 
      : [0, 0, 0, 0, 1, 1, 0];

  const timesKeyframes = 
    delayGroup === "top"
      ? [0, 0.1, 0.4, 0.5, 0.51, 1] // Active 0% to 50%
      : [0, 0.49, 0.5, 0.6, 0.9, 1]; // Active 50% to 100%

  return (
    <div
      className={`absolute pointer-events-none z-30 ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: opacityKeyframes }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: timesKeyframes,
          }}
        >
          {/* Glow */}
          <path
            d={pathData}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "blur(4px)", opacity: 0.3 }}
          />
          {/* Main Line */}
          <path
            d={pathData}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}