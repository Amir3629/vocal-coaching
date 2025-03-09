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
  iconAnimation?: "pulse" | "rotate" | "bounce" | "float"
}

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0, iconAnimation }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const imagePath = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  const iconAnimationVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -5, 0],
      x: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <div className="relative h-full bg-[#0A0A0A] rounded-xl overflow-hidden transform-gpu transition-transform duration-700 ease-out hover:scale-[1.02] hover:z-10">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        {/* Content Layer */}
        <div className="relative p-6 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center mb-4"
            animate={isHovered && iconAnimation ? iconAnimationVariants[iconAnimation] : {}}
          >
            {icon}
          </motion.div>

          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>

          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center text-sm text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E] mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Expandable Details */}
          <motion.div
            className="mt-auto overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-4 border-t border-white/10">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Enthält</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {details.includes.map((item, index) => (
                      <li key={index} className="text-xs text-gray-400">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#C8A97E] mb-2">Geeignet für</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {details.suitable.map((item, index) => (
                      <li key={index} className="text-xs text-gray-400">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#C8A97E] mb-1">Dauer</h4>
                    <p className="text-xs text-gray-400">{details.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#C8A97E] mb-1">Ort</h4>
                    <p className="text-xs text-gray-400">{details.location}</p>
                  </div>
                  {details.price && (
                    <div>
                      <h4 className="text-sm font-medium text-[#C8A97E] mb-1">Preis</h4>
                      <p className="text-xs text-gray-400">{details.price}</p>
                    </div>
                  )}
                </div>
                {details.link && (
                  <a
                    href={details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-[#C8A97E] text-black text-sm font-medium rounded-lg hover:bg-[#B69A6E] transition-colors"
                  >
                    Mehr erfahren
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 