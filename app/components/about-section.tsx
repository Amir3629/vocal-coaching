"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="about" className="relative w-full bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <Image
              src="/vocal-coaching-website/images/about/profile.jpg"
              alt="Melanie Wainwright"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-light tracking-wide text-white">Über Mich</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E]"></div>
            
            <div className="text-gray-300 space-y-4">
              <p>
                Als leidenschaftliche Jazzsängerin und erfahrene Gesangslehrerin widme ich mich der Entwicklung und Förderung von Stimmen. Mit meiner Expertise in der Complete Vocal Technique (CVT) und jahrelanger Erfahrung in der Berliner Jazzszene biete ich einen einzigartigen und effektiven Ansatz im Gesangsunterricht.
              </p>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Ausbildung & Expertise</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Zertifizierte Complete Vocal Technique Lehrerin</li>
                        <li>Jahrelange Erfahrung in der Berliner Jazzszene</li>
                        <li>Spezialisierung auf Jazz-Gesang und Improvisation</li>
                        <li>Regelmäßige Weiterbildungen und Workshops</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Unterrichtsmethode</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Individuell angepasster Unterricht</li>
                        <li>Fokus auf gesunde Stimmtechnik</li>
                        <li>Integration von Theorie und Praxis</li>
                        <li>Entwicklung persönlicher Ausdrucksweise</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Auftritte & Projekte</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Regelmäßige Auftritte im B-Flat Jazz Club</li>
                        <li>Chorleiterin bei "Chor Next Door"</li>
                        <li>Zusammenarbeit mit diversen Jazzbands</li>
                        <li>Workshop-Leiterin für Vokalimprovisation</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#C8A97E] hover:text-[#B69A6E] text-sm font-medium transition-colors duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isExpanded ? (
                <>
                  Weniger anzeigen
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Mehr erfahren
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 