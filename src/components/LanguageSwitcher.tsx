import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language, LanguageOption } from '../types/portfolio';
import { LANGUAGES } from '../data/translations';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
  isMobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isMobile) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-primary" />
          <span>Language / Ururimi / Lugha</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang: LanguageOption) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 text-sm font-medium",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-muted/40 hover:bg-muted text-foreground border-border/50"
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <div>
                    <div className="font-semibold text-xs leading-tight">{lang.nativeName}</div>
                    <div className={cn("text-[10px]", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {lang.name}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        id="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select website language"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-background/80 hover:bg-muted/80 backdrop-blur-md border border-border/60 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <span className="text-sm" role="img" aria-label={activeOption.name}>
          {activeOption.flag}
        </span>
        <span className="font-medium text-foreground">{activeOption.nativeName}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/60 shadow-xl py-1.5 z-50 overflow-hidden"
            role="listbox"
            aria-label="Language options"
          >
            <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/40">
              Select Language
            </div>
            <div className="py-1">
              {LANGUAGES.map((lang: LanguageOption) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150 text-left",
                      isSelected
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-[10px] text-muted-foreground">{lang.name}</span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
