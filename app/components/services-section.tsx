"use client"

import { Music, Mic, Users2, Theater } from "lucide-react"
import ServiceCard from "./service-card"
import { motion } from "framer-motion"
import { useLanguage } from "./language-switcher"

const services = [
  {
    title: "Singen",
    subtitle: "Gesangsunterricht für alle",
    icon: Music,
    features: [
      "Grundtechniken",
      "Stimmbildung",
      "Atemtechnik",
      "Liedinterpretation"
    ],
    details: {
      includes: [
        "Stimmanalyse",
        "Trainingsplan",
        "Aufnahmen",
        "Übe-Material"
      ],
      suitable: [
        "Anfänger",
        "Fortgeschrittene",
        "Profis",
        "Alle Genres"
      ],
      duration: "45-60 Minuten",
      location: "Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/services/singing.jpg" 
      : "/images/services/singing.jpg"
  },
  {
    title: "Vocal Coaching",
    subtitle: "Professionelles Coaching",
    icon: Mic,
    features: [
      "Stimmtechnik",
      "Performance",
      "Repertoire",
      "Stilentwicklung"
    ],
    details: {
      includes: [
        "Technikanalyse",
        "Performancetraining",
        "Videoaufnahmen",
        "Feedback"
      ],
      suitable: [
        "Sänger",
        "Musiker",
        "Performer",
        "Sprecher"
      ],
      duration: "60-90 Minuten",
      location: "Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/coaching.jpg"
      : "/images/services/coaching.jpg"
  },
  {
    title: "Workshop",
    subtitle: "Gruppenunterricht",
    icon: Theater,
    features: [
      "Ensemble-Arbeit",
      "Harmonielehre",
      "Improvisation",
      "Auftritts­praxis"
    ],
    details: {
      includes: [
        "Gruppenübungen",
        "Theorie",
        "Praxis",
        "Dokumentation"
      ],
      suitable: [
        "Gruppen",
        "Chöre",
        "Bands",
        "Ensembles"
      ],
      duration: "120-180 Minuten",
      location: "Studio Berlin"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/workshop.jpg"
      : "/images/services/workshop.jpg"
  },
  {
    title: "Chor",
    subtitle: "Gemeinsam Singen",
    icon: Users2,
    features: [
      "Mehrstimmigkeit",
      "Harmonie",
      "Rhythmus",
      "Gemeinschaft"
    ],
    details: {
      includes: [
        "Stimmbildung",
        "Chorleitung",
        "Repertoire",
        "Auftritte"
      ],
      suitable: [
        "Alle Level",
        "Alle Alter",
        "Hobby",
        "Semi-Pro"
      ],
      duration: "90-120 Minuten",
      location: "Studio Berlin"
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