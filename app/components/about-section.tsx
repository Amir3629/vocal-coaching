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
            <div className="relative w-full h-full">
              <img
                src={process.env.NODE_ENV === 'production' 
                  ? '/vocal-coaching/images/about/profile.jpg'
                  : '/images/about/profile.jpg'}
                alt="Melanie Wainwright"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="section-heading mb-4">Über Mich</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E]"></div>
            
            <div className="text-gray-300 space-y-4">
              <p>
                Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin. Meine musikalische Reise begann früh: vom Kinderchor über den Gospelchor "Crescendo" bis hin zu "Die Männer", einer der ersten Girl Bands in Deutschland. Die Entdeckung von Ella Fitzgerald's "Airmail Special" öffnete mir die Tür zur Welt des Jazz - eine Liebe auf den ersten Blick.
              </p>
              
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
                    <p className="mb-4">
                      Um meiner Leidenschaft eine professionelle Grundlage zu geben, studierte ich Jazzgesang und Pädagogik in Kopenhagen und Köln. Am Complete Vocal Technique Institut schloss ich mein zweites Studium als authorised singer & teacher ab. Seit 2000 arbeite ich als Sängerin und Vocal Coach, mit drei veröffentlichten CDs und zahlreichen Kompositionen im Chanson-Fach.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Internationale Erfahrung</h3>
                    <p className="mb-4">
                      Meine Auftritte führten mich von Tokyo über Belgien und die Niederlande bis nach Österreich. Ich sang in unzähligen Jazzclubs, auf Festivals, Schiffen, Open Air und On Air, in Kirchen und auf Ämtern, in Kneipen und Kulturhäusern, auf Vernissagen und Privatfeiern, Roof Tops, im Zirkus, Pianohäusern und auf Balkonen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Aktuelle Projekte</h3>
                    <p className="mb-4">
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