"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

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
  const [isTouching, setIsTouching] = useState(false)

  const handleTouchStart = () => {
    setIsTouching(true)
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
    setIsFlipped(!isFlipped)
  }

  const handleTouchCancel = () => {
    setIsTouching(false)
  }

  const handleClick = () => {
    if (!isTouching) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative h-[500px] w-full perspective-1000"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onClick={handleClick}
    >
      <motion.div
        className={`relative w-full h-full preserve-3d transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#C8A97E]/20 p-6">
            <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 30vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#C8A97E]/10">
                  {icon}
                </div>
                <h3 className="text-xl font-medium text-white">{title}</h3>
              </div>

              <p className="text-gray-400 text-sm line-clamp-3">{description}</p>

              <div className="pt-4">
                <div className="text-[#C8A97E] font-medium">{price}</div>
                <ul className="mt-2 space-y-1">
                  {features.map((feature, index) => (
                    <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C8A97E]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#C8A97E]/20 p-6">
            <h4 className="text-lg font-medium text-white mb-4">Details</h4>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-[#C8A97E] text-sm font-medium mb-2">Enthält:</h5>
                <ul className="space-y-1">
                  {details.includes.map((item, index) => (
                    <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C8A97E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[#C8A97E] text-sm font-medium mb-2">Geeignet für:</h5>
                <ul className="space-y-1">
                  {details.suitable.map((item, index) => (
                    <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C8A97E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[#C8A97E] text-sm font-medium mb-2">Dauer:</h5>
                <p className="text-gray-400 text-sm">{details.duration}</p>
              </div>

              <div>
                <h5 className="text-[#C8A97E] text-sm font-medium mb-2">Ort:</h5>
                <p className="text-gray-400 text-sm">{details.location}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 