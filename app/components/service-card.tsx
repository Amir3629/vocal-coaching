"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
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

  const imagePath = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95 backdrop-blur-[2px]" />
      </div>

      <div 
        className={`relative border border-[#C8A97E]/20 hover:border-[#C8A97E]/50 rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
          isHovered ? 'transform-gpu scale-105' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          {/* Price Tag */}
          <div className="absolute top-4 right-4 bg-[#C8A97E] text-black px-4 py-1 rounded-full text-sm font-medium">
            {price}
          </div>

          {/* Title and Icon */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-[#C8A97E] text-2xl">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">
                {title}
              </h3>
              <p className="text-white/70">
                {description}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                <p className="text-white/80 text-sm">{feature}</p>
              </div>
            ))}
          </div>

          {/* Expandable Details */}
          <motion.div
            className="overflow-hidden"
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? "1.5rem" : 0
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {details && (
              <div className="space-y-4">
                {details.includes && (
                  <div>
                    <h4 className="text-sm font-medium text-[#C8A97E] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Beinhaltet:
                    </h4>
                    <ul className="space-y-2">
                      {details.includes.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-start gap-2"
                        >
                          <svg className="w-4 h-4 text-[#C8A97E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-white/70">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {details.suitable && (
                  <div>
                    <h4 className="text-sm font-medium text-[#C8A97E] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Geeignet für:
                    </h4>
                    <ul className="space-y-2">
                      {details.suitable.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          className="flex items-start gap-2"
                        >
                          <svg className="w-4 h-4 text-[#C8A97E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-white/70">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  {details.duration && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-white/70">{details.duration}</span>
                    </div>
                  )}

                  {details.location && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-white/70">{details.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 