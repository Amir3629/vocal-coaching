"use client"

import { type ReactNode, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

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
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const processedImageUrl = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  useEffect(() => {
    console.log('ServiceCard mounted:', title)
    console.log('Image path:', processedImageUrl)
  }, [title, processedImageUrl])

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
      className="relative overflow-hidden rounded-xl h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!isExpanded) {
          setTimeout(() => setIsExpanded(false), 300)
        }
      }}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Background container */}
      <div className="absolute inset-0 w-full h-full">
        {!imageError ? (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={processedImageUrl}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 blur-sm' : 'scale-100'}`}
              quality={90}
              sizes="(max-width: 768px) 100vw, 25vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 transition-all duration-500 ${isHovered ? 'opacity-95' : 'opacity-80'}`} />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8A97E]/10 via-transparent to-transparent opacity-30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div 
        className={`relative z-10 p-6 h-full flex flex-col transition-all duration-500 ${
          isExpanded ? 'transform translate-y-0' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-[#C8A97E]/20 text-[#C8A97E]">
            {icon}
          </div>
          <p className="text-lg font-semibold text-[#C8A97E]">{price}</p>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#C8A97E] transition-colors">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>

        <ul className="space-y-2 mb-4 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-300 group-hover:text-white transition-colors"
            >
              <span className="mr-2 text-[#C8A97E]">•</span>
              {feature}
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#C8A97E] hover:text-[#B89A6F] flex items-center gap-2 transition-colors mb-4"
        >
          <span>{isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {(isHovered || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-[#C8A97E]/20">
                <h4 className="font-semibold text-[#C8A97E] mb-2">Details:</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-[#C8A97E]/80 mb-1">Enthält:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {details.includes.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:text-white transition-colors"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#C8A97E]/80 mb-1">Geeignet für:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {details.suitable.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className="hover:text-white transition-colors"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-gray-300">
                    <p className="hover:text-white transition-colors">
                      <span className="text-[#C8A97E]/80">Dauer:</span> {details.duration}
                    </p>
                    <p className="hover:text-white transition-colors">
                      <span className="text-[#C8A97E]/80">Ort:</span> {details.location}
                    </p>
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