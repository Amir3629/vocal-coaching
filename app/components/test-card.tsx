import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Music } from "lucide-react"

export default function TestCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-black p-20">
      <div className="max-w-sm mx-auto">
        <motion.div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            height: isHovered ? 420 : 320,
            transition: "height 0.3s ease-out"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/singing.jpg" : "/images/cards/singing.jpg"}
              alt="Test Card"
              fill
              className={`
                object-cover 
                transition-all duration-500
                ${isHovered ? "scale-110 filter-none" : "scale-100 blur-md"}
              `}
            />
            
            {/* Overlay */}
            <div 
              className={`
                absolute inset-0 
                bg-gradient-to-b from-black/90 via-black/70 to-black/90
                transition-opacity duration-300
                ${isHovered ? "opacity-50" : "opacity-90"}
              `}
            />
          </div>

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Icon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                y: isHovered ? 4 : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4"
            >
              <Music className="w-8 h-8 text-white" />
            </motion.div>

            {/* Text Content */}
            <div className="mt-auto">
              <motion.h3
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  y: isHovered ? -4 : 0
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-medium text-white mb-2"
              >
                Test Card
              </motion.h3>
              
              <motion.p
                animate={{
                  y: isHovered ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
                className="text-[#C8A97E] text-base mb-3"
              >
                Hover Test
              </motion.p>

              {/* Expandable Content */}
              <motion.div
                animate={{
                  height: isHovered ? "auto" : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-200 text-sm mb-4">
                  This is a test card to verify hover animations are working correctly.
                </p>
                <ul className="space-y-2">
                  {["Test 1", "Test 2", "Test 3"].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -20
                      }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.1
                      }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                      <span className="text-gray-200 text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 