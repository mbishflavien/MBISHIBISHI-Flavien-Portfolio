import { Language, ProjectItem } from '../types/portfolio';

// Strings for the current layout. Everything else still comes from TRANSLATIONS.
export interface SiteCopy {
  nav_work: string;
  nav_contact: string;
  kicker: [string, string];
  motto: [string, string];
  bio: string;
  headline: string[]; // last line is followed by the lime word
  headline_lime: string;
  intro: string;
  // {a2sv} {nvidia} {auca} {gym} are replaced with links
  intro_more: string;
  work_title: string;
  certs_title: string;
  tools: string;
  statements: [string, string, string];
  rings: [string, string, string, string];
  footer_headline: string[];
  footer_lime: string;
  write: string;
  copied: string;
  live: string;
  code: string;
  verify: string;
}

export const SITE_COPY: Record<Language, SiteCopy> = {
  en: {
    nav_work: "Work",
    nav_contact: "Contact",
    kicker: ["Software &", "Machine Learning"],
    motto: ["Backend first.", "Models second."],
    bio: "I'm Flavien Mbishibishi, a software engineering student, Backend / ML intern at A2SV and NVIDIA developer. I build healthcare tools that work on real data.",
    headline: ["I build", "software for", "health &"],
    headline_lime: "AI",
    intro: "I build AI tools that help people get care, and the backends that keep them running.",
    intro_more: "Right now I'm a Backend / ML intern at {a2sv} and an {nvidia} developer. Before that I taught Big Data at {auca} and trained at {gym}.",
    work_title: "Selected work",
    certs_title: "Badges & certificates",
    tools: "Tools",
    statements: ["Built with purpose", "Built for people", "Ship. Learn. Repeat."],
    rings: ["400+ problems solved.", "Backend first. Models second.", "I teach what I learn.", "Four languages, one voice."],
    footer_headline: ["Let's build", "something that"],
    footer_lime: "helps",
    write: "Write to me",
    copied: "Copied",
    live: "Live",
    code: "Code",
    verify: "Verify",
  },
  sw: {
    nav_work: "Kazi",
    nav_contact: "Mawasiliano",
    kicker: ["Programu &", "Machine Learning"],
    motto: ["Backend kwanza.", "Modeli baadaye."],
    bio: "Mimi ni Flavien Mbishibishi, mwanafunzi wa uhandisi wa programu, mwanafunzi wa mafunzo ya Backend / ML katika A2SV na msanidi wa NVIDIA. Ninajenga zana za afya zinazofanya kazi kwa data halisi.",
    headline: ["Ninajenga", "programu za", "afya na"],
    headline_lime: "AI",
    intro: "Ninajenga zana za AI zinazosaidia watu kupata huduma, na backend zinazozifanya ziendelee kufanya kazi.",
    intro_more: "Kwa sasa niko kwenye mafunzo ya Backend / ML katika {a2sv} na ni msanidi wa {nvidia}. Kabla ya hapo nilifundisha Big Data katika {auca} na nilifunzwa katika {gym}.",
    work_title: "Kazi teule",
    certs_title: "Nishani na vyeti",
    tools: "Zana",
    statements: ["Kujenga kwa lengo", "Kujenga kwa ajili ya watu", "Toa. Jifunze. Rudia."],
    rings: ["Changamoto 400+ zimetatuliwa.", "Backend kwanza. Modeli baadaye.", "Ninafundisha ninachojifunza.", "Lugha nne, sauti moja."],
    footer_headline: ["Tujenge", "kitu kinacho"],
    footer_lime: "saidia",
    write: "Niandikie",
    copied: "Imenakiliwa",
    live: "Hai",
    code: "Msimbo",
    verify: "Thibitisha",
  },
  rw: {
    nav_work: "Imishinga",
    nav_contact: "Twandikire",
    kicker: ["Software &", "Machine Learning"],
    motto: ["Backend mbere.", "Modeli nyuma."],
    bio: "Nitwa Flavien Mbishibishi, umunyeshuri muri software engineering, intern wa Backend / ML muri A2SV na NVIDIA developer. Nubaka ibikoresho by'ubuvuzi bikora ku makuru nyayo.",
    headline: ["Nubaka", "software", "z'ubuvuzi na"],
    headline_lime: "AI",
    intro: "Nubaka ibikoresho bya AI bifasha abantu kubona ubuvuzi, n'ama-backend atuma bikomeza gukora.",
    intro_more: "Ubu ndi intern wa Backend / ML muri {a2sv} kandi ndi {nvidia} developer. Mbere y'aho nigishije Big Data muri {auca} kandi nahuguriwe muri {gym}.",
    work_title: "Imishinga yatoranyijwe",
    certs_title: "Badges n'impamyabumenyi",
    tools: "Ibikoresho",
    statements: ["Kubaka bifite intego", "Kubaka kubera abantu", "Sohora. Iga. Subiramo."],
    rings: ["Ibibazo 400+ byakemuwe.", "Backend mbere. Modeli nyuma.", "Nigisha ibyo niga.", "Indimi enye, ijwi rimwe."],
    footer_headline: ["Twubake", "ikintu"],
    footer_lime: "gifasha",
    write: "Nyandikira",
    copied: "Byakoporowe",
    live: "Irakora",
    code: "Kode",
    verify: "Genzura",
  },
  fr: {
    nav_work: "Projets",
    nav_contact: "Contact",
    kicker: ["Logiciel &", "Machine Learning"],
    motto: ["Le backend d'abord.", "Les modèles ensuite."],
    bio: "Je suis Flavien Mbishibishi, étudiant en génie logiciel, stagiaire backend / ML chez A2SV et développeur NVIDIA. Je construis des outils de santé qui tournent sur de vraies données.",
    headline: ["Je conçois", "du logiciel", "santé et"],
    headline_lime: "IA",
    intro: "Je construis des outils d'IA qui aident les gens à se soigner, et les backends qui les font tourner.",
    intro_more: "Aujourd'hui je suis stagiaire backend / ML chez {a2sv} et développeur {nvidia}. Avant cela, j'ai enseigné le Big Data à l'{auca} et je me suis formé à {gym}.",
    work_title: "Projets choisis",
    certs_title: "Badges & certificats",
    tools: "Outils",
    statements: ["Construit avec sens", "Construit pour les gens", "Livrer. Apprendre. Recommencer."],
    rings: ["400+ problèmes résolus.", "Le backend d'abord. Les modèles ensuite.", "J'enseigne ce que j'apprends.", "Quatre langues, une voix."],
    footer_headline: ["Construisons", "quelque chose qui"],
    footer_lime: "aide",
    write: "Écrivez-moi",
    copied: "Copié",
    live: "En ligne",
    code: "Code",
    verify: "Vérifier",
  },
};

