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
    description: "Zertifizierte Gesangslehrerin nach der Complete Vocal Technique. Abschluss am Complete Vocal Institute in Kopenhagen.",
    logo: "/images/collaborations/cvt-teacher.svg",
    link: "https://completevocal.institute"
  },
  {
    id: 2,
    title: "CVT Deutschland",
    organization: "Complete Vocal Institute Germany",
    year: "2021",
    description: "Aktives Mitglied des deutschen CVT Netzwerks. Vocal Coach bei der Bandleiter Ausbildung in Wiesbaden.",
    logo: "/images/collaborations/cvt-deutschland.svg",
    link: "https://cvtdeutschland.de"
  },
  {
    id: 3,
    title: "Jazz Institut Berlin",
    organization: "Universität der Künste Berlin",
    year: "2019",
    description: "Dozentin für Jazz-Gesang. Teil der internationalen Berliner Jazzszene mit Fokus auf Interpretation & Improvisation.",
    logo: "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de"
  },
  {
    id: 4,
    title: "Berliner Philharmonie",
    organization: "Berliner Philharmoniker",
    year: null,
    description: "Regelmäßige Auftritte und Kooperationen. Professionelle Erfahrung in klassischer und zeitgenössischer Musik.",
    logo: "/images/collaborations/philharmonie.svg",
    link: "https://www.berliner-philharmoniker.de"
  }
]

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
          <h2 className="section-heading mb-4">Qualifikationen & Zertifikate</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="relative h-[280px] perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-500"
                animate={{
                  rotateY: hoveredId === cert.id ? 180 : 0
                }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full bg-black/50 backdrop-blur-sm border border-[#C8A97E]/10 hover:border-[#C8A97E]/30 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300">
                    <div className="relative w-20 h-20 mb-4">
                      <Image
                        src={process.env.NODE_ENV === 'production' ? `/vocal-coaching${cert.logo}` : cert.logo}
                        alt={cert.title}
                        fill
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <h3 className="text-white text-lg font-medium text-center mb-2">{cert.title}</h3>
                    {cert.year && (
                      <p className="text-[#C8A97E] text-sm">{cert.year}</p>
                    )}
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full bg-black/50 backdrop-blur-sm border border-[#C8A97E]/10 hover:border-[#C8A97E]/30 rounded-xl p-6 flex flex-col transition-all duration-300">
                    <h3 className="text-white text-lg font-medium mb-2">{cert.title}</h3>
                    {cert.organization && (
                      <p className="text-[#C8A97E] text-sm mb-3">{cert.organization}</p>
                    )}
                    <p className="text-gray-400 text-sm flex-grow leading-relaxed">{cert.description}</p>
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