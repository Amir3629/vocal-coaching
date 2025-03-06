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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      <NavBar />

      {/* Hero Section with Parallax Piano Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/vocal-coaching/images/backgrounds/hero-bg.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load');
              const target = e.target as HTMLImageElement;
              target.style.backgroundColor = '#000';
              target.style.border = '1px solid red';
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>

        {/* Debug information */}
        <div className="absolute top-4 left-4 bg-black/80 p-4 rounded text-xs text-white z-50">
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Image path: /vocal-coaching/images/backgrounds/hero-bg.jpg</p>
          <p>Base path: {process.env.NEXT_PUBLIC_BASE_PATH || ''}</p>
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Melanie Wainwright
          </motion.h1>
          <motion.p 
            className="text-xl md:text-3xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Jazz Vocal Coaching in Berlin
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

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-white hover:bg-[#C8A97E]/20"
            onClick={() => scrollToSection("services")}
          >
            <ChevronDown className="h-8 w-8" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>
      </section>

      {/* Music Preview Section */}
      <section className="py-20 px-4 bg-[#080505]">
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
      <section className="py-20 px-4 bg-[#080505]">
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
      <section id="services" className="relative w-full min-h-screen bg-black py-16">
        <ParallaxBackground
          imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
          opacity={0.2}
          speed={0.2}
        />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <ServiceCard
              title="Private Gesangsstunden"
              description="Individueller Unterricht für alle Levels"
              icon={<Mic className="w-6 h-6" />}
              price="ab €60"
              features={[
                "Stimmtechnik & Atemübungen",
                "Repertoire-Entwicklung",
                "Individuelle Zielsetzung",
                "Flexible Terminplanung"
              ]}
              details={{
                includes: [
                  "Stimmanalyse",
                  "Personalisierter Übungsplan",
                  "Aufnahmen der Übungen",
                  "E-Mail Support"
                ],
                suitable: [
                  "Anfänger",
                  "Fortgeschrittene",
                  "Profis",
                  "Hobby-Sänger"
                ],
                duration: "60 oder 90 Minuten",
                location: "Studio Berlin-Mitte oder Online"
              }}
              image="/images/services/private-lessons.jpg"
              delay={0.2}
            />
            <ServiceCard
              title="Jazz Improvisation"
              description="Entdecke die Kunst des Jazz-Gesangs"
              icon={<Music className="w-6 h-6" />}
              price="ab €65"
              features={[
                "Scat-Gesang",
                "Harmonielehre",
                "Rhythmische Übungen",
                "Jazz-Standards"
              ]}
              details={{
                includes: [
                  "Gehörbildung",
                  "Harmonische Konzepte",
                  "Improvisationsübungen",
                  "Session-Aufnahmen"
                ],
                suitable: [
                  "Fortgeschrittene",
                  "Instrumentalisten",
                  "Musikstudenten",
                  "Jazz-Enthusiasten"
                ],
                duration: "60 oder 90 Minuten",
                location: "Studio Berlin-Mitte oder Online"
              }}
              image="/images/services/jazz.jpg"
              delay={0.4}
            />
            <ServiceCard
              title="Aufführungs Coaching"
              description="Perfektioniere deine Bühnenpräsenz"
              icon={<Theater className="w-6 h-6" />}
              price="ab €70"
              features={[
                "Bühnenperformance",
                "Mikrofonarbeit",
                "Gestik & Mimik",
                "Auftrittsvorbereitung"
              ]}
              details={{
                includes: [
                  "Performance-Analyse",
                  "Bühnenpräsenz-Training",
                  "Lampenfieber-Management",
                  "Publikumsinteraktion"
                ],
                suitable: [
                  "Performer",
                  "Sänger",
                  "Schauspieler",
                  "Redner"
                ],
                duration: "90 Minuten",
                location: "Studio Berlin-Mitte"
              }}
              image="/images/services/performance.jpg"
              delay={0.6}
            />
            <ServiceCard
              title="Piano/Vocal-Koordination"
              description="Lerne dich selbst zu begleiten"
              icon={<BookOpen className="w-6 h-6" />}
              price="ab €65"
              features={[
                "Grundlegende Klaviertechnik",
                "Begleitpatterns",
                "Rhythmische Koordination",
                "Song-Arrangements"
              ]}
              details={{
                includes: [
                  "Klavierbegleitung",
                  "Akkordlehre",
                  "Timing-Übungen",
                  "Song-Arrangement"
                ],
                suitable: [
                  "Sänger am Klavier",
                  "Pianisten mit Gesang",
                  "Songwriter",
                  "Musiker"
                ],
                duration: "60 oder 90 Minuten",
                location: "Studio Berlin-Mitte"
              }}
              image="/images/services/piano.jpg"
              delay={0.8}
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
              className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-8"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Jetzt Buchen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Certifications Section */}
      <Certifications />

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full bg-black py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading mb-4">Was meine Schüler sagen</h2>
            <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          </motion.div>
          <TestimonialSlider />
          <Collaborations />
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative w-full bg-black/95 py-20">
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0A0A0A] border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Melanie Wainwright</h3>
              <p className="text-gray-400 mb-4">Jazz Vocal Coaching in Berlin</p>
              <div className="flex space-x-4">
                <a href="https://m.facebook.com/singingJazz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/melanie_wainwright_jazz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.youtube.com/@melaniewainwright" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2 text-[#C8A97E]" />
                  <span>Berlin-Mitte, Deutschland</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2 text-[#C8A97E]" />
                  <a href="mailto:info@melaniewainwright.com" className="hover:text-[#C8A97E] transition-colors duration-300">
                    info@melaniewainwright.com
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2 text-[#C8A97E]" />
                  <a href="tel:+491234567890" className="hover:text-[#C8A97E] transition-colors duration-300">
                    +49 123 456 7890
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2 text-[#C8A97E]" />
                  <span>Mo-Fr: 10:00-20:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Institutionen & Partner</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://completevocalinstitute.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    Complete Vocal Institute
                  </a>
                </li>
                <li>
                  <a href="https://cvtdeutschland.de" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    CVT Deutschland
                  </a>
                </li>
                <li>
                  <a href="https://www.b-flat-berlin.de" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    B-Flat Jazz Club Berlin
                  </a>
                </li>
                <li>
                  <a href="https://chornextdoor.de" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    Chor Next Door
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  )
}

