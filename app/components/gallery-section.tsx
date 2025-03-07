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
    <section id="gallery" className="relative py-12 md:py-20 bg-[#000000]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Galerie</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 mobile-hardware-accelerate"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 6 ? "eager" : "lazy"}
                  quality={75}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <p className="text-sm md:text-base font-medium">{image.description}</p>
                    <p className="text-xs md:text-sm text-gray-300 mt-1">{image.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95">
            {selectedImage && (
              <div className="relative w-full h-full">
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    onClick={() => setSelectedImage(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors mobile-touch-target"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="absolute inset-y-0 left-4 flex items-center z-10">
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors mobile-touch-target"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="absolute inset-y-0 right-4 flex items-center z-10">
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors mobile-touch-target"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage.src}
                    initial={{ opacity: 0, x: isTransitioning ? 100 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isTransitioning ? -100 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.3
                    }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        className="object-contain mobile-hardware-accelerate"
                        quality={90}
                        priority
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                      >
                        <p className="text-white text-lg font-medium">{selectedImage.description}</p>
                        <p className="text-gray-300 text-sm mt-1">{selectedImage.location} - {selectedImage.date}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
} 