/**
 * Pronounce text using browser Web Speech API
 */
export const speakTerm = (text: string, lang: 'tr' | 'ar') => {
  if (!('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'tr' ? 'tr-TR' : 'ar-SA';
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  // Attempt to select specific language voice if available
  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find((v) =>
    lang === 'tr' ? v.lang.startsWith('tr') : v.lang.startsWith('ar')
  );

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  window.speechSynthesis.speak(utterance);
};
