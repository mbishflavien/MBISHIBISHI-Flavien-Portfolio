import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  Moon, 
  Sun, 
  Code2, 
  Database, 
  BrainCircuit, 
  Terminal, 
  ChevronRight,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Maximize2,
  Users,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { FastCSSBackground } from './FastCSSBackground';
const Background3D = React.lazy(() => import('./Background3D'));
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { trackPageView, trackCTAClick, trackSectionView } from '../lib/analytics';

import { Language, ProjectItem, SkillItem, AwardItem } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

// --- Constants & Assets ---
const HERO_BACKGROUNDS = [
  "bg-primary/20",
  "bg-blue-500/20",
  "bg-purple-500/20",
  "bg-emerald-500/20",
  "bg-orange-500/20",
  "bg-pink-500/20",
];

const PROFILE_IMAGES = [
  "https://lh3.googleusercontent.com/d/12ZzNcydVq1YeuFHfoRhF-sUV-4muXUyE",
  "https://lh3.googleusercontent.com/d/1FcMCJDuIZ5P1AsVFMLNHr3xJtgAtVAiG"
];

// Helper to resolve skill icons
const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('python')) return <Terminal className="w-5 h-5" />;
  if (n.includes('sql') || n.includes('database') || n.includes('postgresql')) return <Database className="w-5 h-5" />;
  if (n.includes('machine learning') || n.includes('ai')) return <BrainCircuit className="w-5 h-5" />;
  if (n.includes('data structures') || n.includes('cs')) return <Code2 className="w-5 h-5" />;
  if (n.includes('linux') || n.includes('bash')) return <Terminal className="w-5 h-5" />;
  return <Sparkles className="w-5 h-5" />;
};

// --- Sub-components ---
interface HeroImageProps {
  isDarkMode: boolean;
  openToWorkText: string;
}

