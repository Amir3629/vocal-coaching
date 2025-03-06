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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Private Lessons Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-[#C8A97E]/20 transition-all duration-500 shadow-lg hover:shadow-[#C8A97E]/5"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/vocal-coaching/images/services/studio.jpg"
                  alt="Private Lessons"
                  fill
                  className="object-cover transition-all duration-700 scale-110 blur-[2px] group-hover:blur-none group-hover:scale-125"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-500" />
              </div>
              <div className="relative p-6 flex flex-col h-full min-h-[400px] transform transition-transform duration-500">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                    <Mic className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <span className="text-lg font-semibold text-[#C8A97E]">ab €60</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#C8A97E] transition-colors duration-300">Private Gesangsstunden</h3>
                <p className="text-gray-300 mb-4">Individueller Unterricht für alle Levels</p>
                <ul className="space-y-2 flex-grow">
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Stimmtechnik & Atemübungen
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Repertoire-Entwicklung
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Individuelle Zielsetzung
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Flexible Terminplanung
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Jazz Improvisation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-[#C8A97E]/20 transition-all duration-500 shadow-lg hover:shadow-[#C8A97E]/5"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/vocal-coaching/images/services/jazz.jpg"
                  alt="Jazz Improvisation"
                  fill
                  className="object-cover transition-all duration-700 scale-110 blur-[2px] group-hover:blur-none group-hover:scale-125"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-500" />
              </div>
              <div className="relative p-6 flex flex-col h-full min-h-[400px] transform transition-transform duration-500">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                    <Music className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <span className="text-lg font-semibold text-[#C8A97E]">ab €65</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#C8A97E] transition-colors duration-300">Jazz Improvisation</h3>
                <p className="text-gray-300 mb-4">Entdecke die Kunst des Jazz-Gesangs</p>
                <ul className="space-y-2 flex-grow">
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Scat-Gesang
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Harmonielehre
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Rhythmische Übungen
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Jazz-Standards
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Performance Coaching Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-[#C8A97E]/20 transition-all duration-500 shadow-lg hover:shadow-[#C8A97E]/5"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/vocal-coaching/images/services/performance.jpg"
                  alt="Performance Coaching"
                  fill
                  className="object-cover transition-all duration-700 scale-110 blur-[2px] group-hover:blur-none group-hover:scale-125"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-500" />
              </div>
              <div className="relative p-6 flex flex-col h-full min-h-[400px] transform transition-transform duration-500">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                    <Theater className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <span className="text-lg font-semibold text-[#C8A97E]">ab €70</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#C8A97E] transition-colors duration-300">Aufführungs Coaching</h3>
                <p className="text-gray-300 mb-4">Perfektioniere deine Bühnenpräsenz</p>
                <ul className="space-y-2 flex-grow">
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Bühnenperformance
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Mikrofonarbeit
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Gestik & Mimik
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Auftrittsvorbereitung
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Piano/Vocal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-[#C8A97E]/20 transition-all duration-500 shadow-lg hover:shadow-[#C8A97E]/5"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/vocal-coaching/images/services/piano.jpg"
                  alt="Piano/Vocal Coordination"
                  fill
                  className="object-cover transition-all duration-700 scale-110 blur-[2px] group-hover:blur-none group-hover:scale-125"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-500" />
              </div>
              <div className="relative p-6 flex flex-col h-full min-h-[400px] transform transition-transform duration-500">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-2 rounded-lg bg-[#C8A97E]/20 backdrop-blur-md">
                    <BookOpen className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <span className="text-lg font-semibold text-[#C8A97E]">ab €65</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#C8A97E] transition-colors duration-300">Piano/Vocal-Koordination</h3>
                <p className="text-gray-300 mb-4">Lerne dich selbst zu begleiten</p>
                <ul className="space-y-2 flex-grow">
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Grundlegende Klaviertechnik
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Begleitpatterns
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Rhythmische Koordination
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2 text-[#C8A97E]">•</span>
                    Song-Arrangements
                  </li>
                </ul>
              </div>
            </motion.div>
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

