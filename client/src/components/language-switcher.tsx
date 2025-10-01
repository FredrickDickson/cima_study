import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage, currentLanguageInfo } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (newLanguage: typeof language) => {
    setLanguage(newLanguage);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-foreground"
          data-testid="language-switcher-trigger"
        >
          <Globe className="h-4 w-4" />
          <span className="text-lg">{currentLanguageInfo.flag}</span>
          <span className="hidden sm:inline">{currentLanguageInfo.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-accent' : ''
            }`}
            data-testid={`language-option-${lang.code}`}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">
                  {lang.nativeName}
                </span>
              </div>
              {language === lang.code && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}