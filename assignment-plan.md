# Assignment Plan - Knowledge Base UI (React + Tailwind)

## Objective
Build a responsive front-end application using React by replicating the provided Figma design.

This assignment evaluates the ability to:
- Translate design -> pixel-accurate UI
- Structure scalable front-end code
- Handle state, components, and interactions
- Deliver clean, maintainable code

## Task Overview
Replicate the two UI designs as closely as possible, including layout, styling, and basic interactions.

**Base UI**
1) Home (Knowledge Base listing)
2) Create New Knowledge Base (modal/drawer)

**Design tokens**
- Primary color: `#4F46E5`
- Secondary color: `#1E1B4B`

## Core Requirements

### 1) UI Implementation
- Replicate the Figma design with high visual accuracy
- Maintain proper spacing, typography, colors, and alignment
- Ensure consistency across components
- **Create New** button must be clickable; the rest of the menu buttons/links can be static (non-clickable)

### 2) Component-Based Architecture
- Break the UI into reusable components:
  - `Header`
  - `Sidebar`
  - `MainContent`
  - `KBCard`
  - `CreateKBModal`
  - `Dropdown`
- Follow a clean folder structure

### 3) Code Quality
Evaluation criteria:
- Code readability and structure
- Reusability of components
- Naming conventions
- Separation of concerns

## Tech Stack Guidelines
- Framework: React (functional components + hooks)
- Styling: Tailwind CSS

---

## UI Implementation Notes (What's Extra Built)
- `Dropdown` as a reusable component (used in workspace selector, rows-per-page, modal selects)
- 5+ reusable UI components: `Header`, `Sidebar`, `MainContent`, `KBCard`, `CreateKBModal` (+ `Dropdown`)
- KB card 3-dot menu is functional with actions: `Edit`, `Delete`, `Pin/Unpin`
- Fully responsive UI (small phones ~320px -> tablet -> desktop)
- Dynamic cards: creating a new KB immediately adds it to the list
- Search functionality: filters KB cards by name
- Mobile sidebar toggle (off-canvas) with overlay + click-outside close
- Create modal overlay effect (dim/blur) with mobile-friendly sizing

## Deliverables
Please submit:
1. Source Code (GitHub repo preferred)
2. Screen Shots of the UI developed
3. Live Demo to show the UI in action (optional, not mandatory)