const HeroImage = ({ isDarkMode, openToWorkText }: HeroImageProps) => {
  const [bgIndex, setBgIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 2500);
    
    const imgTimer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, 6000);

    return () => {
      clearInterval(bgTimer);
      clearInterval(imgTimer);
    };
  }, []);

  const currentBg = HERO_BACKGROUNDS[bgIndex];
  const currentImg = PROFILE_IMAGES[imgIndex];

  return (
    <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto aspect-square flex items-center justify-center">
      {/* Background Glow */}
      <div className={cn(
        "absolute inset-0 blur-[80px] sm:blur-[100px] rounded-full animate-pulse transition-colors duration-1000",
        isDarkMode ? "bg-primary/40" : "bg-primary/30"
      )} />
      
      {/* Animated Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[110%] h-[110%] border border-dashed border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[125%] h-[125%] border border-primary/10 rounded-full"
        />
      </div>

      {/* Image Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%"
              ]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full h-full overflow-hidden border-4 border-primary/20 shadow-2xl group bg-muted/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={bgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={cn("absolute inset-0 transition-colors duration-1000", currentBg)}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.7 }}
                src={currentImg}
                alt="Flavien Mbishibishi"
                className="w-full h-full object-contain relative z-20 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-30 pointer-events-none" />
          </motion.div>

          {/* Clean Floating Badge: Open to Work (no green led dot as requested) */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 md:-top-6 md:-right-6 bg-background/90 backdrop-blur-md border border-primary/20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl z-40 select-none"
          >
            <span className="text-xs sm:text-sm font-bold tracking-wider text-foreground whitespace-nowrap">
              {openToWorkText}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-10 sm:mb-12 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-foreground/70 text-base sm:text-lg max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 64 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-primary rounded-full mt-3"
    />
  </div>
);

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Persistent language state with navigator fallback
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('portfolio_language') as Language;
      if (saved && ['en', 'sw', 'rw', 'fr'].includes(saved)) {
        return saved;
      }
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('fr')) return 'fr';
      if (navLang.startsWith('sw')) return 'sw';
      if (navLang.startsWith('rw')) return 'rw';
    } catch {
      // fallback
    }
    return 'en';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showDemoUnavailable, setShowDemoUnavailable] = useState(false);
  
  // Selection keys for modals to allow seamless language switching while modal is open
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);
  const [selectedAwardId, setSelectedAwardId] = useState<string | null>(null);

  const [visitCount, setVisitCount] = useState<number | null>(null);

  // Active translation dictionary
  const t = TRANSLATIONS[language];

  // Derive localized modal items
  const selectedProject = selectedProjectId 
    ? (t.projects.items.find(p => p.id === selectedProjectId) ?? null)
    : null;
  const selectedSkill = selectedSkillName
    ? (t.skills.items.find(s => s.name.toLowerCase() === selectedSkillName.toLowerCase()) ?? null)
    : null;
  const selectedAward = selectedAwardId
    ? (t.awards.items.find(a => a.id === selectedAwardId) ?? null)
    : null;

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('portfolio_language', newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      console.error("Language save error:", e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  // Visit Counter Logic
  useEffect(() => {
    const visitDoc = doc(db, 'stats', 'visits');
    
    // Increment visit count once per session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      const incrementVisit = async () => {
        try {
          const docSnap = await getDoc(visitDoc);
          if (docSnap.exists()) {
            await updateDoc(visitDoc, { visits: increment(1) });
          } else {
            await setDoc(visitDoc, { visits: 1 });
          }
          sessionStorage.setItem('hasVisited', 'true');
        } catch (error) {
          console.error("Error updating visit count:", error);
        }
      };
      incrementVisit();
    }

    // Listen for real-time updates
    const unsubscribe = onSnapshot(visitDoc, (doc) => {
      if (doc.exists()) {
        setVisitCount(doc.data().visits);
      }
    });

    return () => unsubscribe();
  }, []);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = t.contact.name_error;
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.email_error;
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.email_invalid;
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.message_error;
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.contact.message_too_short;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    trackCTAClick('Contact Form Submit');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      // Fallback: Open mailto link if submission fails
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:flavmbish@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const navItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.awards, href: '#awards' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      <React.Suspense fallback={<FastCSSBackground isDarkMode={isDarkMode} />}>
        <Background3D mouseX={mouseX} mouseY={mouseY} isDarkMode={isDarkMode} />
      </React.Suspense>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-40 border-b border-primary/10 bg-background/70 backdrop-blur-xl shadow-sm"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.a 
            href="#" 
            className="hover:opacity-80 transition-opacity flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Home"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Code2 size={18} />
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center space-x-3 border-l border-primary/15 pl-5">
              {/* Language Switcher */}
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={handleLanguageChange} 
              />

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="rounded-full w-9 h-9 hover:bg-primary/10 hover:text-primary"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
            
            <a href="/Flavien_MBISHIBISHI_CV.pdf" download onClick={() => trackCTAClick('Download CV - Nav')}>
              <Button className="rounded-full shadow-sm text-sm h-9 px-4 font-semibold">
                {t.nav.download_cv} <Download className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </a>
          </div>

          {/* Mobile Nav Top Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full w-9 h-9"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl w-9 h-9"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="container mx-auto px-5 py-6 flex flex-col space-y-4">
                {/* Language Picker in Mobile Drawer */}
                <div className="py-2 border-b border-border/40">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    {t.nav.language}
                  </p>
                  <LanguageSwitcher 
                    currentLanguage={language} 
                    onLanguageChange={(newLang) => {
                      handleLanguageChange(newLang);
                      setIsMenuOpen(false);
                    }}
                    isMobile
                  />
                </div>

                <div className="flex flex-col space-y-2 pt-2">
                  {navItems.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-bold hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-muted/40"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="pt-2">
                  <a 
                    href="/Flavien_MBISHIBISHI_CV.pdf" 
                    download 
                    className="w-full block" 
                    onClick={() => {
                      trackCTAClick('Download CV - Mobile Menu');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Button className="w-full rounded-2xl py-6 text-base font-semibold shadow-md">
                      {t.nav.download_cv} <Download className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-48 md:pb-32 overflow-hidden"
        onViewportEnter={() => trackSectionView('Hero')}
      >
        {/* Parallax Background Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div 
            style={{ 
              x: useTransform(mouseX, [0, 1920], [-60, 60]),
              y: useTransform(mouseY, [0, 1080], [-60, 60])
            }}
            className="absolute top-[15%] left-[8%] w-56 sm:w-72 h-56 sm:h-72 bg-primary/10 blur-3xl rounded-full"
          />
          <motion.div 
            style={{ 
              x: useTransform(mouseX, [0, 1920], [80, -80]),
              y: useTransform(mouseY, [0, 1080], [80, -80])
            }}
            className="absolute bottom-[15%] right-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 blur-3xl rounded-full"
          />
          
          {/* Floating Icons on Large Screens */}
          {[Code2, Database, BrainCircuit, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -18, 0],
                rotate: [i * 45, i * 45 + 10, i * 45]
              }}
              transition={{ 
                y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute hidden xl:block text-primary/20 pointer-events-none"
              style={{ 
                top: `${18 + i * 22}%`, 
                left: `${12 + i * 25}%`,
                x: useTransform(mouseX, [0, 1920], [(i + 1) * -25, (i + 1) * 25]),
                y: useTransform(mouseY, [0, 1080], [(i + 1) * -25, (i + 1) * 25]),
                rotate: i * 45
              }}
            >
              <Icon size={38 + i * 8} strokeWidth={1.2} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.05] sm:leading-[0.95]">
                {t.hero.role.includes('&') ? (
                  <>
                    <span>{t.hero.role.split('&')[0].trim()}</span> <br className="hidden sm:inline" />
                    <span className="text-primary italic">& {t.hero.role.split('&')[1].trim()}.</span>
                  </>
                ) : t.hero.role.toLowerCase().includes('na ') ? (
                  <>
                    <span>{t.hero.role.split(/na /i)[0].trim()}</span> <br className="hidden sm:inline" />
                    <span className="text-primary italic">na {t.hero.role.split(/na /i)[1].trim()}.</span>
                  </>
                ) : (
                  <>
                    <span>{t.hero.role.split(' ').slice(0, 2).join(' ')}</span> <br className="hidden sm:inline" />
                    <span className="text-primary italic">{t.hero.role.split(' ').slice(2).join(' ')}.</span>
                  </>
                )}
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0 leading-relaxed">
                {t.hero.greeting.includes("Flavien Mbishibishi") ? (
                  <>
                    <span>{t.hero.greeting.split("Flavien Mbishibishi")[0]}</span>
                    <span className="text-foreground font-semibold">Flavien Mbishibishi</span>
                    <span>{t.hero.greeting.split("Flavien Mbishibishi")[1]}</span>
                  </>
                ) : (
                  <span className="text-foreground font-semibold">{t.hero.greeting}</span>
                )}
                {" — "}{t.hero.description}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <a href="#projects" className="w-full sm:w-auto" onClick={() => trackCTAClick('Hero - View My Work')}>
                <Button size="lg" className="rounded-full px-8 h-12 sm:h-14 text-base sm:text-lg w-full sm:w-auto shadow-md hover:shadow-primary/25 font-semibold">
                  {t.hero.cta_projects}
                </Button>
              </a>
              <a href="#contact" className="w-full sm:w-auto" onClick={() => trackCTAClick('Hero - Let\'s Talk')}>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 sm:h-14 text-base sm:text-lg w-full sm:w-auto border-border/80 hover:bg-accent font-semibold">
                  {t.hero.cta_contact}
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center md:justify-start space-x-6 pt-2"
            >
              <a 
                href="https://github.com/mbishflavien" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-1" 
                onClick={() => trackCTAClick('Social - Github')}
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/mbishibishi-flavien-4120a52b8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-1" 
                onClick={() => trackCTAClick('Social - Linkedin')}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://medium.com/@flavmbish" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-1" 
                onClick={() => trackCTAClick('Social - Medium')}
                aria-label="Medium Blog"
              >
                <BookOpen className="w-6 h-6" />
              </a>
              <a 
                href="mailto:flavmbish@gmail.com" 
                className="text-foreground/60 hover:text-primary transition-colors p-1" 
                onClick={() => trackCTAClick('Social - Email')}
                aria-label="Email Me"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative order-1 md:order-2"
          >
            <HeroImage isDarkMode={isDarkMode} openToWorkText={t.hero.open_to_work} />
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 sm:py-24 bg-muted/10 backdrop-blur-[2px]"
        onViewportEnter={() => trackSectionView('About')}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionHeading subtitle={t.about.subtitle}>
                {t.about.title}
              </SectionHeading>
              
              <div className="space-y-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
                <p>
                  {t.about.description.split('. ')[0]}.
                </p>
                <p>
                  {t.about.description.split('. ').slice(1).join('. ')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-bold">{t.about.location}</p>
                  <p className="font-semibold flex items-center text-sm sm:text-base">
                    <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" /> {t.about.location_value}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-bold">{t.about.education}</p>
                  <p className="font-semibold flex items-center text-sm sm:text-base">
                    <GraduationCap className="w-4 h-4 mr-2 text-primary shrink-0" /> {t.about.education_value}
                  </p>
                  <p className="text-xs text-foreground/60 ml-6">{t.about.education_period}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-background border border-primary/10 shadow-sm space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{t.about.experience_card.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{t.about.experience_card.description}</p>
              </motion.div>

              <motion.a 
                href="#awards"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="block p-6 rounded-3xl bg-background border border-primary/10 hover:border-primary/40 shadow-sm space-y-4 transition-all hover:shadow-md group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 group-hover:bg-primary/10 flex items-center justify-center text-blue-500 group-hover:text-primary transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{t.about.certifications_card.title}</span>
                  <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{t.about.certifications_card.description}</p>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="py-20 sm:py-24"
        onViewportEnter={() => trackSectionView('Skills')}
      >
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.skills.subtitle}>
            {t.skills.title}
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.skills.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedSkillName(skill.name)}
                className="group p-6 sm:p-8 rounded-3xl bg-muted/20 border border-border/40 hover:border-primary/30 hover:bg-muted/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                      {getSkillIcon(skill.name)}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">{skill.name}</h3>
                      <p className="text-xs text-foreground/60 font-medium uppercase tracking-wider">{skill.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-primary">{skill.level}%</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick-pill technologies */}
          <div className="mt-12 sm:mt-16 flex flex-wrap gap-2.5 sm:gap-3 justify-center">
            {["Pandas", "NumPy", "Scikit-learn", "Git", "MySQL", "Oracle", "Networking", "Bash", "FastAPI", "React"].map((item) => (
              <Badge key={item} variant="outline" className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default border-border/80">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-20 sm:py-24 bg-muted/10 backdrop-blur-[2px]"
        onViewportEnter={() => trackSectionView('Projects')}
      >
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.projects.subtitle}>
            {t.projects.title}
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card 
                  onClick={() => setSelectedProjectId(project.id)}
                  className={cn(
                    "group overflow-hidden rounded-3xl border border-primary/10 hover:border-primary/30 shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-card/60 backdrop-blur-sm relative cursor-pointer flex flex-col h-full",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500",
                    project.color
                  )}
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-900">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div className="flex space-x-2.5">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Launch ${project.title} demo`}
                          >
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="relative z-10 flex-grow flex flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary border-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl sm:text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2 text-foreground/70 mt-2 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>{t.projects.view_details}</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Honors & Awards Section */}
      <motion.section 
        id="awards" 
        className="py-16 sm:py-20 bg-primary/5"
        onViewportEnter={() => trackSectionView('Awards')}
      >
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.awards.subtitle}>
            {t.awards.title}
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {t.awards.items.map((award, index) => (
              <motion.div
                key={award.id || award.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card 
                  className="group h-full flex flex-col overflow-hidden rounded-3xl border-primary/10 hover:border-primary/30 transition-all duration-500 bg-card/60 backdrop-blur-sm cursor-pointer shadow-sm hover:shadow-xl"
                  onClick={() => setSelectedAwardId(award.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900/90 dark:bg-neutral-950 flex items-center justify-center p-5">
                    <img 
                      src={award.image} 
                      alt={award.title} 
                      className={cn(
                        "transition-all duration-500 filter blur-md group-hover:blur-0 group-hover:scale-105",
                        award.image.includes('.svg')
                          ? "max-w-[70%] max-h-[75%] object-contain drop-shadow-xl"
                          : "w-full h-full object-cover"
                      )}
                      onError={(e) => {
                        if (award.image.includes('nvidia')) {
                          (e.currentTarget as HTMLImageElement).src = '/badges/nvidia-developer.svg';
                        } else if (award.image.includes('gdg') || award.image.includes('chapter')) {
                          (e.currentTarget as HTMLImageElement).src = '/badges/gdg-kigali.svg';
                        }
                      }}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                    
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none text-[11px] font-semibold">
                        {award.category}
                      </Badge>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[1px] pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-background text-foreground shadow-xl border border-border/40">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" /> {t.awards.view_credential}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="flex-grow flex flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{award.issuer}</span>
                        <span className="text-xs font-mono text-foreground/50 shrink-0">{award.date}</span>
                      </div>
                      <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">{award.title}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-3 text-sm leading-relaxed">
                        {award.description}
                      </CardDescription>
                    </div>

                    {award.verifyLink && (
                      <div className="mt-4 pt-3 border-t border-primary/10">
                        <a 
                          href={award.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-xs font-semibold text-primary hover:underline gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.awards.modal.verify_google}
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        className="py-20 sm:py-24"
        onViewportEnter={() => trackSectionView('Experience')}
      >
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.experience.subtitle}>
            {t.experience.title}
          </SectionHeading>

          <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
            {t.experience.items.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.role}-${index}`}
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative pl-6 sm:pl-8 md:pl-12 border-l-2 border-muted hover:border-primary transition-colors group"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted group-hover:bg-primary transition-colors border-4 border-background" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="w-fit px-3.5 py-1 rounded-full font-mono text-xs border-border/80">
                    {exp.period}
                  </Badge>
                </div>
                
                <ul className="space-y-2.5 text-sm sm:text-base">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/80 leading-relaxed">
                      <ChevronRight className="w-4 h-4 mr-2 mt-1 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 sm:py-24"
        onViewportEnter={() => trackSectionView('Contact')}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] bg-primary p-6 sm:p-10 md:p-14 lg:p-16 text-primary-foreground relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 relative z-10">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {t.contact.build_great}
                </h2>
                <p className="text-primary-foreground/85 text-base sm:text-lg leading-relaxed">
                  {t.contact.subtitle}
                </p>
                
                <div className="space-y-5 pt-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider">{t.contact.email_me}</p>
                      <a href="mailto:flavmbish@gmail.com" className="text-base sm:text-lg font-semibold hover:underline">
                        flavmbish@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider">{t.contact.call_me}</p>
                      <a href="tel:+250790817920" className="text-base sm:text-lg font-semibold hover:underline">
                        +250 790 817 920
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider">{t.contact.location}</p>
                      <p className="text-base sm:text-lg font-semibold">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] backdrop-blur-sm border border-white/15 shadow-inner">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider">{t.contact.name}</label>
                  <input 
                    type="text" 
                    placeholder={language === 'fr' ? 'Jean Dupont' : language === 'sw' ? 'Juma Bakari' : language === 'rw' ? 'Kwizera Jean' : 'John Doe'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base",
                      errors.name ? "border-red-400 focus:ring-red-400/30" : "border-white/15 focus:ring-white/30"
                    )}
                  />
                  {errors.name && <p className="text-xs text-red-200 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider">{t.contact.email}</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base",
                      errors.email ? "border-red-400 focus:ring-red-400/30" : "border-white/15 focus:ring-white/30"
                    )}
                  />
                  {errors.email && <p className="text-xs text-red-200 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider">{t.contact.message}</label>
                  <textarea 
                    rows={4}
                    placeholder={t.contact.message_placeholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all resize-none text-sm sm:text-base",
                      errors.message ? "border-red-400 focus:ring-red-400/30" : "border-white/15 focus:ring-white/30"
                    )}
                  />
                  {errors.message && <p className="text-xs text-red-200 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.message}</p>}
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-primary hover:bg-white/90 rounded-xl h-12 sm:h-14 text-base sm:text-lg font-bold disabled:opacity-50 transition-colors shadow-md"
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </Button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-green-500/25 border border-green-500/50 text-green-100 flex items-center text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> {t.contact.success}
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/25 border border-red-500/50 text-red-100 flex items-center text-sm"
                    >
                      <AlertCircle className="w-4 h-4 mr-2 shrink-0" /> {t.contact.error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/60">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-2 mx-auto md:mx-0 shadow-sm">
              <Code2 size={18} />
            </div>
            <p className="text-xs sm:text-sm text-foreground/60">
              © 2026 Flavien MBISHIBISHI. {t.footer.rights}
            </p>
            {visitCount !== null && (
              <div className="flex items-center justify-center md:justify-start space-x-1.5 text-xs text-foreground/45 mt-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{visitCount.toLocaleString()} {t.footer.visits}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-5 text-xs sm:text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={() => trackCTAClick('Footer Social - Github')} aria-label="GitHub">
                <a href="https://github.com/mbishflavien" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={() => trackCTAClick('Footer Social - Linkedin')} aria-label="LinkedIn">
                <a href="https://linkedin.com/in/mbishibishi-flavien-4120a52b8" target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={() => trackCTAClick('Footer Social - Medium')} aria-label="Medium">
                <a href="https://medium.com/@flavmbish" target="_blank" rel="noopener noreferrer"><BookOpen className="w-4 h-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={() => trackCTAClick('Footer Social - Email')} aria-label="Email">
                <a href="mailto:flavmbish@gmail.com"><Mail className="w-4 h-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform"
        aria-label={t.common.back_to_top}
        title={t.common.back_to_top}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90" />
      </motion.button>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProjectId(null)}>
        <DialogContent className="w-[94vw] max-w-3xl rounded-3xl overflow-hidden p-0 border border-primary/20 bg-background/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedProject ? `${selectedProject.title} Details` : 'Project Details'}
          </DialogTitle>
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative aspect-video">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent", selectedProject.color)} />
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {selectedProject.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-foreground">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" /> {t.projects.modal.overview}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                    {selectedProject.longDescription}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-primary" /> {t.projects.modal.key_features}
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-foreground/80 text-sm">
                          <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" /> 
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold flex items-center">
                      <ExternalLink className="w-5 h-5 mr-2 text-primary" /> {t.projects.modal.links}
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" className="rounded-xl justify-start w-full text-sm font-semibold">
                            <Github className="w-4 h-4 mr-2" /> {t.projects.modal.view_code}
                          </Button>
                        </a>
                      )}
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="rounded-xl justify-start w-full text-sm font-semibold">
                            <ExternalLink className="w-4 h-4 mr-2" /> {t.projects.modal.launch_demo}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="ghost" onClick={() => setSelectedProjectId(null)} className="rounded-xl">
                    {t.projects.modal.close}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Award / Certificate Detail Modal */}
      <Dialog open={!!selectedAward} onOpenChange={() => setSelectedAwardId(null)}>
        <DialogContent className="w-[94vw] max-w-2xl sm:max-w-3xl rounded-3xl overflow-hidden p-0 border border-primary/20 bg-background/95 backdrop-blur-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedAward ? `${selectedAward.title} Certificate` : 'Certificate Details'}
          </DialogTitle>
          {selectedAward && (
            <div className="flex flex-col">
              <div className="relative w-full bg-gradient-to-b from-neutral-950 via-zinc-950 to-neutral-900 flex items-center justify-center p-6 sm:p-10 border-b border-border/40 overflow-hidden min-h-[240px] sm:min-h-[300px]">
                {/* Ambient glow matching credential category */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-45"
                  style={{
                    background: selectedAward.image.includes('nvidia') 
                      ? 'radial-gradient(circle at center, rgba(118, 185, 0, 0.35) 0%, transparent 70%)'
                      : selectedAward.image.includes('gdg')
                      ? 'radial-gradient(circle at center, rgba(234, 67, 53, 0.35) 0%, transparent 70%)'
                      : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.25) 0%, transparent 70%)'
                  }}
                />
                
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 text-xs shadow-md">
                    {selectedAward.category}
                  </Badge>
                </div>

                <img 
                  src={selectedAward.image} 
                  alt={selectedAward.title} 
                  className={selectedAward.image.includes('.svg')
                    ? "relative z-10 w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105 filter-none"
                    : "relative z-10 max-w-full max-h-[45vh] object-contain shadow-2xl rounded-xl filter-none"}
                  onError={(e) => {
                    if (selectedAward.image.includes('nvidia')) {
                      (e.currentTarget as HTMLImageElement).src = '/badges/nvidia-developer.svg';
                    } else if (selectedAward.image.includes('gdg') || selectedAward.image.includes('chapter')) {
                      (e.currentTarget as HTMLImageElement).src = '/badges/gdg-kigali.svg';
                    }
                  }}
                  referrerPolicy="no-referrer"
                />

                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute top-4 right-4 z-20 rounded-full h-8 w-8 bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md"
                  onClick={() => setSelectedAwardId(null)}
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">{t.awards.modal.close}</span>
                </Button>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                      {selectedAward.issuer}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {selectedAward.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono">
                      {t.awards.modal.issued}: {awardDateFormatted(selectedAward.date)} • {t.awards.modal.verified_credential}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    {selectedAward.verifyLink && (
                      <a href={selectedAward.verifyLink} target="_blank" rel="noopener noreferrer">
                        <Button className="rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 mr-1.5" /> {t.awards.modal.verify_google}
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </a>
                    )}
                    <a href={selectedAward.image} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-xl border-border/60 hover:bg-accent text-xs sm:text-sm">
                        <ExternalLink className="w-4 h-4 mr-1.5" /> {t.awards.modal.open_image}
                      </Button>
                    </a>
                  </div>
                </div>
                
                <Separator className="bg-border/60" />
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-foreground">
                    <Award className="w-5 h-5 text-primary" /> {t.awards.modal.about_credential}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                    {selectedAward.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Skill Detail Modal */}
      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkillName(null)}>
        <DialogContent className="w-[92vw] max-w-md rounded-3xl bg-background/95 backdrop-blur-xl border-primary/20 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedSkill ? `${selectedSkill.name} Skill Details` : 'Skill Details'}
          </DialogTitle>
          {selectedSkill && (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shadow-sm">
                  {getSkillIcon(selectedSkill.name)}
                </div>
                <div>
                  <Badge variant="outline" className="mb-1 text-xs border-primary/30 text-primary">{selectedSkill.category}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{selectedSkill.name}</h2>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">{t.skills.proficiency}</span>
                  <span className="text-xl font-mono font-bold text-primary">{selectedSkill.level}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-2 text-primary" /> {t.skills.expertise_details}
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  {selectedSkill.details}
                </p>
              </div>

              <Button className="w-full rounded-xl h-11 font-semibold" onClick={() => setSelectedSkillName(null)}>
                {t.skills.close_details}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Demo Unavailable Toast/Notification */}
      <AnimatePresence>
        {showDemoUnavailable && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-background/90 backdrop-blur-md border border-primary/20 px-5 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 text-sm font-medium"
          >
            <AlertCircle className="w-4 h-4 text-primary" />
            <span>{t.projects.demo_unavailable}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility helper for date formatting
function awardDateFormatted(dateStr: string) {
  return dateStr;
}
