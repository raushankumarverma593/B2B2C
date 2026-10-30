import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('bottle_return_lang');
    if (saved === 'english') return 'english';
    return 'hindi'; // Default to pure Hindi
  });

  useEffect(() => {
    localStorage.setItem('bottle_return_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'hindi' ? 'english' : 'hindi'));
  };

  const t = translations[lang] || translations.hindi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
