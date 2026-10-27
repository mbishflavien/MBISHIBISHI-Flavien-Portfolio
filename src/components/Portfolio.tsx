import React, { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { trackPageView, trackCTAClick, trackSectionView } from '../lib/analytics';

import { Language, ProjectItem } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';
import { SITE_COPY, EXTRA_PROJECTS, PROJECT_MEDIA, PROJECT_TAG, CLAPLOCK_DIAGRAM, GREETINGS, INTRO_LINKS, TOOLS } from '../data/site';
import { PuffyWord, PuffyArrow } from './Puffy';
import { Scene3D } from './Scene3D';
import { DotReveal } from './DotReveal';
import { HoverFx } from './HoverFx';

const HeroScene = React.lazy(() => import('../three/Scenes').then((m) => ({ default: m.HeroScene })));
const ContactScene = React.lazy(() => import('../three/Scenes').then((m) => ({ default: m.ContactScene })));
import { Scramble, useHoverScramble } from './Scramble';
import { Starburst } from './Starburst';

const EMAIL = 'flavmbish@gmail.com';
const PHONE = '+250 790 817 920';
const CV = '/Flavien_MBISHIBISHI_CV.pdf';
const LANGS: Language[] = ['en', 'sw', 'rw', 'fr'];
const SOCIAL = [
  { name: 'GitHub', href: 'https://github.com/mbishflavien' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mbishibishi-flavien-4120a52b8' },
  { name: 'Medium', href: 'https://medium.com/@flavmbish' },
];

// Mirrors the old onError fallbacks: hosted badges fall back to the local copies.
const AWARD_FALLBACK: Record<string, string> = {
  nvidia: '/badges/nvidia-developer.svg',
  gdg: '/badges/gdg-kigali.svg',
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad4 = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0');

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio_language') as Language;
    if (saved && LANGS.includes(saved)) return saved;
    const navLang = navigator.language?.toLowerCase() || '';
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('sw')) return 'sw';
    if (navLang.startsWith('rw')) return 'rw';
  } catch {
    // fallback
  }
  return 'en';
}

/* ---------- Instrument bar: local time, weather and the pointer's coordinates ---------- */
function useKigaliTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Kigali', hour: '2-digit', minute: '2-digit' }).format(now);
}

function useTemperature() {
  const [temp, setTemp] = useState<number | null>(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.95&longitude=30.06&current=temperature_2m')
      .then((r) => r.json())
      .then((d) => setTemp(Math.round(d.current.temperature_2m)))
      .catch(() => setTemp(null));
  }, []);
  return temp;
}

function Coordinates() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0, x = 720, y = 450;
    const paint = () => { raf = 0; if (ref.current) ref.current.textContent = `${pad4(x)} X ${pad4(y)} Y`; };
    const onMove = (e: PointerEvent) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener('pointermove', onMove, { passive: true });
    paint();
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return <span ref={ref} className="hud__xy" aria-hidden="true">0720 X 0450 Y</span>;
}

/* ---------- The faint grid with crosshairs, fixed behind everything ---------- */
function GridLines() {
  const [size, setSize] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const m = size.w < 700 ? 20 : 56;
  const inner = size.w - 2 * m;
  const xs = size.w < 700 ? [m, size.w - m] : [m, m + inner / 3, m + (inner * 2) / 3, size.w - m];
  const ys = [size.h / 3, (size.h * 2) / 3];
  return (
    <svg className="grid-lines" width={size.w} height={size.h} aria-hidden="true">
      {xs.map((x) => <line key={`x${x}`} x1={x} x2={x} y1={0} y2={size.h} />)}
      {ys.map((y) => <line key={`y${y}`} x1={0} x2={size.w} y1={y} y2={y} className="faint" />)}
      {xs.flatMap((x) => ys.map((y) => (
        <path key={`c${x}-${y}`} d={`M${x - 6} ${y}H${x + 6}M${x} ${y - 6}V${y + 6}`} className="cross" />
      )))}
    </svg>
  );
}

