"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "./language-switcher"

const collaborations = [
  {
    name: "B-Flat",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/bflat.svg" : "/images/collaborations/bflat.svg",
    link: "https://b-flat-berlin.de"
  },
  {
    name: "Blue Note",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/bluenote.svg" : "/images/collaborations/bluenote.svg",
    link: "https://www.bluenote.net"
  },
  {
    name: "CVT Teacher",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/cvt-teacher.svg" : "/images/collaborations/cvt-teacher.svg",
    link: "https://cvtdeutschland.de/de"
  },
  {
    name: "CVT Deutschland",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/cvt-deutschland.svg" : "/images/collaborations/cvt-deutschland.svg",
    link: "https://cvtdeutschland.de/de"
  },
  {
    name: "Jazz Institut Berlin",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/jib.svg" : "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de"
  },
  {
    name: "Berliner Silber",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/berliner-silber.svg" : "/images/collaborations/berliner-silber.svg",
    link: "http://www.berlinersilber.de"
  },
  {
    name: "Planet Jazz",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/planet-jazz.svg" : "/images/collaborations/planet-jazz.svg",
    link: "https://www.planet-jazz-club-dueren.de"
  },
  {
    name: "BDG",
    logo: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/collaborations/bdg.svg" : "/images/collaborations/bdg.svg",
    link: "https://www.bdg-online.org"
  }
]

export default function Collaborations() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="references" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            {t.references.title}
          </motion.h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-16">
            {/* First Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
              {collaborations.slice(0, 4).map((collab, index) => (
                <motion.a
                  key={collab.name}
                  href={collab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center justify-center p-1 bg-transparent transition-colors group"
                >
                  <div className="relative w-40 h-16">
                    <Image
                      src={collab.logo}
                      alt={collab.name}
                      fill
                      className={`object-contain transition-all duration-500 ${
                        hoveredIndex === index ? "filter-none" : "filter grayscale brightness-200"
                      }`}
                    />
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
              {collaborations.slice(4, 8).map((collab, index) => (
                <motion.a
                  key={collab.name}
                  href={collab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index + 4)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center justify-center p-1 bg-transparent transition-colors group"
                >
                  <div className="relative w-40 h-16">
                    <Image
                      src={collab.logo}
                      alt={collab.name}
                      fill
                      className={`object-contain transition-all duration-500 ${
                        hoveredIndex === index + 4 ? "filter-none" : "filter grayscale brightness-200"
                      }`}
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 