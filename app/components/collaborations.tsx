"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const collaborations = [
  {
    name: "CVT Authorised Teacher",
    logo: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/collaborations/cvt-teacher.svg"
      : "/images/collaborations/cvt-teacher.svg",
    link: "https://completevocal.institute",
    isPlaceholder: false
  },
  {
    name: "CVT Deutschland",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/cvt-deutschland.svg"
      : "/images/collaborations/cvt-deutschland.svg",
    link: "https://cvtdeutschland.de",
    isPlaceholder: false
  },
  {
    name: "B-Flat Jazz Club Berlin",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/bflat.svg"
      : "/images/collaborations/bflat.svg",
    link: "https://b-flat-berlin.de",
    isPlaceholder: false
  },
  {
    name: "Jazz Institut Berlin",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/jib.svg"
      : "/images/collaborations/jib.svg",
    link: "https://www.jazz-institut-berlin.de",
    isPlaceholder: false
  },
  {
    name: "Berliner Philharmonie",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/philharmonie.svg"
      : "/images/collaborations/philharmonie.svg",
    link: "https://www.berliner-philharmoniker.de",
    isPlaceholder: false
  }
]

export default function Collaborations() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({})
  const imageRefs = useRef<{[key: string]: HTMLImageElement | null}>({})

  const handleImageError = (name: string) => {
    console.error(`Failed to load logo for ${name}`)
    console.error('Current image path:', collaborations.find(c => c.name === name)?.logo)
    setImageErrors(prev => ({ ...prev, [name]: true }))
  }

  const handleImageLoad = (name: string) => {
    console.log(`Successfully loaded logo for ${name}`)
    setLoadedImages(prev => ({ ...prev, [name]: true }))
    
    // Debug: Log computed styles
    const img = imageRefs.current[name]
    if (img) {
      const styles = window.getComputedStyle(img)
      console.log(`Styles for ${name}:`, {
        fill: styles.fill,
        color: styles.color,
        filter: styles.filter,
        opacity: styles.opacity
      })
    }
  }

  useEffect(() => {
    // Debug logging
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Base Path:', process.env.NEXT_PUBLIC_BASE_PATH)
    
    collaborations.forEach(collab => {
      console.log(`${collab.name} logo path:`, collab.logo)
    })

    // Check if images are cached
    collaborations.forEach(collab => {
      const img = new Image()
      img.src = collab.logo
      img.onload = () => console.log(`${collab.name} logo is cached`)
      img.onerror = () => console.log(`${collab.name} logo is not cached or failed to load`)
    })
  }, [])

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

        {/* Debug info */}
        <div className="text-white text-xs mb-4 opacity-50">
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Loaded images: {Object.keys(loadedImages).filter(k => loadedImages[k]).length}</p>
          <p>Error images: {Object.keys(imageErrors).filter(k => imageErrors[k]).length}</p>
        </div>

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
                        <br />
                        <span className="text-xs opacity-50">Failed to load</span>
                      </div>
                    ) : (
                      <div className="text-white [&_svg]:text-white [&_svg]:fill-white [&_svg]:stroke-white">
                        <Image
                          ref={el => imageRefs.current[collab.name] = el}
                          src={collab.logo}
                          alt={collab.name}
                          fill
                          className="object-contain transition-all duration-500 relative z-10 opacity-70 group-hover:opacity-100 group-hover:brightness-125"
                          sizes="(max-width: 768px) 40vw, 20vw"
                          onError={() => handleImageError(collab.name)}
                          onLoad={() => handleImageLoad(collab.name)}
                        />
                      </div>
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