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
  details: string
  image: string
  delay?: number
}

export default function ServiceCard({ title, description, icon, price, features, details, image, delay = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <Card
        className={`group relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-sm border-[#C8A97E]/20 hover:border-[#C8A97E]/50 transition-all duration-500 cursor-pointer min-h-[500px] flex flex-col ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="relative h-40 overflow-hidden"
          animate={{ height: isHovered ? "10rem" : "10rem" }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          <div className="absolute top-4 right-4 bg-[#C8A97E] text-black px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </div>
        </motion.div>

        <div className="relative flex-grow p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="text-[#C8A97E] text-2xl">{icon}</div>
              <div>
                <h3 className="text-xl font-light text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            </div>

            <motion.div
              animate={{
                height: isHovered ? "auto" : "auto",
                opacity: 1,
                marginTop: "1rem"
              }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                    <p className="text-gray-300 text-sm">{feature}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-4">{details}</p>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
} 