export const VintageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative min-h-[95vh] w-full flex flex-col justify-center bg-[#fffcf0] dark:bg-[#050505f5] text-neutral-900 dark:text-[#EAE8E4]  overflow-hidden">
      
      {/* 1. THE NOISE GENERATOR (SVG Filter) */}
      <svg className="absolute inset-0 h-0 w-0 opacity-0">
        <filter id="roughGrain">
          {/* baseFrequency 0.6 + numOctaves 4 creates a very "jagged" rough texture */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.80" 
            numOctaves="4" 
            stitchTiles="stitch" 
          />
          {/* This pushes the grain to be more "stark" and less blurry */}
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* 2. THE TEXTURE LAYER */}
      <div 
        className="
          pointer-events-none 
          absolute inset-0 z-0 
          /* Visibility and Blending */
          opacity-[0.3] dark:opacity-[0.4]
          mix-blend-multiply dark:mix-blend-soft-light
          /* Roughness Boosters */
          contrast-[200%] brightness-[110%]
        "
        style={{
          filter: 'url(#roughGrain)', // Applies the SVG filter above
        }}
      />

      {/* 3. VINTAGE VIGNETTE (Adds that old-photo "rough" edges) */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_120px_rgba(255,255,255,0.02)]" /> */}

      {/* 4. CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};