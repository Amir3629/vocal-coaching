"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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

  const imagePath = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative service-card-container"
    >
      <motion.div
        className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden service-card`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered ? "0 20px 25px -5px rgba(0, 0, 0, 0.1)" : "none"
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          className={`object-cover transition-transform duration-300 service-card-content ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center service-card-content">
            <p className="text-[#C8A97E]/50 text-sm">Image not found</p>
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 service-card-content ${
          isHovered ? 'opacity-100' : 'opacity-80'
        }`}>
          <div className="absolute inset-0 p-6 flex flex-col justify-between service-card-interactive">
            <div className="space-y-2">
              <div className={`w-12 h-12 rounded-full bg-[#C8A97E]/20 flex items-center justify-center transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}>
                {icon}
              </div>
              <h3 className="text-2xl font-medium text-white">{title}</h3>
              <p className="text-gray-300">{description}</p>
            </div>

            <motion.div
              initial={false}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {features && features.length > 0 && (
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1 h-1 rounded-full bg-[#C8A97E]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {details && (
                <div className="pt-4 space-y-4">
                  {details.includes && (
                    <div>
                      <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Beinhaltet:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {details.includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1 h-1 rounded-full bg-[#C8A97E]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {details.suitable && (
                    <div>
                      <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Geeignet für:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {details.suitable.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1 h-1 rounded-full bg-[#C8A97E]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{details.duration}</span>
                    <span className="text-gray-300">{details.location}</span>
                  </div>

                  {details.link && (
                    <a
                      href={details.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#C8A97E] hover:text-[#B69A6E] transition-colors brightness-125"
                    >
                      Mehr erfahren
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 