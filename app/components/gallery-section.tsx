"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

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
  const [nextImage, setNextImage] = useState<GalleryImage | null>(null)

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const handleClose = () => {
    setSelectedImage(null)
    setNextImage(null)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage || isTransitioning) return
    
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const nextIndex = (currentIndex + 1) % images.length
    setIsTransitioning(true)
    setNextImage(images[nextIndex])
    
    setTimeout(() => {
      setSelectedImage(images[nextIndex])
      setNextImage(null)
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage || isTransitioning) return
    
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setIsTransitioning(true)
    setNextImage(images[prevIndex])
    
    setTimeout(() => {
      setSelectedImage(images[prevIndex])
      setNextImage(null)
      setIsTransitioning(false)
    }, 300)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return
    if (e.key === 'ArrowRight') handleNext(e as unknown as React.MouseEvent)
    if (e.key === 'ArrowLeft') handlePrev(e as unknown as React.MouseEvent)
    if (e.key === 'Escape') handleClose()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-base font-medium mb-1 line-clamp-1">{image.alt}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#040202]/95 backdrop-blur-sm"
            onClick={handleClose}
          >
            <div className="h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage.src}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative aspect-[4/3] w-full overflow-hidden"
                    style={{ borderRadius: '24px' }}
                  >
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                      style={{ borderRadius: '24px' }}
                      sizes="90vw"
                      quality={90}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {nextImage && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Image
                      src={nextImage.src}
                      alt={nextImage.alt}
                      fill
                      className="object-contain opacity-0"
                      sizes="90vw"
                      quality={90}
                      priority
                    />
                  </div>
                )}

                <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-[#040202]/90 via-[#040202]/60 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-[80%]"
                  >
                    <h3 className="text-white text-base sm:text-lg font-medium mb-1">{selectedImage.alt}</h3>
                    <p className="text-[#C8A97E] text-sm">{selectedImage.description}</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed top-1/2 right-4 z-50 p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-white transform -translate-y-1/2 transition-colors"
              onClick={handleNext}
              disabled={isTransitioning}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed top-1/2 left-4 z-50 p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-white transform -translate-y-1/2 transition-colors"
              onClick={handlePrev}
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-white transition-colors"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
} 