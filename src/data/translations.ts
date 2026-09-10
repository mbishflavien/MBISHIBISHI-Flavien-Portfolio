import { Language, Translation, LanguageOption } from '../types/portfolio';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', flag: '🇷🇼' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      awards: "Badges & Certs",
      contact: "Contact",
      download_cv: "Download CV",
      language: "Language"
    },
    hero: {
      greeting: "Hi, I'm Flavien Mbishibishi",
      role: "Software Engineer & AI Enthusiast",
      description: "Building intelligent solutions at the intersection of healthcare and technology. Specialized in full-stack development, distributed computing, and data-driven systems.",
      cta_projects: "View My Work",
      cta_contact: "Let's Talk",
      open_to_work: "Open to Work"
    },
    about: {
      title: "About Me",
      subtitle: "Passionate about building software that makes a tangible difference.",
      description: "I am a dedicated Software Engineer with a strong foundation in data structures, algorithms, and full-stack development. My journey is driven by a desire to solve complex computational problems and create impactful digital experiences, particularly in the healthcare and artificial intelligence domains.",
      location: "Location",
      location_value: "Kigali, Rwanda",
      education: "Education",
      education_value: "BSc Software Engineering",
      education_period: "June 2024 – Present",
      stats: {
        experience: "Years Experience",
        projects: "Projects Completed",
        clients: "Happy Clients"
      },
      experience_card: {
        title: "Experience",
        description: "Backend / ML Intern at A2SV, NVIDIA Developer, and Big Data Instructor at AUCA."
      },
      certifications_card: {
        title: "Badges & Certs",
        description: "GDG Kigali Chapter Member, NVIDIA Developer Badge, Cisco Networking, Hugging Face NLP, and more."
      }
    },
    experience: {
      title: "Work Experience",
      subtitle: "My professional journey, key responsibilities, and technical contributions.",
      items: [
        {
          role: "Backend / ML Engineering Intern",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Aug 2026 – Present",
          description: [
            "Architecting scalable backend services, asynchronous task pipelines, and high-performance RESTful APIs using Python, FastAPI, and PostgreSQL.",
            "Developing, fine-tuning, and productionizing Machine Learning models with robust data ingestion, feature processing, and inference pipelines.",
            "Optimizing database schemas, indexing strategies, and caching layers (Redis) to ensure high concurrency and sub-millisecond query latency.",
            "Collaborating with cross-functional engineering teams to implement clean architecture, CI/CD automation, and rigorous testing suites."
          ]
        },
        {
          role: "NVIDIA Developer",
          company: "NVIDIA Developer Program",
          period: "Apr 2026 – Present",
          description: [
            "Leveraging NVIDIA accelerated computing platforms, CUDA architectures, and optimized deep learning libraries for high-throughput AI workloads and model inference.",
            "Building and profiling GPU-accelerated computing pipelines, neural network models, and performance-optimized machine learning workflows.",
            "Active contributor within the global NVIDIA Developer community, participating in developer workshops, technical summits, and accelerated computing initiatives."
          ]
        },
        {
          role: "Trainee Software Engineer",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Dec 2025 – Present",
          description: [
            "Mastering advanced data structures and algorithmic problem solving (graph traversal, dynamic programming, trees, and heaps), solving 400+ problems.",
            "Collaborating with top-tier engineering cohorts on complex system designs, architectural breakdowns, and peer code reviews.",
            "Applying clean code principles, SOLID patterns, and test-driven development in distributed engineering environments."
          ]
        },
        {
          role: "Big Data Analytics Instructor",
          company: "AUCA Software Innovation Center",
          period: "Dec 2025 – Feb 2026",
          description: [
            "Designed and delivered an advanced curriculum on Big Data processing, distributed computing, and practical Machine Learning workflows to university students.",
            "Mentored student cohorts through end-to-end data science projects, covering exploratory data analysis (EDA), feature engineering, model evaluation, and deployment.",
            "Conducted hands-on lab sessions on modern data science stacks (Python, Pandas, NumPy, Scikit-Learn) and interactive visualizers."
          ]
        },
        {
          role: "Software Development Trainee",
          company: "The Gym Rwanda",
          period: "May 2025 – Sep 2025",
          description: [
            "Built and deployed responsive, user-centric web applications utilizing modern TypeScript, React, and RESTful API integrations.",
            "Implemented systematic debugging, code refactoring, Git workflows, and pull request reviews within an agile sprint-based lifecycle.",
            "Collaborated with senior engineers on full-stack architecture design, state management optimization, and UI/UX performance enhancements."
          ]
        }
      ]
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "The tools, frameworks, and technologies I use to bring ideas to life.",
      proficiency: "Proficiency",
      expertise_details: "Expertise Details",
      close_details: "Close Details",
      other_tools: "Other Tools & Technologies",
      items: [
        {
          name: "Python",
          level: 90,
          category: "Programming",
          details: "Expertise in Python for backend engineering, data science, and automation. Proficient with FastAPI, Django, NumPy, Pandas, and asynchronous programming."
        },
        {
          name: "SQL",
          level: 85,
          category: "Database",
          details: "Strong command of SQL for complex querying, database design, normalization, and optimization across PostgreSQL, MySQL, and Oracle PL/SQL."
        },
        {
          name: "Machine Learning",
          level: 80,
          category: "Artificial Intelligence",
          details: "Experience in building and deploying ML models for classification, regression, and NLP. Skilled in Scikit-learn, PyTorch, and Hugging Face Transformers."
        },
        {
          name: "Data Structures",
          level: 85,
          category: "Core CS",
          details: "Deep understanding of core data structures, algorithms, and algorithmic complexity. Experienced in optimizing code for time and space efficiency."
        },
        {
          name: "PostgreSQL",
          level: 80,
          category: "Database",
          details: "Advanced knowledge of PostgreSQL administration, relational schema design, indexing strategies, and query performance tuning."
        },
        {
          name: "Linux/Bash",
          level: 75,
          category: "DevOps & Cloud",
          details: "Proficient in Linux environment administration, shell scripting for pipeline automation, containerization concepts, and server configuration."
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of my recent engineering work and healthcare innovations.",
      demo_unavailable: "Live demo is currently unavailable. Check GitHub for source code!",
      view_details: "View Details",
      modal: {
        overview: "Overview",
        key_features: "Key Features",
        links: "Project Links",
        view_code: "View Source Code",
        launch_demo: "Launch Live Demo",
        close: "Close"
      },
      items: [
        {
          id: "rapidaid",
          title: "RapidAid AI",
          description: "An emergency AI voice assistant designed to provide immediate healthcare guidance and emergency response coordination.",
          longDescription: "RapidAid AI is a cutting-edge emergency response system that leverages advanced Natural Language Processing to assist users during medical crises. It can identify symptoms, provide step-by-step first aid instructions, and automatically coordinate with local emergency services. Built with a focus on low-latency response and high accuracy in critical situations.",
          tags: ["Python", "OpenAI API", "Speech Recognition", "Healthcare AI"],
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
          link: "https://rapid-aid-healthcare-ai-voice-assis.vercel.app/",
          github: "https://github.com/mbishflavien/RapidAid-Healthcare-AI-Voice-Assistant",
          color: "from-red-500/20 to-orange-500/20",
          features: ["Real-time voice processing", "Emergency service integration", "Offline first-aid database", "Multi-language support"]
        },
        {
          id: "meditrack",
          title: "MediTrack",
          description: "Health Risk Prediction System using advanced machine learning models to predict potential health risks based on patient data.",
          longDescription: "MediTrack utilizes state-of-the-art machine learning algorithms to analyze patient history, lifestyle factors, and clinical data to predict potential health risks before they become critical. The system provides actionable insights for both patients and healthcare providers, enabling proactive health management and early intervention.",
          tags: ["Python", "Machine Learning", "Scikit-learn", "Pandas"],
          image: "https://www.healthvectors.ai/blog/storage/2025/05/chronic-disease-prevention-with-smart-report.jpg",
          link: "https://kfh-hospital-1.onrender.com",
          github: "https://github.com/kezacardine/kfh_hospital",
          color: "from-blue-500/20 to-teal-500/20",
          features: ["Predictive risk modeling", "Patient data visualization", "Automated health reports", "Provider dashboard"]
        },
        {
          id: "careconnect",
          title: "CareConnect",
          description: "A comprehensive Healthcare Management System designed with a robust relational database and optimized PL/SQL queries.",
          longDescription: "CareConnect is an enterprise-grade hospital management solution that streamlines clinical and administrative workflows. It features a highly optimized database architecture capable of handling millions of patient records with sub-second query times. The system includes modules for appointment scheduling, electronic health records (EHR), and billing.",
          tags: ["PL/SQL", "Oracle", "Database Design", "Healthcare"],
          image: "https://datasolutionsexperts.com/wp-content/uploads/2024/01/Healthcare-Database-1.jpg",
          github: "https://github.com/mbishflavien/mbishibishi_flavien_27857_plsql_capstone_project",
          color: "from-emerald-500/20 to-cyan-500/20",
          features: ["Optimized PL/SQL procedures", "Role-based access control", "Comprehensive EHR management", "Automated billing system"]
        }
      ]
    },
    awards: {
      title: "Badges & Certifications",
      subtitle: "Verified community memberships, developer credentials, and technical certifications.",
      view_certificate: "View Details",
      hover_reveal: "Click to explore",
      view_credential: "View Credential",
      modal: {
        issued: "Issued",
        verified_credential: "Verified Credential",
        verify_google: "Verify on Google Developers",
        open_image: "Open Full Image",
        about_credential: "About this Credential",
        close: "Close"
      },
      items: [
        {
          id: "gdg",
          title: "Google Developer Groups Chapter Member",
          issuer: "Google Developer Groups (GDG) Kigali",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/community/gdg/chapter/badge.svg",
          description: "Official verified membership in Google Developer Groups (GDG) Kigali Chapter, collaborating on Google Cloud, Android, AI/ML, and community tech initiatives.",
          category: "Google Developer",
          verifyLink: "https://developers.google.com/profile/badges/community/gdg/chapter/member/gdg-kigali?u=flavienmbishibishi"
        },
        {
          id: "nvidia",
          title: "NVIDIA Developer Badge",
          issuer: "NVIDIA & Google Cloud Community",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/nvidia-developer/badge.svg",
          description: "Official recognition awarded through the Google Cloud and NVIDIA Developer collaboration for engagement in accelerated computing, AI workflows, and GPU architectures.",
          category: "AI & Cloud",
          verifyLink: "https://developers.google.com/profile/badges/nvidia-developer?u=flavienmbishibishi"
        },
        {
          id: "huggingface",
          title: "Hugging Face NLP Specialization",
          issuer: "Hugging Face",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1IK8tVbc8YpOHh0TCS2tI47QGakfoP3LX",
          description: "Advanced training in Natural Language Processing using Transformers, fine-tuning techniques, and state-of-the-art open-source AI models.",
          category: "AI / NLP"
        },
        {
          id: "cisco",
          title: "Cisco Networking Basics",
          issuer: "Cisco Networking Academy",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/10UvsVsWK7WPptu1oH6PmR8hC8B_DRQM_",
          description: "Validation of foundational knowledge in networking, covering OSI architecture, IP subnetting, network security, and infrastructure connectivity.",
          category: "Networking"
        },
        {
          id: "isoc",
          title: "Introduction to Network Operations",
          issuer: "Internet Society",
          date: "2023",
          image: "https://lh3.googleusercontent.com/d/1H_JbPQrP0MaDmnUdld53Q4YJNbdJWXG5",
          description: "Foundational course on network operations, routing protocols, and global internet infrastructure management.",
          category: "Networking"
        },
        {
          id: "thegym",
          title: "The Gym Certification",
          issuer: "The Gym Rwanda",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1xTMmtQJOCws26nZrnzEGcxPHkmXfpFtQ",
          description: "Professional certification in software engineering, modern web technologies, and collaborative digital product development.",
          category: "Software Engineering"
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have a project in mind or looking for an engineering partner? Let's build something remarkable together.",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! I will get back to you soon.",
      error: "Failed to send message. Opening your email client to send manually...",
      phone: "Phone",
      location: "Location",
      email_me: "Email Me",
      call_me: "Call Me",
      build_great: "Get in touch",
      message_placeholder: "Tell me about your project, idea, or questions...",
      name_error: "Name is required",
      email_error: "Email is required",
      email_invalid: "Please enter a valid email address",
      message_error: "Message is required",
      message_too_short: "Message must be at least 10 characters"
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      visits: "visits"
    },
    common: {
      select_language: "Select Language",
      back_to_top: "Back to top"
    }
  },
  sw: {
    nav: {
      about: "Kuhusu",
      experience: "Uzoefu",
      skills: "Ujuzi",
      projects: "Miradi",
      awards: "Nishani na Vyeti",
      contact: "Wasiliana",
      download_cv: "Pakua CV",
      language: "Lugha"
    },
    hero: {
      greeting: "Habari, mimi ni Flavien Mbishibishi",
      role: "Mhandisi wa Programu na Shauku ya AI",
      description: "Ninajenga suluhisho zenye akili katika makutano ya huduma ya afya na teknolojia. Nimebobea katika ukuzaji wa mifumo kamili, kompyuta iliyosambazwa, na mifumo inayotokana na data.",
      cta_projects: "Angalia Kazi Zangu",
      cta_contact: "Tuzungumze",
      open_to_work: "Niko Tayari Kufanya Kazi"
    },
    about: {
      title: "Kuhusu Mimi",
      subtitle: "Nina shauku kubwa ya kuunda programu zinazoleta mabadiliko chanya na yenye tija.",
      description: "Mimi ni Mhandisi wa Programu aliyejitolea na msingi thabiti katika miundo ya data, algoriti, na ukuzaji wa mifumo kamili (full-stack). Safari yangu inaongozwa na hamu ya kutatua changamoto ngumu za kiteknolojia na kuunda programu bunifu za kidijitali, hasa katika sekta ya huduma ya afya na mifumo ya Akili Mnemba (AI).",
      location: "Mahali",
      location_value: "Kigali, Rwanda",
      education: "Elimu",
      education_value: "BSc Uhandisi wa Programu",
      education_period: "Juni 2024 – Sasa",
      stats: {
        experience: "Miaka ya Uzoefu",
        projects: "Miradi Iliyokamilika",
        clients: "Wateja Wenye Furaha"
      },
      experience_card: {
        title: "Uzoefu",
        description: "Mhandisi wa Backend / ML katika A2SV, Msanidi Programu wa NVIDIA, na Mkufunzi AUCA."
      },
      certifications_card: {
        title: "Nishani na Vyeti",
        description: "Mwanachama wa GDG Kigali, NVIDIA Developer, Cisco Networking, Hugging Face NLP, na mengineyo."
      }
    },
    experience: {
      title: "Uzoefu wa Kazi",
      subtitle: "Safari yangu ya kitaaluma, majukumu muhimu, na mchango wangu wa kiufundi.",
      items: [
        {
          role: "Mhandisi Mwanafunzi wa Backend / ML",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Ago 2026 – Sasa",
          description: [
            "Kubuni na kuunda mifumo thabiti ya backend, huduma ndogo ndogo (microservices), na API za kasi ya juu kwa kutumia Python, FastAPI, na PostgreSQL.",
            "Kutengeneza, kurekebisha, na kuunganisha mifumo ya Kujifunza kwa Mashine (ML) kwenye mifumo ya uzalishaji yenye ufanisi mkubwa.",
            "Kuboresha utendakazi wa hifadhidata, mbinu za kuhifadhi kumbukumbu ya muda (Redis), na upakuaji wa data kwa haraka zaidi.",
            "Kushirikiana na timu za wahandisi kutekeleza usanifu safi wa programu, mifumo ya kiotomatiki ya CI/CD, na upimaji wa kina wa mifumo."
          ]
        },
        {
          role: "Msanidi Programu wa NVIDIA",
          company: "NVIDIA Developer Program",
          period: "Apr 2026 – Sasa",
          description: [
            "Kutumia mifumo ya kompyuta iliyoharakishwa ya NVIDIA, CUDA, na maktaba za kisasa za Deep Learning kwa kasi kubwa ya mafunzo na utekelezaji wa mifumo ya AI.",
            "Kujenga na kuboresha mifumo ya kompyuta inayotumia GPU na uchakataji wa data wa kasi ya juu.",
            "Mwanachama hai wa Jumuiya ya Kimataifa ya Wasanii wa NVIDIA (NVIDIA Developer), nikishiriki katika warsha za kiufundi na mikutano ya kiteknolojia."
          ]
        },
        {
          role: "Mhandisi wa Programu wa Mafunzo",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Des 2025 – Sasa",
          description: [
            "Kutatua matatizo zaidi ya 400+ ya kina ya miundo ya data na algoriti (grafu, mifumo ya DP, miti na heaps).",
            "Kushirikiana na wahandisi mahiri katika uchambuzi wa mifumo mikubwa na ukaguzi wa kina wa kanuni za programu.",
            "Kutumia kanuni za Clean Code, mifumo ya SOLID, na usanifu unaotegemea upimaji (TDD) katika mazingira ya kimataifa."
          ]
        },
        {
          role: "Mkufunzi wa Uchambuzi wa Data Kubwa",
          company: "Kituo cha Ubunifu wa Programu cha AUCA",
          period: "Des 2025 – Feb 2026",
          description: [
            "Kufundisha mitaala ya hali ya juu ya Data Kubwa, mifumo iliyosambazwa, na mbinu za Kujifunza kwa Mashine (ML) kwa wanafunzi wa chuo kikuu.",
            "Kushauri na kuongoza wanafunzi katika miradi halisi kuanzia uchambuzi wa data (EDA) hadi utekelezaji wa miundo ya AI.",
            "Kuendesha mafunzo ya vitendo ya zana za kisasa za uchambuzi wa data kama Python, Pandas, NumPy, na Scikit-Learn."
          ]
        },
        {
          role: "Mwanafunzi wa Ukuzaji wa Programu",
          company: "The Gym Rwanda",
          period: "Mei 2025 – Sep 2025",
          description: [
            "Kujenga na kusambaza mifumo ya wavuti inayovutia na inayojibu haraka kwa kutumia TypeScript, React, na API za kisasa.",
            "Kutumia mbinu za kisasa za utatuzi wa hitilafu (debugging), udhibiti wa matoleo ya Git, na utendakazi wa timu wa Agile.",
            "Kukuza maarifa ya usanifu wa mifumo ya full-stack na uboreshaji wa kiolesura cha mtumiaji (UI/UX)."
          ]
        }
      ]
    },
    skills: {
      title: "Ujuzi na Utaalamu",
      subtitle: "Zana, mifumo, na teknolojia ninazotumia kuleta mawazo kwenye uhalisia.",
      proficiency: "Kiwango cha Umahiri",
      expertise_details: "Maelezo ya Utaalamu",
      close_details: "Funga Maelezo",
      other_tools: "Zana na Teknolojia Nyingine",
      items: [
        {
          name: "Python",
          level: 90,
          category: "Utayarishaji wa Programu",
          details: "Utaalamu katika Python kwa ukuzaji wa mifumo ya backend, sayansi ya data, na otomatiki. Mahiri katika FastAPI, Django, NumPy, Pandas, na mifumo ya asynchronous."
        },
        {
          name: "SQL",
          level: 85,
          category: "Hifadhidata",
          details: "Umahiri thabiti wa SQL kwa maswali changamano, usanifu wa hifadhidata, na uboreshaji wa kasi katika PostgreSQL, MySQL, na Oracle PL/SQL."
        },
        {
          name: "Machine Learning",
          level: 80,
          category: "Akili Mnemba (AI)",
          details: "Uzoefu katika kujenga na kutekeleza mifumo ya ML ya uainishaji, utabiri, na uchakataji wa lugha ya asili (NLP) kwa kutumia Scikit-learn na PyTorch."
        },
        {
          name: "Data Structures",
          level: 85,
          category: "Misingi ya CS",
          details: "Uelewa wa kina wa miundo ya kimsingi ya data na algoriti changamano. Ujuzi wa kuboresha utendakazi wa programu kwa wakati na nafasi."
        },
        {
          name: "PostgreSQL",
          level: 80,
          category: "Hifadhidata",
          details: "Ujuzi wa hali ya juu wa usimamizi wa PostgreSQL, uundaji wa hifadhidata za uhusiano, mikakati ya indexing, na urekebishaji wa utendaji."
        },
        {
          name: "Linux/Bash",
          level: 75,
          category: "DevOps na Wingu",
          details: "Mahiri katika usimamizi wa mifumo ya uendeshaji ya Linux, uandishi wa hati za shell kwa otomatiki, na usanidi wa seva za mtandao."
        }
      ]
    },
    projects: {
      title: "Miradi Iliyoangaziwa",
      subtitle: "Uteuzi wa kazi zangu za hivi karibuni za kihandisi na uvumbuzi katika sekta ya afya.",
      demo_unavailable: "Onyesho la moja kwa moja halipatikani kwa sasa. Angalia GitHub kwa nambari ya chanzo!",
      view_details: "Tazama Maelezo",
      modal: {
        overview: "Muhtasari wa Mradi",
        key_features: "Vipengele Muhimu",
        links: "Viungo vya Mradi",
        view_code: "Tazama Kanuni ya Chanzo",
        launch_demo: "Fungua Onyesho Moja kwa Moja",
        close: "Funga"
      },
      items: [
        {
          id: "rapidaid",
          title: "RapidAid AI",
          description: "Msaidizi wa dharura wa sauti wa AI ulioundwa kutoa mwongozo wa haraka wa huduma ya afya na kuratibu huduma za dharura.",
          longDescription: "RapidAid AI ni mfumo wa kisasa wa huduma za dharura unaotumia Uchakataji wa Lugha Asilia (NLP) kusaidia watumiaji wakati wa migogoro ya kiafya. Inaweza kutambua dalili, kutoa maagizo ya hatua kwa hatua ya huduma ya kwanza, na kuratibu kiotomatiki na vituo vya dharura vya karibu. Imejengwa kwa kuzingatia majibu ya haraka sana na usahihi wa hali ya juu.",
          tags: ["Python", "OpenAI API", "Utambuzi wa Sauti", "AI ya Afya"],
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
          link: "https://rapid-aid-healthcare-ai-voice-assis.vercel.app/",
          github: "https://github.com/mbishflavien/RapidAid-Healthcare-AI-Voice-Assistant",
          color: "from-red-500/20 to-orange-500/20",
          features: ["Uchakataji wa sauti wa wakati halisi", "Muunganisho wa huduma za dharura", "Hifadhidata ya huduma ya kwanza bila intaneti", "Msaada wa lugha nyingi"]
        },
        {
          id: "meditrack",
          title: "MediTrack",
          description: "Mfumo wa Kutabiri Hatari za Afya unaotumia mifumo ya kisasa ya Machine Learning kutabiri hatari za kiafya kulingana na data ya mgonjwa.",
          longDescription: "MediTrack hutumia algoriti za hali ya juu za kujifunza kwa mashine kuchambua historia ya mgonjwa, mtindo wa maisha, na data ya maabara ili kutabiri hatari zinazoweza kutokea kabla hazijawa mbaya. Mfumo hutoa ufahamu unaofaa kwa wagonjwa na watoa huduma za afya.",
          tags: ["Python", "Machine Learning", "Scikit-learn", "Pandas"],
          image: "https://www.healthvectors.ai/blog/storage/2025/05/chronic-disease-prevention-with-smart-report.jpg",
          link: "https://kfh-hospital-1.onrender.com",
          github: "https://github.com/kezacardine/kfh_hospital",
          color: "from-blue-500/20 to-teal-500/20",
          features: ["Miundo ya utabiri wa hatari", "Uonyeshaji wa data za mgonjwa", "Ripoti za afya za kiotomatiki", "Dashibodi ya mtoa huduma"]
        },
        {
          id: "careconnect",
          title: "CareConnect",
          description: "Mfumo mpana wa Usimamizi wa Huduma za Afya ulioundwa kwa hifadhidata thabiti ya uhusiano na maswali yaliyoboreshwa ya PL/SQL.",
          longDescription: "CareConnect ni suluhisho la kiwango cha juu la usimamizi wa hospitali linalorahisisha mtiririko wa kazi za kliniki na utawala. Ina usanifu wa hifadhidata ulioboreshwa sana wenye uwezo wa kushughulikia mamilioni ya rekodi za wagonjwa kwa sekunde chache.",
          tags: ["PL/SQL", "Oracle", "Muundo wa Hifadhidata", "Afya"],
          image: "https://datasolutionsexperts.com/wp-content/uploads/2024/01/Healthcare-Database-1.jpg",
          github: "https://github.com/mbishflavien/mbishibishi_flavien_27857_plsql_capstone_project",
          color: "from-emerald-500/20 to-cyan-500/20",
          features: ["Mifumo ya PL/SQL iliyoboreshwa", "Udhibiti wa ufikiaji unaotegemea majukumu", "Usimamizi kamili wa EHR", "Mfumo wa ankara wa kiotomatiki"]
        }
      ]
    },
    awards: {
      title: "Nishani na Vyeti",
      subtitle: "Vyeti rasmi, nishani za utambuzi, na ushiriki thabiti katika jumuiya za kiteknolojia.",
      view_certificate: "Angalia Maelezo",
      hover_reveal: "Bofya kuona",
      view_credential: "Tazama Cheti",
      modal: {
        issued: "Imetolewa",
        verified_credential: "Cheti Kilichothibitishwa",
        verify_google: "Thibitisha kwenye Google Developers",
        open_image: "Fungua Picha Kamili",
        about_credential: "Kuhusu Cheti Hiki",
        close: "Funga"
      },
      items: [
        {
          id: "gdg",
          title: "Mwanachama wa Tawi la Google Developer Groups",
          issuer: "Google Developer Groups (GDG) Kigali",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/community/gdg/chapter/badge.svg",
          description: "Uanachama uliothibitishwa rasmi katika Google Developer Groups (GDG) Tawi la Kigali, kushirikiana katika Google Cloud, Android, AI/ML, na mipango ya jamii ya teknolojia.",
          category: "Google Developer",
          verifyLink: "https://developers.google.com/profile/badges/community/gdg/chapter/member/gdg-kigali?u=flavienmbishibishi"
        },
        {
          id: "nvidia",
          title: "Nishani ya Msanidi Programu wa NVIDIA",
          issuer: "Jumuiya ya NVIDIA na Google Cloud",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/nvidia-developer/badge.svg",
          description: "Utambuzi rasmi uliotolewa kupitia ushirikiano wa Google Cloud na NVIDIA Developer kwa ushiriki katika kompyuta iliyoharakishwa, michakato ya AI, na mifumo ya GPU.",
          category: "AI na Wingu",
          verifyLink: "https://developers.google.com/profile/badges/nvidia-developer?u=flavienmbishibishi"
        },
        {
          id: "huggingface",
          title: "Utaalamu wa NLP wa Hugging Face",
          issuer: "Hugging Face",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1IK8tVbc8YpOHh0TCS2tI47QGakfoP3LX",
          description: "Mafunzo ya kiwango cha juu katika Uchakataji wa Lugha Asilia (NLP) kwa kutumia Transformers, mbinu za fine-tuning, na mifumo ya AI ya kisasa.",
          category: "AI / NLP"
        },
        {
          id: "cisco",
          title: "Misingi ya Mitandao ya Cisco",
          issuer: "Cisco Networking Academy",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/10UvsVsWK7WPptu1oH6PmR8hC8B_DRQM_",
          description: "Uthibitisho wa maarifa ya kimsingi katika mifumo ya mitandao, usanifu wa OSI, ugawaji wa subnetting, usalama, na muunganisho.",
          category: "Mitandao"
        },
        {
          id: "isoc",
          title: "Utangulizi wa Uendeshaji wa Mtandao",
          issuer: "Internet Society",
          date: "2023",
          image: "https://lh3.googleusercontent.com/d/1H_JbPQrP0MaDmnUdld53Q4YJNbdJWXG5",
          description: "Kozi ya kimsingi ya uendeshaji wa mitandao, usanidi wa routing, na usimamizi wa miundombinu ya kimataifa ya intaneti.",
          category: "Mitandao"
        },
        {
          id: "thegym",
          title: "Cheti cha The Gym",
          issuer: "The Gym Rwanda",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1xTMmtQJOCws26nZrnzEGcxPHkmXfpFtQ",
          description: "Cheti cha kitaaluma cha uhandisi wa programu, mifumo ya kisasa ya wavuti, na maendeleo ya ujuzi wa kidijitali.",
          category: "Uhandisi wa Programu"
        }
      ]
    },
    contact: {
      title: "Wasiliana Nami",
      subtitle: "Je, una mradi akilini au unatafuta mshirika wa kihandisi? Hebu tujenge kitu cha kipekee pamoja.",
      name: "Jina Lako",
      email: "Barua Pepe Yako",
      message: "Ujumbe Wako",
      send: "Tuma Ujumbe",
      sending: "Inatuma...",
      success: "Ujumbe umetumwa kwa mafanikio! Nitawasiliana nawe hivi karibuni.",
      error: "Imeshindwa kutuma ujumbe. Inafungua barua pepe yako ili utume mwenyewe...",
      phone: "Simu",
      location: "Mahali",
      email_me: "Nitumie Barua Pepe",
      call_me: "Nipigie Simu",
      build_great: "Wasiliana nami",
      message_placeholder: "Nieleze kuhusu mradi wako, wazo lako, au maswali yako...",
      name_error: "Jina linahitajika",
      email_error: "Barua pepe inahitajika",
      email_invalid: "Tafadhali ingiza barua pepe sahihi",
      message_error: "Ujumbe unahitajika",
      message_too_short: "Ujumbe lazima uwe na angalau herufi 10"
    },
    footer: {
      rights: "Haki zote zimehifadhiwa.",
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Huduma",
      visits: "ziara"
    },
    common: {
      select_language: "Chagua Lugha",
      back_to_top: "Rudi Juu"
    }
  },
  rw: {
    nav: {
      about: "Ibyerekeye",
      experience: "Inararibonye",
      skills: "Ubumenyi",
      projects: "Imishinga",
      awards: "Badges n'Impamyabumenyi",
      contact: "Twandikire",
      download_cv: "Kurura CV",
      language: "Ururimi"
    },
    hero: {
      greeting: "Muraho, nitwa Flavien Mbishibishi",
      role: "Injeniyeri wa Software n'Ubuhanga bwa AI",
      description: "Nkubaka ibisubizo by'ubuhanga mu guhuza ubuvuzi n'ikoranabuhanga. Ninzobere mu kubaka sisitemu zose, kubara gukwirakwijwe (distributed computing), na porogaramu zishingiye ku makuru.",
      cta_projects: "Reba Ibikorwa Byanjye",
      cta_contact: "Tuvugane",
      open_to_work: "Niteguye Akazi"
    },
    about: {
      title: "Ibyerekeye Njye",
      subtitle: "Mfite ishyaka ryo kubaka porogaramu zizana impinduka zifatika mu buzima bw'abantu.",
      description: "Ndi Injeniyeri wa Software wiyeguriye umurimo ufite urufatiro rukomeye mu miterere y'amakuru, algorithms, no kubaka sisitemu zose (full-stack). Urugendo rwanjye ruyobowe n'icyifuzo cyo gukemura ibibazo bikomeye by'ikoranabuhanga no guhanga porogaramu zifite umumaro ukomeye, by'umwihariko mu buvuzi no mu bwenge bukorano (AI).",
      location: "Aho nherereye",
      location_value: "Kigali, u Rwanda",
      education: "Amashuri",
      education_value: "BSc muri Software Engineering",
      education_period: "Kamena 2024 – Kugeza ubu",
      stats: {
        experience: "Imyaka y'Inararibonye",
        projects: "Imishinga Yarangiye",
        clients: "Abakiriya Bishimye"
      },
      experience_card: {
        title: "Inararibonye",
        description: "Injeniyeri wa Backend / ML muri A2SV, Umushakashatsi wa NVIDIA, n'Umwarimu muri AUCA."
      },
      certifications_card: {
        title: "Badges n'Impamyabumenyi",
        description: "Umunyamuryango wa GDG Kigali, NVIDIA Developer, Cisco Networking, Hugging Face NLP, n'izindi."
      }
    },
    experience: {
      title: "Inararibonye mu Kazi",
      subtitle: "Urugendo rwanjye rw'umwuga, inshingano z'ingenzi, n'umusanzu wanjye wa tekiniki.",
      items: [
        {
          role: "Injeniyeri wa Backend / ML (Intern)",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Kanama 2026 – Kugeza ubu",
          description: [
            "Kubaka no gucunga serivisi za backend zikomeye, microservices, na API zihuse hifashishijwe Python, FastAPI, na PostgreSQL.",
            "Gukora, kunoza, no gushyira mu bikorwa uburyo bwa Machine Learning mu buryo bwizewe bw'ikoranabuhanga rikora mu gihe nyacyo.",
            "Kunoza imikorere ya database, uburyo bwo gushyira mu bubiko bwihuse (Redis), no kwihutisha iyoherezwa ry'amakuru.",
            "Gukorana n'amatsinda y'abahanga mu kwandika code zujuje ubuziranenge, gukoresha CI/CD, no gupima imikorere ya sisitemu."
          ]
        },
        {
          role: "Umushakashatsi na Porogaramu wa NVIDIA",
          company: "NVIDIA Developer Program",
          period: "Mata 2026 – Kugeza ubu",
          description: [
            "Gukoresha ikoranabuhanga rya NVIDIA ryo kwihutisha imikorere ya mudasobwa (accelerated computing), CUDA, na frameworks z'ubwenge bukorano (AI/Deep Learning).",
            "Kubaka no gushyira mu bikorwa imiyoboro ya Machine Learning yihutishwa na GPU hamwe n'ubushakashatsi bwo kongera umuvuduko wa algorithms.",
            "Umunyamuryango wa gahunda y'abashakashatsi n'abubatsi ba NVIDIA (NVIDIA Developer Program), witabira amahugurwa n'iterambere rya AI."
          ]
        },
        {
          role: "Injeniyeri wa Software wimenyereza",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Ukuboza 2025 – Kugeza ubu",
          description: [
            "Gukemura ibibazo birenga 400+ by'ubumenyi bwo hejuru mu miterere y'amakuru na algorithms (graphs, dynamic programming, ibiti na heaps).",
            "Gufatanya n'abahanga mu by'ikoranabuhanga mu gushushanya sisitemu nini no gusuzuma code zikomeye.",
            "Gukurikiza amategeko ya Clean Code, amahame ya SOLID, no gupima code mbere yo kuzikoresha (TDD)."
          ]
        },
        {
          role: "Umwarimu w'Ubusobanuro bw'Amakuru Manini (Big Data)",
          company: "AUCA Software Innovation Center",
          period: "Ukuboza 2025 – Gashyantare 2026",
          description: [
            "Kwigisha amasomo yimbitse ku gucunga amakuru manini (Big Data), uburyo bwo kuyasesengura, n'ikoranabuhanga rya Machine Learning ku banyeshuri ba kaminuza.",
            "Guherekeza no gufasha abanyeshuri mu mishinga y'ikoranabuhanga kuva ku gukusanya amakuru kugeza ku gushyira mu bikorwa imishinga ya AI.",
            "Kuyobora amasomo y'imyitozo ngiro ku bikoresho bya Python, Pandas, NumPy, na Scikit-Learn."
          ]
        },
        {
          role: "Kwimenyereza mu Kubaka Porogaramu",
          company: "The Gym Rwanda",
          period: "Gicurasi 2025 – Nzeri 2025",
          description: [
            "Kubaka imbuga za interineti na porogaramu zigezweho hifashishijwe TypeScript, React, na API zikora neza.",
            "Gukemura amakosa (debugging), gukoresha Git mu gucunga impinduka za code, no gukorera mu matsinda akoresha uburyo bwa Agile.",
            "Gutsura ubumenyi bwo hejuru mu kubaka gahunda za full-stack no korohereza abakoresha porogaramu (UI/UX)."
          ]
        }
      ]
    },
    skills: {
      title: "Ubumenyi n'Ubuhanga",
      subtitle: "Ibikoresho, frameworks n'ikoranabuhanga nkororesha mu gushyira ibitekerezo mu bikorwa.",
      proficiency: "Urugero rw'Ubumenyi",
      expertise_details: "Ibisobanuro by'Ubuhanga",
      close_details: "Funga Ibisobanuro",
      other_tools: "Ibindi Bikoresho n'Ikoranabuhanga",
      items: [
        {
          name: "Python",
          level: 90,
          category: "Gukora Porogaramu",
          details: "Ubumenyi buhanitse muri Python mu kubaka backend, ubumenyi bw'amakuru (data science), no gukora imirimo yikora. Inzobere muri FastAPI, Django, NumPy na Pandas."
        },
        {
          name: "SQL",
          level: 85,
          category: "Ububiko bw'Amakuru",
          details: "Ubumenyi bukomeye bwa SQL mu gushaka amakuru asobanutse, gushushanya database, no kongera umuvuduko muri PostgreSQL, MySQL na Oracle PL/SQL."
        },
        {
          name: "Machine Learning",
          level: 80,
          category: "Ubwenge Bukorano (AI)",
          details: "Inararibonye mu kubaka no gushyira mu bikorwa uburyo bwa ML bwo gushyira mu byiciro, guteganya (regression), na NLP hifashishijwe Scikit-learn na PyTorch."
        },
        {
          name: "Data Structures",
          level: 85,
          category: "Iby'ibanze bya CS",
          details: "Gusobanukirwa kwimbitse algorithms n'imiterere y'amakuru. Ubushobozi bwo kongera umuvuduko no kugabanya ububiko bwa porogaramu."
        },
        {
          name: "PostgreSQL",
          level: 80,
          category: "Ububiko bw'Amakuru",
          details: "Ubumenyi bwimbitse mu gucunga PostgreSQL, kunoza imikorere, no gushushanya imikoranire y'amakuru menshi mu buryo bwizewe."
        },
        {
          name: "Linux/Bash",
          level: 75,
          category: "DevOps n'Ibicumuro (Cloud)",
          details: "Ubuhanga mu mikorere ya sisitemu ya Linux, kwandika scripts za shell, no gutegura za seriveri zo gukoresha ku mbuga."
        }
      ]
    },
    projects: {
      title: "Imishinga Yatoranyijwe",
      subtitle: "Guhitamo ibikorwa byanjye bya tekiniki vuba aha n'imishinga iteza imbere ubuzima.",
      demo_unavailable: "Kwereka uko bikora ntibishoboka ubu. Reba kuri GitHub kugira ngo ubone code!",
      view_details: "Reba Ibirambuye",
      modal: {
        overview: "Incamake y'Umushinga",
        key_features: "Ibintu by'Ingenzi",
        links: "Imiyoboro y'Umushinga",
        view_code: "Reba Kode y'Inkomoko",
        launch_demo: "Fungura Demo Ako Kanya",
        close: "Funga"
      },
      items: [
        {
          id: "rapidaid",
          title: "RapidAid AI",
          description: "Ubufasha bw'ijwi bw'ubwenge bukorano mu bihe by'ubutabazi butunguranye, butanga amabwiriza y'ubuvuzi no guhuza n'abatabazi.",
          longDescription: "RapidAid AI ni sisitemu igezweho yo gutanga ubutabazi bwihuse ikoresha Natural Language Processing mu gufasha abantu mu bihe by'uburwayi bukomeye cyangwa impanuka. Ishobora kumenya ibimenyetso, gutanga amabwiriza y'ubutabazi bw'ibanze intambwe ku yindi, no guhita ihuza n'inzego z'ubutabazi ziri hafi.",
          tags: ["Python", "OpenAI API", "Kumenya Ijwi", "AI mu Buvuzi"],
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
          link: "https://rapid-aid-healthcare-ai-voice-assis.vercel.app/",
          github: "https://github.com/mbishflavien/RapidAid-Healthcare-AI-Voice-Assistant",
          color: "from-red-500/20 to-orange-500/20",
          features: ["Gusesengura ijwi mu gihe nyacyo", "Guhuza na serivisi z'ubutabazi", "Ububiko bw'ubutabazi budasaba interineti", "Gukorana n'indimi nyinshi"]
        },
        {
          id: "meditrack",
          title: "MediTrack",
          description: "Sisitemu yo gutahura hakiri kare ibyago by'ubuzima hifashishijwe Machine Learning hashingiwe ku makuru y'umurwayi.",
          longDescription: "MediTrack yifashisha algorithms zigezweho zo kwiga kwa mashine mu gusesengura amateka y'umurwayi, imibereho ye, n'ibizamini byo mu bitaro kugira ngo itahure ibyago by'uburwayi mbere y'uko biba bibi cyane. Sisitemu iha amakuru y'ingirakamaro abaganga n'abarwayi.",
          tags: ["Python", "Machine Learning", "Scikit-learn", "Pandas"],
          image: "https://www.healthvectors.ai/blog/storage/2025/05/chronic-disease-prevention-with-smart-report.jpg",
          link: "https://kfh-hospital-1.onrender.com",
          github: "https://github.com/kezacardine/kfh_hospital",
          color: "from-blue-500/20 to-teal-500/20",
          features: ["Gusesengura ibyago by'uburwayi", "Gushushanya amakuru y'umurwayi", "Raporo z'ubuzima zikora zonyine", "Imbonerahamwe y'abaganga"]
        },
        {
          id: "careconnect",
          title: "CareConnect",
          description: "Sisitemu yimbitse yo gucunga ibitaro n'ubuvuzi yubatswe kuri database ifite umuvuduko wo hejuru na PL/SQL.",
          longDescription: "CareConnect ni porogaramu y'urwego rwo hejuru ifasha gucunga ibikorwa by'ibitaro n'ubuyobozi bwabyo. Ifite ububiko bw'amakuru bwubatswe neza cyane bushobora gucunga amadosiye ya za miliyoni z'abarwayi mu gihe cy'amasegonda make.",
          tags: ["PL/SQL", "Oracle", "Gushushanya Database", "Ubuvuzi"],
          image: "https://datasolutionsexperts.com/wp-content/uploads/2024/01/Healthcare-Database-1.jpg",
          github: "https://github.com/mbishflavien/mbishibishi_flavien_27857_plsql_capstone_project",
          color: "from-emerald-500/20 to-cyan-500/20",
          features: ["Uburyo bwa PL/SQL bwihuse", "Gucunga uburenganzira bw'abakozi", "Gucunga amadosiye y'abarwayi (EHR)", "Kwishyuza no gukora fagitire"]
        }
      ]
    },
    awards: {
      title: "Badges n'Impamyabumenyi",
      subtitle: "Impamyabumenyi z'umwuga n'amashimwe y'ubuhanga muri porogaramu n'imikoranire.",
      view_certificate: "Reba Ibisobanuro",
      hover_reveal: "Kanda urebe",
      view_credential: "Reba Impamyabumenyi",
      modal: {
        issued: "Yatanzwe",
        verified_credential: "Impamyabumenyi Yemejwe",
        verify_google: "Emeza kuri Google Developers",
        open_image: "Fungura Ifoto Yose",
        about_credential: "Ibyerekeye iyi Mpamyabumenyi",
        close: "Funga"
      },
      items: [
        {
          id: "gdg",
          title: "Umunyamuryango wa Google Developer Groups Chapter",
          issuer: "Google Developer Groups (GDG) Kigali",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/community/gdg/chapter/badge.svg",
          description: "Umunyamuryango wemejwe ku mugaragaro wa Google Developer Groups (GDG) Kigali, ufatanya mu mishinga ya Google Cloud, Android, AI/ML n'iterambere ry'umuryango w'abahanga mu by'ikoranabuhanga.",
          category: "Google Developer",
          verifyLink: "https://developers.google.com/profile/badges/community/gdg/chapter/member/gdg-kigali?u=flavienmbishibishi"
        },
        {
          id: "nvidia",
          title: "Badge y'Umushakashatsi wa NVIDIA",
          issuer: "NVIDIA n'Umuryango wa Google Cloud",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/nvidia-developer/badge.svg",
          description: "Ishimwe ryatanzwe binyuze mu bufatanye bwa Google Cloud na NVIDIA Developer ku ruhare mu buhanga bwo kwihutisha mudasobwa, imirimo ya AI na GPU.",
          category: "AI na Cloud",
          verifyLink: "https://developers.google.com/profile/badges/nvidia-developer?u=flavienmbishibishi"
        },
        {
          id: "huggingface",
          title: "Ubumenyi bwihariye bwa Hugging Face NLP",
          issuer: "Hugging Face",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1IK8tVbc8YpOHh0TCS2tI47QGakfoP3LX",
          description: "Amahugurwa yo ku rwego rwo hejuru mu gusesengura ururimi rusanzwe (NLP) hifashishijwe Transformers, gutoza neza moderi, n'uburyo bugezweho bwa AI.",
          category: "AI / NLP"
        },
        {
          id: "cisco",
          title: "Iby'ibanze mu Miyoboro ya Cisco",
          issuer: "Cisco Networking Academy",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/10UvsVsWK7WPptu1oH6PmR8hC8B_DRQM_",
          description: "Gushimangira ubumenyi bw'ibanze mu miyoboro ya mudasobwa, imiterere ya OSI, IP subnetting, umutekano w'urusobe, n'uburyo bwo guhuza ibikoresho.",
          category: "Imiyoboro (Networking)"
        },
        {
          id: "isoc",
          title: "Intangiriro ku Mikorere y'Urusobe rwa Interineti",
          issuer: "Internet Society",
          date: "2023",
          image: "https://lh3.googleusercontent.com/d/1H_JbPQrP0MaDmnUdld53Q4YJNbdJWXG5",
          description: "Amasomo y'urufatiro ku mikorere y'imiyoboro, routing, no gucunga ibikorwa remezo by'urusobe rwa interineti ku rwego mpuzamahanga.",
          category: "Imiyoboro (Networking)"
        },
        {
          id: "thegym",
          title: "Impamyabumenyi ya The Gym",
          issuer: "The Gym Rwanda",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1xTMmtQJOCws26nZrnzEGcxPHkmXfpFtQ",
          description: "Impamyabumenyi y'umwuga mu buhanga bwo kubaka porogaramu, gukoresha ikoranabuhanga rigezweho, no gukorera mu matsinda.",
          category: "Ubwubatsi bwa Porogaramu"
        }
      ]
    },
    contact: {
      title: "Twandikire",
      subtitle: "Ufite umushinga wifuza gukora cyangwa ushaka gukorana n'umuhanga mu by'ikoranabuhanga? Reka twubake ikintu gitangaje hamwe.",
      name: "Izina Ryawe",
      email: "Imeri Yawe",
      message: "Ubutumwa Bwawe",
      send: "Ohereza Ubutumwa",
      sending: "Irimo kohereza...",
      success: "Ubutumwa bwoherejwe neza! Nzakuvugisha mu mwanya muto.",
      error: "Kwohereza ubutumwa byanze. Irimo gufungura imeri yawe kugira ngo ubwohereze...",
      phone: "Terefoni",
      location: "Aho nherereye",
      email_me: "Nyandikira kuri Imeri",
      call_me: "Nkubita akadehe",
      build_great: "Twandikire",
      message_placeholder: "Mbwira ibyerekeye umushinga wawe, igitekerezo cyawe, cyangwa ibibazo waba ufite...",
      name_error: "Izina rirakenewe",
      email_error: "Imeri irakenewe",
      email_invalid: "Nyamuneka andika imeri yuzuye kandi yizewe",
      message_error: "Ubutumwa burakenewe",
      message_too_short: "Ubutumwa bugomba kugira byibuze inyuguti 10"
    },
    footer: {
      rights: "Uburenganzira bwose burasubijwe.",
      privacy: "Politiki y'Ibwanga",
      terms: "Amategeko n'Amabwiriza",
      visits: "abasuye"
    },
    common: {
      select_language: "Hitamo Ururimi",
      back_to_top: "Subira Hejuru"
    }
  },
  fr: {
    nav: {
      about: "À Propos",
      experience: "Expérience",
      skills: "Compétences",
      projects: "Projets",
      awards: "Badges & Certifications",
      contact: "Contact",
      download_cv: "Télécharger CV",
      language: "Langue"
    },
    hero: {
      greeting: "Bonjour, je suis Flavien Mbishibishi",
      role: "Ingénieur Logiciel & Passionné d'IA",
      description: "Je conçois des solutions intelligentes à l'intersection de la santé et de la technologie. Spécialisé dans le développement full-stack, le calcul distribué et les systèmes pilotés par les données.",
      cta_projects: "Voir Mes Travaux",
      cta_contact: "Parlons-en",
      open_to_work: "À l'écoute du marché"
    },
    about: {
      title: "À Propos de Moi",
      subtitle: "Passionné par la création de logiciels qui font une différence concrète.",
      description: "Je suis un ingénieur logiciel passionné avec de solides bases en structures de données, algorithmique et développement full-stack. Mon parcours est guidé par la volonté de résoudre des défis informatiques complexes et d'offrir des expériences numériques à fort impact, particulièrement dans le secteur médical et l'intelligence artificielle.",
      location: "Localisation",
      location_value: "Kigali, Rwanda",
      education: "Formation",
      education_value: "Licence en Génie Logiciel",
      education_period: "Juin 2024 – Présent",
      stats: {
        experience: "Années d'Expérience",
        projects: "Projets Terminés",
        clients: "Clients Satisfaits"
      },
      experience_card: {
        title: "Expérience",
        description: "Stagiaire Backend / ML chez A2SV, Développeur NVIDIA et Instructeur en Big Data à l'AUCA."
      },
      certifications_card: {
        title: "Badges & Certifications",
        description: "Membre du GDG Kigali, Développeur NVIDIA, Cisco Networking, Spécialisation Hugging Face NLP, et plus."
      }
    },
    experience: {
      title: "Expérience Professionnelle",
      subtitle: "Mon parcours professionnel, responsabilités clés et contributions techniques.",
      items: [
        {
          role: "Stagiaire Ingénieur Backend / ML",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Août 2026 – Présent",
          description: [
            "Conception et implémentation d'architectures backend résilientes, de microservices et d'APIs RESTful haute performance avec Python, FastAPI et PostgreSQL.",
            "Développement, optimisation et déploiement de modèles de Machine Learning au sein de pipelines de traitement de données et d'inférence en production.",
            "Optimisation des schémas de bases de données, des stratégies d'indexation et des couches de mise en cache (Redis) pour des temps de réponse sous la milliseconde.",
            "Collaboration avec des équipes pluridisciplinaires pour mettre en œuvre une architecture propre, l'automatisation CI/CD et des tests exhaustifs."
          ]
        },
        {
          role: "Développeur NVIDIA",
          company: "NVIDIA Developer Program",
          period: "Avr 2026 – Présent",
          description: [
            "Exploitation des plateformes de calcul accéléré NVIDIA, de l'écosystème CUDA et des frameworks de Deep Learning pour l'optimisation et l'inférence de modèles d'IA.",
            "Conception et déploiement de pipelines de Machine Learning accélérés par GPU et de charges de travail de calcul haute performance (HPC).",
            "Membre actif du NVIDIA Developer Program, participant aux formations techniques spécialisées et aux initiatives d'innovation en IA."
          ]
        },
        {
          role: "Ingénieur Logiciel Stagiaire",
          company: "A2SV (Africa to Silicon Valley)",
          period: "Déc 2025 – Présent",
          description: [
            "Maîtrise approfondie des structures de données et de l'algorithmique complexe (graphes, programmation dynamique, arbres, tas) avec plus de 400 problèmes résolus.",
            "Collaboration avec une cohorte d'ingénieurs de haut niveau sur la conception de systèmes distribués et les revues de code rigoureuses.",
            "Application des principes de Clean Code, de conception modulaire SOLID et de développement dirigé par les tests (TDD)."
          ]
        },
        {
          role: "Instructeur en Analyse de Big Data",
          company: "AUCA Software Innovation Center",
          period: "Déc 2025 – Fév 2026",
          description: [
            "Élaboration et animation de cours intensifs sur l'architecture Big Data, les systèmes distribués et le Machine Learning appliqué auprès d'étudiants universitaires.",
            "Mentorat d'étudiants sur des projets de science des données de bout en bout : collecte, nettoyage, analyse exploratoire et déploiement de modèles.",
            "Direction d'ateliers pratiques axés sur l'écosystème Python Data Science (Pandas, NumPy, Scikit-Learn) et la visualisation interactive."
          ]
        },
        {
          role: "Stagiaire en Développement Logiciel",
          company: "The Gym Rwanda",
          period: "Mai 2025 – Sep 2025",
          description: [
            "Développement et déploiement d'applications web réactives et ergonomiques utilisant TypeScript, React et des APIs REST.",
            "Mise en pratique du débogage systématique, du refactoring de code et de la gestion de versions avec Git dans un cadre agile.",
            "Renforcement des compétences en architecture full-stack, gestion d'état et optimisation des performances front-end (UI/UX)."
          ]
        }
      ]
    },
    skills: {
      title: "Compétences & Expertise",
      subtitle: "Les outils, frameworks et technologies que j'utilise pour concrétiser des visions innovantes.",
      proficiency: "Niveau de Maîtrise",
      expertise_details: "Détails de l'Expertise",
      close_details: "Fermer les Détails",
      other_tools: "Autres Outils & Technologies",
      items: [
        {
          name: "Python",
          level: 90,
          category: "Programmation",
          details: "Expertise en Python pour le développement backend, la science des données et l'automatisation. Maîtrise de FastAPI, Django, NumPy, Pandas et de la programmation asynchrone."
        },
        {
          name: "SQL",
          level: 85,
          category: "Bases de Données",
          details: "Forte maîtrise de SQL pour les requêtes complexes, la modélisation relationnelle et l'optimisation des performances sous PostgreSQL, MySQL et Oracle PL/SQL."
        },
        {
          name: "Machine Learning",
          level: 80,
          category: "Intelligence Artificielle",
          details: "Conception et mise en production de modèles ML pour la classification, la régression et le traitement du langage naturel (NLP) avec Scikit-learn et PyTorch."
        },
        {
          name: "Data Structures",
          level: 85,
          category: "Informatique Fondamentale",
          details: "Compréhension approfondie des structures de données et des algorithmes. Optimisation continue du code en termes de complexité temporelle et spatiale."
        },
        {
          name: "PostgreSQL",
          level: 80,
          category: "Bases de Données",
          details: "Administration avancée de bases de données PostgreSQL, conception de schémas relationnels, stratégies d'indexation et optimisation des requêtes."
        },
        {
          name: "Linux/Bash",
          level: 75,
          category: "DevOps & Cloud",
          details: "Administration d'environnements Linux, écriture de scripts shell pour l'automatisation des pipelines, conteneurisation et configuration de serveurs."
        }
      ]
    },
    projects: {
      title: "Projets Vedettes",
      subtitle: "Une sélection de mes réalisations techniques récentes et innovations dans le domaine de la santé.",
      demo_unavailable: "La démo en direct est actuellement indisponible. Consultez GitHub pour le code source !",
      view_details: "Voir les Détails",
      modal: {
        overview: "Aperçu du Projet",
        key_features: "Fonctionnalités Clés",
        links: "Liens du Projet",
        view_code: "Voir le Code Source",
        launch_demo: "Lancer la Démo en Direct",
        close: "Fermer"
      },
      items: [
        {
          id: "rapidaid",
          title: "RapidAid AI",
          description: "Assistant vocal d'urgence propulsé par l'IA, conçu pour fournir des conseils médicaux immédiats et coordonner les secours d'urgence.",
          longDescription: "RapidAid AI est un système de réponse aux urgences médicales exploitant le traitement automatique du langage naturel pour assister les utilisateurs en situation critique. Il identifie les symptômes, dicte les étapes de premiers secours et coordonne automatiquement avec les services de secours les plus proches.",
          tags: ["Python", "OpenAI API", "Reconnaissance Vocale", "IA Santé"],
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
          link: "https://rapid-aid-healthcare-ai-voice-assis.vercel.app/",
          github: "https://github.com/mbishflavien/RapidAid-Healthcare-AI-Voice-Assistant",
          color: "from-red-500/20 to-orange-500/20",
          features: ["Traitement vocal en temps réel", "Intégration des services d'urgence", "Base de premiers secours hors-ligne", "Support multilingue"]
        },
        {
          id: "meditrack",
          title: "MediTrack",
          description: "Système de prédiction des risques pour la santé utilisant des modèles de Machine Learning avancés pour anticiper les complications cliniques.",
          longDescription: "MediTrack utilise des algorithmes d'apprentissage automatique de pointe pour analyser l'historique médical, les facteurs de mode de vie et les données cliniques afin d'anticiper les risques sanitaires avant qu'ils ne deviennent critiques. Il fournit des rapports exploitables pour les soignants et les patients.",
          tags: ["Python", "Machine Learning", "Scikit-learn", "Pandas"],
          image: "https://www.healthvectors.ai/blog/storage/2025/05/chronic-disease-prevention-with-smart-report.jpg",
          link: "https://kfh-hospital-1.onrender.com",
          github: "https://github.com/kezacardine/kfh_hospital",
          color: "from-blue-500/20 to-teal-500/20",
          features: ["Modélisation prédictive des risques", "Visualisation des données patient", "Rapports médicaux automatisés", "Tableau de bord praticien"]
        },
        {
          id: "careconnect",
          title: "CareConnect",
          description: "Système complet de gestion hospitalière conçu avec une base de données relationnelle robuste et des procédures PL/SQL optimisées.",
          longDescription: "CareConnect est une solution hospitalière d'entreprise qui rationalise les flux cliniques et administratifs. Elle intègre une architecture de base de données ultra-performante capable de traiter des millions de dossiers patients en moins d'une seconde.",
          tags: ["PL/SQL", "Oracle", "Conception BDD", "Santé"],
          image: "https://datasolutionsexperts.com/wp-content/uploads/2024/01/Healthcare-Database-1.jpg",
          github: "https://github.com/mbishflavien/mbishibishi_flavien_27857_plsql_capstone_project",
          color: "from-emerald-500/20 to-cyan-500/20",
          features: ["Procédures PL/SQL optimisées", "Contrôle d'accès par rôles (RBAC)", "Gestion complète des dossiers EHR", "Système de facturation automatisé"]
        }
      ]
    },
    awards: {
      title: "Badges & Certifications",
      subtitle: "Titres de compétences vérifiés, engagements communautaires et certifications d'excellence technique.",
      view_certificate: "Voir les Détails",
      hover_reveal: "Cliquer pour voir",
      view_credential: "Voir le Titre",
      modal: {
        issued: "Délivré",
        verified_credential: "Titre de Compétence Vérifié",
        verify_google: "Vérifier sur Google Developers",
        open_image: "Ouvrir l'Image Complète",
        about_credential: "À propos de ce Titre",
        close: "Fermer"
      },
      items: [
        {
          id: "gdg",
          title: "Membre du Chapitre Google Developer Groups",
          issuer: "Google Developer Groups (GDG) Kigali",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/community/gdg/chapter/badge.svg",
          description: "Adhésion officielle vérifiée au chapitre GDG Kigali, collaborant sur les technologies Google Cloud, Android, l'IA/ML et le rayonnement de la communauté tech.",
          category: "Google Developer",
          verifyLink: "https://developers.google.com/profile/badges/community/gdg/chapter/member/gdg-kigali?u=flavienmbishibishi"
        },
        {
          id: "nvidia",
          title: "Badge de Développeur NVIDIA",
          issuer: "Communauté NVIDIA & Google Cloud",
          date: "2024",
          image: "https://developers.google.com/static/profile/badges/nvidia-developer/badge.svg",
          description: "Reconnaissance officielle accordée via le partenariat Google Cloud et NVIDIA Developer pour les compétences en calcul accéléré, workflows d'IA et architectures GPU.",
          category: "IA & Cloud",
          verifyLink: "https://developers.google.com/profile/badges/nvidia-developer?u=flavienmbishibishi"
        },
        {
          id: "huggingface",
          title: "Spécialisation NLP Hugging Face",
          issuer: "Hugging Face",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1IK8tVbc8YpOHh0TCS2tI47QGakfoP3LX",
          description: "Formation avancée en traitement automatique du langage naturel (NLP) avec les architectures Transformers, le fine-tuning et les modèles open-source de pointe.",
          category: "IA / NLP"
        },
        {
          id: "cisco",
          title: "Fondamentaux des Réseaux Cisco",
          issuer: "Cisco Networking Academy",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/10UvsVsWK7WPptu1oH6PmR8hC8B_DRQM_",
          description: "Validation des concepts fondamentaux d'ingénierie réseau : modèle OSI, sous-réseaux IP, sécurité des infrastructures et connectivité des systèmes.",
          category: "Réseaux"
        },
        {
          id: "isoc",
          title: "Introduction aux Opérations Réseau",
          issuer: "Internet Society",
          date: "2023",
          image: "https://lh3.googleusercontent.com/d/1H_JbPQrP0MaDmnUdld53Q4YJNbdJWXG5",
          description: "Formation fondamentale sur l'exploitation des réseaux, les protocoles de routage et la gestion des infrastructures internet mondiales.",
          category: "Réseaux"
        },
        {
          id: "thegym",
          title: "Certification The Gym",
          issuer: "The Gym Rwanda",
          date: "2024",
          image: "https://lh3.googleusercontent.com/d/1xTMmtQJOCws26nZrnzEGcxPHkmXfpFtQ",
          description: "Certification professionnelle en ingénierie logicielle, technologies web modernes et développement collaboratif de produits numériques.",
          category: "Génie Logiciel"
        }
      ]
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Vous avez un projet en tête ou recherchez un ingénieur passionné ? Construisons quelque chose d'exceptionnel ensemble.",
      name: "Votre Nom",
      email: "Votre Email",
      message: "Votre Message",
      send: "Envoyer le Message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.",
      error: "Échec de l'envoi du message. Ouverture de votre messagerie pour un envoi manuel...",
      phone: "Téléphone",
      location: "Localisation",
      email_me: "M'envoyer un Email",
      call_me: "M'appeler",
      build_great: "Contactez-moi",
      message_placeholder: "Parlez-moi de votre projet, de vos objectifs ou posez vos questions...",
      name_error: "Le nom est requis",
      email_error: "L'adresse email est requise",
      email_invalid: "Veuillez entrer une adresse email valide",
      message_error: "Le message est requis",
      message_too_short: "Le message doit contenir au moins 10 caractères"
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      visits: "visites"
    },
    common: {
      select_language: "Choisir la Langue",
      back_to_top: "Retour en haut"
    }
  }
};
