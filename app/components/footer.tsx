"use client"

import { createElement } from "react"
import { Shield, FileText, Scale } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import LegalDocumentModal from "./legal-document-modal"
import dynamic from "next/dynamic"

// Dynamically import legal document contents
const DatenschutzContent = dynamic(
  () => import("@/app/legal/datenschutz/page").catch(() => () => (
    <div className="text-red-500">Failed to load Datenschutz content</div>
  )),
  {
    loading: () => <p className="text-gray-400">Loading...</p>,
    ssr: false
  }
)

const AGBContent = dynamic(
  () => import("@/app/legal/agb/page").catch(() => () => (
    <div className="text-red-500">Failed to load AGB content</div>
  )),
  {
    loading: () => <p className="text-gray-400">Loading...</p>,
    ssr: false
  }
)

const ImpressumContent = dynamic(
  () => import("@/app/legal/impressum/page").catch(() => () => (
    <div className="text-red-500">Failed to load Impressum content</div>
  )),
  {
    loading: () => <p className="text-gray-400">Loading...</p>,
    ssr: false
  }
)

export default function Footer() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const legalDocs = [
    {
      title: "Datenschutz",
      description: "Datenschutz & Privatsphäre",
      icon: Shield,
      color: "from-[#C8A97E]/20 to-[#B69A6E]/20",
      component: DatenschutzContent
    },
    {
      title: "AGB",
      description: "Geschäftsbedingungen",
      icon: FileText,
      color: "from-[#C8A97E]/20 to-[#B69A6E]/20",
      component: AGBContent
    },
    {
      title: "Impressum",
      description: "Rechtliche Informationen",
      icon: Scale,
      color: "from-[#C8A97E]/20 to-[#B69A6E]/20",
      component: ImpressumContent
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        {/* Legal Documents */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading mb-4">Rechtliche Informationen</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legalDocs.map((doc, index) => (
              <motion.button 
                key={doc.title}
                onClick={() => setSelectedDoc(doc.title)}
                className="relative group w-full text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className={`relative overflow-hidden rounded-xl p-6 border border-[#C8A97E]/10 bg-gradient-to-br ${doc.color}
                            transition-all duration-300 group-hover:border-[#C8A97E]/30 h-full`}
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/5 via-transparent to-transparent opacity-60" />
                  <div className="relative z-10">
                    <div className="p-3 rounded-xl bg-[#C8A97E]/10 inline-block mb-4">
                      <doc.icon className="w-6 h-6 text-[#C8A97E]" />
                    </div>
                    <h4 className="text-xl font-medium text-white mb-2">{doc.title}</h4>
                    <p className="text-gray-400 text-sm">{doc.description}</p>
                    <div className="mt-4 text-[#C8A97E] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Mehr erfahren →
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center text-gray-400 text-sm">
            © 2024 Melanie Wainwright. Alle Rechte vorbehalten.
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