"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import TestimonialSlider from "@/components/testimonial-slider"
import NavBar from "@/components/nav-bar"
import EnhancedMusicPlayer from "@/components/enhanced-music-player"
import VideoPreview from "@/components/video-preview"
import { Music, Mic, Theater, BookOpen } from "lucide-react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    setIsLoaded(true)
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-[#121212] to-black">
      <NavBar />

      {/* Hero Section with Parallax Piano Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black"></div>
          <motion.div
            ref={parallaxRef}
            style={{ y }}
            className="absolute inset-0"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2025-02-27_12-05-55.jpg-vHy1xAg4cTBDQj5oywjYg7zrddMHHL.jpeg"
              alt="Piano background"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
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
              onClick={() => scrollToSection("contact")}
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meine Musik</h2>
            <div className="w-24 h-1 bg-[#C8A97E] mx-auto"></div>
          </motion.div>
          <EnhancedMusicPlayer />
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-20 px-4 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Video Preview</h2>
            <div className="w-24 h-1 bg-[#C8A97E] mx-auto"></div>
          </motion.div>
          <VideoPreview />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-black to-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meine Dienstleistungen</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_11_2025-02-27_12-05-55.jpg-6rTsVwAFGiPlAxk7xymEzMrRGZwQnm.jpeg"
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
                  "Harmonische Konzepte verstehen",
                  "Improvisationsübungen",
                  "Feedback zu Ihren Scat-Soli"
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
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2025-02-23_22-12-02.jpg-8OuJRul2KzJEJFH6jdcKErEnyECvlE.jpeg"
              delay={0.3}
            />
            
            <ServiceCard 
              title="Aufführungs Coaching"
              description="Entwickeln Sie eine fesselnde Bühnenpräsenz und Aufführungskompetenz."
              icon={<Theater />}
              price="Ab €75/Stunde"
              features={[
                "Mikrophon-Technik",
                "Bühnenbewegung & Präsenz",
                "Publikumsverbindung",
                "Umgang mit Auftrittsangst"
              ]}
              details={{
                includes: [
                  "Analyse Ihrer Bühnenpräsenz",
                  "Entwicklung einer Performance-Persona",
                  "Umgang mit Lampenfieber",
                  "Tipps zur Interaktion mit dem Publikum"
                ],
                suitable: [
                  "Sänger vor Auftritten",
                  "Schauspieler",
                  "Redner",
                  "Alle, die selbstbewusster auftreten möchten"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte"
              }}
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_8_2025-02-27_12-05-55.jpg-sNRaMlRVbFZELWanLPs38g3xYoEsnk.jpeg"
              delay={0.5}
            />
            
            <ServiceCard 
              title="Piano/Vocal-Koordination"
              description="Erlernen Sie sich beim Singen mit Stil und Selbstvertrauen zu begleiten."
              icon={<BookOpen />}
              price="Ab €80/Stunde"
              features={[
                "Grundlegende Klaviertechnik",
                "Vokale Unabhängigkeit",
                "Jazz-Akkorde & Begleitung",
                "Arrangementsfähigkeiten"
              ]}
              details={{
                includes: [
                  "Grundlagen der Klavierbegleitung",
                  "Akkordlehre für Sänger",
                  "Rhythmus- und Timing-Übungen",
                  "Song-Arrangement-Techniken"
                ],
                suitable: [
                  "Sänger mit Interesse am Klavier",
                  "Pianisten, die ihre Gesangsfähigkeiten verbessern möchten",
                  "Songwriter",
                  "Musiker, die ihre musikalischen Fähigkeiten erweitern möchten"
                ],
                duration: "60 Minuten",
                location: "Studio Berlin-Mitte"
              }}
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2025-02-27_12-05-55.jpg-G6fdVmyiPkIniCeOYYUOudawTxqxV3.jpeg"
              delay={0.7}
            />
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-600 hover:border-amber-700 rounded-full px-8 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Jetzt Buchen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative h-[500px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2025-02-27_12-05-55.jpg-ANum1NM236GBAqcRIe3qApeR3q8f0w.jpeg"
                alt="Melanie Wainwright"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Über Mich</h2>
              <div className="w-24 h-1 bg-amber-600 mb-6"></div>
              <p className="text-lg text-gray-300">
                Mit über 15 Jahren Erfahrung als professionelle Jazzsängerin und engagierte Gesangslehrerin bringe ich eine einzigartige Perspektive in meinen Unterricht. Mein Ansatz verbindet technisches Fachwissen mit künstlerischem Ausdruck und hilft jedem Schüler, seine authentische Stimme zu entdecken.
              </p>
              <p className="text-lg text-gray-300">
                Nach meinem Studium an renommierten Musikinstitutionen in New York und Berlin habe ich in Jazzclubs in ganz Europa aufgetreten und mit bekannten Musikern der Branche zusammengearbeitet. Diese Erfahrungen aus der Praxis fließen in meinen Unterricht ein und ermöglichen es mir, Schüler nicht nur auf das Singen, sondern auch auf die Realitäten von Auftritten und künstlerischer Karriereentwicklung vorzubereiten.
              </p>
              <p className="text-lg text-gray-300">
                Meine Unterrichtsphilosophie basiert auf Individualisierung. Ich glaube, dass jede Stimme einzigartig ist, und meine Aufgabe ist es, dir zu helfen, deinen unverwechselbaren Klang zu entdecken und dir gleichzeitig die technische Grundlage zu vermitteln, um dich selbstbewusst und authentisch auszudrücken.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-600 hover:border-amber-700 rounded-full px-8 transition-all duration-300 mt-4"
              >
                Mehr Erfahren
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-[#121212] to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Galerie</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_12_2025-02-27_12-05-55.jpg-ryaVh9GGT4MXcnF9crtCIDQnCaGbJO.jpeg"
                alt="Melanie performing at The Hat"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Live at The Hat Jazz Club</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2025-02-27_12-05-55.jpg-6FwWNn89RJcZ5orl5wUfNqP2vJPoAo.jpeg"
                alt="Melanie with her band"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Melanie Wainwright Quintet</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_8_2025-02-27_12-05-55.jpg-sNRaMlRVbFZELWanLPs38g3xYoEsnk.jpeg"
                alt="Melanie performing with bassist"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Jazz Duo Performance</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2025-02-27_12-05-55.jpg-hDIOA09gY6nflcoMU7aMIF3QqrwUco.jpeg"
                alt="Melanie in recording studio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Studio Recording Session</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2025-02-27_12-05-55.jpg-G6fdVmyiPkIniCeOYYUOudawTxqxV3.jpeg"
                alt="Melanie with student"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Coaching Session</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2025-02-23_22-12-02.jpg-8OuJRul2KzJEJFH6jdcKErEnyECvlE.jpeg"
                alt="Melanie with light installation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Artistic Performance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </motion.div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black to-[#121212]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Haben Sie Fragen oder möchten Sie eine Unterrichtsstunde buchen? Füllen Sie das Formular aus, und ich werde mich so schnell wie möglich bei Ihnen melden.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[#1a1a1a] rounded-xl p-8 shadow-xl border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg focus:ring-amber-600 focus:border-amber-600 transition-colors duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg focus:ring-amber-600 focus:border-amber-600 transition-colors duration-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Betreff
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg focus:ring-amber-600 focus:border-amber-600 transition-colors duration-300"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg focus:ring-amber-600 focus:border-amber-600 transition-colors duration-300"
                  required
                ></textarea>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-600 hover:border-amber-700 rounded-full py-3 transition-all duration-300"
                >
                  Nachricht Senden
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#121212] border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Melanie Wainwright</h3>
              <p className="text-gray-400 mb-4">Jazz Vocal Coaching in Berlin</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.\

