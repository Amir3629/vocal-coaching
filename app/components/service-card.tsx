"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Add global styles
import "./service-card.css"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  price?: string
  features: string[]
  details: {
    includes: string[]
    suitable: string[]
    duration: string
    location: string
    price?: string
    link?: string
  }
  image: string
  delay?: number
}

export function ServiceCard({
  title,
  description,
  icon,
  price,
  features,
  details,
  image,
  delay = 0,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Default background colors for each service type
  const defaultBgColors: { [key: string]: string } = {
    "Singen": "bg-gradient-to-br from-amber-900/30 to-amber-950/50",
    "Vocal Coaching": "bg-gradient-to-br from-purple-900/30 to-purple-950/50",
    "Workshop": "bg-gradient-to-br from-blue-900/30 to-blue-950/50",
    "Chor": "bg-gradient-to-br from-emerald-900/30 to-emerald-950/50"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-2xl transition-all duration-700 ease-in-out transform",
          isHovered ? "h-[600px] scale-[1.02]" : "h-[480px]"
        )}
      >
        {/* Background Image with Blur Effect */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-in-out transform",
              !isHovered && "scale-110 blur-[8px]",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            priority
          />
          {/* Dark Gradient Overlay */}
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isHovered 
                ? "bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60" 
                : "bg-gradient-to-t from-black/95 via-black/80 to-black/60 opacity-90"
            )}
          />
        </div>

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col justify-between z-10">
          {/* Icon and Title */}
          <div>
            <motion.div
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -10 : 0
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[#C8A97E] mb-4"
            >
              {icon}
            </motion.div>
            <motion.h3
              animate={{ 
                y: isHovered ? -10 : 0,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-bold text-white mb-3"
            >
              {title}
            </motion.h3>
            <motion.p 
              animate={{ opacity: isHovered ? 0.7 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300"
            >
              {description}
            </motion.p>
          </div>

          {/* Features List */}
          <motion.ul
            animate={{ 
              opacity: isHovered ? 0 : 1,
              y: isHovered ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "space-y-3 text-gray-200",
              isHovered && "pointer-events-none"
            )}
          >
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          {/* Expandable Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute inset-x-0 bottom-0 p-8 space-y-6",
              "bg-gradient-to-t from-black/95 via-black/90 to-transparent",
              !isHovered && "pointer-events-none"
            )}
          >
            <div className="space-y-4">
              <h4 className="text-[#C8A97E] font-medium">Details</h4>
              <ul className="grid grid-cols-2 gap-3">
                {details.includes.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C8A97E]/70" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <span className="text-[#C8A97E]">Geeignet für: </span>
                {details.suitable.join(", ")}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-[#C8A97E]">Dauer: </span>
                {details.duration}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-[#C8A97E]">Ort: </span>
                {details.location}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 