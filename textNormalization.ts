/**
 * Strips all Arabic diacritics / harakat (tashkeel) completely
 * (fathah, dammah, kasrah, sukun, shaddah, tanween, dagger alif, tatweel)
 */
export const stripTashkeel = (text: string): string => {
  if (!text) return '';
  return text.replace(/[\u064B-\u0652\u0651\u0670\u0640]/g, '');
};

/**
 * Checks if a string contains Arabic script characters
 */
export const hasArabicCharacters = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
};

/**
 * Checks if a string contains Latin / Turkish alphabet characters
 */
export const hasLatinCharacters = (text: string): boolean => {
  return /[a-zA-ZçğıöşüÇĞIÖŞÜ]/.test(text);
};

/**
 * Normalize Arabic text for search matching:
 * - strips tashkeel
 * - unifies alef (أ, إ, آ -> ا)
 * - unifies taa marbuta (ة -> ه)
 * - unifies yaa (ى -> ي)
 */
export const normalizeArabic = (text: string): string => {
  if (!text) return '';
  return stripTashkeel(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase()
    .trim();
};

/**
 * Normalize Turkish text by converting special characters to standard latin equivalents for fuzzy matching
 */
export const normalizeTurkish = (text: string): string => {
  if (!text) return '';

  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
};

/**
 * Strictly searches in Turkish mode (TR -> AR).
 * Rejects any query containing Arabic characters!
 */
export const searchTurkishStrict = (
  turkishTerm: string,
  turkishDefinition: string,
  query: string
): boolean => {
  if (!query || !query.trim()) return true;

  // Strict boundary: If user types Arabic while in TR -> AR mode, do not match!
  if (hasArabicCharacters(query)) {
    return false;
  }

  const rawQ = query.trim().toLocaleLowerCase('tr-TR');
  const normQ = normalizeTurkish(query);
  const normTerm = normalizeTurkish(turkishTerm);
  const normDef = normalizeTurkish(turkishDefinition);

  return (
    turkishTerm.toLocaleLowerCase('tr-TR').includes(rawQ) ||
    normTerm.includes(normQ) ||
    turkishDefinition.toLocaleLowerCase('tr-TR').includes(rawQ) ||
    normDef.includes(normQ)
  );
};

/**
 * Strictly searches in Arabic mode (AR -> TR).
 * Rejects any query containing Latin / Turkish characters!
 */
export const searchArabicStrict = (
  arabicTerm: string,
  arabicDefinition: string,
  query: string
): boolean => {
  if (!query || !query.trim()) return true;

  // Strict boundary: If user types Latin/Turkish letters while in AR -> TR mode, do not match!
  if (hasLatinCharacters(query)) {
    return false;
  }

  const normQ = normalizeArabic(query);
  const normTerm = normalizeArabic(arabicTerm);
  const normDef = normalizeArabic(arabicDefinition);

  // Direct normalized match
  if (normTerm.includes(normQ) || normDef.includes(normQ)) {
    return true;
  }

  // Handle stripped definite article "ال"
  const strippedQ = normQ.startsWith('ال') ? normQ.slice(2) : normQ;
  const strippedTerm = normTerm.startsWith('ال') ? normTerm.slice(2) : normTerm;

  if (strippedQ.length >= 2 && strippedTerm.includes(strippedQ)) {
    return true;
  }

  return false;
};
