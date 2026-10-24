# Testing and Definition of Done

## Every task is done only when
- [ ] Acceptance criteria in the roadmap are met.
- [ ] Relevant tests have been added/updated.
- [ ] Lint/typecheck/build or backend tests run and results are reported.
- [ ] The main user flow has been manually checked.
- [ ] Loading, empty, error, and success states are handled where applicable.
- [ ] No secrets or private images are committed.
- [ ] Documentation and `PROJECT_STATE.md` are updated.
- [ ] No unrelated files were changed unnecessarily.

## Frontend checks (after frontend setup)
Use the exact scripts in `package.json`; expected scripts may vary:
- install dependencies using the chosen package manager.
- run lint.
- run TypeScript typecheck.
- run unit tests.
- run production build.
- start development server and verify the primary flow in a browser.

Do not claim a command passed unless it was actually run.

## Backend checks (after backend setup)
- install dependencies in an isolated virtual environment.
- run `pytest`.
- check `/api/health`.
- test invalid MIME types, oversized uploads, corrupt images, missing fields, and malformed measurements.
- ensure error messages do not expose secrets or stack traces.

## Manual test checklist
- New user can understand the main action.
- Upload valid image works.
- Unsupported file is rejected.
- Oversized file is rejected.
- Clear/reset removes preview and related transient state.
- Missing garment measurements produce a limitation message rather than invented fit result.
- 3D viewer can rotate/zoom/reset and handles model load failure.
- Mobile layout remains usable.
- AI service unavailable state is understandable and does not fake an output.
