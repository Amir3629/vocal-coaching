"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "./language-switcher"

const collaborations = [
  {
    name: "B-Flat",
    logo: "/images/collaborations/bflat.svg",
    link: "https://b-flat-berlin.de"
  },
  {
    name: "Blue Note",
    logo: "/images/collaborations/bluenote.svg",
    link: "https://www.bluenote.net"
  },
  {
    name: "CVT Teacher",
    logo: "/images/collaborations/cvt-teacher.svg",
    link: "https://completevocalinstitute.com"
  },
  {
    name: "CVT Deutschland",
    logo: "/images/collaborations/cvt-deutschland.svg",
    link: "https://completevocaltechnique.de"
  },
  {
    name: "Jazz Institut Berlin",
    logo: "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de"
  },
  {
    name: "Berliner Philharmonie",
    logo: "/images/collaborations/philharmonie.svg",
    link: "https://www.berliner-philharmoniker.de"
  },
  {
    name: "Berliner Silber",
    logo: "/images/collaborations/berliner-silber.svg",
    link: "https://www.berliner-silber.de"
  },
  {
    name: "Planet Jazz",
    logo: "/images/collaborations/planet-jazz.svg",
    link: "https://www.planet-jazz.de"
  },
  {
    name: "BDG",
    logo: "/images/collaborations/bdg.svg",
    link: "https://www.bdg-online.org"
  },
  {
    name: "Berlin Music Scene",
    logo: "/images/collaborations/berlin-music.svg",
    link: "https://www.berlin-music-scene.de"
  }
]

export default function Collaborations() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="references" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          {t.references.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {collaborations.map((collab, index) => (
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
              className="relative aspect-[3/1] flex items-center justify-center p-4 bg-[#1A1A1A] rounded-lg border border-white/5 hover:border-[#C8A97E]/20 transition-colors group"
            >
              <div className="relative w-full h-full">
                <Image
                  src={collab.logo}
                  alt={collab.name}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    hoveredIndex === index ? "filter brightness-125" : ""
                  }`}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 