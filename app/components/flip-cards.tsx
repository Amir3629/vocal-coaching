"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Music, Users, Award } from 'lucide-react'

interface FlipCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay?: number
}

const FlipCard: React.FC<FlipCardProps> = ({ title, description, icon, color, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative h-64 w-full cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div 
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col items-center justify-center text-center ${color} shadow-lg`}
        >
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-80">Klicken zum Umdrehen</p>
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col items-center justify-center text-center bg-black/90 border border-white/10 shadow-lg rotate-y-180"
        >
          <p className="text-white/90">{description}</p>
          <p className="mt-4 text-sm text-white/60">Klicken zum Zurückdrehen</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FlipCards() {
  const cards = [
    {
      title: "Professionelle Gesangstechnik",
      description: "Erlerne fortgeschrittene Gesangstechniken, die deine Stimme stärken und deine Ausdrucksfähigkeit erweitern. Vom Atemtraining bis zur Stimmkontrolle.",
      icon: <Mic />,
      color: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white",
      delay: 0.1
    },
    {
      title: "Genreübergreifendes Training",
      description: "Von Pop und Rock bis hin zu Jazz und Klassik - entwickle deine Stimme in verschiedenen Musikstilen und erweitere dein Repertoire.",
      icon: <Music />,
      color: "bg-gradient-to-br from-amber-500 to-pink-600 text-white",
      delay: 0.2
    },
    {
      title: "Individuelle Betreuung",
      description: "Maßgeschneiderte Übungen und persönliches Feedback, um deine spezifischen Ziele zu erreichen und deine einzigartige Stimme zu entwickeln.",
      icon: <Users />,
      color: "bg-gradient-to-br from-emerald-500 to-teal-700 text-white",
      delay: 0.3
    },
    {
      title: "Auftrittsvorbereitung",
      description: "Bereite dich auf Auftritte vor mit Techniken zur Überwindung von Lampenfieber, Bühnenpräsenz und Performance-Coaching.",
      icon: <Award />,
      color: "bg-gradient-to-br from-rose-500 to-red-700 text-white",
      delay: 0.4
    }
  ]

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Warum Vocal Coaching?</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          <p className="mt-6 max-w-2xl mx-auto text-white/70">
            Entdecke die Vorteile professionellen Vocal Coachings und wie es dir helfen kann, 
            dein volles stimmliches Potenzial zu entfalten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              delay={card.delay}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
} 