"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const collaborations = [
  {
    name: "B-Flat Jazz Club Berlin",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/bflat.svg'
      : '/images/collaborations/bflat.svg',
    link: "https://b-flat-berlin.de",
    isPlaceholder: false
  },
  {
    name: "Complete Vocal Institute Copenhagen",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/cvi.svg'
      : '/images/collaborations/cvi.svg',
    link: "https://completevocal.institute",
    isPlaceholder: false
  },
  {
    name: "Blue Note Tokyo",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/bluenote.svg'
      : '/images/collaborations/bluenote.svg',
    link: "https://www.bluenote.co.jp/tokyo",
    isPlaceholder: false
  },
  {
    name: "Jazz Institut Berlin",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/jib.svg'
      : '/images/collaborations/jib.svg',
    link: "https://www.jazz-institut-berlin.de",
    isPlaceholder: false
  },
  {
    name: "A-Trane Jazz Club",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/atrane.svg'
      : '/images/collaborations/atrane.svg',
    link: "https://www.a-trane.de",
    isPlaceholder: false
  },
  {
    name: "Berliner Philharmonie",
    logo: process.env.NODE_ENV === 'production' 
      ? '/vocal-coaching/images/collaborations/philharmonie.svg'
      : '/images/collaborations/philharmonie.svg',
    link: "https://www.berliner-philharmoniker.de",
    isPlaceholder: false
  }
]

export default function Collaborations() {
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-12 items-center max-w-4xl mx-auto">
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
              {/* Main logo container */}
              <div className="relative w-full aspect-[3/1]">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#C8A97E]/20 blur-2xl rounded-full transform-gpu scale-150" />
                  <div className="absolute inset-0 bg-gradient-radial from-[#C8A97E]/30 via-transparent to-transparent blur-xl" />
                </div>

                {/* Logo image */}
                <Image
                  src={collab.logo}
                  alt={collab.name}
                  fill
                  className={`object-contain ${collab.isPlaceholder ? 'filter invert' : ''} transition-all duration-500 relative z-10`}
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 