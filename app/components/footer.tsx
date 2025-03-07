"use client"

import { createElement } from "react"
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import LegalDocumentModal from "./legal-document-modal"
import dynamic from "next/dynamic"

// Dynamically import legal document contents
const DatenschutzContent = dynamic(() => import("@/app/legal/datenschutz/page"))
const AGBContent = dynamic(() => import("@/app/legal/agb/page"))
const ImpressumContent = dynamic(() => import("@/app/legal/impressum/page"))

export default function Footer() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const legalDocs = [
    {
      title: "Datenschutz",
      description: "Informationen zum Datenschutz und zur Datenverarbeitung",
      color: "from-blue-500/20 to-blue-600/20",
      component: DatenschutzContent
    },
    {
      title: "AGB",
      description: "Allgemeine Geschäftsbedingungen",
      color: "from-amber-500/20 to-amber-600/20",
      component: AGBContent
    },
    {
      title: "Impressum",
      description: "Rechtliche Informationen und Kontaktdaten",
      color: "from-emerald-500/20 to-emerald-600/20",
      component: ImpressumContent
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Original content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Column 1 - Brand */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Melanie Wainwright</h2>
              <p className="text-gray-400 mb-4">Jazz Vocal Coaching in Berlin</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#C8A97E] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#C8A97E] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#C8A97E] transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2 - Contact */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#C8A97E]" />
                  <span>Berlin-Mitte, Deutschland</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <Mail className="w-5 h-5 text-[#C8A97E]" />
                  <span>info@melaniewainwright.com</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <Phone className="w-5 h-5 text-[#C8A97E]" />
                  <span>+49 123 456 7890</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <Clock className="w-5 h-5 text-[#C8A97E]" />
                  <span>Mo-Fr: 09:00-21:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Legal cards and Institutions */}
          <div className="space-y-8">
            {/* Institutions & Partners */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Institutionen & Partner</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#C8A97E] transition-colors">Complete Vocal Institute</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#C8A97E] transition-colors">CVT Deutschland</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#C8A97E] transition-colors">B-Flat Jazz Club Berlin</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#C8A97E] transition-colors">Chor Next Door</a>
                </li>
              </ul>
            </div>

            {/* Legal Document Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {legalDocs.map((doc) => (
                <button 
                  key={doc.title}
                  onClick={() => setSelectedDoc(doc.title)}
                  onMouseEnter={() => setHoveredCard(doc.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group w-full text-left"
                >
                  <motion.div 
                    className={`relative overflow-hidden rounded-xl p-4 border border-white/10 bg-gradient-to-br ${doc.color} backdrop-blur-sm
                              transition-all duration-300 group-hover:border-[#C8A97E]/20`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <div className="relative z-10">
                      <h4 className="text-white font-medium mb-1">{doc.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{doc.description}</p>
                      <ChevronRight className={`w-5 h-5 transition-all duration-300 
                        ${hoveredCard === doc.title ? 'text-[#C8A97E]' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="text-center text-gray-400 text-sm">
            © 2024 Melanie Wainwright. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>

      {/* Legal Document Modal */}
      {selectedDoc && (
        <LegalDocumentModal
          isOpen={true}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc}
        >
          {legalDocs.find(doc => doc.title === selectedDoc)?.component && (
            <div className="legal-content">
              {createElement(legalDocs.find(doc => doc.title === selectedDoc)?.component!)}
            </div>
          )}
        </LegalDocumentModal>
      )}
    </footer>
  )
} 