# FIT SPACE — Roadmap and Task Board

Status vocabulary: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `DONE`, `DEFERRED`.
Do not mark a task DONE until its acceptance criteria are verified.

## Phase 0 — Product planning
- [x] Define project name and concept.
- [x] Define the 2D vs 3D distinction.
- [x] Define initial recommended stack.
- [x] Create persistent project documentation.
- [ ] Confirm computer hardware and GPU availability.
- [ ] Decide whether MVP starts with a generic 3D avatar or a user photo.
- [ ] Decide whether accounts are excluded from the first demo (recommended: exclude).

## Phase 1 — Foundation and UI shell
- [x] Inspect repository and report existing files before changing anything.
- [x] Create React + TypeScript + Vite frontend if no existing frontend exists.
- [x] Add responsive design system and navigation.
- [x] Build landing page, try-on workspace, upload panel, garment preview, measurement panel, and results panel.
- [x] Add demo garment assets with source/license notes.
- [x] Add loading, empty, error, and success states.
- [x] Add lint, typecheck, and basic frontend tests.
Acceptance: app starts locally, all primary pages render, and no console errors are present in the main flow. (Verified 2026-10-24)

## Phase 2 — Upload and fit-guidance prototype
- [ ] Add validated garment image upload and local preview.
- [ ] Add measurement form with unit selection and input validation.
- [ ] Define garment-measurement data model and size-chart input.
- [ ] Implement deterministic fit guidance only when enough measurements exist.
- [ ] Explain assumptions and missing data in results.
- [ ] Add backend health endpoint and tests if FastAPI backend is created.
Acceptance: valid and invalid inputs behave correctly; fit guidance is reproducible and never fabricates unavailable measurements.

## Phase 3 — 3D avatar viewer
- [ ] Select a licensed avatar asset and record attribution/license.
- [ ] Integrate React Three Fiber / Three.js.
- [ ] Add rotate, zoom, reset-view, loading, and fallback states.
- [ ] Test desktop and mobile layouts.
- [ ] Add a clearly labelled prototype garment or garment asset.
Acceptance: avatar loads, can be rotated/zoomed, and the UI clearly identifies placeholder garments.

## Phase 4 — Image-based AI virtual try-on evaluation
- [ ] Check local GPU/VRAM, Python/CUDA compatibility, and storage.
- [ ] Compare candidate models and hosted services.
- [ ] Review code, checkpoint, dataset, and commercial-use licenses.
- [ ] Build a small isolated proof of concept with legally usable test images.
- [ ] Evaluate garment identity preservation, image quality, latency, failure cases, and cost.
- [ ] Integrate behind a provider interface only after the proof of concept passes.
Acceptance: generated outputs are real model outputs, errors are handled, and limitations are visible.

## Phase 5 — Product polish
- [ ] Outfit save/compare (only after privacy and persistence decisions).
- [ ] Product metadata entry/import with source terms checked.
- [ ] Accessibility and keyboard navigation review.
- [ ] Security review for upload processing and API endpoints.
- [ ] End-to-end tests and deployment documentation.
Acceptance: fresh clone setup works from README; all core tests pass.

## Phase 6 — Research / advanced features (optional)
- [ ] Define measurable research questions.
- [ ] Build a permitted evaluation set and document its license.
- [ ] Evaluate image quality and garment preservation using a defined protocol.
- [ ] Investigate physically based cloth simulation only if garment geometry is available.
- [ ] Document limitations and avoid unsupported claims.

## Rules for moving tasks
1. Complete and verify the current phase before expanding scope.
2. Keep unrelated features out of the active phase.
3. Every bug fix should include a reproduction or regression test when practical.
4. Update `PROJECT_STATE.md` and `DECISION_LOG.md` after meaningful changes.
