"use client"

import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, Clock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Column 3 - Institutions & Partners */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Institutionen & Partner</h3>
            <div className="grid grid-cols-2 gap-x-4">
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
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/legal/datenschutz" className="hover:text-[#C8A97E] transition-colors">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/legal/agb" className="hover:text-[#C8A97E] transition-colors">
                    AGB
                  </Link>
                </li>
                <li>
                  <Link href="/legal/impressum" className="hover:text-[#C8A97E] transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/legal/meine-rechte" className="hover:text-[#C8A97E] transition-colors">
                    Meine Rechte
                  </Link>
                </li>
              </ul>
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
    </footer>
  )
} 