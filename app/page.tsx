"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Mail, Phone, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/app/components/service-card"
import TestimonialSlider from "@/app/components/testimonial-slider"
import NavBar from "@/app/components/nav-bar"
import EnhancedMusicPlayer from "@/app/components/enhanced-music-player"
import VideoPreview from "@/app/components/video-preview"
import { Music, Mic, Theater, BookOpen } from "lucide-react"
import ParallaxBackground from "@/app/components/parallax-background"
import AboutSection from "@/app/components/about-section"
import Certifications from "@/app/components/certifications"
import GallerySection from "@/app/components/gallery-section"
import MusicNotes from "@/app/components/music-notes-animation"
import ContactForm from "@/app/components/contact-form"
import BookingModal from "@/app/components/booking-modal"
import Collaborations from "@/app/components/collaborations"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const levelDropdownRef = useRef<HTMLDivElement>(null)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const [isLevelOpen, setIsLevelOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    level: "",
    service: ""
  })

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const levels = [
    { value: "beginner", label: "Anfänger" },
    { value: "intermediate", label: "Fortgeschritten" },
    { value: "advanced", label: "Profi" }
  ]

  const services = [
    { value: "private", label: "Private Gesangsstunden" },
    { value: "jazz", label: "Jazz Improvisation" },
    { value: "performance", label: "Aufführungs Coaching" },
    { value: "piano", label: "Piano/Vocal-Koordination" }
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target as Node)) {
        setIsLevelOpen(false)
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  useEffect(() => {
    // Verify that all sections are properly rendered
    const sections = ['hero', 'services', 'about', 'testimonials', 'contact']
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (!element) {
        console.error(`Section with id "${id}" not found`)
      } else {
        console.log(`Section with id "${id}" found`)
      }
    })
  }, [isLoaded])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      <NavBar />

      {/* Hero Section with Parallax Piano Background */}
      <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/vocal-coaching/images/backgrounds/hero-bg.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load');
              const target = e.target as HTMLImageElement;
              target.style.backgroundColor = '#000';
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Mel jazz
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-4xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Vocal Coaching in Berlin
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button 
              size="lg" 
              className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black border-2 border-[#C8A97E] hover:border-[#B89A6F] rounded-full px-8 transition-all duration-300"
              onClick={() => {
                const element = document.getElementById("services")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Jetzt Buchen
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Music Preview Section */}
      <section className="py-20 px-4 bg-[#040202]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading mb-4">Meine Musik</h2>
            <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          </motion.div>
          <EnhancedMusicPlayer />
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-20 px-4 bg-[#040202]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading mb-4">Video Preview</h2>
            <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          </motion.div>
          <VideoPreview />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative w-full min-h-screen py-16">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/vocal-coaching/images/backgrounds/services-bg.jpg"
            alt="Services Background"
            fill
            className="object-cover"
            priority
          />
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
                location: "Online & Studio Berlin"
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
                location: "Online & Studio Berlin"
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
              description={"Werde Teil unseres\ninnovativen\nChorprojekts"}
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
                onClick={() => setIsBookingModalOpen(true)}
            >
              Jetzt Buchen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* References Section */}
      <section id="references" className="py-20 bg-[#040202]">
        <GallerySection />
        <Certifications />
        <Collaborations />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full bg-[#040202] py-16">
        <div className="container mx-auto px-4">
          <TestimonialSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-[#040202]">
        <ContactForm />
      </section>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  )
}

