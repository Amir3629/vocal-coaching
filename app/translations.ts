interface Translation {
  partners: {
    title: string;
  };
}

interface Translations {
  EN: Translation;
  DE: Translation;
}

export const translations: Translations = {
  EN: {
    partners: {
      title: "Partners & Collaborations"
    }
  },
  DE: {
    partners: {
      title: "Partner & Kooperationen"
    }
  }
} 