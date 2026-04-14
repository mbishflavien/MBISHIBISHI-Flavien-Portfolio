import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { Background3D } from './Background3D';

// --- Types ---
type Language = 'en' | 'sw' | 'rw' | 'fr';

interface Translation {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    contact: string;
    download_cv: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta_projects: string;
    cta_contact: string;
    available: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    location: string;
    education: string;
    stats: {
      experience: string;
      projects: string;
      clients: string;
    };
    experience_card: { title: string; description: string };
    certifications_card: { title: string; description: string };
  };
  experience: {
    title: string;
    subtitle: string;
    items: {
      role: string;
      company: string;
      period: string;
      description: string[];
    }[];
  };
  skills: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    demo_unavailable: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    phone: string;
    location: string;
    email_me: string;
    call_me: string;
    build_great: string;
    message_placeholder: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
}

const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    nav: { about: "About", experience: "Experience", skills: "Skills", projects: "Projects", contact: "Contact", download_cv: "Download CV" },
    hero: {
      greeting: "Hi, I'm Flavien Mbishibishi",
      role: "Software Engineer & AI Enthusiast",
      description: "Building intelligent solutions at the intersection of healthcare and technology. Specialized in full-stack development and data-driven systems.",
      cta_projects: "View My Work",
      cta_contact: "Let's Talk",
      available: "Available for opportunities"
    },
    about: {
      title: "About Me",
      subtitle: "Passionate about building software that makes a difference.",
      description: "I am a dedicated Software Engineer with a strong foundation in data structures, algorithms, and full-stack development. My journey is driven by a desire to solve complex problems and create impactful digital experiences, particularly in the healthcare sector.",
      location: "Location",
      education: "Education",
      stats: { experience: "Years Experience", projects: "Projects Completed", clients: "Happy Clients" },
      experience_card: { title: "Experience", description: "Trainee Software Engineer at A2SV and Instructor at AUCA." },
      certifications_card: { title: "Certifications", description: "Cisco NetOps, Hugging Face NLP, and more." }
    },
    experience: { 
      title: "Work Experience", 
      subtitle: "My professional journey and contributions.",
      items: [
        {
          role: "Trainee Software Engineer",
          company: "A2SV",
          period: "Dec 2025 – Present",
          description: [
            "Solving advanced data structures and algorithms problems (arrays, graphs, DP).",
            "Collaborating with a team of elite developers to build scalable solutions."
          ]
        },
        {
          role: "Big Data Analytics Instructor",
          company: "AUCA Software Innovation Center",
          period: "Dec 2025 – Feb 2026",
          description: [
            "Taught Big Data and machine learning concepts to students.",
            "Mentored end-to-end ML projects from data collection to model deployment."
          ]
        },
        {
          role: "Software Development Trainee",
          company: "The Gym Rwanda",
          period: "May 2025 – Sep 2025",
          description: [
            "Contributed to web and software development tasks.",
            "Applied debugging and version control practices in a professional environment."
          ]
        }
      ]
    },
    skills: { title: "Skills & Expertise", subtitle: "The tools and technologies I use to bring ideas to life." },
    projects: { 
      title: "Featured Projects", 
      subtitle: "A selection of my recent work and academic projects.",
      demo_unavailable: "Live demo is currently unavailable. Check GitHub for source code!"
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have a project in mind? Let's build something amazing together.",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Opening your email client to send manually...",
      phone: "Phone",
      location: "Location",
      email_me: "Email Me",
      call_me: "Call Me",
      build_great: "Get in touch",
      message_placeholder: "Your message here..."
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  },
  sw: {
    nav: { about: "Kuhusu", experience: "Uzoefu", skills: "Ujuzi", projects: "Miradi", contact: "Wasiliana", download_cv: "Pakua CV" },
    hero: {
      greeting: "Habari, mimi ni Flavien Mbishibishi",
      role: "Mhandisi wa Programu na Shauku ya AI",
      description: "Ninajenga suluhisho zenye akili katika makutano ya huduma ya afya na teknolojia. Nimebobea katika ukuzaji wa mifumo kamili na inayotokana na data.",
      cta_projects: "Angalia Kazi Zangu",
      cta_contact: "Tuzungumze",
      available: "Napatikana kwa fursa"
    },
    about: {
      title: "Kuhusu Mimi",
      subtitle: "Nina shauku ya kujenga programu zinazoleta mabadiliko.",
      description: "Mimi ni Mhandisi wa Programu aliyejitolea na msingi thabiti katika miundo ya data, algoriti, na ukuzaji wa mifumo kamili. Safari yangu inaongozwa na hamu ya kutatua matatatizo magumu na kuunda uzoefu wa kidijitali wenye athari, haswa katika sekta ya huduma ya afya.",
      location: "Mahali",
      education: "Elimu",
      stats: { experience: "Miaka ya Uzoefu", projects: "Miradi Iliyokamilika", clients: "Wateja Wenye Furaha" },
      experience_card: { title: "Uzoefu", description: "Mhandisi wa Programu wa Mafunzo katika A2SV na Mkufunzi katika AUCA." },
      certifications_card: { title: "Vyeti", description: "Cisco NetOps, Hugging Face NLP, na zaidi." }
    },
    experience: { 
      title: "Uzoefu wa Kazi", 
      subtitle: "Safari yangu ya kitaaluma na mchango wangu.",
      items: [
        {
          role: "Mhandisi wa Programu wa Mafunzo",
          company: "A2SV",
          period: "Des 2025 – Sasa",
          description: [
            "Kutatua matatizo ya juu ya miundo ya data na algoriti (safu, grafu, DP).",
            "Kushirikiana na timu ya wasanidi wasomi ili kujenga suluhisho zinazoweza kupanuka."
          ]
        },
        {
          role: "Mkufunzi wa Uchambuzi wa Data Kubwa",
          company: "Kituo cha Ubunifu wa Programu cha AUCA",
          period: "Des 2025 – Feb 2026",
          description: [
            "Alifundisha dhana za Data Kubwa na kujifunza kwa mashine kwa wanafunzi.",
            "Alishauri miradi ya ML ya mwisho hadi mwisho kutoka kwa ukusanyaji wa data hadi utumaji wa mfano."
          ]
        },
        {
          role: "Mwanafunzi wa Ukuzaji wa Programu",
          company: "The Gym Rwanda",
          period: "Mei 2025 – Sep 2025",
          description: [
            "Alichangia katika kazi za ukuzaji wa wavuti na programu.",
            "Alitumia mazoea ya utatuzi na udhibiti wa toleo katika mazingira ya kitaaluma."
          ]
        }
      ]
    },
    skills: { title: "Ujuzi na Utaalamu", subtitle: "Zana na teknolojia ninazotumia kuleta mawazo kwenye maisha." },
    projects: { 
      title: "Miradi Iliyoangaziwa", 
      subtitle: "Uteuzi wa kazi zangu za hivi karibuni na miradi ya kitaaluma.",
      demo_unavailable: "Onyesho la moja kwa moja halipatikani kwa sasa. Angalia GitHub kwa nambari ya chanzo!"
    },
    contact: {
      title: "Wasiliana Nami",
      subtitle: "Una mradi akilini? Hebu tujenge kitu cha kushangaza pamoja.",
      name: "Jina Lako",
      email: "Barua Pepe Yako",
      message: "Ujumbe Wako",
      send: "Tuma Ujumbe",
      sending: "Inatuma...",
      success: "Ujumbe umetumwa kwa mafanikio!",
      error: "Imeshindwa kutuma ujumbe. Inafungua barua pepe yako ili utume mwenyewe...",
      phone: "Simu",
      location: "Mahali",
      email_me: "Nitumie Barua Pepe",
      call_me: "Nipigie Simu",
      build_great: "Wasiliana nami",
      message_placeholder: "Ujumbe wako hapa..."
    },
    footer: {
      rights: "Haki zote zimehifadhiwa.",
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Huduma"
    }
  },
  rw: {
    nav: { about: "Ibyerekeye", experience: "Inararibonye", skills: "Ubumenyi", projects: "Imishinga", contact: "Twandikire", download_cv: "Kurura CV" },
    hero: {
      greeting: "Muraho, nitwa Flavien Mbishibishi",
      role: "Injeniyeri w'Ibisobanuro n'Ubuhanga bw'Ubuhanga (AI)",
      description: "Nkubaka ibisubizo by'ubuhanga mu guhuza ubuvuzi n'ikoranabuhanga. Ninzobere mu kubaka sisitemu zose n'izishingiye ku makuru.",
      cta_projects: "Reba Ibikorwa Byanjye",
      cta_contact: "Tuvugane",
      available: "Niteguye amahirwe mashya"
    },
    about: {
      title: "Ibyerekeye Njye",
      subtitle: "Nfite ishyaka ryo kubaka porogaramu zizana impinduka.",
      description: "Ndi Injeniyeri w'Ibisobanuro wiyeguriye umurimo ufite urufatiro rakomeye mu miterere y'amakuru, algorithms, no kubaka sisitemu zose. Urugendo rwanjye ruyobowe n'icyifuzo cyo gukemura ibibazo bikomeye no guhanga uburambe bw'ikoranabuhanga bufite ingaruka, cyane cyane mu rwego rw'ubuvuzi.",
      location: "Aho nherereye",
      education: "Amashuri",
      stats: { experience: "Imyaka y'Inararibonye", projects: "Imishinga Yarangiye", clients: "Abakiriya Bishimye" },
      experience_card: { title: "Inararibonye", description: "Injeniyeri w'Ibisobanuro wimenyereza muri A2SV n'umwarimu muri AUCA." },
      certifications_card: { title: "Impamyabumenyi", description: "Cisco NetOps, Hugging Face NLP, n'izindi." }
    },
    experience: { 
      title: "Inararibonye mu Kazi", 
      subtitle: "Urugendo rwanjye rw'umwuga n'umusanzu wanjye.",
      items: [
        {
          role: "Injeniyeri w'Ibisobanuro wimenyereza",
          company: "A2SV",
          period: "Ukuboza 2025 – Kugeza ubu",
          description: [
            "Gukemura ibibazo bikomeye by'imiterere y'amakuru na algorithms (arrays, graphs, DP).",
            "Gufatanya n'itsinda ry'abahanga mu kubaka ibisubizo bishobora kwaguka."
          ]
        },
        {
          role: "Umwarimu w'Ubusobanuro bw'Amakuru Manini (Big Data)",
          company: "AUCA Software Innovation Center",
          period: "Ukuboza 2025 – Gashyantare 2026",
          description: [
            "Nigishije abanyeshuri ibijyanye na Big Data na Machine Learning.",
            "Nafashije abanyeshuri mu mishinga ya ML kuva ku gukusanya amakuru kugeza kuyashyira mu bikorwa."
          ]
        },
        {
          role: "Wimenyereza mu Kubaka Porogaramu",
          company: "The Gym Rwanda",
          period: "Gicurasi 2025 – Nzeri 2025",
          description: [
            "Nafashije mu kubaka imbuga za interineti na porogaramu.",
            "Nakoresheje uburyo bwo gukemura amakosa (debugging) no gucunga verisiyo (version control) mu kazi."
          ]
        }
      ]
    },
    skills: { title: "Ubumenyi n'Ubuhanga", subtitle: "Ibikoresho n'ikoranabuhanga nkororesha mu gushyira ibitekerezo mu bikorwa." },
    projects: { 
      title: "Imishinga Yatoranyijwe", 
      subtitle: "Guhitamo ibikorwa byanjye vuba aha n'imishinga yo kwiga.",
      demo_unavailable: "Kwereka uko bikora ntibishoboka ubu. Reba kuri GitHub kugira ngo ubone code!"
    },
    contact: {
      title: "Twandikire",
      subtitle: "Fite umushinga utekereza? Reka twubake ikintu gitangaje hamwe.",
      name: "Izina Ryawe",
      email: "Imeri Yawe",
      message: "Ubutumwa Bwawe",
      send: "Ohereza Ubutumwa",
      sending: "Irimo kohereza...",
      success: "Ubutumwa bwoherejwe neza!",
      error: "Kwohereza ubutumwa byanze. Irimo gufungura imeri yawe kugira ngo ubohereze...",
      phone: "Terefoni",
      location: "Aho nherereye",
      email_me: "Nyandikira kuri Imeri",
      call_me: "Nkubita akadehe",
      build_great: "Twandikire",
      message_placeholder: "Ubutumwa bwawe hano..."
    },
    footer: {
      rights: "Uburenganzira bwose burasubijwe.",
      privacy: "Politiki y'Ibwanga",
      terms: "Amategeko n'Amabwiriza"
    }
  },
  fr: {
    nav: {
      about: "À Propos",
      experience: "Expérience",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      download_cv: "Télécharger CV"
    },
    hero: {
      greeting: "Bonjour, je suis Flavien Mbishibishi",
      role: "Ingénieur Logiciel & Passionné d'IA",
      description: "Je construis des solutions intelligentes à l'intersection de la santé et de la technologie. Spécialisé dans le développement full-stack et les systèmes basés sur les données.",
      cta_projects: "Voir Mes Travaux",
      cta_contact: "Parlons-en",
      available: "Disponible pour des opportunités"
    },
    about: {
      title: "À Propos de Moi",
      subtitle: "Passionné par la création de logiciels qui font la différence.",
      description: "Je suis un ingénieur logiciel dévoué avec une solide base en structures de données, algorithmes et développement full-stack. Mon parcours est guidé par le désir de résoudre des problèmes complexes et de créer des expériences numériques percutantes, particulièrement dans le secteur de la santé.",
      location: "Localisation",
      education: "Éducation",
      stats: { experience: "Années d'Expérience", projects: "Projets Terminés", clients: "Clients Satisfaits" },
      experience_card: { title: "Expérience", description: "Ingénieur logiciel stagiaire chez A2SV et instructeur à l'AUCA." },
      certifications_card: { title: "Certifications", description: "Cisco NetOps, Hugging Face NLP, et plus encore." }
    },
    experience: { 
      title: "Expérience Professionnelle", 
      subtitle: "Mon parcours professionnel et mes contributions.",
      items: [
        {
          role: "Ingénieur Logiciel Stagiaire",
          company: "A2SV",
          period: "Déc 2025 – Présent",
          description: [
            "Résolution de problèmes complexes de structures de données et d'algorithmes (tableaux, graphes, DP).",
            "Collaboration avec une équipe de développeurs d'élite pour construire des solutions évolutives."
          ]
        },
        {
          role: "Instructeur en Analyse de Big Data",
          company: "AUCA Software Innovation Center",
          period: "Déc 2025 – Fév 2026",
          description: [
            "Enseignement des concepts de Big Data et d'apprentissage automatique aux étudiants.",
            "Encadrement de projets ML de bout en bout, de la collecte de données au déploiement de modèles."
          ]
        },
        {
          role: "Stagiaire en Développement Logiciel",
          company: "The Gym Rwanda",
          period: "Mai 2025 – Sep 2025",
          description: [
            "Contribution aux tâches de développement web et logiciel.",
            "Application des pratiques de débogage et de contrôle de version dans un environnement professionnel."
          ]
        }
      ]
    },
    skills: {
      title: "Compétences & Expertise",
      subtitle: "Les outils et technologies que j'utilise pour donner vie aux idées."
    },
    projects: {
      title: "Projets Vedettes",
      subtitle: "Une sélection de mes travaux récents et projets académiques.",
      demo_unavailable: "La démo en direct est actuellement indisponible. Consultez GitHub pour le code source !"
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Vous avez un projet en tête ? Construisons quelque chose d'incroyable ensemble.",
      name: "Votre Nom",
      email: "Votre Email",
      message: "Votre Message",
      send: "Envoyer le Message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Échec de l'envoi du message. Ouverture de votre messagerie pour envoi manuel...",
      phone: "Téléphone",
      location: "Localisation",
      email_me: "M'envoyer un Email",
      call_me: "M'appeler",
      build_great: "Contactez-moi",
      message_placeholder: "Votre message ici..."
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    }
  }
};

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  color: string;
  features: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  details: string;
  category: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "RapidAid AI",
    description: "An emergency AI voice assistant designed to provide immediate healthcare guidance and emergency response coordination.",
    longDescription: "RapidAid AI is a cutting-edge emergency response system that leverages advanced Natural Language Processing to assist users during medical crises. It can identify symptoms, provide step-by-step first aid instructions, and automatically coordinate with local emergency services. Built with a focus on low-latency response and high accuracy in critical situations.",
    tags: ["Python", "OpenAI API", "Speech Recognition", "Healthcare AI"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/mbishflavien/RapidAid-Healthcare-AI-Voice-Assistant",
    color: "from-red-500/20 to-orange-500/20",
    features: ["Real-time voice processing", "Emergency service integration", "Offline first-aid database", "Multi-language support"]
  },
  {
    title: "MediTrack",
    description: "Health Risk Prediction System using advanced machine learning models to predict potential health risks based on patient data.",
    longDescription: "MediTrack utilizes state-of-the-art machine learning algorithms to analyze patient history, lifestyle factors, and clinical data to predict potential health risks before they become critical. The system provides actionable insights for both patients and healthcare providers, enabling proactive health management and early intervention.",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Pandas"],
    image: "https://www.healthvectors.ai/blog/storage/2025/05/chronic-disease-prevention-with-smart-report.jpg",
    github: "https://github.com/kezacardine/kfh_hospital",
    color: "from-blue-500/20 to-teal-500/20",
    features: ["Predictive risk modeling", "Patient data visualization", "Automated health reports", "Provider dashboard"]
  },
  {
    title: "CareConnect",
    description: "A comprehensive Healthcare Management System designed with a robust relational database and optimized PL/SQL queries.",
    longDescription: "CareConnect is an enterprise-grade hospital management solution that streamlines clinical and administrative workflows. It features a highly optimized database architecture capable of handling millions of patient records with sub-second query times. The system includes modules for appointment scheduling, electronic health records (EHR), and billing.",
    tags: ["PL/SQL", "Oracle", "Database Design", "Healthcare"],
    image: "https://datasolutionsexperts.com/wp-content/uploads/2024/01/Healthcare-Database-1.jpg",
    github: "https://github.com/mbishflavien/mbishibishi_flavien_27857_plsql_capstone_project",
    color: "from-emerald-500/20 to-cyan-500/20",
    features: ["Optimized PL/SQL procedures", "Role-based access control", "Comprehensive EHR management", "Automated billing system"]
  }
];

