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

  return (
    <motion.div
      className="relative group bg-gradient-to-b from-[#0A0A0A]/90 to-[#0A0A0A]/70 backdrop-blur-sm border border-[#C8A97E]/20 hover:border-[#C8A97E]/50 rounded-2xl overflow-hidden transition-all duration-700 ease-out"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="p-6">
        <h3 className="text-xl font-medium text-white/90 group-hover:text-white mb-4 transition-colors duration-500">
          {title}
        </h3>
        <p className="text-white/60 group-hover:text-white/80 mb-6 transition-colors duration-500">
          {description}
        </p>

        <motion.div
          className="overflow-hidden"
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? "1.5rem" : 0
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {details && (
            <div className="space-y-4">
              {details.includes && (
                <div>
                  <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Beinhaltet:</h4>
                  <ul className="space-y-2">
                    {details.includes.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]/50 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {details.suitable && (
                <div>
                  <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Geeignet für:</h4>
                  <ul className="space-y-2">
                    {details.suitable.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]/50 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {details.duration && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{details.duration}</span>
                </div>
              )}

              {details.location && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{details.location}</span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
} 