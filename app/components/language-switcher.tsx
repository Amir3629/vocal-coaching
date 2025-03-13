"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { motion } from "framer-motion"

// Add Google Translate type definitions
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
          new (options: any, element: string): any;
        };
      };
    };
  }
}

// Keep the translations for components that don't get translated by Google Translate
const translations = {
  de: {
    nav: {
      home: "Start",
      services: "Unterricht",
      about: "Über mich",
      references: "Referenzen & Kooperationen",
      testimonials: "Erfahrungen",
      contact: "Kontakt",
    },
    hero: {
      title: "Entdecke deine Stimme",
      subtitle: "Professionelles Vocal Coaching in Berlin",
      cta: "Jetzt buchen"
    },
    music: {
      title: "Meine Musik"
    },
    video: {
      title: "Einblicke"
    },
    services: {
      title: "Angebote",
      singing: {
        title: "Gesangsunterricht",
        description: "Individueller Unterricht für alle Level",
        features: [
          "Stimmbildung",
          "Atemtechnik",
          "Interpretation",
          "Bühnenpräsenz"
        ],
        details: {
          includes: [
            "Stimmanalyse",
            "Individueller Trainingsplan",
            "Aufnahmen",
            "Übe-Material"
          ],
          suitable: [
            "Anfänger",
            "Fortgeschrittene",
            "Profis",
            "Alle Genres"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      }
    },
    about: {
      title: "Über mich",
      intro: "Professionelle Sängerin & Vocal Coach",
      expanded: "Mit jahrelanger Erfahrung im Gesangsunterricht...",
      projects: {
        title: "Aktuelle Projekte",
        description: "Entdecken Sie meine aktuellen musikalischen Projekte"
      },
      more: "Mehr erfahren",
      less: "Weniger anzeigen"
    },
    references: {
      title: "Referenzen & Kooperationen"
    },
    testimonials: {
      title: "Erfahrungen"
    },
    contact: {
      title: "Kontakt",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        send: "Senden"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Lessons",
      about: "About",
      references: "References & Collaborations",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      title: "Discover Your Voice",
      subtitle: "Professional Vocal Coaching in Berlin",
      cta: "Book Now"
    },
    music: {
      title: "My Music"
    },
    video: {
      title: "Insights"
    },
    services: {
      title: "Services",
      singing: {
        title: "Singing Lessons",
        description: "Individual lessons for all levels",
        features: [
          "Voice Training",
          "Breathing Technique",
          "Interpretation",
          "Stage Presence"
        ],
        details: {
          includes: [
            "Voice Analysis",
            "Individual Training Plan",
            "Recordings",
            "Practice Material"
          ],
          suitable: [
            "Beginners",
            "Advanced",
            "Professionals",
            "All Genres"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      }
    },
    about: {
      title: "About Me",
      intro: "Professional Singer & Vocal Coach",
      expanded: "With years of experience in vocal training...",
      projects: {
        title: "Current Projects",
        description: "Discover my current musical projects"
      },
      more: "Learn More",
      less: "Show Less"
    },
    references: {
      title: "References & Collaborations"
    },
    testimonials: {
      title: "Testimonials"
    },
    contact: {
      title: "Contact",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send"
      }
    }
  }
}

const LanguageContext = createContext<{
  currentLang: string
  toggleLanguage: () => void
  t: typeof translations.de | typeof translations.en
}>({
  currentLang: "de",
  toggleLanguage: () => {},
  t: translations.de,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState("de")
  const [isTranslating, setIsTranslating] = useState(false)

  // Function to toggle Google Translate
  const toggleGoogleTranslate = () => {
    if (typeof window !== 'undefined') {
      const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
      
      if (iframe) {
        // If iframe exists, find the document inside it
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (iframeDoc) {
          // Find the language links inside the iframe
          const links = iframeDoc.querySelectorAll('a.goog-te-menu2-item');
          
          // Click the appropriate language link
          links.forEach((link) => {
            const typedLink = link as HTMLAnchorElement;
            const langSpan = typedLink.querySelector('span.text');
            if (langSpan) {
              const langText = langSpan.textContent || '';
              if ((currentLang === 'de' && langText.includes('English')) || 
                  (currentLang === 'en' && langText.includes('German'))) {
                typedLink.click();
              }
            }
          });
        }
      } else {
        // If iframe doesn't exist yet, use the select element
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          select.value = currentLang === 'de' ? 'en' : 'de';
          select.dispatchEvent(new Event('change'));
        }
      }
    }
  };

  const toggleLanguage = () => {
    setIsTranslating(true);
    
    // Toggle the language state
    setCurrentLang((prev) => {
      const newLang = prev === "de" ? "en" : "de";
      
      // Use Google Translate API to translate the page
      if (typeof window !== 'undefined' && window.google && window.google.translate) {
        try {
          toggleGoogleTranslate();
        } catch (error) {
          console.error('Error toggling Google Translate:', error);
        }
      }
      
      return newLang;
    });
    
    setTimeout(() => {
      setIsTranslating(false);
    }, 1000);
  }

  // Initialize Google Translate
  useEffect(() => {
    // This will run once after the component mounts
    const initGoogleTranslate = () => {
      if (typeof window !== 'undefined' && window.google && window.google.translate) {
        // Google Translate is loaded
        console.log('Google Translate is loaded');
      }
    };

    // Check if Google Translate is already loaded
    if (typeof window !== 'undefined' && window.google && window.google.translate) {
      initGoogleTranslate();
    } else {
      // If not loaded yet, wait for it
      const checkGoogleTranslate = setInterval(() => {
        if (typeof window !== 'undefined' && window.google && window.google.translate) {
          clearInterval(checkGoogleTranslate);
          initGoogleTranslate();
        }
      }, 100);
      
      // Clear interval after 10 seconds to prevent memory leaks
      setTimeout(() => {
        clearInterval(checkGoogleTranslate);
      }, 10000);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        toggleLanguage,
        t: translations[currentLang as keyof typeof translations],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = () => {
    setIsLoading(true);
    toggleLanguage();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
    >
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${currentLang === "de" ? "text-[#C8A97E]" : "text-white/60"}`}>
          DE
        </span>
        <span className="text-white/30">|</span>
        <span className={`text-sm font-medium ${currentLang === "en" ? "text-[#C8A97E]" : "text-white/60"}`}>
          EN
        </span>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
          <div className="w-4 h-4 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.button>
  )
} 