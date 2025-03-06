"use client"

import { type ReactNode, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

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
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const processedImageUrl = `/vocal-coaching${image}`

  useEffect(() => {
    console.log('ServiceCard mounted:', title)
  }, [title])

  const handleImageError = () => {
    console.error('Failed to load image:', processedImageUrl)
    setImageError(true)
  }

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', processedImageUrl)
    setImageError(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative overflow-hidden rounded-xl h-full p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        {!imageError ? (
          <Image
            src={processedImageUrl}
            alt={title}
            fill
            className="object-cover transform scale-110"
            quality={60}
            sizes="(max-width: 768px) 100vw, 25vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-[#C8A97E]/20 text-[#C8A97E]">
            {icon}
          </div>
          <p className="text-lg font-semibold text-[#C8A97E]">{price}</p>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>

        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <span className="mr-2 text-[#C8A97E]">•</span>
              {feature}
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-700">
                <h4 className="font-semibold text-[#C8A97E] mb-2">Details:</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Enthält:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {details.includes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Geeignet für:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {details.suitable.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-gray-300">
                    <p><span className="text-gray-400">Dauer:</span> {details.duration}</p>
                    <p><span className="text-gray-400">Ort:</span> {details.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 