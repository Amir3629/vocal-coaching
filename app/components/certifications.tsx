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
              transition={{ delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className={`w-full transition-all duration-500 ease-in-out ${
                  hoveredId === card.id ? "h-[420px]" : "h-[320px]"
                }`}
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  {/* Background Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={card.bgImage}
                      alt={card.title}
                      fill
                      className={`object-cover transition-all duration-500 ${
                        hoveredId === card.id ? "scale-110 blur-none" : "scale-100 blur-[6px]"
                      }`}
                    />
                    {/* Dark Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 transition-opacity duration-500 ${
                        hoveredId === card.id ? "opacity-60" : "opacity-80"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col">
                    {/* Icon */}
                    <div className="absolute top-4 left-4">
                      <div className={`transition-transform duration-500 ${
                        hoveredId === card.id ? "scale-110 translate-y-1" : ""
                      }`}>
                        {card.icon}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-auto">
                      <h3 className="text-2xl font-medium text-white mb-2">{card.title}</h3>
                      <p className="text-[#C8A97E] text-base mb-3">{card.subtitle}</p>
                      
                      {/* Description - Only show on hover */}
                      <div className={`overflow-hidden transition-all duration-500 ${
                        hoveredId === card.id ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        <p className="text-gray-200 text-sm mb-4">{card.description}</p>
                        <ul className="space-y-2">
                          {card.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: hoveredId === card.id ? 1 : 0,
                                x: hoveredId === card.id ? 0 : -20
                              }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
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