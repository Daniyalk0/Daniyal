"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({className}: {className?: string}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="hidden md:block">
        <button
          aria-label="Toggle theme"
          className="p-2 text-neutral-400"
        >
          <Sun size={18} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="block">
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`${className ?? ""}
          p-2
          text-neutral-500
          hover:text-neutral-900
          dark:hover:text-neutral-100
          transition-all
          duration-300
          hover:-translate-y-0.5
        `}
      >
        {isDark ? (
          <Sun size={18} strokeWidth={1.5} />
        ) : (
          <Moon size={18} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}