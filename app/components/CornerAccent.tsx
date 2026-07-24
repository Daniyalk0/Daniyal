"use client";

import React from "react";
import { motion } from "framer-motion"; // Changed from 'motion/react' to 'framer-motion' for compatibility, adjust if needed

type CornerAccentProps = {
  className?: string;
  rotation?: number;
  size?: number;
  duration?: number;
  delayGroup?: "top" | "bottom";
  color?: string; // Defaulting to the vintage bronze/amber color
};

export default function CornerAccent({
  className = "",
  rotation = 0,
  size = 40, // Slightly smaller default for elegance
  duration = 4,
  delayGroup = "top",
  color = "#8c7b65", // Vintage Bronze/Amber color
}: CornerAccentProps) {
  
  // RADIUS ADJUSTMENT: Changed the curve points from 24 to 8 for a "rounded-md" look.
  const radius = 8; 
  const pathData = `M 0 ${size} L 0 ${radius} Q 0 0 ${radius} 0 L ${size} 0`;

  const opacityKeyframes = 
    delayGroup === "top" 
      ? [0, 1, 1, 0, 0, 0] 
      : [0, 0, 0, 0, 1, 1, 0];

  const timesKeyframes = 
    delayGroup === "top"
      ? [0, 0.1, 0.4, 0.5, 0.51, 1] 
      : [0, 0.49, 0.5, 0.6, 0.9, 1];

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
          {/* Theme-matched Glow: Reduced opacity and adjusted blur for a "paper ember" feel */}
          <path
            d={pathData}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "blur(6px)", opacity: 0.40 }}
          />
          
          {/* Main Ink Line */}
          <path
            d={pathData}
            stroke={color}
            strokeWidth="1.2" // Slightly thinner line for a more delicate, vintage look
            strokeLinecap="round"
            style={{ opacity: 0.8 }}
          />
        </motion.g>
      </svg>
    </div>
  );
}