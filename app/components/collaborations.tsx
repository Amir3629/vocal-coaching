"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useContext } from "react"
import { LanguageContext } from "./language-switcher"
import { translations } from "../translations"

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
    name: "Berliner Silber",
    logo: "/images/collaborations/berliner-silber.svg",
    link: "http://www.berlinersilber.de",
    isPlaceholder: false
  },
  {
    name: "Planet Jazz Club Düren",
    logo: "/images/collaborations/planet-jazz.svg",
    link: "https://www.planet-jazz-club-dueren.de",
    isPlaceholder: false
  },
  {
    name: "BDG Pädagogen",
    logo: "/images/collaborations/bdg.svg",
    link: "https://bdg-online.org",
    isPlaceholder: false
  },
  {
    name: "Berlin Music Scene",
    logo: "/images/collaborations/berlin-music.svg",
    link: "https://www.berlin.de/kultur-und-tickets/musik/",
    isPlaceholder: false
  },
  {
    name: "Blue Note Tokyo",
    logo: "/images/collaborations/bluenote.svg",
    link: "https://www.bluenote.co.jp/tokyo/",
    isPlaceholder: false
  }
]

export default function Collaborations() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})
  const { currentLang } = useContext(LanguageContext) || { currentLang: 'DE' }
  const t = translations[currentLang]

  const sectionTitle = t.partners.title

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
          <h2 className="section-heading mb-4">{sectionTitle}</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {collaborations.map((collab) => (
            <motion.a
              key={collab.name}
              href={collab.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={process.env.NODE_ENV === 'production' 
                  ? `/vocal-coaching${collab.logo}`
                  : collab.logo}
                alt={collab.name}
                width={120}
                height={40}
                className="w-[120px] h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 