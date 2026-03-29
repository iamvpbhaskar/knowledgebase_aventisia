# Knowledge Base UI (React + Tailwind)

Responsive front-end built with **Vite + React + Tailwind CSS**, replicating a 2-screen Knowledge Base UI:
- **Home:** Knowledge Base listing (cards + pagination)
- **Create New:** Modal/Drawer to create a new Knowledge Base

**Design tokens**
- Primary: `#4F46E5`
- Secondary: `#1E1B4B`

## Screenshots
![Home](./screenshots/home.svg)
![Create New](./screenshots/create-modal.svg)

> Replace the files in `screenshots/` with real screenshots before submission.

## Features
- Reusable components: `Header`, `Sidebar`, `MainContent`, `KBCard`, `CreateKBModal`, `Dropdown`
- Reusable animated `Dropdown` (workspace selector, rows-per-page, modal selects)
- Dynamic KB list (create -> appears instantly)
- Search by KB name
- 3-dot card menu actions: **Edit**, **Delete**, **Pin/Unpin**
- Pagination + Rows-per-page selection
- Fully responsive (mobile ~320px -> tablet -> desktop)
  - Off-canvas sidebar on mobile/tablet (toggle + overlay click-outside close)
  - Modal overlay (dim/blur) with mobile-friendly sizing

## Quick Start (Run Locally)
Prerequisites: **Node.js 18+** and **npm**

```bash
# clone the repo
git clone git@github.com:iamvpbhaskar/knowledgebase_aventisia.git
cd knowledgebase_aventisia

# install + run
npm install
npm run dev
```

Open: `http://localhost:5173/`

## Fork (GitHub)
1. Click **Fork** on GitHub
2. Clone your fork:
```bash
git clone git@github.com:<your-username>/knowledgebase_aventisia.git
cd knowledgebase_aventisia
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (Optional)
This is a standard Vite app.
- **Build command:** `npm run build`
- **Output directory:** `dist`

Works well on Vercel / Netlify / Cloudflare Pages.

## Project Structure
```
.
|-- index.html
|-- src/
|   |-- components/
|   |   |-- Sidebar.jsx
|   |   |-- Header.jsx
|   |   |-- MainContent.jsx
|   |   |-- KBCard.jsx
|   |   |-- CreateKBModal.jsx
|   |   `-- Dropdown.jsx
|   |-- App.jsx
|   |-- App.css
|   `-- main.jsx
|-- screenshots/
|-- assignment-plan.md
|-- package.json
|-- tailwind.config.js
|-- postcss.config.js
`-- vite.config.js
```

## Assignment Brief / Deliverables
See `assignment-plan.md`.

