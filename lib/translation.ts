import * as deepl from 'deepl-node';

const translator = new deepl.Translator('3a52f5c8-1967-43a4-b037-790934c51c82:fx');

export async function translateText(text: string, targetLang: 'DE' | 'EN'): Promise<string> {
  try {
    const result = await translator.translateText(text, null, targetLang);
    return result.text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export async function translateHtml(html: string, targetLang: 'DE' | 'EN'): Promise<string> {
  try {
    const result = await translator.translateText(html, null, targetLang, {
      tagHandling: 'html',
      preserveFormatting: true,
    });
    return result.text;
  } catch (error) {
    console.error('Translation error:', error);
    return html; // Return original HTML if translation fails
  }
} 