"use client"
import React from 'react'
import { useIntro } from '../context/IntroContext';
import { AnimatePresence, motion } from 'motion/react';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';
import { customColors, textStyles } from './Hero';

const IntroOverlay = () => {
    const { isIntro } = useIntro();
  return (
   <AnimatePresence>
        {isIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[3000] bg-[#fffcf7] dark:bg-[#0f0e0d] flex items-center justify-center"
          >
            {/* 1. Use the EXACT same container as the Hero */}
            <div className="container mx-auto">
              {/* 2. Use the EXACT same grid as the Hero */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-10"> */}
              {/* 3. Use the EXACT same column span and alignment */}
              <div className="lg:col-span-6 sm:text-center text-left ml-4 sm:ml-0">
                <motion.div
                  layoutId="header-text"
                  className="inline-block" // Ensures the box only takes up the text space
                >
                  <h1 className={textStyles}>
                    <DiaTextReveal
                      className="inline-block whitespace-nowrap text-[#393025] dark:text-[#f9ebdc]"
                      colors={customColors}
                      text="Modern Software."
                      delay={0.1}
                    />
                    <br />
                    <span className="italic opacity-80">
                      <DiaTextReveal
                        className="inline-block whitespace-nowrap text-[#393025] dark:text-[#f9ebdc]"
                        colors={customColors}
                        text="Timeless Design."
                        delay={0.6}
                      />
                    </span>
                  </h1>
                </motion.div>
              </div>
              {/* </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}

export default IntroOverlay