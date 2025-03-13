"use client"

import { Music, Mic, Users2, Theater } from "lucide-react"
import ServiceCard from "./service-card"
import { motion } from "framer-motion"
import { useLanguage } from "./language-switcher"
import TranslatedText from "./translated-text"

const services = [
  {
    key: "singing",
    title: <TranslatedText text="Singen" />,
    subtitle: <TranslatedText text="Gesangsunterricht für alle" />,
    description: <TranslatedText text="Professionelles Stimmtraining für Bands, Musiker und ambitionierte Sänger - maßgeschneidert für Ihre künstlerische Entwicklung." />,
    icon: <Music className="w-6 h-6" />,
    features: [
      <TranslatedText text="Grundtechniken" />,
      <TranslatedText text="Stimmbildung" />,
      <TranslatedText text="Atemtechnik" />,
      <TranslatedText text="Liedinterpretation" />
    ],
    details: {
      includes: [
        <TranslatedText text="Stimmanalyse" />,
        <TranslatedText text="Grundlagentraining" />,
        <TranslatedText text="Liedauswahl" />,
        <TranslatedText text="Übungsmaterial" />
      ],
      suitable: [
        <TranslatedText text="Bands" />,
        <TranslatedText text="Musiker" />,
        <TranslatedText text="Anfänger" />,
        <TranslatedText text="Fortgeschrittene" />
      ],
      duration: <TranslatedText text="45-60 Minuten" />,
      location: <TranslatedText text="Studio Berlin / Online" />
    },
    image: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/services/singing.jpg" 
      : "/images/services/singing.jpg"
  },
  {
    key: "coaching",
    title: <TranslatedText text="Vocal Coaching" />,
    subtitle: <TranslatedText text="Professionelles Coaching" />,
    description: <TranslatedText text="CVT-basiertes Stimmtraining für Profis - entwickeln Sie Ihre einzigartige Stimme und Performance auf höchstem Niveau." />,
    icon: <Mic className="w-6 h-6" />,
    features: [
      <TranslatedText text="CVT Technik" />,
      <TranslatedText text="Performance" />,
      <TranslatedText text="Repertoire" />,
      <TranslatedText text="Stilentwicklung" />
    ],
    details: {
      includes: [
        <TranslatedText text="CVT Stimmanalyse" />,
        <TranslatedText text="Techniktraining" />,
        <TranslatedText text="Repertoireaufbau" />,
        <TranslatedText text="Auftrittsvorbereitung" />
      ],
      suitable: [
        <TranslatedText text="Profis" />,
        <TranslatedText text="Semi-Profis" />,
        <TranslatedText text="Fortgeschrittene" />
      ],
      duration: <TranslatedText text="60-90 Minuten" />,
      location: <TranslatedText text="Studio Berlin / Online" />
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/coaching.jpg"
      : "/images/services/coaching.jpg"
  },
  {
    key: "workshop",
    title: <TranslatedText text="Workshop" />,
    subtitle: <TranslatedText text="Individuell & Intensiv" />,
    description: <TranslatedText text="Maßgeschneiderte Intensiv-Workshops für ein tiefgreifendes Erlebnis Ihrer stimmlichen Entwicklung." />,
    icon: <Theater className="w-6 h-6" />,
    features: [
      <TranslatedText text="Ensemble-Arbeit" />,
      <TranslatedText text="Harmonielehre" />,
      <TranslatedText text="Improvisation" />,
      <TranslatedText text="Auftritts­praxis" />
    ],
    details: {
      includes: [
        <TranslatedText text="Intensivtraining" />,
        <TranslatedText text="Theorie & Praxis" />,
        <TranslatedText text="Individuelles Feedback" />,
        <TranslatedText text="Auftrittsvorbereitung" />
      ],
      suitable: [
        <TranslatedText text="Einzelpersonen" />,
        <TranslatedText text="Kleine Gruppen" />,
        <TranslatedText text="Bands" />
      ],
      duration: <TranslatedText text="⏱️ Ab 3 Stunden (600€)" />,
      location: <TranslatedText text="Nach Vereinbarung" />
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/workshop.jpg"
      : "/images/services/workshop.jpg"
  },
  {
    key: "chor",
    title: <TranslatedText text="Chor Next Door" />,
    subtitle: <TranslatedText text="Gemeinsam Singen" />,
    description: <TranslatedText text="Entdecken Sie die Freude am gemeinsamen Singen in unserem dynamischen Nachbarschaftschor - für alle Levels offen." />,
    icon: <Users2 className="w-6 h-6" />,
    features: [
      <TranslatedText text="Mehrstimmigkeit" />,
      <TranslatedText text="Harmonie" />,
      <TranslatedText text="Rhythmus" />,
      <TranslatedText text="Gemeinschaft" />
    ],
    details: {
      includes: [
        <TranslatedText text="Stimmbildung" />,
        <TranslatedText text="Chorgesang" />,
        <TranslatedText text="Auftritte" />,
        <TranslatedText text="Events" />
      ],
      suitable: [
        <TranslatedText text="Alle Level" />,
        <TranslatedText text="Nachbarn" />,
        <TranslatedText text="Musikbegeisterte" />
      ],
      duration: <TranslatedText text="90-120 Minuten" />,
      location: <TranslatedText text="Studio Berlin" />
    },
    image: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/services/chor.jpg"
      : "/images/services/chor.jpg",
    link: "https://chornextdoor.de"
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
          <h2 className="section-heading mb-4">
            <TranslatedText text="Vocal Excellence" />
          </h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              icon={service.icon}
              features={service.features}
              details={service.details}
              image={service.image}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 