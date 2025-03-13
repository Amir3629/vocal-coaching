"use client"

import { createElement } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import LegalDocumentModal from "./legal-document-modal"
import dynamic from "next/dynamic"
import Image from "next/image"
import { X } from "lucide-react"
import TranslatedText from "./translated-text"

// Dynamically import legal document contents
const DatenschutzContent = dynamic(
  () => import("@/app/legal/datenschutz/page").catch(() => () => (
    <div className="text-red-500">Failed to load Datenschutz content</div>
  )),
  { loading: () => <p className="text-gray-400">Loading...</p>, ssr: false }
)

const AGBContent = dynamic(
  () => import("@/app/legal/agb/page").catch(() => () => (
    <div className="text-red-500">Failed to load AGB content</div>
  )),
  { loading: () => <p className="text-gray-400">Loading...</p>, ssr: false }
)

const ImpressumContent = dynamic(
  () => import("@/app/legal/impressum/page").catch(() => () => (
    <div className="text-red-500">Failed to load Impressum content</div>
  )),
  { loading: () => <p className="text-gray-400">Loading...</p>, ssr: false }
)

export default function Footer() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedDoc(null);
    document.body.style.overflow = 'unset';
  };

  const legalDocs = [
    { title: "Datenschutz", component: DatenschutzContent },
    { title: "AGB", component: AGBContent },
    { title: "Impressum", component: ImpressumContent }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/singingJazz/",
      icon: (props: any) => (
        <motion.svg 
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </motion.svg>
      )
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/jazzamell/?hl=en", 
      icon: (props: any) => (
        <motion.svg 
          whileHover={{ scale: 1.2, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </motion.svg>
      )
    },
    { 
      name: "YouTube", 
      href: "https://www.youtube.com/@jazzamell", 
      icon: (props: any) => (
        <motion.svg 
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </motion.svg>
      )
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/jazzamell",
      icon: (props: any) => (
        <motion.svg
          whileHover={{ scale: 1.2, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </motion.svg>
      )
    }
  ];

  return (
    <footer className="bg-[#040202] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-[#C8A97E] font-medium text-lg mb-6">
              <TranslatedText text="Kontakt" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C8A97E]" />
                <span>
                  <TranslatedText text="Prenzlauer Berg, Berlin" />
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A97E]" />
                <a href="mailto:info@melvocalcoaching.de" className="hover:text-[#C8A97E] transition-colors">
                  info@melvocalcoaching.de
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8A97E]" />
                <a href="tel:+491234567890" className="hover:text-[#C8A97E] transition-colors">
                  +49 123 456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-[#C8A97E] font-medium text-lg mb-6">
              <TranslatedText text="Öffnungszeiten" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C8A97E]" />
                <div>
                  <p><TranslatedText text="Mo-Fr: 10:00 - 20:00" /></p>
                  <p><TranslatedText text="Sa: Nach Vereinbarung" /></p>
                  <p><TranslatedText text="So: Geschlossen" /></p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C8A97E] font-medium text-lg mb-6">
              <TranslatedText text="Links" />
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/datenschutz" className="hover:text-[#C8A97E] transition-colors">
                  <TranslatedText text="Datenschutz" />
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-[#C8A97E] transition-colors">
                  <TranslatedText text="Impressum" />
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-[#C8A97E] transition-colors">
                  <TranslatedText text="AGB" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[#C8A97E] font-medium text-lg mb-6">
              <TranslatedText text="Social Media" />
            </h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>
            <TranslatedText text="© 2024 Mel Vocal Coaching. Alle Rechte vorbehalten." />
          </p>
        </div>
      </div>

      {/* Legal Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-[#0A0A0A] rounded-xl border-2 border-[#C8A97E]/20 shadow-2xl w-[90%] max-w-2xl max-h-[85vh] overflow-hidden z-[101]">
            <div className="flex items-center justify-end p-4 border-b border-[#C8A97E]/20">
              <button
                onClick={handleCloseModal}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
              {selectedDoc && legalDocs.find(doc => doc.title === selectedDoc)?.component && 
                createElement(legalDocs.find(doc => doc.title === selectedDoc)?.component!)}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}