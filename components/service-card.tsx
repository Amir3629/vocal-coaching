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

const FloatingSymbol = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="text-[#C8A97E]"
    >
      {children}
    </motion.div>
  )
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
        className={`group relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-sm border-[#C8A97E]/20 hover:border-[#C8A97E]/50 transition-all duration-500 cursor-pointer ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="relative h-48 overflow-hidden"
          animate={{ height: isHovered ? "12rem" : "12rem" }}
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

        <motion.div 
          className="p-6 relative z-10"
          animate={{ 
            height: isHovered ? "auto" : "auto",
            minHeight: isHovered ? "16rem" : "12rem"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <FloatingSymbol>{icon}</FloatingSymbol>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>

          <p className="text-gray-300 mb-6">{description}</p>

          <motion.div 
            className="space-y-4"
            animate={{ 
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -20,
                  height: isHovered ? "auto" : 0
                }}
                transition={{ 
                  duration: 0.2,
                  delay: isHovered ? index * 0.1 : 0
                }}
                className="flex items-center gap-2"
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
                  initial={false}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                />
                <p className="text-sm text-gray-400">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

