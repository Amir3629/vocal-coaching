import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import all translations
const translations = {
  en: {
    translation: {
      nav: {
        home: "Home",
        services: "Services",
        about: "About",
        references: "References",
        testimonials: "Testimonials",
        contact: "Contact"
      },
      hero: {
        title: "Mel Jazz",
        subtitle: "Professional Vocal Coaching in Berlin",
        cta: "Discover Services"
      },
      services: {
        title: "Services",
        singing: {
          title: "Singing",
          subtitle: "Vocal Training for Everyone",
          description: "Professional voice training for bands, musicians, and ambitious singers - tailored to your artistic development.",
          features: [
            "Basic Techniques",
            "Voice Formation",
            "Breathing Technique",
            "Song Interpretation"
          ],
          details: {
            includes: [
              "Voice Analysis",
              "Basic Training",
              "Song Selection",
              "Practice Material"
            ],
            suitable: [
              "Bands",
              "Musicians",
              "Beginners",
              "Advanced"
            ],
            duration: "45-60 minutes",
            location: "Studio Berlin / Online"
          }
        },
        coaching: {
          title: "Vocal Coaching",
          subtitle: "Professional Coaching",
          description: "CVT-based voice training for professionals - develop your unique voice and performance at the highest level.",
          features: [
            "CVT Technique",
            "Performance",
            "Repertoire",
            "Style Development"
          ],
          details: {
            includes: [
              "CVT Voice Analysis",
              "Technical Training",
              "Repertoire Building",
              "Performance Preparation"
            ],
            suitable: [
              "Professionals",
              "Semi-Professionals",
              "Advanced"
            ],
            duration: "60-90 minutes",
            location: "Studio Berlin / Online"
          }
        },
        workshop: {
          title: "Workshop",
          subtitle: "Individual & Intensive",
          description: "Tailored intensive workshops for a profound experience in your vocal development.",
          features: [
            "Ensemble Work",
            "Harmony Theory",
            "Improvisation",
            "Performance Practice"
          ],
          details: {
            includes: [
              "Intensive Training",
              "Theory & Practice",
              "Individual Feedback",
              "Performance Preparation"
            ],
            suitable: [
              "Individuals",
              "Small Groups",
              "Bands"
            ],
            duration: "From 3 hours (€600)",
            location: "By Arrangement"
          }
        },
        choir: {
          title: "Choir Next Door",
          subtitle: "Singing Together",
          description: "Discover the joy of singing together in our dynamic neighborhood choir - open to all levels.",
          features: [
            "Multi-Voice",
            "Harmony",
            "Rhythm",
            "Community"
          ],
          details: {
            includes: [
              "Voice Training",
              "Choral Singing",
              "Performances",
              "Events"
            ],
            suitable: [
              "All Levels",
              "Neighbors",
              "Music Enthusiasts"
            ],
            duration: "90-120 minutes",
            location: "Studio Berlin"
          }
        }
      },
      references: {
        title: "References & Collaborations"
      },
      testimonials: {
        title: "What People Say",
        subtitle: "Testimonials from students and collaborators"
      },
      contact: {
        title: "Get in Touch",
        subtitle: "Book your session or ask any questions",
        form: {
          name: "Your Name",
          email: "Your Email",
          message: "Your Message",
          submit: "Send Message"
        }
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: "Start",
        services: "Leistungen",
        about: "Über mich",
        references: "Referenzen",
        testimonials: "Bewertungen",
        contact: "Kontakt"
      },
      hero: {
        title: "Mel Jazz",
        subtitle: "Professionelles Vocal Coaching in Berlin",
        cta: "Leistungen entdecken"
      },
      services: {
        title: "Leistungen",
        singing: {
          title: "Singen",
          subtitle: "Gesangsunterricht für alle",
          description: "Professionelles Stimmtraining für Bands, Musiker und ambitionierte Sänger - maßgeschneidert für Ihre künstlerische Entwicklung.",
          features: [
            "Grundtechniken",
            "Stimmbildung",
            "Atemtechnik",
            "Liedinterpretation"
          ],
          details: {
            includes: [
              "Stimmanalyse",
              "Grundlagentraining",
              "Liedauswahl",
              "Übungsmaterial"
            ],
            suitable: [
              "Bands",
              "Musiker",
              "Anfänger",
              "Fortgeschrittene"
            ],
            duration: "45-60 Minuten",
            location: "Studio Berlin / Online"
          }
        },
        coaching: {
          title: "Vocal Coaching",
          subtitle: "Professionelles Coaching",
          description: "CVT-basiertes Stimmtraining für Profis - entwickeln Sie Ihre einzigartige Stimme und Performance auf höchstem Niveau.",
          features: [
            "CVT Technik",
            "Performance",
            "Repertoire",
            "Stilentwicklung"
          ],
          details: {
            includes: [
              "CVT Stimmanalyse",
              "Techniktraining",
              "Repertoireaufbau",
              "Auftrittsvorbereitung"
            ],
            suitable: [
              "Profis",
              "Semi-Profis",
              "Fortgeschrittene"
            ],
            duration: "60-90 Minuten",
            location: "Studio Berlin / Online"
          }
        },
        workshop: {
          title: "Workshop",
          subtitle: "Individuell & Intensiv",
          description: "Maßgeschneiderte Intensiv-Workshops für ein tiefgreifendes Erlebnis Ihrer stimmlichen Entwicklung.",
          features: [
            "Ensemble-Arbeit",
            "Harmonielehre",
            "Improvisation",
            "Auftritts­praxis"
          ],
          details: {
            includes: [
              "Intensivtraining",
              "Theorie & Praxis",
              "Individuelles Feedback",
              "Auftrittsvorbereitung"
            ],
            suitable: [
              "Einzelpersonen",
              "Kleine Gruppen",
              "Bands"
            ],
            duration: "Ab 3 Stunden (600€)",
            location: "Nach Vereinbarung"
          }
        },
        choir: {
          title: "Chor Next Door",
          subtitle: "Gemeinsam Singen",
          description: "Entdecken Sie die Freude am gemeinsamen Singen in unserem dynamischen Nachbarschaftschor - für alle Levels offen.",
          features: [
            "Mehrstimmigkeit",
            "Harmonie",
            "Rhythmus",
            "Gemeinschaft"
          ],
          details: {
            includes: [
              "Stimmbildung",
              "Chorgesang",
              "Auftritte",
              "Events"
            ],
            suitable: [
              "Alle Level",
              "Nachbarn",
              "Musikbegeisterte"
            ],
            duration: "90-120 Minuten",
            location: "Studio Berlin"
          }
        }
      },
      references: {
        title: "Referenzen & Kooperationen"
      },
      testimonials: {
        title: "Was andere sagen",
        subtitle: "Bewertungen von Schülern und Partnern"
      },
      contact: {
        title: "Kontakt",
        subtitle: "Buchen Sie Ihre Stunde oder stellen Sie Fragen",
        form: {
          name: "Ihr Name",
          email: "Ihre E-Mail",
          message: "Ihre Nachricht",
          submit: "Nachricht senden"
        }
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: 'de',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
