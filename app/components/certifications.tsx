"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Music, Heart, Star, Mic } from "lucide-react"

const journeyCards = [
  {
    id: 1,
    title: "Jazz Journey",
    subtitle: "Die Magie des Jazz",
    icon: <Music className="w-6 h-6 text-[#C8A97E]" />,
    description: "Von Ella Fitzgerald inspiriert bis zur modernen Jazz-Szene. Entdecken Sie die Faszination der Improvisation und des individuellen Ausdrucks.",
    details: [
      "Persönlicher Ausdruck",
      "Kreative Freiheit",
      "Rhythmische Präzision",
      "Harmonisches Verständnis"
    ],
    year: "Lebenslange Reise"
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
    year: "Ihre Entwicklung"
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
    year: "Ihr Tempo"
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
    year: "Zeitlose Kunst"
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
            Meine Vision & Methodik
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
              className="relative h-[320px] perspective-1000"
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className={`w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${
                  hoveredId === card.id ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full bg-[#0A0A0A] rounded-xl p-5 flex flex-col items-center justify-center border border-[#C8A97E]/20">
                    <div className="mb-4">{card.icon}</div>
                    <h3 className="text-xl font-medium text-white mb-2">{card.title}</h3>
                    <p className="text-[#C8A97E] text-sm mb-3">{card.subtitle}</p>
                    <p className="text-gray-400 text-center text-sm">{card.description}</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full bg-[#0A0A0A] rounded-xl p-5 flex flex-col items-center justify-center border border-[#C8A97E]/20">
                    <h4 className="text-[#C8A97E] font-medium mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {card.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <span className="text-[#C8A97E]/60 text-sm">{card.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 