const SKILLS: Skill[] = [
  { 
    name: "Python", 
    icon: <Terminal className="w-4 h-4" />, 
    level: 90,
    category: "Programming",
    details: "Expertise in Python for backend development, data analysis, and automation. Proficient with frameworks like Django and FastAPI, and libraries like NumPy and Pandas."
  },
  { 
    name: "SQL", 
    icon: <Database className="w-4 h-4" />, 
    level: 85,
    category: "Database",
    details: "Strong command of SQL for complex data querying, database design, and optimization. Experienced with PostgreSQL, MySQL, and Oracle PL/SQL."
  },
  { 
    name: "Machine Learning", 
    icon: <BrainCircuit className="w-4 h-4" />, 
    level: 80,
    category: "AI",
    details: "Experience in building and deploying ML models for classification, regression, and NLP. Skilled in Scikit-learn, TensorFlow, and Hugging Face Transformers."
  },
  { 
    name: "Data Structures", 
    icon: <Code2 className="w-4 h-4" />, 
    level: 85,
    category: "Core CS",
    details: "Deep understanding of fundamental data structures and algorithms. Skilled in optimizing code for time and space complexity."
  },
  { 
    name: "PostgreSQL", 
    icon: <Database className="w-4 h-4" />, 
    level: 80,
    category: "Database",
    details: "Advanced knowledge of PostgreSQL administration, performance tuning, and complex relational modeling."
  },
  { 
    name: "Linux/Bash", 
    icon: <Terminal className="w-4 h-4" />, 
    level: 75,
    category: "DevOps",
    details: "Proficient in Linux environment management, shell scripting for automation, and server configuration."
  },
];