/* ---------- Loader ---------- */
function Loader() {
  const [progress, setProgress] = useState(0.1);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1100;
      setProgress((p) => Math.max(p, Math.min(0.92, t)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    Promise.all([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(() => {
      setProgress(1);
      setTimeout(() => setDone(true), 350);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader__bar"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  );
}

/* ---------- A paragraph whose words light up as it scrolls through the screen ---------- */
function useWordLight(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>('.w'));
    if (reducedMotion()) { words.forEach((w) => (w.style.opacity = '1')); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      const lit = p * words.length * 1.15;
      words.forEach((w, i) => (w.style.opacity = String(Math.min(1, Math.max(0.18, lit - i + 0.18)))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const splitWords = (text: string) => text.split(' ').map((w, i) => <span className="w" key={i}>{w} </span>);

/* ---------- Entrances: [data-reveal] rises once when it enters ---------- */
// The revealed state is a data attribute, not a class: React rewrites className on re-render
// (opening an experience row did that) and would hide the element again.
function useReveal(deps: unknown[]) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).dataset.in = ''; io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -10% 0px' }
    );
    document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [openJob, setOpenJob] = useState<number | null>(0);
  const [stage, setStage] = useState(0);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [certIndex, setCertIndex] = useState<number | null>(null);
  const [certFull, setCertFull] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const contactRef = useRef<HTMLDialogElement>(null);
  const certRef = useRef<HTMLDialogElement>(null);
  const certStageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const speedRef = useRef(0);

  const t = TRANSLATIONS[language];
  const s = SITE_COPY[language];
  const time = useKigaliTime();
  const temp = useTemperature();

  const projects: ProjectItem[] = [...t.projects.items, ...EXTRA_PROJECTS[language]];
  const project = projects.find((p) => p.id === openProject) ?? null;
  const greetings = useMemo(() => {
    const i = LANGS.indexOf(language);
    return [...LANGS.slice(i), ...LANGS.slice(0, i)].map((l) => GREETINGS[l]);
  }, [language]);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    try { localStorage.setItem('portfolio_language', next); } catch { /* private mode */ }
  };
  const nextLanguage = () => changeLanguage(LANGS[(LANGS.indexOf(language) + 1) % LANGS.length]);

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => { trackPageView(window.location.pathname); }, []);

  // Smooth scrolling, as on the reference; off for reduced motion and touch.
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  // Visit counter: once per session, live total in the footer.
  useEffect(() => {
    const visitDoc = doc(db, 'stats', 'visits');
    if (!sessionStorage.getItem('hasVisited')) {
      (async () => {
        try {
          const snap = await getDoc(visitDoc);
          if (snap.exists()) await updateDoc(visitDoc, { visits: increment(1) });
          else await setDoc(visitDoc, { visits: 1 });
          sessionStorage.setItem('hasVisited', 'true');
        } catch (error) {
          console.error('Error updating visit count:', error);
        }
      })();
    }
    const unsubscribe = onSnapshot(visitDoc, (d) => { if (d.exists()) setVisitCount(d.data().visits); });
    return () => unsubscribe();
  }, []);

  // Section views for analytics.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { trackSectionView((e.target as HTMLElement).dataset.track!); io.unobserve(e.target); }
      }),
      { threshold: 0.2 }
    );
    document.querySelectorAll('[data-track]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useReveal([language]);

  // Tiles bend a little with scroll speed, like paper caught in the wind.
  useEffect(() => {
    if (reducedMotion()) return;
    let raf = 0, last = window.scrollY, v = 0;
    const loop = () => {
      const y = window.scrollY;
      v += ((y - last) - v) * 0.12;
      last = y;
      const curl = Math.max(-1, Math.min(1, v / 60));
      document.documentElement.style.setProperty('--curl', curl.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  useWordLight(introRef, [language]);
  useHoverScramble([language]);


  // The manifesto holds while its statements change; scrolling also speeds the stars.
  useEffect(() => {
    let raf = 0, lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const el = manifestoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / (r.height - window.innerHeight), 0), 0.999);
      setStage(Math.floor(p * 4));
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (r.top < window.innerHeight && r.bottom > 0) speedRef.current = Math.min(1.2, speedRef.current + dy / 900);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  useEffect(() => {
    const d = contactRef.current;
    if (!d) return;
    if (contactOpen && !d.open) d.showModal();
    if (!contactOpen && d.open) d.close();
  }, [contactOpen]);

  const openContact = (source: string) => {
    setSubmitStatus('idle');
    setContactOpen(true);
    trackCTAClick(`Contact form - ${source}`);
  };

  const validateForm = () => {
    const next = { name: '', email: '', message: '' };
    if (!formData.name.trim()) next.name = t.contact.name_error;
    if (!formData.email.trim()) next.email = t.contact.email_error;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = t.contact.email_invalid;
    if (!formData.message.trim()) next.message = t.contact.message_error;
    else if (formData.message.trim().length < 10) next.message = t.contact.message_too_short;
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    trackCTAClick('Contact Form Submit');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
      // Fallback: open the visitor's mail client with the message filled in.
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Certificate viewer ---------- */
  const awards = t.awards.items;
  const cert = certIndex !== null ? awards[certIndex] ?? null : null;

  useEffect(() => {
    const d = certRef.current;
    if (!d) return;
    if (cert && !d.open) d.showModal();
    if (!cert && d.open) d.close();
  }, [cert]);

  const stepCert = (by: number) => setCertIndex((i) => (i === null ? i : (i + by + awards.length) % awards.length));

  // Real full screen where the browser allows it (not on iPhone); otherwise the stage fills the window.
  const toggleCertFull = async () => {
    const stage = certStageRef.current;
    if (!stage) return;
    if (document.fullscreenElement) { await document.exitFullscreen().catch(() => {}); return; }
    if (certFull) { setCertFull(false); return; }
    if (stage.requestFullscreen) {
      try { await stage.requestFullscreen(); return; } catch { /* fall through to the CSS version */ }
    }
    setCertFull(true);
  };

  useEffect(() => {
    const onChange = () => setCertFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const closeCert = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setCertFull(false);
    setCertIndex(null);
  };

  const copyEmail = async () => {
    trackCTAClick('Footer - Copy email');
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const talkWord = t.hero.cta_contact.toLowerCase().replace(/[.!]/g, '');

  const introMore = s.intro_more.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    if (!key) return <React.Fragment key={i}>{part}</React.Fragment>;
    const l = INTRO_LINKS[key];
    return <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>;
  });

  const tile = (p: ProjectItem, i: number) => (
    <article key={p.id} className={`tile tile--${i}`} data-reveal>
      <button className="tile__media" data-tilt data-cursor="↗" onClick={() => { setOpenProject(p.id); trackCTAClick(`Project - ${p.title}`); }} aria-label={`${p.title}: ${p.description}`}>
        {p.id === 'claplock' ? (
          <pre aria-hidden="true">{CLAPLOCK_DIAGRAM}</pre>
        ) : (
          <DotReveal src={PROJECT_MEDIA[p.id] ?? p.image} />
        )}
        <span className="tag">{PROJECT_TAG[p.id] ?? p.tags[0]}</span>
      </button>
      <div className="tile__caption">
        <h3 data-scramble>{p.title}</h3>
        <span>
          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">{s.live} ↗</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">{s.code} ↗</a>}
        </span>
      </div>
    </article>
  );

  return (
    <>
      <Loader />
      <GridLines />
      <HoverFx />

      {/* ---------- Instrument bar ---------- */}
      <header className="hud">
        <a className="hud__mark" href="#top" data-magnetic="0.2">Mbishibishi</a>
        <nav className="hud__nav" aria-label="Main">
          <a href="#work" data-scramble data-magnetic>{s.nav_work}</a>
          <a href="#contact" data-scramble data-magnetic>{s.nav_contact}</a>
          <button onClick={nextLanguage} data-magnetic aria-label={`Language: ${language.toUpperCase()}. Change language`}>
            Lang[{language.toUpperCase()}]
          </button>
          <a className="hud__cv" data-scramble data-magnetic href={CV} download onClick={() => trackCTAClick('Download CV - Nav')}>CV[↓]</a>
        </nav>
      </header>
      <div className="hud hud--foot" aria-hidden="true">
        <span>GMT+2 RW {time}{temp !== null && ` ${temp}°C`}</span>
        <Coordinates />
        <button className="hud__globe" data-magnetic="0.5" onClick={nextLanguage} tabIndex={-1} title="Change language">
          <svg viewBox="0 0 44 24"><ellipse cx="22" cy="12" rx="20" ry="10" /><ellipse cx="22" cy="12" rx="9" ry="10" /><path d="M2 12h40" /></svg>
        </button>
      </div>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero" data-track="Hero">
          <div className="hero__streaks" aria-hidden="true"><i /><i /><i /></div>
          <div className="hero__top">
            <p className="hero__kicker">{s.kicker[0]}<br />{s.kicker[1]}</p>
            <p className="mono">{s.motto[0]}<br />{s.motto[1]}</p>
            <p className="mono hero__bio">{s.bio}</p>
          </div>
          <Scene3D
            fallback={<>
              <PuffyWord key={language} words={greetings} className="hero__puffy" />
              <div className="hero__arrow"><PuffyArrow /></div>
            </>}
          >
            <HeroScene key={language} words={greetings} />
          </Scene3D>
          <h1 className="hero__title">
            <span className="sr-only">Flavien Mbishibishi. </span>
            {s.headline.map((line, i) => (
              <span className="line" key={i} style={{ '--i': i } as React.CSSProperties}>
                {line}
                {i === s.headline.length - 1 && <> <Scramble text={s.headline_lime} className="lime" /></>}
              </span>
            ))}
          </h1>
        </section>

        {/* ---------- Intro ---------- */}
        <section className="intro" data-track="About" aria-label={t.about.title}>
          <figure className="intro__photo" data-reveal data-tilt>
            <img src="/media/portrait-hoodie.png" alt="Flavien Mbishibishi" width={427} height={584} />
            <figcaption className="intro__sign" aria-hidden="true">Flavien</figcaption>
          </figure>
          <div className="intro__text">
            <h2 className="sr-only">{t.about.title}</h2>
            <p className="intro__lead" ref={introRef}>{splitWords(s.intro)}</p>
            <p className="intro__more" data-reveal>{introMore}</p>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="work" data-track="Projects">
          <h2 className="label" data-reveal>{s.work_title} <span>({projects.length})</span></h2>
          <div className="work__grid">{projects.map(tile)}</div>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="experience" className="exp" data-track="Experience">
          <h2 className="label" data-reveal>{t.experience.title} <span>({t.experience.items.length})</span></h2>
          <ol className="exp__list">
            {t.experience.items.map((job, i) => (
              <li key={`${job.company}-${i}`} className={`job${openJob === i ? ' is-open' : ''}`} data-reveal>
                <button className="job__row" onClick={() => setOpenJob(openJob === i ? null : i)} aria-expanded={openJob === i}>
                  <span className="mono job__when">{job.period}</span>
                  <span className="job__role">{job.role}</span>
                  <span className="job__org">{job.company}</span>
                  <span className="job__toggle" aria-hidden="true">{openJob === i ? '−' : '+'}</span>
                </button>
                <div className="job__more">
                  <ul>{job.description.map((d, j) => <li key={j}>{d}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="tools" data-reveal>
            <span className="label">{s.tools}</span>
            {TOOLS.map((tool) => <span key={tool} className="tools__item" data-magnetic="0.35">{tool}</span>)}
          </p>
        </section>

        {/* ---------- Badges and certificates ---------- */}
        <section id="certificates" className="certs" data-track="Awards">
          <h2 className="label" data-reveal>{s.certs_title} <span>({awards.length})</span></h2>
          <div className="certs__grid">
            {awards.map((a, i) => (
              <button
                key={a.id}
                type="button"
                className="cert"
                data-cursor="⤢"
                onClick={() => { setCertIndex(i); trackCTAClick(`Certificate - ${a.title}`); }}
                aria-label={`${a.title}, ${a.issuer}`}
                data-reveal
              >
                <span className="cert__media" data-tilt>
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fb = AWARD_FALLBACK[a.id];
                      if (fb && !e.currentTarget.src.endsWith(fb)) e.currentTarget.src = fb;
                    }}
                  />
                  <span className="tag">{a.category}</span>
                </span>
                <span className="cert__caption">
                  <span>{a.title}</span>
                  <span className="mono">{a.date}</span>
                </span>
                <span className="cert__issuer">{a.issuer}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- Manifesto: held while the statements change ---------- */}
        <section className="manifesto" ref={manifestoRef} aria-label={s.statements.join('. ')}>
          <div className="manifesto__stage">
            <Starburst speedRef={speedRef} />
            {[0, 1].map((i) => (
              <p key={i} className={`manifesto__line${stage === i ? ' is-on' : ''}`}>{s.statements[i]}</p>
            ))}
            <div className={`manifesto__rings${stage === 2 ? ' is-on' : ''}`}>
              <svg viewBox="0 0 400 260" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((k) => <ellipse key={k} cx="200" cy={70 + k * 24} rx={150 - Math.abs(k - 2.5) * 18} ry="18" />)}
              </svg>
              {s.rings.map((r, i) => <p key={i} className={`ring ring--${i}`}>{r}</p>)}
            </div>
            <p className={`manifesto__line${stage === 3 ? ' is-on' : ''}`}>{s.statements[2]}</p>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="contact" data-track="Contact">
          <div className="hero__streaks" aria-hidden="true"><i /><i /><i /></div>
          <Scene3D
            fallback={
              <button className="contact__puffy" onClick={() => openContact('Lets talk')} aria-label={`${t.hero.cta_contact}: ${s.write}`}>
                <PuffyWord key={`c-${language}`} words={[talkWord]} />
              </button>
            }
          >
            <ContactScene word={talkWord} onPress={() => openContact('Lets talk 3D')} />
          </Scene3D>
          <button className="contact__hint mono" data-magnetic="0.3" onClick={() => openContact('Lets talk hint')}>[{s.write}]</button>
          <h2 className="contact__title">
            {s.footer_headline.map((line, i) => <span className="line" key={i}>{line}</span>)}
            <span className="line"><Scramble text={s.footer_lime} className="lime" every={5000} /></span>
          </h2>
          <div className="contact__foot">
            <div className="mono">
              <button className="btn contact__btn" data-magnetic="0.25" onClick={() => openContact('Footer button')}>{s.write} ↗</button>
              <br />
              <a href={`mailto:${EMAIL}`} onClick={() => trackCTAClick('Footer - Email')}>{EMAIL}</a>
              <button onClick={copyEmail}>{copied ? `[${s.copied}]` : '[Copy]'}</button>
              <br />
              <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
            </div>
            <nav className="mono" aria-label="Elsewhere">
              {SOCIAL.map((l) => (
                <a key={l.name} data-scramble data-magnetic="0.25" href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => trackCTAClick(`Footer Social - ${l.name}`)}>{l.name}</a>
              ))}
              <a href={CV} download>CV</a>
            </nav>
          </div>
          <p className="contact__legal mono">
            Flavien Mbishibishi (C) 2026{visitCount !== null && <> · {visitCount.toLocaleString()} {t.footer.visits}</>}
          </p>
        </section>
      </main>

      {/* ---------- Certificate viewer ---------- */}
      <dialog
        ref={certRef}
        className="dialog cert-viewer"
        onClose={closeCert}
        onClick={(e) => { if (e.target === e.currentTarget) closeCert(); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); stepCert(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); stepCert(-1); }
        }}
        aria-labelledby="cert-viewer-title"
      >
        {cert && (
          <>
            {/* Focused on open, so the arrow keys work at once and no button shows a focus ring. */}
            <div ref={certStageRef} className={`cert-viewer__stage${certFull ? ' is-full' : ''}`} tabIndex={-1} autoFocus>
              <img
                key={cert.id}
                src={cert.image}
                alt={`${cert.title}, ${cert.issuer}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fb = AWARD_FALLBACK[cert.id];
                  if (fb && !e.currentTarget.src.endsWith(fb)) e.currentTarget.src = fb;
                }}
              />
              <button className="cert-viewer__nav cert-viewer__nav--prev mono" data-magnetic="0.3" onClick={() => stepCert(-1)} aria-label={s.prev}>←</button>
              <button className="cert-viewer__nav cert-viewer__nav--next mono" data-magnetic="0.3" onClick={() => stepCert(1)} aria-label={s.next}>→</button>
              <div className="cert-viewer__tools mono">
                <span>{(certIndex ?? 0) + 1} / {awards.length}</span>
                <button onClick={toggleCertFull}>[{certFull ? s.exit_fullscreen : s.fullscreen}]</button>
                {certFull && <button onClick={closeCert}>[{t.awards.modal.close}]</button>}
              </div>
            </div>
            <div className="dialog__body cert-viewer__body">
              <span className="tag">{cert.category}</span>
              <h2 id="cert-viewer-title">{cert.title}</h2>
              <p className="mono dialog__tags">{cert.issuer} · {cert.date}{cert.credentialId && <> · {cert.credentialId}</>}</p>
              <p>{cert.description}</p>
              <div className="dialog__actions">
                {cert.verifyLink && (
                  <a className="mono" href={cert.verifyLink} target="_blank" rel="noopener noreferrer">[{cert.verifyLabel || s.verify} ↗]</a>
                )}
                <button className="mono dialog__close" onClick={closeCert}>[{t.awards.modal.close}]</button>
              </div>
            </div>
          </>
        )}
      </dialog>

      {/* ---------- Contact form ---------- */}
      <dialog
        ref={contactRef}
        className="dialog contact-form"
        onClose={() => setContactOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setContactOpen(false); }}
        aria-labelledby="contact-form-title"
      >
        <form className="dialog__body" onSubmit={handleSubmit} noValidate>
          <span className="tag">{t.hero.cta_contact}</span>
          <h2 id="contact-form-title">{t.contact.title}</h2>
          <p className="mono contact-form__sub">{t.contact.subtitle}</p>
          <label className="field">
            <span className="mono">{t.contact.name}</span>
            <input type="text" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} aria-invalid={!!errors.name} />
            {errors.name && <em className="mono">{errors.name}</em>}
          </label>
          <label className="field">
            <span className="mono">{t.contact.email}</span>
            <input type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} aria-invalid={!!errors.email} />
            {errors.email && <em className="mono">{errors.email}</em>}
          </label>
          <label className="field">
            <span className="mono">{t.contact.message}</span>
            <textarea rows={5} placeholder={t.contact.message_placeholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} aria-invalid={!!errors.message} />
            {errors.message && <em className="mono">{errors.message}</em>}
          </label>
          {submitStatus !== 'idle' && (
            <p className={`mono contact-form__status is-${submitStatus}`} role="status">
              {submitStatus === 'success' ? t.contact.success : t.contact.error}
            </p>
          )}
          <div className="dialog__actions">
            <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? t.contact.sending : t.contact.send} ↗</button>
            <button type="button" className="mono dialog__close" onClick={() => setContactOpen(false)}>[{t.projects.modal.close}]</button>
          </div>
        </form>
      </dialog>

      {/* ---------- Project dialog ---------- */}
      <dialog ref={dialogRef} className="dialog" onClose={() => setOpenProject(null)} onClick={(e) => { if (e.target === e.currentTarget) setOpenProject(null); }}>
        {project && (
          <>
            {(PROJECT_MEDIA[project.id] ?? project.image) ? (
              <div className="dialog__pic"><img src={PROJECT_MEDIA[project.id] ?? project.image} alt={project.title} /></div>
            ) : (
              <pre className="dialog__pic dialog__pic--code">{CLAPLOCK_DIAGRAM}</pre>
            )}
            <div className="dialog__body">
              <span className="tag">{PROJECT_TAG[project.id] ?? project.tags[0]}</span>
              <h2>{project.title}</h2>
              <p className="mono dialog__tags">{project.tags.join(' · ')}</p>
              <p>{project.longDescription}</p>
              <ul>{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="dialog__actions">
                {project.link && <a className="btn" href={project.link} target="_blank" rel="noopener noreferrer">{t.projects.modal.launch_demo} ↗</a>}
                {project.github && <a className="mono" href={project.github} target="_blank" rel="noopener noreferrer">[{t.projects.modal.view_code}]</a>}
                <button className="mono dialog__close" onClick={() => setOpenProject(null)}>[{t.projects.modal.close}]</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
