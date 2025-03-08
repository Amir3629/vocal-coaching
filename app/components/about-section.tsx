"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none"
          >
            <Image
              src="/images/about/melanie.jpg"
              alt="Melanie Wainwright"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
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
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Über Mich</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E]"></div>
            
            <div className="text-gray-300 space-y-4">
              <p className="text-base sm:text-lg">
                Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin. Meine musikalische Reise begann früh: vom Kinderchor über den Gospelchor "Crescendo" bis hin zu "Die Männer", einer der ersten Girl Bands in Deutschland. Die Entdeckung von Ella Fitzgerald's "Airmail Special" öffnete mir die Tür zur Welt des Jazz - eine Liebe auf den ersten Blick.
              </p>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <p className="text-base sm:text-lg">
                    Nach meinem Studium an der Hochschule für Musik und Tanz Köln vertiefte ich meine Kenntnisse in Jazz-Gesang und Improvisation. Die Zusammenarbeit mit renommierten Künstlern und Bands erweiterte meinen musikalischen Horizont und formte meinen einzigartigen Stil.
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Aktuelle Projekte</h3>
                    <p className="text-base sm:text-lg">
                      Als stolzes Mitglied der internationalen Berliner Jazzszene bin ich nicht nur als Sängerin aktiv, sondern auch als Vocal Coach bei der Bandleiter Ausbildung in Wiesbaden tätig. Meine vierte CD ist fertig und wartet auf das Start Signal - mit schönen Standards in bunte Farben getaucht und Originals mit eigenen Texten.
                    </p>
                  </div>
                </motion.div>
              )}
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