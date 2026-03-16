# Heritage Archive – Lab 8 (React Implementation)

**Team 16:** Eknoor, Pierre, Zaid  
**Lab 7 Design:** https://github.com/SEG3125-2026/seg3125-lab-7-team-16

---

## Overview

This is the **Lab 8** React implementation of the Heritage Archive website designed in Lab 7. It features Canadian art and history from museum collections.

### Features

- **Landing page** – Hero section + featured artworks
- **Browse** – List of all documents (The Battle, The Devil, The Pianist)
- **Document detail** – Image (click to zoom), metadata, audio player, comments
- **Help** – FAQ and usage instructions
- **Image lightbox** – Click any image to open and zoom (50%–300%)

### Human Interactive Processes (from Lab 7)

1. **Following instructions** – Clear navigation and CTAs
2. **Exploring** – Browse collection, featured cards
3. **Absorbing information** – Images, metadata, audio descriptions
4. **Communicating** – Comment section on each artwork

---

## Tech Stack

- **React 19** + Vite
- **React Router** v7
- Comments stored in **localStorage** (database in Lab 9)

---

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Build for Production

```bash
npm run build
```

Output in `dist/`. Serve with:

```bash
npm run preview
```

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select the repo, leave defaults, Deploy
4. Your site will be at `https://your-project.vercel.app`

**Note:** For client-side routing, Vercel serves `index.html` for all routes by default with Vite projects.

---

## Project Structure

```
src/
├── components/     # Header, Lightbox, ZoomableImage, ZoomableCard
├── context/        # LightboxContext
├── hooks/          # useDocuments
├── pages/          # HomePage, BrowsePage, DocumentPage, HelpPage
├── App.jsx
└── main.jsx
public/
└── data/
    └── config.json # Document list and asset URLs
```

