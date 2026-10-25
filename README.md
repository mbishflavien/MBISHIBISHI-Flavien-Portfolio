# Flavien Mbishibishi — Portfolio

Personal site of Flavien Mbishibishi, software engineering student in Kigali, Backend / ML intern at A2SV and NVIDIA developer.

**Live:** https://mbishibishi-flavien-portfolio.vercel.app

The site is in four languages (English, Kiswahili, Kinyarwanda, French) and is built around a few interactive pieces:

- An inflated 3D greeting that cycles through *hello*, *jambo*, *muraho* and *bonjour*, letter by letter. It reacts to the pointer, to clicks and to scrolling.
- Project tiles that reveal their screenshot with a dot-wave on hover.
- A footer where stickers rain behind a clickable 3D "let's talk" that opens the contact form.

## Stack

- React 19, TypeScript, Vite
- three.js with react-three-fiber and drei for the 3D scenes (loaded after the page appears, with an SVG fallback when WebGL is missing or motion is reduced)
- Lenis for smooth scrolling
- Express server (`server.ts`) for the contact form endpoint, with Nodemailer
- Firebase Firestore for the visit counter, Google Analytics 4 for page views

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The dev command starts the Express server with Vite inside it, so the contact form works locally.

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built site (no contact endpoint) |
| `npm run lint` | Type-checks the project |

## Environment

Copy `.env.example` to `.env` and fill it in:

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | Gmail address that receives contact-form messages |
| `EMAIL_PASS` | Gmail app password for that address. Without it, messages are only saved to `messages.json` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics measurement ID |

On Vercel the site is served as static files, so `/api/contact` does not exist there and the form falls back to opening the visitor's email app.

## Project layout

```
src/
  components/Portfolio.tsx   the page: sections, contact form, project dialog
  components/                scramble text, dot-wave reveal, starburst, SVG fallbacks
  three/                     3D scenes, inflated letters, sticker atlas
  data/translations.ts       all content in four languages
  data/site.ts               extra copy and projects for the current design
public/media/                portrait and project screenshots
public/fonts/                the 3D script font as three.js typeface JSON
scripts/make-typeface.mjs    regenerates that JSON from scripts/fonts/Damion-Regular.ttf
server.ts                    Express server and /api/contact
```

To change content, edit `src/data/translations.ts` (and `src/data/site.ts` for the hero, intro and footer lines), keeping all four languages in step.

## Credits

- 3D lettering uses [Damion](https://github.com/googlefonts/damionFont) by The Damion Project Authors, under the SIL Open Font License 1.1 (`scripts/fonts/OFL.txt`).
- Design inspired by [haoqi.design](https://haoqi.design/).

## Contact

flavmbish@gmail.com · [GitHub](https://github.com/mbishflavien) · [LinkedIn](https://linkedin.com/in/mbishibishi-flavien-4120a52b8) · [Medium](https://medium.com/@flavmbish)
