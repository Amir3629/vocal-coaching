"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  price: string
  features: string[]
  details: {
    includes: string[]
    suitable: string[]
    duration: string
    location: string
  }
  image: string
  delay?: number
}

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0 }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleTouchStart = () => {
    setHasInteracted(true)
    setIsFlipped(true)
  }

  const handleTouchEnd = () => {
    if (hasInteracted) {
      setIsFlipped(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-[450px] sm:h-[500px] perspective-1000 cursor-pointer transition-transform duration-500"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/5"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/60" />
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 30vw"
              priority={delay === 0}
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          </div>
          <div className="relative p-4 sm:p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                {icon}
              </div>
              <span className="text-base sm:text-lg font-semibold text-[#C8A97E]">{price}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{title}</h3>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm">{description}</p>
            <ul className="space-y-1.5 sm:space-y-2 flex-grow text-sm">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="mr-2 text-[#C8A97E]">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#C8A97E]/20 p-4 sm:p-6 flex flex-col rotate-y-180"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <h3 className="text-lg font-bold text-[#C8A97E] mb-3">{title}</h3>
          <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar">
            <div>
              <h4 className="text-[#C8A97E] font-medium mb-2 text-sm">Enthält:</h4>
              <ul className="space-y-1.5">
                {details.includes.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300 text-sm">
                    <span className="mr-2 text-[#C8A97E] mt-1">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#C8A97E] font-medium mb-2 text-sm">Geeignet für:</h4>
              <ul className="space-y-1.5">
                {details.suitable.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300 text-sm">
                    <span className="mr-2 text-[#C8A97E] mt-1">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm text-gray-300">
                <span className="text-[#C8A97E]">Dauer:</span> {details.duration}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-[#C8A97E]">Ort:</span> {details.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 