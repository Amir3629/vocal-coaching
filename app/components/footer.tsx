"use client"

import { createElement } from "react"
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
      component: DatenschutzContent
    },
    {
      title: "AGB",
      component: AGBContent
    },
    {
      title: "Impressum",
      component: ImpressumContent
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading mb-4">Institutionen & Partner</h2>
            <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
          </motion.div>

          {/* Legal Links */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center gap-6 text-sm">
              {legalDocs.map((doc, index) => (
                <>
                  <button
                    key={doc.title}
                    onClick={() => setSelectedDoc(doc.title)}
                    className="text-gray-400 hover:text-[#C8A97E] transition-colors"
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