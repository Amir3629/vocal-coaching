"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import StatsSection from './stats-section'

export default function AboutSection() {
  const [showMore, setShowMore] = useState(false)
  const [imageError, setImageError] = useState(false)

  const imagePath = process.env.NODE_ENV === 'production'
    ? "/vocal-coaching/images/about/profile.jpg"
    : "/images/about/profile.jpg"

  return (
    <section id="about" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none bg-[#0A0A0A] rounded-xl overflow-hidden">
              <Image
                src={imagePath}
                alt="Melanie Wainwright"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority
                onError={() => {
                  console.error('Error loading about image:', imagePath);
                  setImageError(true);
                }}
              />
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#040202]/80 text-[#C8A97E]">
                  <p className="text-center px-4">Bild konnte nicht geladen werden</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h2 className="section-heading mb-6">Über Mich</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E] mx-0 mb-6"></div>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-300">
                Halb Britin, halb Deutsche, mit rheinischer Lebensfreude und Berliner Weltgewandtheit: Ich verkörpere eine einzigartige Synthese aus Tradition und Avantgarde. Meine musikalische Reise begann in sakralen Kirchenchören und dem gefeierten Gospelensemble Crescendo, bevor ich mit 15 als Frontfrau der Pionier-Girl-Band Die Männer die Rockbühne eroberte – stets mit perfekt gesetztem Cat-Eye und der Überzeugung: „Stil ist Haltung."
              </p>
              
              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="prose prose-lg text-gray-300 mb-6">
                      <p className="text-base sm:text-lg text-gray-300">
                        Mein Weg führte mich an die Hochschule für Musik und Tanz Köln und das Complete Vocal Institute in Kopenhagen – Stationen, an denen ich nicht nur Jazzgesang, sondern die Philosophie des perfekten Moments studierte. Heute stehe ich auf internationalen Festivalbühnen (von Tokios Blue Note bis zum Montreux Jazz Festival), gebe Masterclasses für angehende Bandleader in Wiesbaden und leite einen Chor, der Präzision mit Seele vereint.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Diskografie & Aktuelle Projekte</h3>
                        <p className="text-base sm:text-lg text-gray-300">
                          Drei Alben, drei Kapitel einer künstlerischen Evolution: Von jazzigen Grooves bis zum Chanson-Projekt Berliner Silber 9½ Lieder – eine Hommage an Berlins glamouröse Nachtseite, produziert mit der Sorgfalt eines Couturiers. Das vierte Album? Ein opulentes Werk, das Standards in Samt und Seide hüllt und Eigenkompositionen präsentiert, die zwischen Sylvia Plath und Billie Holiday tanzen. Ob im intimsten Jazzkeller oder im Festsaal historischer Konzerthäuser – ich betrete jede Bühne mit dem Respekt, den die Musik verdient: „Jazz ist die höchste Form musikalischer Diplomatie – sie verhandelt zwischen Chaos und Perfektion."
                        </p>
                      </div>
                    </div>
                    
                    <StatsSection />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowMore(!showMore)}
                className="btn-primary mt-4"
              >
                {showMore ? "Weniger anzeigen" : "Mehr erfahren"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 