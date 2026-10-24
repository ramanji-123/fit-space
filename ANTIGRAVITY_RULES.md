# Antigravity Rules — FIT SPACE

You are implementing FIT SPACE, a real software project. Treat the documentation in this repository as persistent project context.

## Before every task
1. Read `README_FIRST.md`, `PROJECT_STATE.md`, `ROADMAP_AND_TASKS.md`, and the relevant architecture/decision sections.
2. Inspect the current repository, package files, git status, existing components, and tests.
3. Report current state, the exact scope of the proposed change, and any risks before editing.
4. Do not assume files or features exist because documentation describes future plans.

## Implementation behaviour
- Work only on the current roadmap phase unless the user explicitly changes scope.
- Prefer small, coherent changes with clear acceptance criteria.
- Reuse existing components and conventions; do not create duplicate app entry points, duplicate components, duplicate types, or duplicate route definitions.
- Do not overwrite user work or discard uncommitted changes.
- Do not install large AI/ML dependencies until a proof of concept and environment check justify them.
- Do not add fake buttons, fake API results, or static output that is presented as a working feature.
- If something must be mocked, label it as demo/mock data in code and UI.
- Keep UI components separate from API, fit calculation, and AI inference services.
- Validate uploads and all user-controlled inputs.
- Use accessible labels, keyboard focus, useful errors, responsive layouts, and loading states.
- Keep secrets in environment variables; never print or commit credentials.
- Avoid unnecessary dependencies; explain why a new dependency is needed.
- Do not change the framework/stack without documenting the reason and asking first if the change is substantial.

## AI and fit accuracy rules
- Do not describe image-based virtual try-on as true 3D cloth simulation.
- Do not claim exact fit from a garment image alone.
- Do not fabricate garment measurements, size charts, AI results, citations, test results, or performance numbers.
- If a model or external API is unavailable, show a clear unavailable/error state.
- Review model code/checkpoint/data licenses before integration or distribution.
- Never silently upload private user photos to an external service. Explain where data is sent and obtain appropriate consent.

## Required completion report
At the end of each task, report:
1. Files created/changed.
2. What actually works.
3. Commands run and exact pass/fail results.
4. Tests not run and why.
5. Known bugs, risks, and blockers.
6. Manual verification steps.
7. Roadmap tasks changed and why.
8. Update `PROJECT_STATE.md` and append a concise entry to `DECISION_LOG.md` when a technical decision changed.

Do not mark a task DONE unless acceptance criteria have been checked.
