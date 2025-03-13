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
    <html lang="en" className={`dark-theme-black ${playfair.variable}`}>
      <head>
        <Script id="google-translate" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'de',
                includedLanguages: 'en,de',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
              
              // Hide Google's default widget
              const translateBar = document.querySelector('.skiptranslate');
              if (translateBar) {
                translateBar.style.display = 'none';
              }
              
              // Remove Google translate iframe
              const iframe = document.querySelector('.goog-te-menu-frame');
              if (iframe) {
                iframe.style.display = 'none';
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
                .notranslate {
                  display: inline-block !important;
                }
              \`;
              document.head.appendChild(style);
            }
            
            // Observer to ensure Google Translate doesn't modify our layout
            document.addEventListener('DOMContentLoaded', function() {
              // Create an observer instance
              const observer = new MutationObserver(function(mutations) {
                // If Google adds its top bar, remove it
                if (document.body.style.top === '40px') {
                  document.body.style.top = '0px';
                }
                
                // Make sure notranslate elements stay untranslated
                document.querySelectorAll('[data-notranslate="true"]').forEach(el => {
                  if (!el.classList.contains('notranslate')) {
                    el.classList.add('notranslate');
                  }
                });
              });
              
              // Start observing the document body
              observer.observe(document.body, { 
                attributes: true,
                childList: true,
                subtree: true
              });
            });
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