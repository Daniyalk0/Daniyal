import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Feather, Sparkle } from "lucide-react";

type ArchiveManuscriptBotProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mounted: boolean;
  modalContent: React.ReactNode; // or a more specific type if applicable
};

const ArchiveManuscriptBot = ({ setIsOpen, mounted, modalContent }: ArchiveManuscriptBotProps) => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

 const phrases = [
  "Explore my featured projects...",
  "Ask how I build full-stack applications...",
  "Learn about my engineering approach...",
  "Discover the story behind Greenova...",
];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setDisplayText(
          currentPhrase.substring(
            0,
            displayText.length + (isDeleting ? -1 : 1),
          ),
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <>
      <div className="w-full overflow-hidden py-8 md:pb-24 md:pt-0 ">
        {/* Slow Breathing Slide */}
        <motion.div
          animate={{ x: [-10, 10] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-full max-w-4xl mx-auto px-0 sm:px-12 relative z-30 sm:-translate-x-10"
        >
          <motion.div
            onClick={() => setIsOpen(true)}
            className="relative group cursor-pointer"
            style={{
              // Responsive mask: less aggressive on mobile so text isn't cut off
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {/* Main Parchment Strip */}
            <div
              className="relative border-y border-[#d6c5a8] dark:border-[#2d261f]  bg-[#fcfaf2]/60 dark:bg-[#1a1612]/40 backdrop-blur-sm 
                            py-3 px-6  md:py-3 md:px-16  transition-all duration-1000 group-hover:bg-[#fcfaf2]/90 dark:group-hover:bg-[#1a1612]/80"
            >
              {/* Internal Texture */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

              <div className="relative flex items-center justify-between gap-4 md:gap-8 min-h-[60px] md:h-16">
                {/* 1. ARCHIVE METADATA (Desktop Only) */}
                <div className="hidden lg:flex flex-col justify-between h-full py-1 shrink-0">
                  <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#3d342b]/40 dark:text-[#d6c5a8]/30 rotate-180 [writing-mode:vertical-lr]">
                    Vol. 24
                  </span>
                  <div className="w-[1px] flex-1 bg-[#3d342b]/10 dark:bg-[#d6c5a8]/10 my-2 mx-auto" />
                  <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#3d342b]/40 dark:text-[#d6c5a8]/30 rotate-180 [writing-mode:vertical-lr]">
                    ID-88
                  </span>
                </div>

                {/* 2. THE QUILL (Hidden on smallest mobile) */}
                <div className="hidden sm:flex items-center gap-4 md:gap-6 shrink-0">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <Feather
                      size={20}
                      strokeWidth={1}
                      className="text-[#3d342b]/60 dark:text-[#d6c5a8]/60"
                    />
                  </motion.div>
                  <div className="h-8 md:h-10 w-[1px] bg-gradient-to-b from-transparent via-[#3d342b]/20 to-transparent" />
                </div>

                {/* 3. MAIN CONTENT (Flexible width) */}
                <div className="flex-1 min-h-[1.5em] flex items-center overflow-hidden">
                  <p className="text-sm sm:text-xl md:text-xl font-serif  italic text-[#3d342b86] dark:text-[#d6c5a8a2] group-hover:text-[#3d342bbe] dark:group-hover:text-[#d6c5a8cf] transition-colors duration-700 tracking-tight leading-none whitespace-nowrap overflow-hidden flex items-center">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-[1.5px] h-5 md:h-8 bg-amber-800/40 ml-1 shrink-0"
                    />
                  </p>
                </div>

                {/* 4. THE WAX SEAL (Right) */}
                <div className="flex items-center gap-3 md:gap-6 shrink-0">
                  <div className="h-8 md:h-10 w-[1px] bg-gradient-to-b from-transparent via-[#3d342b]/20 to-transparent hidden xs:block" />
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5c1d1d] dark:bg-[#3d1212] flex items-center justify-center shadow-lg relative"
                    >
                      <div className="absolute inset-1 border border-white/10 rounded-full" />
                      <Sparkle
                        size={16}
                        className="text-[#f4ead5] opacity-80"
                      />

                      {/* Label hidden on mobile to prevent overlap */}
                      <div className="absolute -bottom-6 hidden md:block opacity-0 group-hover:opacity-40 transition-opacity duration-1000 whitespace-nowrap">
                        <span className="text-[8px] font-mono tracking-[0.5em] uppercase text-[#3d342b] dark:text-[#d6c5a8]">
                          Invoke
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Brackets (Hidden on small mobile) */}
              <div className="hidden sm:block absolute top-2 left-4 md:left-8 w-4 h-4 border-t border-l border-[#3d342b]/10 dark:border-[#d6c5a8]/10" />
              <div className="hidden sm:block absolute bottom-2 right-4 md:right-8 w-4 h-4 border-b border-r border-[#3d342b]/10 dark:border-[#d6c5a8]/10" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default ArchiveManuscriptBot;
