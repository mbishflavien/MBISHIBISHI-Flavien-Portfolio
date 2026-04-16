<div align="center">

<img src="https://img.shields.io/badge/Portfolio-Flavien%20MBISHIBISHI-0A0A0A?style=for-the-badge" alt="Portfolio" />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://mbishibishi-flavien-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-mbishflavien-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mbishflavien)

</div>

---

A personal portfolio website built with modern web technologies — showcasing projects, skills, and professional experience.

---

## Features

<img src="https://img.shields.io/badge/Responsive-Design-3178C6?style=flat-square" />
<img src="https://img.shields.io/badge/AI%20Powered-Gemini-4285F4?style=flat-square&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Realtime-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Fast-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />

- Fast and responsive UI powered by Vite + TypeScript
- Clean component-based design with shadcn/ui
- Firebase backend (Firestore) for dynamic content
- AI integration via Google Gemini API
- Deployed and live on Vercel

---

## Tech Stack

| Layer | Technology |
|---|---|
| <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | TypeScript |
| <img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /> | Vite |
| <img src="https://img.shields.io/badge/UI-shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" /> | shadcn/ui |
| <img src="https://img.shields.io/badge/Styling-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" /> | CSS |
| <img src="https://img.shields.io/badge/Backend-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" /> | Firebase (Firestore) |
| <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white" /> | Google Gemini API |
| <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" /> | Vercel |

---

## Getting Started

### Prerequisites

- <img src="https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white" /> — [Download](https://nodejs.org/)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mbishflavien/MBISHIBISHI-Flavien-Portfolio.git
cd MBISHIBISHI-Flavien-Portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and add your GEMINI_API_KEY

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
├── src/                  # Main application source code
├── components/
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility and helper functions
├── public/               # Static assets
├── server.ts             # Server entry point
├── .env.example          # Environment variable template
├── firebase-blueprint.json
├── firestore.rules       # Firestore security rules
├── vite.config.ts
└── tsconfig.json
```

---

## Environment Variables

Create a `.env.local` file at the root based on `.env.example`:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add your `GEMINI_API_KEY` in the Vercel environment variables settings
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mbishflavien/MBISHIBISHI-Flavien-Portfolio)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Flavien MBISHIBISHI**

[![GitHub](https://img.shields.io/badge/GitHub-mbishflavien-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mbishflavien)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://mbishibishi-flavien-portfolio.vercel.app)
