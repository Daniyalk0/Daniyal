"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const IntroContext = createContext({
  isIntro: true,
  finishIntro: () => {},
});

export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [isIntro, setIsIntro] = useState(true);

  const finishIntro = () => setIsIntro(false);

  // Handle Scroll Lock
  useEffect(() => {
    if (isIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isIntro]);

  return (
    <IntroContext.Provider value={{ isIntro, finishIntro }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);