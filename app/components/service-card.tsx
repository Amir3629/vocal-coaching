"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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
  className?: string
}

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0, className = "" }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] p-6">
        <div className="relative z-10 space-y-4">
          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-medium text-white">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-gray-400">{description}</p>

          {/* Features List */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={isHovered ? {
                  opacity: 0,
                  x: -10
                } : {}}
                animate={isHovered ? {
                  opacity: 1,
                  x: 0
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                <p className="text-white/80 text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* Expandable Details */}
          <div className="relative overflow-hidden" style={{ minHeight: isHovered ? '200px' : '0' }}>
            <motion.div
              className="absolute w-full"
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {details && (
                <div className="space-y-4 pt-4">
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
                            className="flex items-center gap-2 text-sm text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1
                            }}
                          >
                            <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
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
                            className="flex items-center gap-2 text-sm text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1 + 0.2
                            }}
                          >
                            <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {details.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#C8A97E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {details.location}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-10 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
    </motion.div>
  )
} 