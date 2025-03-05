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

const galleryImages: GalleryImage[] = [
  {
    src: "/vocal-coaching-website/images/photo_1_2025-02-27_12-05-55.jpg",
    alt: "Jazz Performance",
    span: "col-span-1 md:col-span-2",
    description: "Live Performance im B-Flat Jazz Club",
    date: "2024",
    location: "Berlin-Mitte"
  },
  {
    src: "/vocal-coaching-website/images/photo_4_2025-02-27_12-05-55.jpg",
    alt: "Studio Session",
    span: "col-span-1",
    description: "Aufnahmesession im Studio",
    date: "2024",
    location: "Recording Studio Berlin"
  },
  {
    src: "/vocal-coaching-website/images/photo_8_2025-02-27_12-05-55.jpg",
    alt: "Live Concert",
    span: "col-span-1",
    description: "Jazz Festival Auftritt",
    date: "2023",
    location: "Jazztage Berlin"
  },
  {
    src: "/vocal-coaching-website/images/photo_12_2025-02-27_12-05-55.jpg",
    alt: "Teaching Session",
    span: "col-span-1 md:col-span-2",
    description: "Gesangsunterricht & Workshop",
    date: "2024",
    location: "Vocal Studio"
  },
  {
    src: "/vocal-coaching-website/images/photo_5_2025-02-27_12-05-55.jpg",
    alt: "Piano Performance",
    span: "col-span-1 md:col-span-2",
    description: "Piano & Vocal Performance",
    date: "2023",
    location: "Jazz Club Berlin"
  },
  {
    src: "/vocal-coaching-website/images/photo_15_2025-02-27_12-05-55.jpg",
    alt: "Stage Performance",
    span: "col-span-1 md:col-span-2",
    description: "Live Konzert mit Band",
    date: "2024",
    location: "Konzerthaus Berlin"
  },
  {
    src: "/vocal-coaching-website/images/photo_3_2025-02-23_22-12-02.jpg",
    alt: "Vocal Workshop",
    span: "col-span-1",
    description: "Vocal Workshop Session",
    date: "2024",
    location: "Studio Berlin"
  },
  {
    src: "/vocal-coaching-website/images/photo_4_2025-02-23_22-12-02.jpg",
    alt: "Jazz Club",
    span: "col-span-1",
    description: "Jazz Club Performance",
    date: "2024",
    location: "A-Trane Berlin"
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
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedImage(galleryImages[nextIndex])
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src)
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedImage(galleryImages[prevIndex])
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="gallery" className="relative py-20 bg-[#0A0A0A]">
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
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              className={`relative cursor-pointer group ${image.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleImageClick(image)}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-lg font-medium">{image.description}</p>
                  <p className="text-[#C8A97E] text-sm mt-1">{image.date} • {image.location}</p>
                </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
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
              className="relative max-w-[90vw] max-h-[85vh] rounded-lg overflow-hidden"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className={`object-contain transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-white text-xl font-medium">{selectedImage.description}</p>
                <p className="text-[#C8A97E] text-sm mt-2">{selectedImage.date} • {selectedImage.location}</p>
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                <button
                  onClick={handlePrev}
                  className="group relative w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/90 transition-all duration-200 hover:bg-black/60 hover:border-white/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C8A97E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="group relative w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/90 transition-all duration-200 hover:bg-black/60 hover:border-white/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-l from-[#C8A97E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 