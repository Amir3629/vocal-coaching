"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

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
  const [imageError, setImageError] = useState(false)

  const imagePath = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  return (
    <motion.div
      className="relative w-full h-[600px] rounded-2xl overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
      
      {!imageError ? (
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <p className="text-white text-sm">Image not available</p>
        </div>
      )}

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg"
              whileHover={{ 
                rotate: [0, 10, -10, 0],
                scale: 1.1,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              {icon}
            </motion.div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
          </motion.div>
          
          <p className="text-white/90 mb-6">{description}</p>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <Check className="w-4 h-4 text-[#C8A97E]" />
                <span className="text-white/80">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          {details && (
            <div className="space-y-4 text-sm text-white/70">
              {details.includes && (
                <div>
                  <p className="font-medium text-white mb-1">Includes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {details.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {details.suitable && (
                <div>
                  <p className="font-medium text-white mb-1">Suitable for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {details.suitable.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                {details.duration && (
                  <div>
                    <p className="font-medium text-white">Duration:</p>
                    <p>{details.duration}</p>
                  </div>
                )}
                
                {details.location && (
                  <div>
                    <p className="font-medium text-white">Location:</p>
                    <p>{details.location}</p>
                  </div>
                )}
                
                {details.price && (
                  <div>
                    <p className="font-medium text-white">Price:</p>
                    <p>{details.price}</p>
                  </div>
                )}
              </div>

              {details.link && (
                <a
                  href={details.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-[#C8A97E] text-black rounded-full hover:bg-[#B89A6F] transition-colors duration-300"
                >
                  Visit Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 