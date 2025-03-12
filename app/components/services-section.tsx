"use client"

import { Music, Mic, Users2, Theater } from "lucide-react"
import ServiceCard from "./service-card"
import { motion } from "framer-motion"
import { useLanguage } from "./language-switcher"

const services = [
  {
    title: "Professionelles Stimmtraining",
    subtitle: "Für Musiker & Bands 🎤",
    icon: Music,
    features: [
      "🎵 Grundtechniken",
      "🎶 Stimmbildung",
      "💨 Atemtechnik", 
      "🎭 Bühnenpräsenz"
    ],
    details: {
      includes: [
        "Digitale Analyse Tools",
        "Individueller Trainingsplan",
        "Online/Präsenz Optionen",
        "Band-Coaching möglich"
      ],
      suitable: [
        "Solisten",
        "Bandmitglieder"
      ],
      duration: "60-90 Minuten",
      location: "Studio Berlin oder Online"
    },
    image: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/services/singing.jpg" 
      : "/images/services/singing.jpg"
  },
  {
    title: "Vocal Performance",
    subtitle: "Professionelles Coaching 🎯",
    icon: Mic,
    features: [
      "🎤 Stimmtechnik",
      "🎬 Performance",
      "📚 Repertoire",
      "🎨 Stilentwicklung"
    ],
    details: {
      includes: [
        "Technikanalyse",
        "Performancetraining",
        "Videoaufnahmen",
        "Detailliertes Feedback"
      ],
      suitable: [
        "Profis",
        "Performer",
        "Künstler"
      ],
      duration: "90 Minuten",
      location: "Ab 120€ | Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/coaching.jpg"
      : "/images/services/coaching.jpg"
  },
  {
    title: "Intensiv-Workshops",
    subtitle: "Gruppencoaching 👥",
    icon: Theater,
    features: [
      "🎯 Zielorientierte Konzepte",
      "🤝 Ensemble-Arbeit",
      "🎹 Live-Begleitung",
      "📈 Fortschrittsanalyse"
    ],
    details: {
      includes: [
        "Professionelle Aufnahmen",
        "Video-Analyse",
        "Gruppenübungen",
        "Abschlusspräsentation"
      ],
      suitable: [
        "Teams",
        "Chöre",
        "Musikgruppen"
      ],
      duration: "3-5 Stunden",
      location: "Ab 600€ | Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/workshop.jpg"
      : "/images/services/workshop.jpg"
  },
  {
    title: "Chor & Ensemble",
    subtitle: "Gemeinsam Wachsen 🌟",
    icon: Users2,
    features: [
      "🎵 Mehrstimmigkeit",
      "🎶 Harmoniebildung",
      "🎭 Auftrittstraining",
      "💫 Gruppendynamik"
    ],
    details: {
      includes: [
        "Stimmbildung im Ensemble",
        "Repertoire-Entwicklung",
        "Auftrittsvorbereitung",
        "Regelmäßige Events"
      ],
      suitable: [
        "Alle Level",
        "Hobby-Sänger",
        "Ensembles"
      ],
      duration: "120 Minuten",
      location: "Ab 45€ | Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/choir.jpg"
      : "/images/services/choir.jpg"
  }
]

export default function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Vocal Excellence</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              subtitle={service.subtitle}
              icon={<service.icon className="w-6 h-6" />}
              features={service.features}
              details={service.details}
              image={service.image}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 