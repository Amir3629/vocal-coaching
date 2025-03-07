"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, X } from "lucide-react"

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

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-[450px] md:perspective-1000"
      onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsFlipped(false)}
      onTouchStart={handleTouchStart}
    >
      <div
        className="relative w-full h-full transition-all duration-500 md:preserve-3d mobile-hardware-accelerate"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/5 transition-all duration-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center transition-all duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
          </div>
          <div className="relative p-4 md:p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                {icon}
              </div>
              <span className="text-lg font-semibold text-[#C8A97E]">{price}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-300 mb-4 text-sm">{description}</p>
            <ul className="space-y-2 flex-grow text-sm">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="mr-2 text-[#C8A97E]">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4 md:hidden">
              <button 
                className="text-[#C8A97E] text-sm flex items-center gap-2 mobile-touch-target"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(true)
                }}
              >
                Mehr Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#C8A97E]/20 p-4 md:p-6 flex flex-col rotate-y-180"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-[#C8A97E]">{title}</h3>
            <button 
              className="md:hidden text-gray-400 p-2 mobile-touch-target"
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4 flex-grow overflow-y-auto">
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