"use client"

import { useState, ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ServiceCardProps {
  title: ReactNode
  subtitle: ReactNode
  description: ReactNode
  icon: ReactNode
  image: string
  features: ReactNode[]
  details: {
    includes: ReactNode[]
    suitable: ReactNode[]
    duration: ReactNode
    location: ReactNode
  }
  link?: string
}

export default function ServiceCard({
  title,
  subtitle,
  description,
  icon,
  image,
  features,
  details,
  link
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0 }}
      className={`group relative w-full bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden 
        ${isHovered ? 'min-h-[520px]' : 'min-h-[320px]'} 
        transition-all duration-500 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={typeof title === 'string' ? title : 'Service'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover opacity-40 transition-all duration-700
              ${isHovered ? 'opacity-60 scale-105' : 'scale-100'}`}
            priority={true}
            loading="eager"
            quality={90}
          />
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-[#C8A97E] rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">
                {title}
              </h3>
              <p className="text-sm text-[#C8A97E]/90 mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            {description}
          </p>

          <ul className="grid grid-cols-2 gap-2 mb-6">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-white/90"
              >
                <Check
                  className="w-4 h-4 text-[#C8A97E]"
                  style={{
                    filter: "drop-shadow(0 0 2px rgba(200, 169, 126, 0.5))"
                  }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out
              ${isHovered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-[#C8A97E] mb-2">Enthält:</h4>
                <ul className="space-y-2">
                  {details.includes.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C8A97E]" />
                        {item}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#C8A97E] mb-2">Geeignet für:</h4>
                <ul className="space-y-2">
                  {details.suitable.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C8A97E]" />
                        {item}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#C8A97E]">⏱️ Dauer: </span>
                <span className="text-gray-300">{details.duration}</span>
              </div>
              <div>
                <span className="text-[#C8A97E]">📍 Ort: </span>
                <span className="text-gray-300">{details.location}</span>
              </div>
            </div>

            {link && (
              <div className="mt-6">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A97E] hover:text-[#B89A6F] transition-colors"
                >
                  Mehr erfahren →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 

