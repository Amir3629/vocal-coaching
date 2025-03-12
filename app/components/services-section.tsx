"use client"

import { Music, Mic, Users2, Theater } from "lucide-react"
import ServiceCard from "./service-card"
import { motion } from "framer-motion"
import { useLanguage } from "./language-switcher"

const services = [
  {
    title: "Singen",
    subtitle: "Gesangsunterricht für alle",
    description: "Professionelles Stimmtraining für Bands, Musiker und ambitionierte Sänger - maßgeschneidert für Ihre künstlerische Entwicklung.",
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
        "Grundlagentraining",
        "Liedauswahl",
        "Übungsmaterial"
      ],
      suitable: [
        "Bands",
        "Musiker",
        "Anfänger",
        "Fortgeschrittene"
      ],
      duration: "45-60 Minuten",
      location: "Studio Berlin / Online"
    },
    image: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/services/singing.jpg" 
      : "/images/services/singing.jpg"
  },
  {
    title: "Vocal Coaching",
    subtitle: "Professionelles Coaching",
    description: "CVT-basiertes Stimmtraining für Profis - entwickeln Sie Ihre einzigartige Stimme und Performance auf höchstem Niveau.",
    icon: Mic,
    features: [
      "CVT Technik",
      "Performance",
      "Repertoire",
      "Stilentwicklung"
    ],
    details: {
      includes: [
        "CVT Stimmanalyse",
        "Techniktraining",
        "Repertoireaufbau",
        "Auftrittsvorbereitung"
      ],
      suitable: [
        "Profis",
        "Semi-Profis",
        "Fortgeschrittene"
      ],
      duration: "60-90 Minuten",
      location: "Studio Berlin / Online"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/coaching.jpg"
      : "/images/services/coaching.jpg"
  },
  {
    title: "Workshop",
    subtitle: "Individuell & Intensiv",
    description: "Maßgeschneiderte Intensiv-Workshops für ein tiefgreifendes Erlebnis Ihrer stimmlichen Entwicklung.",
    icon: Theater,
    features: [
      "Ensemble-Arbeit",
      "Harmonielehre",
      "Improvisation",
      "Auftritts­praxis"
    ],
    details: {
      includes: [
        "Intensivtraining",
        "Theorie & Praxis",
        "Individuelles Feedback",
        "Auftrittsvorbereitung"
      ],
      suitable: [
        "Einzelpersonen",
        "Kleine Gruppen",
        "Bands"
      ],
      duration: "Ab 3 Stunden",
      location: "Nach Vereinbarung"
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/workshop.jpg"
      : "/images/services/workshop.jpg"
  },
  {
    title: "Chor Next Door",
    subtitle: "Gemeinsam Singen",
    description: "Entdecken Sie die Freude am gemeinsamen Singen in unserem dynamischen Nachbarschaftschor - für alle Levels offen.",
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
        "Chorgesang",
        "Auftritte",
        "Events"
      ],
      suitable: [
        "Alle Level",
        "Nachbarn",
        "Musikbegeisterte"
      ],
      duration: "90-120 Minuten",
      location: "Studio Berlin"
    },
    link: "https://chornextdoor.de",
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/chor.jpg"
      : "/images/services/chor.jpg"
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
              description={service.description}
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