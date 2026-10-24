# FIT SPACE — Project Charter

## 1. Vision
FIT SPACE is a web application that helps online shoppers visualize clothing on a virtual body and make more informed clothing purchase decisions.

## 2. Problem
Online shoppers often cannot tell how a garment's style, proportions, and approximate fit may look on their body from a product listing alone. Product photos may use models with different body proportions, and size charts can be difficult to interpret.

## 3. Proposed solution
Users provide a garment image and optional body measurements. FIT SPACE extracts or accepts garment information, displays a virtual avatar, and presents an appropriate try-on preview. It provides transparent fit guidance based on available measurements and garment size data, with uncertainty clearly explained.

## 4. Primary user journey
1. Visit the landing page.
2. Choose a demo garment or upload a permitted garment image.
3. Choose a standard avatar or configure body measurements.
4. Preview the garment using the currently available try-on mode.
5. Inspect the model in 3D where supported.
6. Review size/fit guidance and style notes.
7. Save the result or compare another garment.
8. Follow the original product link manually when one has been provided.

## 5. User groups
- Online fashion shoppers.
- Students and developers interested in AI/computer vision.
- Fashion retailers (future scope, not MVP).

## 6. MVP requirements
### P0 — required for a credible first demo
- Responsive landing page and application shell.
- Garment image upload with file type/size validation and preview.
- Demo garment catalogue with clearly labelled sample assets.
- Avatar selection and/or basic measurement form.
- Interactive 3D avatar viewer with orbit/zoom controls.
- A transparent, rules-based size/fit guidance panel when garment measurements are available.
- Clear UI states: empty, loading, success, invalid file, and failure.
- Privacy notice and delete/reset controls for uploaded images.
- Basic automated tests and setup documentation.

### P1 — after P0 is stable
- Image-based AI virtual try-on service integration.
- Save and compare outfits.
- Garment metadata extraction with user confirmation.
- Size recommendation using garment-specific size charts and user measurements.
- Confidence/limitations panel explaining missing data.

### P2 — advanced features
- More diverse avatar configurations.
- 360-degree garment preview where suitable 3D assets exist.
- Realistic fabric/cloth simulation using garment geometry.
- Personalised outfit/style recommendations.
- User accounts and cloud storage, only if needed and secured.
- Product-link import, subject to source-site terms and technical feasibility.

## 7. Important product distinction
A generated 2D try-on image is not a true rotatable 3D garment simulation. A 3D avatar wearing a generic garment shape is not a faithful simulation of a particular product. The UI must label each mode honestly.

## 8. Fit guidance policy
- Fit recommendations require user measurements and garment-specific size measurements for meaningful comparisons.
- If only a product photo is available, report appearance/style feedback only; do not invent exact garment dimensions.
- Use language such as “estimated fit based on provided measurements,” not “guaranteed to fit.”
- Do not make body-shaming judgments or label a body as good/bad.
- Do not infer sensitive traits from uploaded images.
- Avoid storing images by default; define retention and deletion behaviour before enabling server processing.

## 9. Non-goals for MVP
- Guaranteeing that an item will fit in real life.
- Reconstructing accurate 3D garment geometry from a single flat product image.
- Building/training a foundation diffusion model from scratch.
- Scraping shopping sites without checking terms, permissions, and anti-bot restrictions.
- Payments, marketplace checkout, or retailer integrations.
- Claiming commercial permission for third-party models/checkpoints without license review.

## 10. Success criteria
- A new user can complete the main demo flow without instructions.
- Invalid uploads are rejected safely with useful errors.
- 3D viewer controls work on supported desktop and mobile browsers.
- Fit guidance explains what data it used and what data is missing.
- Core flows have tests; the project can be installed from documented instructions.
- The application does not represent mock or placeholder outputs as AI results.
