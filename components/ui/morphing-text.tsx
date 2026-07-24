"use client"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const morphTime = 1.5
const cooldownTime = 0.5

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback((fraction: number) => {
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (!current1 || !current2) return

    // Clean fade and slight blur for small text
    // We avoid the SVG filter here because it destroys small fonts
    current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
    current2.style.filter = `blur(${Math.min(2 / fraction - 2, 2)}px)`

    const invertedFraction = 1 - fraction
    current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`
    current1.style.filter = `blur(${Math.min(2 / invertedFraction - 2, 2)}px)`

    current1.textContent = texts[textIndexRef.current % texts.length]
    current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
  }, [texts])

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0
    let fraction = morphRef.current / morphTime
    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }
    setStyles(fraction)
    if (fraction === 1) textIndexRef.current++
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime
      cooldownRef.current -= dt
      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }
    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

export const MorphingText = ({ texts, className }: { texts: string[], className?: string }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts)
  return (
    <div className={cn("relative inline-block", className)}>
      {/* 
         Note: We use 'invisible' on one span to "hold" the space 
         so the container has a width, preventing layout jumps.
      */}
      <span className="invisible whitespace-nowrap">{texts[0]}</span>
      
      <span
        ref={text1Ref}
        className="absolute left-0 top-0 whitespace-nowrap pointer-events-none"
      />
      <span
        ref={text2Ref}
        className="absolute left-0 top-0 whitespace-nowrap pointer-events-none"
      />
    </div>
  )
}