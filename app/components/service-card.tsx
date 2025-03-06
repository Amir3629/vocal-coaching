"use client"

import { type ReactNode, useState } from "react"
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

  const imageSrc = process.env.NODE_ENV === 'production'
    ? `/vocal-coaching${image}`
    : image

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <Card
        className={`group relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-sm border-[#C8A97E]/20 hover:border-[#C8A97E]/50 transition-all duration-500 cursor-pointer ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="relative h-48 overflow-hidden"
          animate={{ height: isHovered ? "12rem" : "12rem" }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          <div className="absolute top-4 right-4 bg-[#C8A97E] text-black px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </div>
        </motion.div>

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