"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const imagePath = process.env.NODE_ENV === 'production'
    ? "/vocal-coaching/images/about/profile.jpg"
    : "/images/about/profile.jpg"

  return (
    <section className="py-20 bg-[#040202]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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

          <div className="max-w-xl mx-auto lg:mx-0">
            <h2 className="section-heading mb-6">Über Mich</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E] mx-0 mb-6"></div>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-300">
                Halb Britin, halb Deutsche, mit einem rheinischen Herzschlag und Berliner Freiheitsdrang: Ich bin ein Kind zweier Welten, das seine Heimat im Jazz gefunden hat. Aufgewachsen zwischen Kirchenchören und dem Gospelkollektiv Crescendo, stürzte ich mich mit 15 als Frontfrau der Girl-Band "Die Männer" in die Punkrock-Szene. Dann traf mich Ella Fitzgeralds "Airmail Special" wie ein Blitz - Jazz wurde meine Sprache, meine Rebellion, meine Wahrheit.
              </p>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <p className="text-base sm:text-lg text-gray-300">
                      Studiert habe ich an der Hochschule für Musik und Tanz Köln und am Complete Vocal Institute in Kopenhagen – Jazzgesang, Improvisation, und die Kunst, Bier und Austern als Inspirationsquellen zu zelebrieren. Heute bin ich nicht nur auf Bühnen zu Hause (von Tokio bis Brüssel, von Dachterrassen bis Zirkuszelten), sondern auch als Dozentin für Bandleader in Wiesbaden.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Aktuelle Projekte</h3>
                      <p className="text-base sm:text-lg text-gray-300">
                        Drei Alben habe ich veröffentlicht – Jazz, Groove, und einen Ausflug ins Chanson-Fach mit "Berliner Silber 9½ Lieder". Das vierte Album wartet hinter den Kulissen: ein Mix aus zeitlosen Standards in neuen Farben und persönlichen Eigenkompositionen. Als Teil der pulsierenden Berliner Jazzszene leite ich nebenbei einen Chor, denn Harmonie braucht auch außerhalb der Musik Raum. Mein Credo bleibt: "Jazz ist kein Genre. Es ist eine Haltung. Hör hin, riskier was, und vergiss nie den Groove."
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#C8A97E] hover:text-[#B69A6E] text-sm font-medium inline-flex items-center gap-1 transition-colors duration-300"
              >
                {isExpanded ? "Weniger anzeigen" : "Mehr erfahren"}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 