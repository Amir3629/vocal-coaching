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
  delay?: number
}

export default function ServiceCard({
  title,
  subtitle,
  features,
  details,
  image,
  icon,
  delay = 0
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative w-full bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden min-h-[420px] hover:min-h-[480px] transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-20 blur-sm transition-all duration-500 group-hover:opacity-50 group-hover:blur-none"
            priority={delay === 0}
            loading={delay === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90 transition-opacity duration-500 group-hover:from-black/40 group-hover:via-black/50 group-hover:to-black/70" />
        </div>
      )}

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-6">
          {icon && (
            <motion.div
              className="text-[#C8A97E] z-10"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? [0, -15, 10, 0] : 0
              }}
              transition={{ 
                duration: 0.6,
                scale: { type: 'spring', stiffness: 300 },
                rotate: { duration: 0.8, ease: 'easeInOut' }
              }}
            >
              {icon}
            </motion.div>
          )}
          <div>
            <h3 className="text-xl font-medium text-white">{title}</h3>
            <p className="text-sm text-[#C8A97E]/80 mt-1">{subtitle}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              className="flex items-center gap-2 text-white/80"
            >
              <span className="w-1 h-1 rounded-full bg-[#C8A97E]" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {details && (
          <div className="mt-auto space-y-4">
            {details.includes && (
              <div>
                <h4 className="text-[#C8A97E] text-sm font-medium mb-2">Enthält</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {details.includes.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: delay + index * 0.1 }}
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
                <ul className="grid grid-cols-1 gap-2">
                  {details.suitable.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: delay + index * 0.1 }}
                      className="text-white/60 text-sm"
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 space-y-2">
              {details.duration && (
                <div>
                  <p className="text-[#C8A97E] text-xs mb-1">Dauer</p>
                  <p className="text-white text-sm">{details.duration}</p>
                </div>
              )}
              {details.location && (
                <div>
                  <p className="text-[#C8A97E] text-xs mb-1">Ort</p>
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

