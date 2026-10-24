# FIT SPACE — Decision Log

Record meaningful technical/product decisions. Newest entries go at the top.

## 2026-10-24 — D-009: Ephemeral Client Sandbox for Phase 1 Uploads
**Decision:** Handle user garment uploads strictly client-side using browser Object URLs in Phase 1 without remote server transmission.
**Reason:** Complies with privacy and data isolation rules prior to backend infrastructure and validation hardening in Phase 2.

## 2026-10-24 — D-008: Original CC0 Vector Garments for Demo Atelier
**Decision:** Create and bundle 5 bespoke SVG fashion illustrations (`silk-camp-shirt.svg`, `wool-oversized-blazer.svg`, `linen-wide-leg-trouser.svg`, `ribbed-knit-dress.svg`, `utility-jacket.svg`) released under CC0/MIT license in `frontend/public/demo-garments/`.
**Reason:** Avoids copyright infringement and unverified external images, ensuring clear licensing and reproducible visual styling.

## 2026-10-24 — D-007: Avatar-first MVP
**Decision:** Start with a generic/configurable 3D avatar and interactive viewer; defer personal-photo AI try-on until later. Exclude accounts from the first demo.
**Reason:** This makes the first milestone achievable and allows the 3D foundation to be verified before adding inference complexity.

## 2026-10-24 — D-001: Web app
**Decision:** Build a responsive web application.
**Reason:** Easy to demo, deploy, and access from desktop/mobile browsers.

## 2026-10-24 — D-002: React + TypeScript + Vite
**Decision:** Use React, TypeScript, and Vite for the frontend unless an existing repository provides a strong reason not to.
**Reason:** Suitable for a component-based web UI, rapid iteration, and integration with the 3D React ecosystem.

## 2026-10-24 — D-003: React Three Fiber / Three.js for 3D
**Decision:** Use React Three Fiber with Three.js for interactive 3D rendering.
**Reason:** Provides a React-oriented way to build interactive 3D scenes. It does not itself solve garment reconstruction or realistic cloth fitting.

## 2026-10-24 — D-004: Separate 3D viewer from image-based AI try-on
**Decision:** Treat these as distinct capabilities.
**Reason:** A generated 2D image is not a rotatable 3D garment model. Realistic 3D garment fit needs suitable geometry and potentially cloth simulation.

## 2026-10-24 — D-005: No custom model training in MVP
**Decision:** Evaluate existing models/services only after the UI and baseline workflow work.
**Reason:** Model setup, GPU needs, inference cost, and licenses are major risks. Early training would slow down validation of the product concept.

## 2026-10-24 — D-006: Honest fit guidance
**Decision:** Use measurement-based, explainable guidance and show insufficient-data states.
**Reason:** A product photo does not provide reliable exact garment dimensions or guarantee real-world fit.
