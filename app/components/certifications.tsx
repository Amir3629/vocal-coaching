"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const certifications = [
  {
    id: 1,
    title: "Complete Vocal Technique",
    organization: "Complete Vocal Institute",
    year: "2020",
    description: "Authorized CVT Teacher",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Vocal waves emanating from throat */}
        <path d="M8 12C8 12 10 10 12 10C14 10 16 12 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 12C6 12 9 8 12 8C15 8 18 12 18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M4 12C4 12 8 6 12 6C16 6 20 12 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        {/* Stylized throat/neck shape */}
        <path d="M9 16C9 16 10 18 12 18C14 18 15 16 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    details: [
      "Umfassende Ausbildung in der Complete Vocal Technique",
      "Spezialisierung auf verschiedene Stimmtechniken",
      "Regelmäßige Weiterbildungen",
      "Aktives Mitglied der CVT-Community"
    ]
  },
  {
    id: 2,
    title: "Jazz Performance",
    organization: "Berklee College of Music",
    year: "2018",
    description: "Advanced Jazz Studies",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Musical note with jazz swing */}
        <path d="M8 8C8 8 12 6 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Stylized piano keys */}
        <path d="M6 14H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    details: [
      "Langjährige Erfahrung in der Berliner Jazzszene",
      "Regelmäßige Auftritte in renommierten Clubs",
      "Zusammenarbeit mit internationalen Künstlern",
      "Eigene Jazz-Projekte und Kompositionen"
    ]
  },
  {
    id: 3,
    title: "Vocal Coaching Excellence",
    organization: "Royal Academy of Music",
    year: "2019",
    description: "Professional Certificate",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Teacher and student interaction */}
        <circle cx="8" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
        {/* Connection/teaching lines */}
        <path d="M10 10C10 10 12 8 14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Musical notes */}
        <path d="M6 14L8 16L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 14L16 16L18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    details: [
      "Über 10 Jahre Unterrichtserfahrung",
      "Erfolgreiche Schüler in der Musikbranche",
      "Innovative Lehrmethoden",
      "Individueller Ansatz für jeden Schüler"
    ]
  },
  {
    id: 4,
    title: "Musikpädagogik",
    organization: "Staatliche Musikhochschule",
    year: "2017",
    description: "Staatlich anerkannte Ausbildung",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Book with musical staff */}
        <path d="M6 6H18V18H6V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Musical staff lines */}
        <path d="M8 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Musical note */}
        <circle cx="12" cy="10.5" r="1" fill="currentColor"/>
        <path d="M12 10.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    details: [
      "Fundierte musikpädagogische Ausbildung",
      "Expertise in Musiktheorie und -geschichte",
      "Moderne Unterrichtsmethoden",
      "Kontinuierliche Weiterbildung"
    ]
  }
]

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="certifications" className="relative w-full py-20 bg-black">
      {/* Musical AI Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/musical-ai-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8A97E]/10 via-transparent to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Zertifikate & Mitgliedschaften</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`relative bg-gradient-to-b from-[#0A0A0A]/90 to-[#0A0A0A]/70 backdrop-blur-sm border border-[#C8A97E]/20 group-hover:border-[#C8A97E]/50 rounded-2xl overflow-hidden transition-all duration-500`}
                layout
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div layout className="p-6 flex flex-col items-center">
                  {/* Icon container */}
                  <div className="relative mb-4 transform group-hover:scale-110 transition-all duration-500">
                    <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8A97E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <div className="relative w-20 h-20 text-[#C8A97E] flex items-center justify-center">
                      {cert.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-medium text-center mb-1 text-white/90 group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#C8A97E]/70 group-hover:text-[#C8A97E] text-center transition-colors duration-300">
                    {cert.year}
                  </p>

                  <AnimatePresence>
                    {hoveredId === cert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-6 pt-6 border-t border-[#C8A97E]/20"
                      >
                        <p className="text-sm text-[#C8A97E] font-medium mb-2">{cert.organization}</p>
                        <p className="text-xs text-white/70 mb-4">{cert.description}</p>
                        
                        <ul className="space-y-2">
                          {cert.details.map((detail, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]/50 mt-1.5 flex-shrink-0" />
                              <span className="text-xs text-white/60">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 