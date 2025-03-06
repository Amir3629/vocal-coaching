"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GalleryImage {
  src: string
  alt: string
  span: string
  description: string
  date: string
  location: string
}

const images: GalleryImage[] = [
  {
    src: '/vocal-coaching/images/gallery/performance1.jpg',
    alt: "Live Performance im B-Flat Jazz Club",
    span: "col-span-1 md:col-span-2",
    description: "Live Performance im B-Flat Jazz Club",
    date: "2024",
    location: "Berlin-Mitte"
  },
  {
    src: '/vocal-coaching/images/gallery/performance2.jpg',
    alt: "Aufnahmesession im Studio",
    span: "col-span-1",
    description: "Aufnahmesession im Studio",
    date: "2024",
    location: "Recording Studio Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance3.jpg',
    alt: "Live Concert",
    span: "col-span-1",
    description: "Jazz Festival Auftritt",
    date: "2023",
    location: "Jazztage Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance4.jpg',
    alt: "Teaching Session",
    span: "col-span-1 md:col-span-2",
    description: "Gesangsunterricht & Workshop",
    date: "2024",
    location: "Vocal Studio"
  },
  {
    src: '/vocal-coaching/images/gallery/performance5.jpg',
    alt: "Piano Performance",
    span: "col-span-1 md:col-span-2",
    description: "Piano & Vocal Performance",
    date: "2023",
    location: "Jazz Club Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance6.jpg',
    alt: "Stage Performance",
    span: "col-span-1 md:col-span-2",
    description: "Live Konzert mit Band",
    date: "2024",
    location: "Konzerthaus Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance7.jpg',
    alt: "Vocal Workshop",
    span: "col-span-1",
    description: "Vocal Workshop Session",
    date: "2024",
    location: "Studio Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance8.jpg',
    alt: "Jazz Club",
    span: "col-span-1",
    description: "Jazz Club Performance",
    date: "2024",
    location: "A-Trane Berlin"
  },
  {
    src: '/vocal-coaching/images/gallery/performance9.jpg',
    alt: "Concert Performance",
    span: "col-span-1 md:col-span-2",
    description: "Jazz Concert Evening",
    date: "2024",
    location: "Philharmonie Berlin"
  }
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const nextIndex = (currentIndex + 1) % images.length
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedImage(images[nextIndex])
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedImage(images[prevIndex])
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="gallery" className="relative py-20 bg-[#000000]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Galerie</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              className={`relative cursor-pointer group ${image.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleImageClick(image)}
            >
              <div className="relative aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ 
              opacity: 1,
              backdropFilter: "blur(20px)",
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
            exit={{ 
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/90"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              exit={{ 
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[80vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-transparent">
                <p className="text-white text-xl font-medium">{selectedImage.description}</p>
                <p className="text-[#C8A97E] text-sm mt-2">{selectedImage.date} • {selectedImage.location}</p>
              </div>
            </motion.div>

            {/* Navigation buttons - Outside the image frame */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handlePrev(e)}
              className="fixed left-8 top-1/2 -translate-y-1/2 z-50 bg-[#C8A97E] hover:bg-[#B89A6F] text-black p-3 rounded-full transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNext(e)}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-50 bg-[#C8A97E] hover:bg-[#B89A6F] text-black p-3 rounded-full transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 