"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Music, Heart, Star, Mic } from "lucide-react"

const journeyCards = [
  {
    id: 1,
    title: "Singen",
    subtitle: "Die Magie des Jazz",
    icon: <Music className="w-8 h-8 text-white transition-all duration-500 transform group-hover:scale-110 group-hover:translate-y-1" />,
    description: "Von Ella Fitzgerald inspiriert bis zur modernen Jazz-Szene. Entdecken Sie die Faszination der Improvisation und des individuellen Ausdrucks.",
    details: [
      "Persönlicher Ausdruck",
      "Kreative Freiheit",
      "Rhythmische Präzision",
      "Harmonisches Verständnis"
    ],
    year: "Lebenslange Reise",
    bgImage: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/singing.jpg" : "/images/cards/singing.jpg"
  },
  {
    id: 2,
    title: "Meine Methodik",
    subtitle: "Individueller Ansatz",
    icon: <Heart className="w-6 h-6 text-[#C8A97E]" />,
    description: "Jede Stimme ist einzigartig. Mein Unterricht passt sich Ihrem Stil und Ihren Zielen an, mit Fokus auf gesunde Stimmtechnik und authentischen Ausdruck.",
    details: [
      "Maßgeschneiderte Übungen",
      "Gesunde Stimmtechnik",
      "Emotionale Verbindung",
      "Stilistische Vielfalt"
    ],
    year: "Ihre Entwicklung",
    bgImage: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/methodik.jpg" : "/images/cards/methodik.jpg"
  },
  {
    id: 3,
    title: "Unser Weg",
    subtitle: "Gemeinsames Wachstum",
    icon: <Star className="w-6 h-6 text-[#C8A97E]" />,
    description: "Von den Grundlagen bis zur Bühnenreife. Entwickeln Sie Ihre Stimme, Ihr Selbstvertrauen und Ihre künstlerische Identität in einem unterstützenden Umfeld.",
    details: [
      "Atmung & Stütze",
      "Klangentfaltung",
      "Bühnenpräsenz",
      "Repertoire-Aufbau"
    ],
    year: "Ihr Tempo",
    bgImage: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/weg.jpg" : "/images/cards/weg.jpg"
  },
  {
    id: 4,
    title: "Warum Jazz?",
    subtitle: "Die Freiheit der Musik",
    icon: <Mic className="w-6 h-6 text-[#C8A97E]" />,
    description: "Jazz ist mehr als Musik - es ist die Kunst der Kommunikation, der Spontaneität und des Ausdrucks. Entdecken Sie Ihre eigene Stimme in dieser reichhaltigen Tradition.",
    details: [
      "Musikalischer Dialog",
      "Spontane Kreativität",
      "Stilistische Breite",
      "Künstlerische Freiheit"
    ],
    year: "Zeitlose Kunst",
    bgImage: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/warum-jazz.jpg" : "/images/cards/warum-jazz.jpg"
  }
]

export default function JourneyShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-6">
            Vocal Excellence
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeyCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#C8A97E]/10"
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className={`relative w-full transition-all duration-500 ease-out ${
                  hoveredId === card.id ? "h-[420px]" : "h-[320px]"
                }`}
                style={{
                  transformOrigin: "center top",
                  willChange: "transform, height"
                }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  {/* Background Image */}
                  <div className="relative w-full h-full transform transition-all duration-500 ease-out">
                    <Image
                      src={card.bgImage}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={`object-cover transition-all duration-500 ease-out will-change-transform ${
                        hoveredId === card.id ? "scale-110 blur-0" : "scale-100 blur-md"
                      }`}
                      priority
                    />
                    {/* Dark Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 transition-all duration-500 ease-out ${
                        hoveredId === card.id ? "opacity-50" : "opacity-90"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col">
                    {/* Icon */}
                    <div className="absolute top-4 left-4 z-10">
                      <motion.div
                        animate={{
                          scale: hoveredId === card.id ? 1.2 : 1,
                          y: hoveredId === card.id ? 4 : 0
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                      >
                        {card.icon}
                      </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-auto">
                      <motion.h3 
                        className="text-2xl font-medium text-white mb-2 drop-shadow-lg"
                        animate={{
                          scale: hoveredId === card.id ? 1.1 : 1,
                          y: hoveredId === card.id ? -4 : 0
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p 
                        className="text-[#C8A97E] text-base mb-3"
                        animate={{
                          y: hoveredId === card.id ? -2 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.subtitle}
                      </motion.p>
                      
                      {/* Description - Only show on hover */}
                      <motion.div 
                        className="overflow-hidden"
                        animate={{
                          height: hoveredId === card.id ? "auto" : 0,
                          opacity: hoveredId === card.id ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.5,
                          ease: "easeOut"
                        }}
                      >
                        <motion.p 
                          className="text-gray-200 text-sm mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: hoveredId === card.id ? 1 : 0,
                            y: hoveredId === card.id ? 0 : 10
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {card.description}
                        </motion.p>
                        <ul className="space-y-2">
                          {card.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: hoveredId === card.id ? 1 : 0,
                                x: hoveredId === card.id ? 0 : -20
                              }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.2 + idx * 0.1,
                                ease: "easeOut"
                              }}
                              className="flex items-center gap-2"
                            >
                              <motion.div 
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
                                animate={{
                                  scale: hoveredId === card.id ? 1.2 : 1
                                }}
                                transition={{ duration: 0.2 }}
                              />
                              <span className="text-gray-200 text-sm">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Book Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#C8A97E] text-black px-10 py-4 rounded-full font-medium text-lg transition-colors hover:bg-[#D4B88F]"
          >
            Jetzt Buchen
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 