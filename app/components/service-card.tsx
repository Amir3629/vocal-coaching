"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  subtitle: string
  features: string[]
  details?: {
    duration?: string
    location?: string
    includes?: string[]
    suitable?: string[]
  }
  image?: string
  icon?: React.ReactNode
}

export default function ServiceCard({
  title,
  subtitle,
  features,
  details,
  image,
  icon
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        </div>
      )}

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-6">
          {icon && (
            <motion.div
              className="text-[#C8A97E]"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          <div>
            <h3 className="text-xl font-medium text-white">{title}</h3>
            <p className="text-sm text-[#C8A97E]/80 mt-1">{subtitle}</p>
          </div>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-white/80"
            >
              <span className="w-1 h-1 rounded-full bg-[#C8A97E]" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {details && (
          <div className="mt-auto pt-6 space-y-4">
            {details.includes && (
              <div>
                <h4 className="text-[#C8A97E] text-sm font-medium mb-2">Enthält</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {details.includes.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white/60 text-sm"
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            {details.suitable && (
              <div>
                <h4 className="text-[#C8A97E] text-sm font-medium mb-2">Geeignet für</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {details.suitable.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white/60 text-sm"
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {details.duration && (
                <div>
                  <p className="text-white/60 text-xs mb-1">Dauer</p>
                  <p className="text-white text-sm">{details.duration}</p>
                </div>
              )}
              {details.location && (
                <div>
                  <p className="text-white/60 text-xs mb-1">Ort</p>
                  <p className="text-white text-sm">{details.location}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
} 

