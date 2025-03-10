interface Translation {
  nav: {
    home: string;
    services: string;
    about: string;
    references: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  music: {
    title: string;
  };
  video: {
    title: string;
  };
  services: {
    title: string;
    singing: {
      title: string;
      description: string;
      features: string[];
      details: {
        includes: string[];
        suitable: string[];
        duration: string;
        location: string;
      };
    };
    coaching: {
      title: string;
      description: string;
      features: string[];
      details: {
        includes: string[];
        suitable: string[];
        duration: string;
        location: string;
      };
    };
    workshop: {
      title: string;
      description: string;
      features: string[];
      details: {
        includes: string[];
        suitable: string[];
        duration: string;
        location: string;
        price: string;
      };
    };
    choir: {
      title: string;
      description: string;
      features: string[];
      details: {
        includes: string[];
        suitable: string[];
        duration: string;
        location: string;
      };
    };
    cta: string;
  };
  about: {
    title: string;
    intro: string;
    expanded: string;
    projects: {
      title: string;
      description: string;
    };
    more: string;
    less: string;
  };
  references: {
    title: string;
  };
  testimonials: {
    title: string;
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
  };
  footer: {
    subtitle: string;
    legal: {
      privacy: string;
      terms: string;
      imprint: string;
    };
    copyright: string;
    rights: string;
  };
  booking: {
    title: string;
    steps: {
      service: string;
      date: string;
      time: string;
      contact: string;
      confirm: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      terms: string;
      privacy: string;
    };
    buttons: {
      next: string;
      back: string;
      book: string;
      close: string;
    };
  };
}

interface Translations {
  EN: Translation;
  DE: Translation;
}

export const translations: Translations = {
  EN: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      references: "References",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      title: "Mel jazz",
      subtitle: "Vocal Coaching in Berlin",
      cta: "Book Now"
    },
    music: {
      title: "My Music"
    },
    video: {
      title: "Video Preview"
    },
    services: {
      title: "Vocal Excellence",
      singing: {
        title: "Singing",
        description: "Professional vocal training for bands and musicians",
        features: [
          "Voice technique & breathing exercises",
          "Repertoire development",
          "Individual goal setting",
          "Flexible scheduling"
        ],
        details: {
          includes: [
            "Personalized voice technique",
            "Repertoire development",
            "Session recordings",
            "Practice materials & feedback"
          ],
          suitable: [
            "Bands & Musicians",
            "Solo Artists",
            "Hobby Singers",
            "Professionals"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      },
      coaching: {
        title: "Vocal Coaching",
        description: "CVT-based voice training for all genres",
        features: [
          "Complete Vocal Technique",
          "Vocal health",
          "Genre-specific training",
          "Individual support"
        ],
        details: {
          includes: [
            "CVT voice analysis",
            "Personalized training plan",
            "Health-oriented training",
            "Regular feedback"
          ],
          suitable: [
            "All singing levels",
            "Various genres",
            "Professional singers",
            "Voice teachers"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      },
      workshop: {
        title: "Workshop",
        description: "Intensive vocal workshops for groups",
        features: [
          "Intensive group work",
          "Flexible scheduling",
          "Customized content",
          "From 3 hours"
        ],
        details: {
          includes: [
            "Professional training",
            "Practice-oriented exercises",
            "Group dynamics",
            "Performance preparation"
          ],
          suitable: [
            "Choirs",
            "Bands",
            "Ensembles",
            "Corporate events"
          ],
          duration: "Min. 3 hours",
          location: "By arrangement",
          price: "From €300"
        }
      },
      choir: {
        title: "Choir Next Door",
        description: "Join our innovative choir project",
        features: [
          "Modern arrangements",
          "Community experience",
          "Regular performances",
          "All levels welcome"
        ],
        details: {
          includes: [
            "Professional direction",
            "Voice training",
            "Performance opportunities",
            "Social network"
          ],
          suitable: [
            "All age groups",
            "Singing enthusiasts",
            "Beginners",
            "Advanced"
          ],
          duration: "Weekly rehearsals",
          location: "Berlin"
        }
      },
      cta: "Book Now"
    },
    about: {
      title: "About Me",
      intro: "Half British, half German - and 100% Rhinelander living voluntarily in Berlin. My musical journey started early: from children's choir through the gospel choir 'Crescendo' to 'Die Männer', one of Germany's first girl bands. Discovering Ella Fitzgerald's 'Airmail Special' opened the door to the world of jazz - love at first sight.",
      expanded: "After studying at the Cologne University of Music and Dance, I deepened my knowledge in jazz singing and improvisation. Collaborating with renowned artists and bands broadened my musical horizon and shaped my unique style.",
      projects: {
        title: "Current Projects",
        description: "As a proud member of Berlin's international jazz scene, I'm not only active as a singer but also as a vocal coach at the bandleader training in Wiesbaden. My fourth CD is ready and waiting for the start signal - with beautiful standards dipped in colorful hues and originals with my own lyrics."
      },
      more: "Learn more",
      less: "Show less"
    },
    references: {
      title: "References"
    },
    testimonials: {
      title: "What Others Say"
    },
    contact: {
      title: "Contact",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message"
      }
    },
    footer: {
      subtitle: "Vocal Coaching in Berlin",
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms",
        imprint: "Imprint"
      },
      copyright: "© 2025 Mel jazz",
      rights: "All rights reserved"
    },
    booking: {
      title: "Book a Session",
      steps: {
        service: "Select Service",
        date: "Select Date",
        time: "Select Time",
        contact: "Contact Details",
        confirm: "Confirm Booking"
      },
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        terms: "I accept the terms and conditions",
        privacy: "I accept the privacy policy"
      },
      buttons: {
        next: "Next",
        back: "Back",
        book: "Book Now",
        close: "Close"
      }
    }
  },
  DE: {
    nav: {
      home: "Start",
      services: "Leistungen",
      about: "Über Mich",
      references: "Referenzen",
      testimonials: "Erfahrungen",
      contact: "Kontakt"
    },
    hero: {
      title: "Mel jazz",
      subtitle: "Vocal Coaching in Berlin",
      cta: "Jetzt Buchen"
    },
    music: {
      title: "Meine Musik"
    },
    video: {
      title: "Video Vorschau"
    },
    services: {
      title: "Vocal Excellence",
      singing: {
        title: "Singen",
        description: "Professionelle Gesangsausbildung für Bands und Musiker",
        features: [
          "Stimmtechnik & Atemübungen",
          "Repertoire-Entwicklung",
          "Individuelle Zielsetzung",
          "Flexible Terminplanung"
        ],
        details: {
          includes: [
            "Personalisierte Stimmtechnik",
            "Repertoire-Entwicklung",
            "Aufnahmen der Stunden",
            "Übe-Material & Feedback"
          ],
          suitable: [
            "Bands & Musiker",
            "Solo-Künstler",
            "Hobby-Sänger",
            "Profis"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      },
      coaching: {
        title: "Vocal Coaching",
        description: "CVT-basiertes Stimmtraining für alle Genres",
        features: [
          "Complete Vocal Technique",
          "Stimmgesundheit",
          "Genrespezifisches Training",
          "Individuelle Betreuung"
        ],
        details: {
          includes: [
            "CVT Stimmanalyse",
            "Personalisierter Trainingsplan",
            "Gesundheitsorientiertes Training",
            "Regelmäßiges Feedback"
          ],
          suitable: [
            "Alle Gesangslevel",
            "Verschiedene Genres",
            "Professionelle Sänger",
            "Gesangslehrer"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      },
      workshop: {
        title: "Workshop",
        description: "Intensive Gesangsworkshops für Gruppen",
        features: [
          "Intensive Gruppenarbeit",
          "Flexible Terminplanung",
          "Maßgeschneiderte Inhalte",
          "Ab 3 Stunden"
        ],
        details: {
          includes: [
            "Professionelles Training",
            "Praxisorientierte Übungen",
            "Gruppendynamik",
            "Auftrittsvorbereitung"
          ],
          suitable: [
            "Chöre",
            "Bands",
            "Ensembles",
            "Firmenevents"
          ],
          duration: "Min. 3 Stunden",
          location: "Nach Vereinbarung",
          price: "Ab 300€"
        }
      },
      choir: {
        title: "Chor Next Door",
        description: "Werde Teil unseres innovativen Chorprojekts",
        features: [
          "Moderne Arrangements",
          "Gemeinschaftserlebnis",
          "Regelmäßige Auftritte",
          "Alle Level willkommen"
        ],
        details: {
          includes: [
            "Professionelle Leitung",
            "Stimmbildung",
            "Auftrittsmöglichkeiten",
            "Soziales Netzwerk"
          ],
          suitable: [
            "Alle Altersgruppen",
            "Gesangsbegeisterte",
            "Anfänger",
            "Fortgeschrittene"
          ],
          duration: "Wöchentliche Proben",
          location: "Berlin"
        }
      },
      cta: "Jetzt Buchen"
    },
    about: {
      title: "Über Mich",
      intro: "Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin. Meine musikalische Reise begann früh: vom Kinderchor über den Gospelchor 'Crescendo' bis hin zu 'Die Männer', einer der ersten Girl Bands in Deutschland. Die Entdeckung von Ella Fitzgerald's 'Airmail Special' öffnete mir die Tür zur Welt des Jazz - eine Liebe auf den ersten Blick.",
      expanded: "Nach meinem Studium an der Hochschule für Musik und Tanz Köln vertiefte ich meine Kenntnisse in Jazz-Gesang und Improvisation. Die Zusammenarbeit mit renommierten Künstlern und Bands erweiterte meinen musikalischen Horizont und formte meinen einzigartigen Stil.",
      projects: {
        title: "Aktuelle Projekte",
        description: "Als stolzes Mitglied der internationalen Berliner Jazzszene bin ich nicht nur als Sängerin aktiv, sondern auch als Vocal Coach bei der Bandleiter Ausbildung in Wiesbaden tätig. Meine vierte CD ist fertig und wartet auf das Start Signal - mit schönen Standards in bunte Farben getaucht und Originals mit eigenen Texten."
      },
      more: "Mehr erfahren",
      less: "Weniger anzeigen"
    },
    references: {
      title: "Referenzen"
    },
    testimonials: {
      title: "Das sagen Andere"
    },
    contact: {
      title: "Kontakt",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        send: "Nachricht senden"
      }
    },
    footer: {
      subtitle: "Vocal Coaching in Berlin",
      legal: {
        privacy: "Datenschutz",
        terms: "AGB",
        imprint: "Impressum"
      },
      copyright: "© 2025 Mel jazz",
      rights: "Alle Rechte vorbehalten"
    },
    booking: {
      title: "Termin buchen",
      steps: {
        service: "Service wählen",
        date: "Datum wählen",
        time: "Uhrzeit wählen",
        contact: "Kontaktdaten",
        confirm: "Buchung bestätigen"
      },
      form: {
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        message: "Nachricht",
        terms: "Ich akzeptiere die AGB",
        privacy: "Ich akzeptiere die Datenschutzerklärung"
      },
      buttons: {
        next: "Weiter",
        back: "Zurück",
        book: "Jetzt buchen",
        close: "Schließen"
      }
    }
  }
} 