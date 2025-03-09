"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

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
              <div className="relative w-full aspect-[3/2] bg-transparent rounded-lg p-4">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#C8A97E]/10 blur-2xl rounded-full transform-gpu scale-150" />
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  {imageErrors[collab.name] ? (
                    <div className="w-full h-full flex items-center justify-center text-[#C8A97E] text-sm text-center p-2">
                      {collab.name}
                    </div>
                  ) : (
                    <Image
                      src={process.env.NODE_ENV === 'production' 
                        ? `/vocal-coaching${collab.logo}`
                        : collab.logo}
                      alt={collab.name}
                      width={200}
                      height={100}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
                      onError={() => setImageErrors(prev => ({ ...prev, [collab.name]: true }))}
                    />
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 