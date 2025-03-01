"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  imageUrl: string
  opacity?: number
  speed?: number
}

export default function ParallaxBackground({ imageUrl, opacity = 0.5, speed = 0.5 }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black opacity-${opacity * 100}`}></div>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={imageUrl}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
    </div>
  )
} 