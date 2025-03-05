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
import { getImageUrl } from "@/lib/config"

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
        <ParallaxBackground 
          imageUrl={getImageUrl("images/gallery/performance1.jpg")}
          opacity={0.4}
          speed={0.5}
        />

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
      <section className="py-20 px-4 bg-[#0A0A0A]">
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
      <section className="py-20 px-4 bg-[#0A0A0A]">
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

      {/* Services and About Combined Background Section */}
      <div className="relative bg-[#0A0A0A]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              title="Private Gesangsstunden"
              description="Personalisierte Einzelstunden, die auf Ihre einzigartige Stimme und Ziele zugeschnitten sind."
              icon={<Mic />}
              price="Ab €60/Stunde"
              features={[
                "Atem- & Technikentwicklung",
                "Erweiterung des Stimmumfangs",
                "Stil & Interpretation",
                "Aufführungs-Vorbereitung"
              ]}
              details={{
                includes: [
                  "Individuelle Stimmanalyse",
                  "Personalisierter Übungsplan",
                  "Aufnahmen der Übungen",
                  "E-Mail Support zwischen den Stunden"
                ],
                suitable: [
                  "Anfänger",
                  "Fortgeschrittene",
                  "Professionelle Sänger",
                  "Hobby-Sänger"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte oder Online"
              }}
                image={getImageUrl("images/gallery/performance2.jpg")}
              delay={0.1}
            />
            
            <ServiceCard 
              title="Jazz Improvisation"
              description="Meistern Sie die Kunst des Jazz-Scattens und der melodischen Improvisation."
              icon={<Music />}
              price="Ab €70/Stunde"
              features={[
                "Scat-Vokabuläraufbau",
                "Chord Scale-Beziehungen",
                "Rhythmische Entwicklung",
                "Transkription & Analyse"
              ]}
              details={{
                includes: [
                  "Gehörbildung & Rhythmustraining",
                    "Harmonische Konzepte",
                  "Improvisationsübungen",
                    "Aufnahmen der Sessions"
                ],
                suitable: [
                  "Sänger mit Vorkenntnissen",
                  "Instrumentalisten",
                  "Musikstudenten",
                  "Jazz-Enthusiasten"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte oder Online"
              }}
                image={getImageUrl("images/gallery/performance3.jpg")}
                delay={0.2}
            />
            
            <ServiceCard 
              title="Aufführungs Coaching"
              description="Entwickeln Sie eine fesselnde Bühnenpräsenz und Aufführungskompetenz."
              icon={<Theater />}
              price="Ab €75/Stunde"
              features={[
                "Mikrophon-Technik",
                  "Bühnenpräsenz",
                "Publikumsverbindung",
                "Umgang mit Auftrittsangst"
              ]}
              details={{
                includes: [
                  "Analyse Ihrer Bühnenpräsenz",
                    "Performance-Persona",
                  "Umgang mit Lampenfieber",
                    "Publikumsinteraktion"
                ],
                suitable: [
                  "Sänger vor Auftritten",
                  "Schauspieler",
                  "Redner",
                    "Performer"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte"
              }}
                image={getImageUrl("images/gallery/performance4.jpg")}
                delay={0.3}
            />
            
            <ServiceCard 
              title="Piano/Vocal-Koordination"
                description="Erlernen Sie sich beim Singen selbst zu begleiten."
              icon={<BookOpen />}
              price="Ab €80/Stunde"
              features={[
                "Grundlegende Klaviertechnik",
                "Vokale Unabhängigkeit",
                  "Jazz-Akkorde",
                "Arrangementsfähigkeiten"
              ]}
              details={{
                includes: [
                    "Klavierbegleitung",
                  "Akkordlehre für Sänger",
                    "Timing-Übungen",
                    "Song-Arrangement"
                ],
                suitable: [
                    "Sänger am Klavier",
                    "Pianisten mit Gesang",
                  "Songwriter",
                    "Musiker"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte"
              }}
                image={getImageUrl("images/gallery/performance5.jpg")}
                delay={0.4}
            />
          </div>
          
          <motion.div 
              className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Jetzt Buchen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
        <AboutSection />
        </div>

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

      {/* Footer with Policy Links */}
      <footer className="py-12 px-4 bg-[#0A0A0A] border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Melanie Wainwright</h3>
              <p className="text-gray-400 mb-4">Jazz Vocal Coaching in Berlin</p>
              <div className="flex space-x-4">
                <a href="https://m.facebook.com/singingJazz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/jazzamell/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://chornextdoor.de" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                  Chor Next Door
                </a>
              </div>
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
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/datenschutz" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    Datenschutzerklärung
                  </a>
                </li>
                <li>
                  <a href="/impressum" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    Impressum
                  </a>
                </li>
                <li>
                  <a href="/agb" className="text-gray-400 hover:text-[#C8A97E] transition-colors duration-300">
                    AGB
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Melanie Wainwright. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  )
}

