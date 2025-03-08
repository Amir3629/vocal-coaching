"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const certifications = [
  {
    id: 1,
    title: "CVT Authorised Teacher",
    year: "2020",
    organization: null
  },
  {
    id: 2,
    title: "CVT Deutschland",
    year: "2021",
    organization: null
  },
  {
    id: 3,
    title: "Jazz Institut Berlin",
    year: "2019",
    organization: null
  },
  {
    id: 4,
    title: "Berliner Philharmonie",
    year: null,
    organization: "Berliner Philharmoniker"
  }
]

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [touchedId, setTouchedId] = useState<number | null>(null)

  const handleInteractionStart = (id: number) => {
    setHoveredId(id)
    setTouchedId(id)
  }

  const handleInteractionEnd = () => {
    setHoveredId(null)
    setTouchedId(null)
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
          <h2 className="section-heading mb-4">Zertifikate & Mitgliedschaften</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/50 backdrop-blur-sm border border-[#C8A97E]/10 group-hover:border-[#C8A97E]/30 rounded-xl p-6 transition-all duration-500">
                <div className="text-center">
                  <h3 className="text-white text-lg mb-2">{cert.title}</h3>
                  {cert.year && (
                    <p className="text-[#C8A97E] text-sm">{cert.year}</p>
                  )}
                  {cert.organization && (
                    <p className="text-[#C8A97E] text-sm">{cert.organization}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 