// --- Components ---

const HERO_BACKGROUNDS = [
  "bg-primary/20",
  "bg-blue-500/20",
  "bg-purple-500/20",
  "bg-emerald-500/20",
  "bg-orange-500/20",
  "bg-pink-500/20",
];

const HeroImage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const imageUrl = "https://lh3.googleusercontent.com/d/12ZzNcydVq1YeuFHfoRhF-sUV-4muXUyE";
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentBg = HERO_BACKGROUNDS[bgIndex];

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-square flex items-center justify-center">
      {/* Background Glow */}
      <div className={cn(
        "absolute inset-0 blur-[180px] rounded-full animate-pulse transition-colors duration-1000",
        isDarkMode ? "bg-primary/40" : "bg-primary/30"
      )} />
      
      {/* Animated Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[115%] h-[115%] border border-dashed border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[130%] h-[130%] border border-primary/10 rounded-full"
        />
      </div>

      {/* Image Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Main Image with "Background Removed" effect using mask/styling */}
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
            className="relative w-full h-full overflow-hidden border-4 border-primary/20 shadow-2xl group"
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

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
            <img
              src={imageUrl}
              alt="Flavien Mbishibishi"
              className="w-full h-full object-contain relative z-20 transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Overlay for better integration */}
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-30" />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-background/80 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-xl z-40"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Open to Work</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tracking-tighter"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-foreground/70 text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-primary rounded-full"
    />
  </div>
);

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showDemoUnavailable, setShowDemoUnavailable] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const t = TRANSLATIONS[language];

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDemoUnavailable(true);
    setTimeout(() => setShowDemoUnavailable(false), 3000);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
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
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      <Background3D mouseX={mouseX} mouseY={mouseY} isDarkMode={isDarkMode} />
      {/* Progress Bar */}
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
        className="fixed top-0 w-full z-40 border-b border-primary/10 bg-background/40 backdrop-blur-xl shadow-sm"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.a 
            href="#" 
            className="text-xl font-bold tracking-tighter hover:text-primary transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
              <Code2 size={18} />
            </div>
            <span className="text-primary">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="relative text-sm font-medium text-foreground/60 hover:text-primary transition-colors group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center space-x-2 border-l border-primary/10 pl-6">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer hover:text-primary transition-colors"
              >
                <option value="en" className="bg-background">EN</option>
                <option value="sw" className="bg-background">SW</option>
                <option value="rw" className="bg-background">RW</option>
                <option value="fr" className="bg-background">FR</option>
              </select>

              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            
            <a href="/Flavien_MBISHIBISHI_CV.pdf" download>
              <Button className="rounded-full">
                {t.nav.download_cv} <Download className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b bg-background"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <a href="/Flavien_MBISHIBISHI_CV.pdf" download className="w-full">
                  <Button className="w-full rounded-full py-6 text-lg">
                    {t.nav.download_cv} <Download className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Hero Parallax Background Elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div 
            style={{ 
              x: useTransform(mouseX, [0, 1920], [-100, 100]),
              y: useTransform(mouseY, [0, 1080], [-100, 100])
            }}
            className="absolute top-[20%] left-[10%] w-64 h-64 bg-primary/10 blur-3xl rounded-full"
          />
          <motion.div 
            style={{ 
              x: useTransform(mouseX, [0, 1920], [150, -150]),
              y: useTransform(mouseY, [0, 1080], [150, -150])
            }}
            className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"
          />
          
          {/* Floating Icons */}
          {[Code2, Database, BrainCircuit, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                rotate: [i * 45, i * 45 + 10, i * 45]
              }}
              transition={{ 
                y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute hidden lg:block text-primary/20"
              style={{ 
                top: `${20 + i * 20}%`, 
                left: `${15 + i * 25}%`,
                x: useTransform(mouseX, [0, 1920], [(i + 1) * -30, (i + 1) * 30]),
                y: useTransform(mouseY, [0, 1080], [(i + 1) * -30, (i + 1) * 30]),
                rotate: i * 45
              }}
            >
              <Icon size={40 + i * 10} strokeWidth={1} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="px-4 py-1 text-sm font-medium rounded-full mb-4">
                {t.hero.available}
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                {t.hero.role.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-primary italic">{t.hero.role.split(' ').slice(2).join(' ')}.</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 max-w-lg leading-relaxed">
                {t.hero.greeting.includes(',') ? t.hero.greeting.split(',')[0] : t.hero.greeting}, <span className="text-foreground font-semibold">Flavien MBISHIBISHI</span>. 
                {t.hero.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                <a href="#projects">{t.hero.cta_projects}</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg">
                <a href="#contact">{t.hero.cta_contact}</a>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-6 pt-4"
            >
              <a href="https://github.com/mbishflavien" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/mbishibishi-flavien-4120a52b8" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:flavmbish@gmail.com" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <HeroImage isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/10 backdrop-blur-[2px]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionHeading subtitle={t.about.subtitle}>
                {t.about.title}
              </SectionHeading>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  {t.about.description.split('. ')[0]}.
                </p>
                <p>
                  {t.about.description.split('. ').slice(1).join('. ')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-foreground/60 uppercase tracking-wider font-bold">{t.about.location}</p>
                  <p className="font-medium flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary" /> Kigali, Rwanda</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground/60 uppercase tracking-wider font-bold">{t.about.education}</p>
                  <p className="font-medium flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-primary" /> BSc Software Engineering</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-background border shadow-sm space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{t.about.experience_card.title}</h3>
                <p className="text-sm text-foreground/70">{t.about.experience_card.description}</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-background border shadow-sm space-y-4 mt-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{t.about.certifications_card.title}</h3>
                <p className="text-sm text-foreground/70">{t.about.certifications_card.description}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.skills.subtitle}>
            {t.skills.title}
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSkill(skill)}
                className="group p-8 rounded-3xl bg-muted/20 border border-transparent hover:border-primary/20 hover:bg-muted/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-primary/50">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                  </div>
                  <span className="text-sm font-mono text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3 justify-center">
            {["Pandas", "NumPy", "Scikit-learn", "Git", "MySQL", "Oracle", "Networking", "Bash"].map((item) => (
              <Badge key={item} variant="outline" className="px-6 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-muted/10 backdrop-blur-[2px]">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.projects.subtitle}>
            {t.projects.title}
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card 
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    "group overflow-hidden rounded-3xl border border-transparent hover:border-primary/20 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-card/50 backdrop-blur-sm relative cursor-pointer",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500",
                    project.color
                  )}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="flex space-x-3">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={handleDemoClick}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="secondary" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                              <Github className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary border-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2 text-foreground/70">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle={t.experience.subtitle}>
            {t.experience.title}
          </SectionHeading>

          <div className="max-w-4xl mx-auto space-y-12">
            {t.experience.items.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative pl-8 md:pl-12 border-l-2 border-muted hover:border-primary transition-colors group"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted group-hover:bg-primary transition-colors border-4 border-background" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0 px-4 py-1 rounded-full">
                    {exp.period}
                  </Badge>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/70">
                      <ChevronRight className="w-4 h-4 mr-2 mt-1 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-8 md:p-16 text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tighter">{t.contact.build_great}</h2>
                <p className="text-primary-foreground/80 text-lg">
                  {t.contact.subtitle}
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/60 uppercase font-bold tracking-wider">{t.contact.email_me}</p>
                      <p className="text-xl font-semibold">flavmbish@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/60 uppercase font-bold tracking-wider">{t.contact.call_me}</p>
                      <p className="text-xl font-semibold">+250 790 817 920</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-8 rounded-[2rem] backdrop-blur-sm border border-white/10">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">{t.contact.name}</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all",
                      errors.name ? "border-red-400 focus:ring-red-400/20" : "border-white/10 focus:ring-white/20"
                    )}
                  />
                  {errors.name && <p className="text-xs text-red-300 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">{t.contact.email}</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all",
                      errors.email ? "border-red-400 focus:ring-red-400/20" : "border-white/10 focus:ring-white/20"
                    )}
                  />
                  {errors.email && <p className="text-xs text-red-300 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">{t.contact.message}</label>
                  <textarea 
                    rows={4}
                    placeholder={t.contact.message_placeholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none",
                      errors.message ? "border-red-400 focus:ring-red-400/20" : "border-white/10 focus:ring-white/20"
                    )}
                  />
                  {errors.message && <p className="text-xs text-red-300 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.message}</p>}
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-primary hover:bg-white/90 rounded-xl h-14 text-lg font-bold disabled:opacity-50"
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </Button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-100 flex items-center text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" /> {t.contact.success}
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-100 flex items-center text-sm"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" /> {t.contact.error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-2 mx-auto md:mx-0">
              <Code2 size={20} />
            </div>
            <p className="text-sm text-foreground/60 mt-1">© 2026 Flavien MBISHIBISHI. {t.footer.rights}</p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t.footer.terms}</a>
            <div className="flex items-center space-x-4 ml-6">
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://github.com/mbishflavien"><Github className="w-5 h-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://linkedin.com/in/mbishibishi-flavien-4120a52b8"><Linkedin className="w-5 h-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="mailto:flavmbish@gmail.com"><Mail className="w-5 h-5" /></a>
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
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform"
      >
        <ChevronRight className="w-6 h-6 -rotate-90" />
      </motion.button>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl rounded-3xl overflow-hidden p-0 border-none bg-background/95 backdrop-blur-xl">
          <DialogTitle className="sr-only">Project Details: {selectedProject?.title}</DialogTitle>
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative aspect-video">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t from-background to-transparent", selectedProject.color)} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter">{selectedProject.title}</h2>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" /> Overview
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {selectedProject.longDescription}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-primary" /> Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-foreground/70">
                          <ChevronRight className="w-4 h-4 mr-2 text-primary" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <ExternalLink className="w-5 h-5 mr-2 text-primary" /> Links
                    </h3>
                    <div className="flex flex-col gap-3">
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" className="rounded-xl justify-start w-full">
                            <Github className="w-4 h-4 mr-2" /> View Source Code
                          </Button>
                        </a>
                      )}
                      <Button className="rounded-xl justify-start" onClick={handleDemoClick}>
                        <ExternalLink className="w-4 h-4 mr-2" /> Launch Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Skill Detail Modal */}
      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        <DialogContent className="max-w-md rounded-3xl bg-background/95 backdrop-blur-xl border-primary/10">
          <DialogTitle className="sr-only">Skill Details: {selectedSkill?.name}</DialogTitle>
          {selectedSkill && (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl">
                  {selectedSkill.icon}
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">{selectedSkill.category}</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter">{selectedSkill.name}</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground/60">Proficiency</span>
                  <span className="text-2xl font-mono font-bold text-primary">{selectedSkill.level}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center">
                  <BrainCircuit className="w-5 h-5 mr-2 text-primary" /> Expertise Details
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {selectedSkill.details}
                </p>
              </div>

              <Button className="w-full rounded-xl h-12" onClick={() => setSelectedSkill(null)}>
                Close Details
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Demo Unavailable Notification */}
      <AnimatePresence>
        {showDemoUnavailable && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-[100] bg-background/80 backdrop-blur-md border border-primary/20 px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5 text-primary" />
            <span>{t.projects.demo_unavailable}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
