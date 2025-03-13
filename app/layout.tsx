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
            
            // Function to reset to German
            function resetToGerman() {
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = 'de';
                selectElement.dispatchEvent(new Event('change'));
              }
              
              // Also try iframe method as backup
              const iframe = document.querySelector('.goog-te-menu-frame');
              if (iframe) {
                const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                const germanLink = innerDoc.querySelector('a[href*="LANG=de"]');
                if (germanLink) germanLink.click();
              }
            }
            
            // Google Translate initialization
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'de',
                includedLanguages: 'en,de',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
              
              // Hide Google's default widget and apply fixes
              const initializeTranslation = () => {
                // Hide the default widget
                const translateBar = document.querySelector('.skiptranslate');
                if (translateBar) translateBar.style.display = 'none';
                
                // Add custom CSS to hide Google Translate elements
                const style = document.createElement('style');
                style.textContent = \`
                  body {
                    top: 0 !important;
                  }
                  .goog-te-banner-frame, 
                  .skiptranslate,
                  .goog-te-gadget-icon,
                  .goog-te-gadget-simple,
                  .VIpgJd-ZVi9od-l4eHX-hSRGPd, 
                  .VIpgJd-ZVi9od-ORHb-OEVmcd {
                    display: none !important;
                    visibility: hidden !important;
                  }
                  .goog-te-gadget {
                    height: 0 !important;
                    overflow: hidden !important;
                    position: absolute !important;
                  }
                  #goog-gt-tt, 
                  .goog-te-balloon-frame {
                    display: none !important;
                  }
                  .goog-text-highlight {
                    background: none !important;
                    box-shadow: none !important;
                  }
                \`;
                document.head.appendChild(style);
                
                // Mark as initialized
                window.translationInitialized = true;
                
                // Apply saved language preference
                const savedLang = localStorage.getItem('preferredLanguage');
                if (savedLang) {
                  setTimeout(() => window.translateTo(savedLang), 500);
                }
              };
              
              // Initialize with retry mechanism
              let attempts = 0;
              const maxAttempts = 10;
              
              function tryInitialize() {
                if (document.querySelector('.goog-te-combo')) {
                  initializeTranslation();
                } else if (attempts < maxAttempts) {
                  attempts++;
                  setTimeout(tryInitialize, 500);
                }
              }
              
              setTimeout(tryInitialize, 1000);
            }
            
            // Global function to trigger translation
            window.translateTo = function(lang) {
              if (lang !== 'de' && lang !== 'en') return;
              
              // Special handling for German
              if (lang === 'de') {
                resetToGerman();
                return;
              }
              
              // For English translation
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = lang;
                selectElement.dispatchEvent(new Event('change'));
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
          <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
          
          {children}
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
} 