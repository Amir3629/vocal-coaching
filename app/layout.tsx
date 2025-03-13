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
        {/* Google Translate Integration - Hidden but functional */}
        <Script id="gtranslate" strategy="afterInteractive">
          {`
            // Set default language to German
            function setCookie(name, value, days) {
              var expires = "";
              if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
              }
              document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            
            function getCookie(name) {
              var nameEQ = name + "=";
              var ca = document.cookie.split(';');
              for(var i=0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
            }
            
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
                
                // Check if we need to initialize with English
                const savedLang = localStorage.getItem('preferredLanguage');
                if (savedLang === 'en') {
                  // Set the Google Translate cookie directly
                  setCookie('googtrans', '/de/en', 1);
                  
                  // Force reload once to apply the translation
                  if (!sessionStorage.getItem('initialTranslationDone')) {
                    sessionStorage.setItem('initialTranslationDone', 'true');
                    location.reload();
                  }
                }
              }, 1000);
            }
            
            // Make this function available globally
            window.doGTranslate = function(lang_pair) {
              if (lang_pair.value) lang_pair = lang_pair.value;
              if (lang_pair == '') return;
              var lang = lang_pair.split('|')[1];
              
              // Set the Google Translate cookie directly
              setCookie('googtrans', '/de/' + lang, 1);
              
              // Try to use the Google Translate select element
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
              
              // Force a reload if needed for stubborn translations
              if (getCookie('googtrans') !== '/de/' + lang) {
                location.reload();
              }
            }
            
            // Create an observer to remove Google Translate's top bar
            document.addEventListener('DOMContentLoaded', function() {
              const observer = new MutationObserver(function() {
                if (document.body && document.body.style.top) {
                  document.body.style.top = '';
                }
                const banner = document.querySelector('.goog-te-banner-frame');
                if (banner) {
                  banner.style.display = 'none';
                }
              });
              
              if (document.body) {
                observer.observe(document.body, { 
                  attributes: true, 
                  childList: true,
                  subtree: true,
                  attributeFilter: ['style']
                });
              }
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