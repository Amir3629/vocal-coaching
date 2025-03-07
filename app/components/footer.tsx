"use client"

import { createElement } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock } from "lucide-react"
import Link from "next/link"
import LegalDocumentModal from "./legal-document-modal"
import dynamic from "next/dynamic"

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

  const legalDocs = [
    { title: "Datenschutz", component: DatenschutzContent },
    { title: "AGB", component: AGBContent },
    { title: "Impressum", component: ImpressumContent }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl text-white mb-4">Melanie Wainwright</h3>
            <p className="text-gray-400 mb-4">Jazz Vocal Coaching in Berlin</p>
            <div className="flex gap-2 text-sm text-gray-400">
              {legalDocs.map((doc, index) => (
                <>
                  <button
                    key={doc.title}
                    onClick={() => setSelectedDoc(doc.title)}
                    className="hover:text-[#C8A97E] transition-colors"
                  >
                    {doc.title}
                  </button>
                  {index < legalDocs.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-xl text-white mb-4">Kontakt</h3>
            <div className="space-y-2 text-gray-400">
              <p>Berlin-Mitte, Deutschland</p>
              <p>info@melaniewainwright.com</p>
              <p>+49 123 456 7890</p>
              <p>Mo-Fr: 10:00-20:00</p>
            </div>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h3 className="text-xl text-white mb-4">Institutionen & Partner</h3>
            <div className="space-y-2 text-gray-400">
              <p>Complete Vocal Institute</p>
              <p>CVT Deutschland</p>
              <p>B-Flat Jazz Club Berlin</p>
              <p>Chor Next Door</p>
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
            {legalDocs.find(doc => doc.title === selectedDoc)?.component && 
              createElement(legalDocs.find(doc => doc.title === selectedDoc)?.component!)}
          </LegalDocumentModal>
        )}
      </div>
    </footer>
  )
}