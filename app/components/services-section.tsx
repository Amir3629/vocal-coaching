"use client"

import React from "react"
import { motion } from "framer-motion"
import { Music, Mic, Theater, BookOpen } from "lucide-react"
import ServiceCard from "./service-card"
import { Button } from "./ui/button"

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full min-h-screen py-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Vocal Excellence</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <ServiceCard 
            title="Singen"
            description="Professionelle Gesangsausbildung für Bands und Musiker"
            icon={<Mic className="w-6 h-6 text-[#C8A97E]" />}
            features={[
              "Stimmtechnik & Atemübungen",
              "Repertoire-Entwicklung",
              "Individuelle Zielsetzung",
              "Flexible Terminplanung"
            ]}
            details={{
              includes: [
                "Personalisierte Stimmtechnik",
                "Repertoire-Entwicklung",
                "Aufnahmen der Stunden",
                "Übe-Material & Feedback"
              ],
              suitable: [
                "Bands & Musiker",
                "Solo-Künstler",
                "Hobby-Sänger",
                "Profis"
              ],
              duration: "60-90 min",
              location: "Studio Berlin"
            }}
            image="/images/services/studio.jpg"
            delay={0.1}
          />
          
          <ServiceCard
            title="Vocal Coaching"
            description="CVT-basiertes Stimmtraining für alle Genres"
            icon={<Music className="w-6 h-6 text-[#C8A97E]" />}
            features={[
              "Complete Vocal Technique",
              "Stimmgesundheit",
              "Genrespezifisches Training",
              "Individuelle Betreuung"
            ]}
            details={{
              includes: [
                "CVT Stimmanalyse",
                "Personalisierter Trainingsplan",
                "Gesundheitsorientiertes Training",
                "Regelmäßiges Feedback"
              ],
              suitable: [
                "Alle Gesangslevel",
                "Verschiedene Genres",
                "Professionelle Sänger",
                "Gesangslehrer"
              ],
              duration: "60-90 min",
              location: "Studio Berlin"
            }}
            image="/images/services/jazz.jpg"
            delay={0.2}
          />
          
          <ServiceCard
            title="Workshop"
            description="Intensive Gesangsworkshops für Gruppen"
            icon={<Theater className="w-6 h-6 text-[#C8A97E]" />}
            features={[
              "Intensive Gruppenarbeit",
              "Flexible Terminplanung",
              "Maßgeschneiderte Inhalte",
              "Ab 3 Stunden"
            ]}
            details={{
              includes: [
                "Professionelles Training",
                "Praxisorientierte Übungen",
                "Gruppendynamik",
                "Auftrittsvorbereitung"
              ],
              suitable: [
                "Chöre",
                "Bands",
                "Ensembles",
                "Firmenevents"
              ],
              duration: "Min. 3 Stunden",
              location: "Nach Vereinbarung",
              price: "Ab 300€"
            }}
            image="/images/services/performance.jpg"
            delay={0.3}
          />
          
          <ServiceCard
            title="Chor Next Door"
            description="Werde Teil unseres innovativen Chorprojekts"
            icon={<BookOpen className="w-6 h-6 text-[#C8A97E]" />}
            features={[
              "Moderne Arrangements",
              "Gemeinschaftserlebnis",
              "Regelmäßige Auftritte",
              "Alle Level willkommen"
            ]}
            details={{
              includes: [
                "Professionelle Leitung",
                "Stimmbildung",
                "Auftrittsmöglichkeiten",
                "Soziales Netzwerk"
              ],
              suitable: [
                "Alle Altersgruppen",
                "Gesangsbegeisterte",
                "Anfänger",
                "Fortgeschrittene"
              ],
              duration: "Wöchentliche Proben",
              location: "Berlin",
              link: "https://chornextdoor.de"
            }}
            image="/images/services/piano.jpg"
            delay={0.4}
          />
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button 
            size="lg"
            className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-8 transform hover:scale-105 transition-all duration-300"
            onClick={() => {}}
          >
            Jetzt Buchen
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 