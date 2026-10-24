# FIT SPACE — Virtual Fitting Atelier & Recommendation System

> **Full Title:** AI-Powered Virtual Try-On and Personalized Fashion Recommendation System
> **Phase 1 Status:** Foundation and UI Shell Implemented & Verified (2026-10-24)

FIT SPACE is a web application designed to help online clothing shoppers evaluate silhouettes, analyze drape ease, and preview garments on calibrated virtual mannequins with transparent, measurement-based sizing guidance.

---

## Architecture & Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS design system with editorial typography (Cormorant Garamond, Inter) and warm neutral fashion palette
- **Icons:** `lucide-react`
- **Testing:** Vitest + React Testing Library + Jest-DOM + JSDOM
- **Linting:** Oxlint
- **Backend (Future Phase 2):** Python FastAPI service for upload validation and deterministic fit calculation
- **3D Viewer (Future Phase 3):** React Three Fiber / Three.js 3D avatar viewport

---

## Project Structure

```
fit-space/
├── frontend/                     # React + TypeScript + Vite application
│   ├── public/
│   │   ├── demo-garments/        # Curated sample garment SVG assets & LICENSE.md
│   │   ├── models/               # Mannequin silhouette assets
│   │   └── favicon.svg           # Atelier monogram icon
│   ├── src/
│   │   ├── components/           # Header, Footer
│   │   ├── features/
│   │   │   ├── landing/          # HeroSection, architectural pillars
│   │   │   ├── tryon/            # StudioViewport, GarmentSelector
│   │   │   ├── avatar/           # AvatarControls, Mannequin profile switcher
│   │   │   ├── fit-guidance/     # FitResultsPanel, ease calculations
│   │   │   └── methodology/      # MethodologyView, ethics & scope manifesto
│   │   ├── lib/                  # sampleGarments.ts, mannequinProfiles.ts
│   │   ├── test/                 # Component & integration test suites
│   │   ├── types/                # garment.ts, avatar.ts, fit.ts
│   │   ├── App.tsx               # Main application container
│   │   ├── index.css             # Editorial fashion design system & tokens
│   │   └── main.tsx              # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json                  # Root convenience scripts
├── README.md                     # Project documentation & run guide
├── README_FIRST.md               # Getting started instructions
├── PROJECT_CHARTER.md            # Vision, scope, and non-goals
├── TECHNICAL_ARCHITECTURE.md     # Recommended technical architecture
├── ROADMAP_AND_TASKS.md          # Phased roadmap and status board
├── PROJECT_STATE.md              # Current verified project snapshot
├── DECISION_LOG.md               # Technical decision records
└── ANTIGRAVITY_RULES.md          # Persistent engineering guidelines
```

---

## Getting Started

### Prerequisites
- **Node.js:** v20.x or higher
- **npm:** v10.x or higher

### Quick Start (From Root)

You can run commands directly from the root workspace using the root scripts:

```bash
# 1. Install frontend dependencies
cd frontend
npm install
cd ..

# 2. Run development server (accessible at http://localhost:5173/)
npm run dev

# 3. Run automated tests (Vitest)
npm test

# 4. Run TypeScript typecheck
npm run typecheck

# 5. Run linter
npm run lint

# 6. Build production bundle
npm run build
```

### Alternatively, Direct Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Run Vitest test suite
npm test

# Run TypeScript compiler check
npm run typecheck

# Run linter
npm run lint

# Build for production
npm run build
```

---

## Phase 1 Verification Summary

- **Development Server:** Runs on `http://localhost:5173/` with 0 console errors.
- **Test Suite:** 12 passed across 3 test suites (`App.test.tsx`, `UploadDropZone.test.tsx`, `FitResultsPanel.test.tsx`).
- **TypeScript:** `tsc -b` exits with 0 errors.
- **Linter:** `oxlint` passes with 0 errors and 0 warnings.
- **Responsive Layout:** Tested on desktop (`1400px+`) and mobile (`390x844`) viewports.

---

## Asset Licensing & Attribution

- **Demo Garment Illustrations:** Bespoke SVG fashion assets (`silk-camp-shirt.svg`, `wool-oversized-blazer.svg`, `linen-wide-leg-trouser.svg`, `ribbed-knit-dress.svg`, `utility-jacket.svg`) located in `frontend/public/demo-garments/` are released under **Creative Commons Zero v1.0 Universal (CC0 1.0) / MIT License**. See `frontend/public/demo-garments/LICENSE.md`.
- **Fonts:** Cormorant Garamond and Inter are open-source Google Fonts.
