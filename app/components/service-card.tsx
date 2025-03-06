"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
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
  const [imageError, setImageError] = useState(false)

  const fallbackImage = "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2070&auto=format&fit=crop"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="h-[400px] transform transition-transform duration-300 hover:scale-105"
    >
      <Card
        className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-300 ${
          isHovered ? 'bg-[#0A0A0A]/95' : 'bg-[#0A0A0A]/80'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0">
          <Image
            src={imageError ? fallbackImage : image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 filter blur-[2px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        </div>

        <div className="relative h-full p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#C8A97E] bg-[#C8A97E]/10 p-2 rounded-lg">{icon}</span>
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>

            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0.7,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-gray-300">{description}</p>
              
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                    <p className="text-sm text-gray-400">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="pt-4 mt-4 border-t border-gray-800"
          >
            <p className="text-[#C8A97E] font-medium">{price}</p>
            <p className="text-sm text-gray-400 mt-1">{details.duration} • {details.location}</p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
} 