"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const certifications = [
  {
    id: 1,
    title: "CVT Authorised Teacher",
    organization: "Complete Vocal Institute",
    year: "2020",
    description: "Zertifizierte Gesangslehrerin nach der Complete Vocal Technique",
    logo: "/images/collaborations/cvt-teacher.svg",
    link: "https://completevocal.institute"
  },
  {
    id: 2,
    title: "CVT Deutschland",
    organization: "Complete Vocal Institute Germany",
    year: "2021",
    description: "Aktives Mitglied des deutschen CVT Netzwerks",
    logo: "/images/collaborations/cvt-deutschland.svg",
    link: "https://cvtdeutschland.de"
  },
  {
    id: 3,
    title: "Jazz Institut Berlin",
    organization: "Universität der Künste Berlin",
    year: "2019",
    description: "Dozentin für Jazz-Gesang",
    logo: "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de"
  },
  {
    id: 4,
    title: "Berliner Philharmonie",
    organization: "Berliner Philharmoniker",
    year: null,
    description: "Regelmäßige Auftritte und Kooperationen",
    logo: "/images/collaborations/philharmonie.svg",
    link: "https://www.berliner-philharmoniker.de"
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
              className="relative group perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => handleInteractionStart(cert.id)}
              onMouseLeave={handleInteractionEnd}
              onTouchStart={() => handleInteractionStart(cert.id)}
              onTouchEnd={handleInteractionEnd}
            >
              <motion.div
                className="relative preserve-3d w-full h-full transition-all duration-700 ease-out"
                animate={{
                  rotateY: (hoveredId === cert.id || touchedId === cert.id) ? 180 : 0
                }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full bg-black/50 backdrop-blur-sm border border-[#C8A97E]/10 rounded-xl p-6 flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={process.env.NODE_ENV === 'production' ? `/vocal-coaching${cert.logo}` : cert.logo}
                        alt={cert.title}
                        fill
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <h3 className="text-white text-lg mb-2 text-center">{cert.title}</h3>
                    {cert.year && (
                      <p className="text-[#C8A97E] text-sm">{cert.year}</p>
                    )}
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full bg-black/50 backdrop-blur-sm border border-[#C8A97E]/10 rounded-xl p-6 flex flex-col">
                    <h3 className="text-white text-lg mb-2">{cert.title}</h3>
                    {cert.organization && (
                      <p className="text-[#C8A97E] text-sm mb-4">{cert.organization}</p>
                    )}
                    <p className="text-gray-400 text-sm flex-grow">{cert.description}</p>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm text-[#C8A97E] hover:text-[#B69A6E] transition-colors flex items-center gap-2"
                    >
                      Mehr erfahren
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 