"use client"

import { Music, Mic, Users2, Theater } from "lucide-react"
import ServiceCard from "./service-card"
import { motion } from "framer-motion"
import { useLanguage } from "./language-switcher"
import { useTranslation } from 'react-i18next'

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
      duration: "Ab 3 Stunden (600€)",
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
  const { currentLang } = useLanguage()
  const { t } = useTranslation()

  return (
    <section id="services" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            {t('services.title')}
          </motion.h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h3 className="text-xl font-medium text-white mb-4">
              {t('services.singing.title')}
            </h3>
            <p className="text-white/70 mb-6">
              {t('services.singing.description')}
            </p>
            <ul className="space-y-3">
              {t('services.singing.features', { returnObjects: true }).map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                  {feature}
                </li>
              ))}
            </ul>
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
      </div>
    </section>
  )
} 