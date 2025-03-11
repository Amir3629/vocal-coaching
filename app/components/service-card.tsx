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

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className="relative h-[480px] w-full bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'scale-110 blur-none' : 'scale-100 blur-[1px]'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority
          onError={() => {
            console.error('Image failed to load:', image);
            setImageError(true);
          }}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90 transition-opacity duration-300 ${
            isHovered ? 'opacity-75' : 'opacity-85'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[#C8A97E]">{icon}</div>
          <h3 className="text-2xl font-semibold text-white text-shadow">{title}</h3>
        </div>
        <p className="text-white/90 text-lg mb-6 text-shadow">{description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="text-white/80 flex items-center gap-2 text-shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Details */}
        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white/70 text-shadow"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[#C8A97E]">Dauer:</span> {details.duration}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#C8A97E]">Ort:</span> {details.location}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 