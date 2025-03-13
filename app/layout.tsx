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
        {/* GTranslate: a simpler approach */}
        <Script id="gtranslate" strategy="afterInteractive">
          {`
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
                  .goog-te-gadget {
                    height: 0 !important;
                    overflow: hidden !important;
                  }
                  .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-ORHb-OEVmcd {
                    display: none !important;
                  }
                \`;
                document.head.appendChild(style);
              }, 1000);
            }
            
            function doGTranslate(lang_pair) {
              if (lang_pair.value) lang_pair = lang_pair.value;
              if (lang_pair == '') return;
              var lang = lang_pair.split('|')[1];
              
              // Try multiple methods to trigger translation
              
              // Method 1: Direct Google API call
              if (google && google.translate) {
                var teCombo = document.querySelector('.goog-te-combo');
                if (teCombo) {
                  teCombo.value = lang;
                  if (document.createEvent) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent('change', true, true);
                    teCombo.dispatchEvent(event);
                  } else {
                    teCombo.fireEvent('onchange');
                  }
                }
              }
              
              // Method 2: Try to use the GTranslate cookie method
              var now = new Date();
              var expTime = now.getTime() + 1000 * 3600 * 24 * 30; // 30 days
              now.setTime(expTime);
              document.cookie = 'googtrans=/de/' + lang + ';expires=' + now.toGMTString() + ';path=/;domain=' + location.hostname;
              
              // Method 3: Force reload with the new language
              if (lang === 'en') {
                // Only reload if we're switching to English
                location.reload();
              }
            }
            
            // Create an observer to remove Google Translate's top bar
            document.addEventListener('DOMContentLoaded', function() {
              const observer = new MutationObserver(function() {
                if (document.body.style.top) {
                  document.body.style.top = '';
                }
                const banner = document.querySelector('.goog-te-banner-frame');
                if (banner) {
                  banner.style.display = 'none';
                }
              });
              
              observer.observe(document.body, { 
                attributes: true, 
                childList: true,
                subtree: true,
                attributeFilter: ['style']
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