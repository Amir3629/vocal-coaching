const DEEPL_API_KEY = '3a52f5c8-1967-43a4-b037-790934c51c82:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export async function translateText(text: string, targetLang: 'DE' | 'EN'): Promise<string> {
  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
        preserve_formatting: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateHtml(html: string, targetLang: 'DE' | 'EN'): Promise<string> {
  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [html],
        target_lang: targetLang,
        tag_handling: 'html',
        preserve_formatting: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return html;
  }
} 