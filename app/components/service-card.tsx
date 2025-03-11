"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={cn(
        "relative w-full bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-xl",
        "transition-all duration-700 ease-in-out transform",
        isHovered ? "h-[600px]" : "h-[480px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src={image}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-1000 ease-in-out transform",
            isHovered ? "scale-110 blur-0" : "scale-100 blur-[2px]",
            !imageLoaded && "opacity-0",
            imageLoaded && "opacity-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90",
            "transition-opacity duration-700 ease-in-out",
            isHovered ? "opacity-75" : "opacity-90"
          )}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Icon and Title */}
        <motion.div 
          className="flex items-start gap-3 mb-4"
          animate={{
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            transition: { duration: 0.5, ease: "easeOut" }
          }}
        >
          <motion.div
            className="text-[#C8A97E]"
            animate={{
              scale: isHovered ? 1.1 : 1,
              transition: { duration: 0.5, ease: "spring" }
            }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="text-[#C8A97E]/80 text-sm mt-1">{description}</p>
          </div>
        </motion.div>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.1 + (isHovered ? 0.2 : 0)
                }
              }}
              className="flex items-center gap-2 text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Expandable Details */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: { 
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { 
                  duration: 0.3,
                  ease: "easeIn"
                }
              }}
              className="mt-6 space-y-4"
            >
              <div className="space-y-2">
                <h4 className="text-[#C8A97E] text-sm font-medium">Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Dauer</p>
                    <p className="text-white text-sm">{details.duration}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Ort</p>
                    <p className="text-white text-sm">{details.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-[#C8A97E] text-sm font-medium">Geeignet für</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {details.suitable.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          duration: 0.3,
                          delay: index * 0.1
                        }
                      }}
                      className="text-white/80 text-sm"
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 