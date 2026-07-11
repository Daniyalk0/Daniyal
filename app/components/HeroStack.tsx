"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useInView, useTransform } from "motion/react";
import CornerAccent from "./CornerAccent";
// import { cn } from "@/lib/utils";

// --- Configuration ---
const PROJECT_LAYERS = [
  { id: 1, src: "/g1.png", z: 0, opacity: 1, blur: 0, scale: 1, yOffset: 0 },
  { id: 2, src: "/g2.png", z: -50, opacity: 0.9, blur: 0, scale: 0.9, yOffset: -80 },
  { id: 3, src: "/g3.png", z: -100, opacity: 0.8, blur: 2, scale: 0.8, yOffset: -160 },
  { id: 4, src: "/g4.png", z: -150, opacity: 0.8, blur: 8, scale: 0.7, yOffset: -220 },
  { id: 5, src: "/g5.png", z: -50, opacity: 0.9, blur: 0, scale: 0.9, yOffset: 80 },
  { id: 6, src: "/g6.png", z: -100, opacity: 0.8, blur: 2, scale: 0.8, yOffset: 160 },
  { id: 7, src: "/g8.png", z: -150, opacity: 0.7, blur: 2, scale: 0.7, yOffset: 220 },
];

export default function DepthStackHero() {

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Perspective Tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const cornerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (delay: number) => ({
    opacity: [0, 1, 0.5, 1],
    scale: [0.8, 1.15, 1],
    filter: [
      "brightness(1)",
      "brightness(2.5)",
      "brightness(1.2)",
      "brightness(1)",
    ],
    transition: {
      duration: 1,
      delay,
      ease: "easeOut",
    },
  }),
};

    return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="group mt-12 relative w-full aspect-[4/5] bg-gradient-to-b from-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-[#050505] border border-neutral-200 dark:border-neutral-800 overflow-hidden flex items-center justify-center rounded-3xl"
      style={{ perspective: "1200px" }}
    >
      {/* 1. Corner Accents - They glisten sequentially to guide the eye */}
      <CornerAccent rotation={0} className="top-0 left-0" />
      <CornerAccent rotation={90} className="top-0 right-0" />
      <CornerAccent rotation={180} className="bottom-0 right-0" />
      <CornerAccent rotation={270} className="bottom-0 left-0" />

      {/* 2. Visual Preview Label */}
      <span className="absolute top-8 left-8 z-50 text-[10px] hidden lg:block font-black tracking-[0.8em] text-neutral-400 dark:text-neutral-700 uppercase pointer-events-none">
        Visual Preview
      </span>

      {/* 3. 3D Moving Stack (Existing) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {PROJECT_LAYERS.map((layer, index) => (
          <LayerCard 
             key={layer.id} 
             layer={layer} 
             index={index} 
             isInView={isInView} 
             mouseX={smoothX} 
             mouseY={smoothY} 
          />
        ))}
      </motion.div>
    </div>
  );
}

function LayerCard({ layer, index, isInView, mouseX, mouseY }: any) {
  // subtle parallax shift per layer
  const xMovement = useTransform(mouseX, [-0.5, 0.5], [index * -15, index * 15]);
  const yMovement = useTransform(mouseY, [-0.5, 0.5], [index * -15, index * 15]);

  return (
    <motion.div
      initial={{ z: -500, opacity: 0, y: 100 }}
      animate={isInView ? {
        z: layer.z,
        y: layer.yOffset,
        opacity: layer.opacity,
        scale: layer.scale,
      } : {}}
      style={{ 
        translateX: xMovement,
        translateY: yMovement,
        filter: `blur(${layer.blur}px)`,
        zIndex: 100 - index,
        transformStyle: "preserve-3d"
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: index * 0.15
      }}
    className={`
  absolute w-[75%] aspect-video rounded-xl md:rounded-2xl
  shadow-[0_12px_30px_rgba(0,0,0,0.12),0_30px_60px_rgba(0,0,0,0.08)]
  dark:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_8px_20px_rgba(255,255,255,0.03)]
  overflow-hidden bg-neutral-800
  transition-all duration-700
`}
    >
      <Image
        src={layer.src}
        alt="Project Screenshot"
        fill
        className="object-cover"
        sizes="600px"
      />
      {/* Glossy gradient highlight to make it pop like the Gillian card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
    </motion.div>
  );
}



