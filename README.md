# Heritage Archive – Lab 9 (Complete Implementation)

**Team 16:** Eknoor, Pierre, Zaid  
**Lab 7 Design:** https://github.com/SEG3125-2026/seg3125-lab-7-team-16  
**Lab 8:** https://github.com/SEG3125-2026/seg3125-lab-8-team-16

---

## Lab 9 Additions

- **Bilingual (English / French)** – Language selector in header; UI strings translated; each document has French `data.fr.json` (metadata + description). In French mode, **narration** uses the browser’s text-to-speech (Synthèse vocale, `fr-CA`) on the French script in each data file—optional real `audio_fr` MP3 paths can be added in `config.json` later if you replace the files under `public/documents/*/`.
- **SQL Database** – Comments stored in SQLite; backend API at `http://localhost:3001`
- **Usability heuristics** – Design follows Lab 7 heuristics

---

## Features

- Landing page – Hero section + featured artworks
- Browse – List of all documents (The Battle, The Devil, The Pianist)
- Document detail – Image (click to zoom), metadata, audio player, comments (SQL)
- Help – FAQ and usage instructions
- Image lightbox – Zoom 50%–300%
- Language selector – English / Français

---

## Tech Stack

- React 19 + Vite + React Router
- react-i18next (internationalization)
- Express + SQLite (better-sqlite3) for comments API
- CORS enabled for local development

---

## Run Locally

**1. Install dependencies**
```bash
npm install
```

**2. Start both backend and frontend**
```bash
npm run dev:full
```

This starts:
- **API server** at http://localhost:3001 (SQLite database)
- **Frontend** at http://localhost:5173

**3. Open** http://localhost:5173

---

## Run Separately (optional)

**Terminal 1 – Backend:**
```bash
npm run server
```

**Terminal 2 – Frontend:**
```bash
npm run dev
```

---

## Database

SQLite database file: `server/heritage.db`

**Schema:**
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id TEXT NOT NULL,
  author TEXT DEFAULT 'Anonymous',
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
```

**API:**
- `GET /api/comments/:docId` – List comments for a document
- `POST /api/comments` – Add a comment (`{ document_id, text, author? }`)

---

## Build for Production

```bash
npm run build
```

Output in `dist/`. For production you’d also need to run the API server (or deploy it separately).

---

## Deploy

- **Frontend:** Push to GitHub; use Vercel or GitHub Pages for the React app.
- **Backend:** The API must run separately (e.g. Railway, Render, or a VPS). For Lab 9 submission, the video should show the app running locally with the SQL database.
- **Comments / SQL demo:** Run **`npm run dev:full`** so Vite and the Express API (port 3001) both start. Comments are stored in **`server/heritage.db`** (SQLite). If you only open the GitHub Pages site or run `npm run dev` without the server, comments fall back to the browser and a yellow notice explains that the database is offline.

---

## Project Structure

```
src/
├── components/     Header, Lightbox, ZoomableImage, ZoomableCard, LanguageSelector
├── context/        LightboxContext
├── hooks/          useDocuments
├── pages/          HomePage, BrowsePage, DocumentPage, HelpPage
├── locales/        en.json, fr.json
├── i18n.js         i18n config
└── ...
server/
├── index.js        Express API
├── db.js           SQLite setup + queries
└── heritage.db     (created on first run)
```

---

## Heuristics for Video (10 usability heuristics)

For the 10–15 min video, your teammate can point to these UI elements:

| # | Heuristic | Where to show it |
|---|-----------|------------------|
| 1 | Visibility of system status | Loading states, form feedback, comment posting ("Posting...") |
| 2 | Match system & real world | Familiar terms: Home, Browse, Help, Comments, "Share your thoughts" |
| 3 | User control & freedom | Back links, lightbox Close, language selector |
| 4 | Consistency & standards | Nav layout, button styles, form patterns |
| 5 | Error prevention | Required fields, validation, disabled states during submit |
| 6 | Recognition over recall | Labels on all actions, visible nav, tooltips (e.g. "Click to enlarge") |
| 7 | Flexibility & efficiency | Language selector, keyboard (Enter on images, form submit) |
| 8 | Aesthetic & minimal design | Clean layout, no clutter, focused content |
| 9 | Help users recognize errors | Comment error messages, "Document not found" |
| 10 | Help & documentation | Help page with FAQ and usage instructions |

---

## Submission Checklist (Lab 9)

- [x] Complete Lab 8 implementation
- [x] Bilingual (English + French)
- [x] SQL database for comments
- [x] Usability heuristics
- [ ] Video (10–15 min) – teammate
- [ ] PDF with GitHub link + video link
