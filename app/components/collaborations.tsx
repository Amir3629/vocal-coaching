"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const collaborations = [
  {
    name: "CVT Authorised Teacher",
    logo: "/images/collaborations/cvt-teacher.svg",
    link: "https://completevocal.institute",
    isPlaceholder: false
  },
  {
    name: "CVT Deutschland",
    logo: "/images/collaborations/cvt-deutschland.svg",
    link: "https://cvtdeutschland.de",
    isPlaceholder: false
  },
  {
    name: "B-Flat Jazz Club Berlin",
    logo: "/images/collaborations/bflat.svg",
    link: "https://b-flat-berlin.de",
    isPlaceholder: false
  },
  {
    name: "Jazz Institut Berlin",
    logo: "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de",
    isPlaceholder: false
  },
  {
    name: "Berliner Philharmonie",
    logo: "/images/collaborations/philharmonie.svg",
    link: "https://www.berliner-philharmoniker.de",
    isPlaceholder: false
  }
]

export default function Collaborations() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  const handleImageError = (name: string) => {
    console.error(`Failed to load logo for ${name}`)
    setImageErrors(prev => ({ ...prev, [name]: true }))
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Partner & Kooperationen</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
          {collaborations.map((collab, index) => (
            <motion.a
              key={collab.name}
              href={collab.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-full aspect-[3/2] bg-black/20 rounded-lg p-4">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#C8A97E]/20 blur-2xl rounded-full transform-gpu scale-150" />
                  <div className="absolute inset-0 bg-gradient-radial from-[#C8A97E]/30 via-transparent to-transparent blur-xl" />
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {imageErrors[collab.name] ? (
                      <div className="w-full h-full flex items-center justify-center text-[#C8A97E] text-sm text-center p-2">
                        {collab.name}
                      </div>
                    ) : (
                      <Image
                        src={collab.logo}
                        alt={collab.name}
                        fill
                        className="object-contain transition-all duration-500 relative z-10 invert opacity-70 group-hover:opacity-100 group-hover:brightness-125"
                        sizes="(max-width: 768px) 40vw, 20vw"
                        onError={() => handleImageError(collab.name)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 