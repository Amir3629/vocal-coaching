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
              className="group relative h-[320px] perspective-1000"
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className={`w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${
                  hoveredId === card.id ? "scale-105" : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="relative h-full">
                    {/* Background Image */}
                    <Image
                      src={card.bgImage}
                      alt={card.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        hoveredId === card.id ? "blur-none scale-110" : "blur-sm scale-100"
                      }`}
                    />
                    {/* Dark Overlay */}
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-700 ${
                      hoveredId === card.id ? "opacity-40" : "opacity-70"
                    }`} />
                    
                    {/* Content */}
                    <div className="relative h-full p-5 flex flex-col">
                      {/* Icon */}
                      <div className="absolute top-4 left-4">
                        {card.icon}
                      </div>
                      
                      {/* Text Content */}
                      <div className="mt-auto">
                        <h3 className="text-xl font-medium text-white mb-2">{card.title}</h3>
                        <p className="text-[#C8A97E] text-sm mb-3">{card.subtitle}</p>
                        <p className="text-gray-200 text-sm transition-all duration-500 max-h-0 overflow-hidden group-hover:max-h-24">
                          {card.description}
                        </p>
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
            className="bg-[#C8A97E] text-black px-8 py-3 rounded-full font-medium text-lg transition-colors hover:bg-[#D4B88F]"
          >
            Jetzt Buchen
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 