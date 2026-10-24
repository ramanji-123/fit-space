# FIT SPACE — Recommended Technical Architecture

## 1. Recommended stack
### Frontend
- React + TypeScript + Vite.
- Tailwind CSS for styling (or the existing styling system if the repo already has one).
- React Three Fiber + Three.js for the interactive 3D viewer.
- A component library may be added only if it improves consistency and accessibility.
- Stitch by Google can be used to explore UI designs and export starting frontend code; exported code must be reviewed and integrated, not treated as a complete backend or finished production app.

### Backend
- Python + FastAPI for image-processing and virtual try-on endpoints.
- Pydantic request/response validation.
- Local development storage initially; avoid permanent image storage unless needed.
- SQLite only if persistence is needed for the MVP. PostgreSQL can be considered later for multi-user deployment.
- Keep the frontend independent from the AI provider so the model/service can be changed without rewriting the UI.

### AI / computer vision
- Phase 1: no AI claims; use demo assets and transparent rules.
- Phase 2: evaluate an existing image-based virtual try-on model/service using a person image and garment image.
- Consider IDM-VTON or CatVTON only after reviewing hardware requirements, model/checkpoint licenses, dataset terms, and deployment constraints.
- Do not assume a model can run comfortably on a standard Windows laptop. Test GPU/VRAM and dependency requirements first.
- Do not train a model from scratch for the MVP.

### Quality and tooling
- Git and GitHub for version control.
- ESLint + TypeScript checks + frontend tests.
- Pytest for backend tests.
- `.env` for local secrets; commit `.env.example`, never real secrets.
- README with exact install/run/test commands.

## 2. System overview
Browser UI
  ├── Product / garment upload and preview
  ├── Measurement form and avatar settings
  ├── Three-dimensional avatar viewer
  ├── Fit guidance panel
  └── API client
        └── FastAPI backend
              ├── Upload validation
              ├── Garment metadata / size guidance service
              ├── Try-on adapter interface
              └── Optional AI inference service

## 3. Important separation
Use a `TryOnProvider`-style service interface so a future model can be swapped in. Keep:
- UI presentation,
- upload validation,
- fit calculation,
- 2D try-on inference,
- 3D rendering,
as separate modules.

Do not mix AI inference logic into React components.

## 4. 3D reality check
A `.glb` or `.gltf` avatar can be loaded into a React Three Fiber scene and rotated. To show an actual garment on it, a suitable garment asset or fitting/geometry pipeline is needed. Simply placing a 2D image on a 3D model does not produce realistic fabric draping.

MVP approach:
- Use a legally usable sample avatar.
- Use a simple placeholder garment asset or a clear “3D preview prototype” state.
- Build camera controls, lighting, environment, and avatar configuration first.
- Later evaluate garment assets, rigging, UVs, body measurements, and cloth simulation.

## 5. 2D AI try-on reality check
Image-based try-on generally requires both a person image and garment image. If the product goal is “show this clothing on my own body,” users need to provide an appropriate person image or use a supported avatar-based method. A product image alone cannot reveal a user's exact body appearance.

## 6. Fit recommendation approach
Start with deterministic calculations only when the inputs are available:
- user body measurements,
- garment measurements or a brand size chart,
- measurement units,
- fit preference (snug / regular / loose),
- garment category.

Store the calculation assumptions and expose them in the UI. If garment measurements are unavailable, show “insufficient data for reliable size guidance.”

## 7. Suggested initial repository layout
fit-space/
  frontend/
    src/
      app/
      components/
      features/
        upload/
        avatar/
        tryon/
        fit-guidance/
      lib/
      types/
    public/
      demo-garments/
      models/
  backend/
    app/
      main.py
      api/
      schemas/
      services/
        fit_guidance.py
        upload_validation.py
        tryon_provider.py
    tests/
  docs/
    PROJECT_CHARTER.md
    TECHNICAL_ARCHITECTURE.md
    ROADMAP_AND_TASKS.md
    PROJECT_STATE.md
    ANTIGRAVITY_RULES.md
    DECISION_LOG.md
    TESTING_AND_DEFINITION_OF_DONE.md
  .env.example
  .gitignore
  README.md

Adjust this layout if the existing repo already has a coherent structure. Do not duplicate folders or framework entry points.

## 8. API outline (future-ready)
- `GET /api/health` — service health.
- `POST /api/uploads/validate` — validate image metadata/content; avoid retaining the image.
- `POST /api/fit-guidance` — receive measurements, garment measurements, category, and fit preference; return estimate plus explanation.
- `POST /api/try-on` — future endpoint for person + garment images; returns generated image/job status.
- `GET /api/demo-garments` — list bundled demo garments.

Validate input sizes, content types, dimensions, and errors. Apply rate limits and privacy/security controls before public deployment.