// The inflated word in the hero cycles through these, starting with the page's language.
export const GREETINGS: Record<Language, string> = {
  en: 'hello',
  rw: 'muraho',
  sw: 'jambo',
  fr: 'bonjour',
};

export const INTRO_LINKS: Record<string, { label: string; href: string }> = {
  a2sv: { label: 'A2SV', href: 'https://a2sv.org' },
  nvidia: { label: 'NVIDIA', href: 'https://developers.google.com/profile/badges/nvidia-developer?u=flavienmbishibishi' },
  auca: { label: 'AUCA', href: 'https://auca.ac.rw' },
  gym: { label: 'The Gym Rwanda', href: 'https://thegym.rw' },
};

const INTORE_LINKS = {
  link: "https://intore-ai-site.vercel.app",
  github: "https://github.com/mbishflavien/intore-ai-site",
};
const CLAPLOCK_LINKS = {
  github: "https://github.com/mbishflavien/ai-iot-clap-lock",
};

// Projects from GitHub that were not in the original list.
export const EXTRA_PROJECTS: Record<Language, ProjectItem[]> = {
  en: [
    {
      id: "intore",
      title: "IntoreAI",
      description: "A hiring platform for Rwandan teams: AI reads every application and ranks the shortlist, people make the hire.",
      longDescription: "IntoreAI screens every application, runs structured interviews and flags integrity risks, then hands the recruiter an explainable recommendation. The decision always stays with a person. Built across the marketing site, the Next.js app and the API behind it.",
      tags: ["Next.js", "TypeScript", "Hiring AI"],
      ...INTORE_LINKS,
      image: "/media/wide-intore.jpg",
      color: "",
      features: ["Ranked shortlist with a reason for each candidate", "Structured interviews", "Cookie sessions with optional two-factor sign-in", "Deployed on Vercel and Render"],
    },
    {
      id: "claplock",
      title: "Clap Lock",
      description: "A door lock that opens to a clapped rhythm: a sound model on a laptop, a FastAPI service and an ESP32 servo.",
      longDescription: "Clap the rhythm you enrolled, the way you knock on a friend's door: the green light comes on and the servo opens. A wrong rhythm flashes red; coughs, dropped pens and talking are ignored. Final project for AI and IoT at AUCA.",
      tags: ["Python", "FastAPI", "ESP32"],
      ...CLAPLOCK_LINKS,
      image: "",
      color: "",
      features: ["Clap detector that ignores coughs and talking", "Rhythm rules: open, deny, lock out", "ESP32 servo and LEDs, no extra libraries", "Offline self-tests and a simulated board"],
    },
  ],
  sw: [
    {
      id: "intore",
      title: "IntoreAI",
      description: "Jukwaa la kuajiri kwa timu za Rwanda: AI inasoma kila ombi na kupanga orodha fupi, watu ndio wanaoajiri.",
      longDescription: "IntoreAI inachuja kila ombi, inaendesha mahojiano yenye muundo na kuonyesha hatari za uadilifu, kisha inampa mwajiri pendekezo linaloelezeka. Uamuzi unabaki kwa mtu. Nimejenga tovuti, programu ya Next.js na API yake.",
      tags: ["Next.js", "TypeScript", "AI ya Kuajiri"],
      ...INTORE_LINKS,
      image: "/media/wide-intore.jpg",
      color: "",
      features: ["Orodha fupi yenye sababu kwa kila mgombea", "Mahojiano yenye muundo", "Kuingia kwa usalama na uthibitisho wa hatua mbili", "Imewekwa kwenye Vercel na Render"],
    },
    {
      id: "claplock",
      title: "Clap Lock",
      description: "Kufuli la mlango linalofunguka kwa mdundo wa makofi: modeli ya sauti, huduma ya FastAPI na servo ya ESP32.",
      longDescription: "Piga makofi kwa mdundo uliosajili, kama unavyogonga mlango wa rafiki: taa ya kijani inawaka na servo inafungua. Mdundo usio sahihi unawasha taa nyekundu; kikohozi na mazungumzo vinapuuzwa. Mradi wa mwisho wa AI na IoT, AUCA.",
      tags: ["Python", "FastAPI", "ESP32"],
      ...CLAPLOCK_LINKS,
      image: "",
      color: "",
      features: ["Kitambua makofi kinachopuuza kikohozi", "Sheria za mdundo: fungua, kataa, funga", "Servo ya ESP32 na taa za LED", "Majaribio ya nje ya mtandao"],
    },
  ],
  rw: [
    {
      id: "intore",
      title: "IntoreAI",
      description: "Urubuga rwo gutanga akazi ku makipe yo mu Rwanda: AI isoma buri busabe igakora urutonde ngufi, abantu nibo bafata icyemezo.",
      longDescription: "IntoreAI isuzuma buri busabe, ikayobora ibiganiro bifite umurongo, ikagaragaza ibyago, hanyuma igaha ushaka abakozi inama isobanutse. Icyemezo gihora ari icy'umuntu. Nubatse urubuga, porogaramu ya Next.js na API yayo.",
      tags: ["Next.js", "TypeScript", "AI yo gutanga akazi"],
      ...INTORE_LINKS,
      image: "/media/wide-intore.jpg",
      color: "",
      features: ["Urutonde ngufi rufite impamvu kuri buri mukandida", "Ibiganiro bifite umurongo", "Kwinjira mu buryo bwizewe n'intambwe ebyiri", "Ikorera kuri Vercel na Render"],
    },
    {
      id: "claplock",
      title: "Clap Lock",
      description: "Ingufuri y'umuryango ifungurwa n'injyana y'amashyi: modeli y'amajwi, serivisi ya FastAPI na servo ya ESP32.",
      longDescription: "Koma amashyi mu njyana wanditse, nk'uko ukomanga ku muryango w'inshuti: itara ry'icyatsi riraka maze servo igafungura. Injyana itari yo ituma itara ritukura ryaka; inkorora n'ibiganiro ntibyitabwaho. Umushinga wa nyuma wa AI na IoT muri AUCA.",
      tags: ["Python", "FastAPI", "ESP32"],
      ...CLAPLOCK_LINKS,
      image: "",
      color: "",
      features: ["Imenya amashyi ikirengagiza inkorora", "Amategeko y'injyana: fungura, anga, funga", "Servo ya ESP32 n'amatara ya LED", "Igerageza rikorwa nta interineti"],
    },
  ],
  fr: [
    {
      id: "intore",
      title: "IntoreAI",
      description: "Une plateforme de recrutement pour les équipes rwandaises : l'IA lit chaque candidature et classe la présélection, des humains décident.",
      longDescription: "IntoreAI trie chaque candidature, mène des entretiens structurés et signale les risques d'intégrité, puis remet au recruteur une recommandation explicable. La décision reste toujours humaine. Réalisé sur le site, l'application Next.js et l'API.",
      tags: ["Next.js", "TypeScript", "IA de recrutement"],
      ...INTORE_LINKS,
      image: "/media/wide-intore.jpg",
      color: "",
      features: ["Présélection classée avec une raison par candidat", "Entretiens structurés", "Sessions sécurisées avec double authentification", "Déployé sur Vercel et Render"],
    },
    {
      id: "claplock",
      title: "Clap Lock",
      description: "Une serrure qui s'ouvre sur un rythme de mains : un modèle sonore, un service FastAPI et un servo ESP32.",
      longDescription: "Frappez le rythme enregistré, comme on frappe à la porte d'un ami : la lumière verte s'allume et le servo ouvre. Un mauvais rythme fait clignoter le rouge ; toux et conversations sont ignorées. Projet final d'IA et IoT à l'AUCA.",
      tags: ["Python", "FastAPI", "ESP32"],
      ...CLAPLOCK_LINKS,
      image: "",
      color: "",
      features: ["Détecteur de claquements qui ignore la toux", "Règles de rythme : ouvrir, refuser, verrouiller", "Servo ESP32 et LED", "Tests hors ligne et carte simulée"],
    },
  ],
};

// Wide screens of the live projects, and the lime tag each tile carries.
export const PROJECT_MEDIA: Record<string, string> = {
  rapidaid: "/media/wide-rapidaid.jpg",
  meditrack: "/media/wide-meditrack.jpg",
  careconnect: "/media/wide-careconnect.jpg",
  intore: "/media/wide-intore.jpg",
};

export const PROJECT_TAG: Record<string, string> = {
  rapidaid: "Healthcare AI",
  meditrack: "Machine learning",
  careconnect: "Database",
  intore: "Hiring platform",
  claplock: "AI + IoT",
};

// The Clap Lock README's own diagram, shown instead of a screenshot.
export const CLAPLOCK_DIAGRAM = `BRAIN  laptop
mic → sound events → model
clap or not? → clap times
        │
CLOUD  FastAPI :8000
POST /attempt {times}
rules: open / deny / locked
        │
BODY   ESP32
GET /device/next  3× a second
"7 open" → green LED + servo
"8 deny" → red LED flashes`;

export const TOOLS = ["Python", "FastAPI", "SQL", "PostgreSQL", "Oracle PL/SQL", "Scikit-learn", "PyTorch", "Pandas", "React", "TypeScript", "Linux / Bash", "Git"];
