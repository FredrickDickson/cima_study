import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, getInitialLanguage, saveLanguagePreference, getLanguageInfo } from '@/lib/i18n';
import { translations, TranslationKeys, getTranslation } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  currentLanguageInfo: ReturnType<typeof getLanguageInfo>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    saveLanguagePreference(newLanguage);
    
    // Update document direction for RTL languages
    const languageInfo = getLanguageInfo(newLanguage);
    document.documentElement.dir = languageInfo.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language] as TranslationKeys;
    return getTranslation(currentTranslations, key);
  };

  const currentLanguageInfo = getLanguageInfo(language);
  const isRTL = currentLanguageInfo.rtl || false;

  // Set initial document direction and language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    currentLanguageInfo,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}