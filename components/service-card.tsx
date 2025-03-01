"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  price: string
  features: string[]
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

export default function ServiceCard({ title, description, icon, price, features, image, delay = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <Card
        className="group relative overflow-hidden bg-[#1a1a1a]/80 backdrop-blur-sm border-[#C8A97E]/20 hover:border-[#C8A97E]/50 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
          <div className="absolute top-4 right-4 bg-[#C8A97E] text-black px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </div>
        </div>

        <div className="p-6 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <FloatingSymbol>{icon}</FloatingSymbol>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>

          <p className="text-gray-300 mb-6">{description}</p>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#C8A97E]"></div>
                    <p className="text-sm text-gray-400">{feature}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <Button
              className="w-full bg-[#C8A97E] hover:bg-[#B89A6F] text-black transition-all duration-300"
              onClick={() => (window.location.href = "#booking")}
            >
              Jetzt Buchen
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

