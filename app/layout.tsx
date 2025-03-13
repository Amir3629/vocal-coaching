import type React from "react"
import "./globals.css"
import "./styles/responsive.css"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import CookieConsent from "./components/cookie-consent"
import Footer from "./components/footer"
import { LanguageProvider } from "./components/language-switcher"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Mel jazz - Vocal Coaching in Berlin",
  description: "Professional vocal coaching and performance in Berlin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`dark-theme-black ${playfair.variable}`}>
      <head>
        {/* Google Translate Integration */}
        <Script id="gtranslate" strategy="afterInteractive">
          {`
            // Flag to track if translation has been initialized
            window.translationInitialized = false;
            
            // Google Translate initialization
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'de',
                includedLanguages: 'en,de',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
              
              // Hide Google's default widget
              setTimeout(() => {
                const translateBar = document.querySelector('.skiptranslate');
                if (translateBar) {
                  translateBar.style.display = 'none';
                }
                
                // Add custom CSS to hide Google Translate elements
                const style = document.createElement('style');
                style.textContent = \`
                  body {
                    top: 0 !important;
                  }
                  .goog-te-banner-frame, .skiptranslate {
                    display: none !important;
                    visibility: hidden !important;
                  }
                  .goog-te-gadget {
                    height: 0 !important;
                    overflow: hidden !important;
                  }
                  .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-ORHb-OEVmcd {
                    display: none !important;
                  }
                \`;
                document.head.appendChild(style);
                
                // Force reset to German if needed
                const savedLang = localStorage.getItem('preferredLanguage');
                if (!savedLang || savedLang === 'de') {
                  resetToGerman();
                }
                
                window.translationInitialized = true;
              }, 1000);
            }
            
            // Function to reset to German
            function resetToGerman() {
              const iframe = document.querySelector('.goog-te-menu-frame');
              if (iframe) {
                const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                const germanLink = innerDoc.querySelector('a[href*="LANG=de"]');
                if (germanLink) {
                  germanLink.click();
                }
              }
              
              // Also try direct method
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = 'de';
                const event = new Event('change');
                selectElement.dispatchEvent(event);
              }
            }
            
            // Improved global function to trigger translation
            window.translateTo = function(lang) {
              if (lang !== 'de' && lang !== 'en') return;
              
              // Wait for translation to be initialized
              if (!window.translationInitialized) {
                setTimeout(() => window.translateTo(lang), 500);
                return;
              }
              
              // Special handling for German to ensure it works properly
              if (lang === 'de') {
                resetToGerman();
                return;
              }
              
              // For English, use the standard approach
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = lang;
                const event = new Event('change');
                selectElement.dispatchEvent(event);
              }
            };
          `}
        </Script>
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          {/* Hidden Google Translate Element */}
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          
          {children}
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}

import './globals.css'