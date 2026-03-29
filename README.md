# Knowledge Base UI (React + Tailwind)

Hi 😊 This is Ved Prakash Bhaskar. I completed the frontend assignment given by Aventisia for the Junior Full Stack Developer role.

This repository contains a responsive **Vite + React + Tailwind CSS** implementation of the provided 2-screen Knowledge Base UI:
- **Home:** Knowledge Base listing (cards + pagination)
- **Create New:** Modal/Drawer to create a new Knowledge Base

**Design tokens**
- Primary: `#4F46E5`
- Secondary: `#1E1B4B`

## Highlights (Beyond the Basics)
- Reusable component architecture: `Header`, `Sidebar`, `MainContent`, `KBCard`, `CreateKBModal`, `Dropdown`
- Animated reusable `Dropdown` used across the UI (workspace selector, rows-per-page, modal selects)
- Dynamic Knowledge Bases (create -> appears instantly, pin sorting supported)
- Search by Knowledge Base name
- Functional card menu actions: **Edit**, **Delete**, **Pin/Unpin**
- Fully responsive from small phones (~320px) -> tablet -> desktop
  - Off-canvas sidebar on mobile/tablet (toggle + overlay click-outside close)
  - Modal overlay (dim/blur) with mobile-friendly sizing

## Screenshots
Click to view:
- [knowledgebase_list](./screenshots/KnowledgeBase_list.png)
- [web_view](./screenshots/web_view.png)
- [createmodal](./screenshots/createNewModal.png)
- [createmodal2](./screenshots/createNewModal2.png)
- [mobile_view](./screenshots/mobile_view.png)
- [tablet_view](./screenshots/tablet_view.png)

1) `knowledgebase_list`  
![knowledgebase_list](./screenshots/KnowledgeBase_list.png)

2) `web_view`  
![web_view](./screenshots/web_view.png)

3) `createmodal`  
![createmodal](./screenshots/createNewModal.png)

4) `createmodal2`  
![createmodal2](./screenshots/createNewModal2.png)

5) `mobile_view`  
![mobile_view](./screenshots/mobile_view.png)

6) `tablet_view`  
![tablet_view](./screenshots/tablet_view.png)

## Run Locally
Prerequisites: **Node.js 18+** and **npm**.

```bash
# clone (SSH)
git clone git@github.com:iamvpbhaskar/knowledgebase_aventisia.git

# or clone (HTTPS)
# git clone https://github.com/iamvpbhaskar/knowledgebase_aventisia.git

cd knowledgebase_aventisia

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
