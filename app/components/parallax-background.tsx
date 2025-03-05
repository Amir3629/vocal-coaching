"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  imageUrl: string
  opacity?: number
  speed?: number
}

export default function ParallaxBackground({
  imageUrl,
  opacity = 0.5,
  speed = 0.5
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`])

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ y }}
    >
      <div className="relative w-full h-[120%] -top-[10%]">
        <Image
          src={imageUrl}
          alt="Background"
          fill
          className="object-cover"
          style={{ opacity }}
          priority
        />
      </div>
    </motion.div>
  )
} 