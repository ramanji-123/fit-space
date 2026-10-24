# FIT SPACE — Start Here

## Project identity
**Name:** FIT SPACE  
**Full title:** AI-Powered Virtual Try-On and Personalized Fashion Recommendation System  
**Type:** Full-stack web application  
**Purpose:** Let users upload a clothing product image, preview it on a virtual avatar, explore a 3D view, and receive cautious fit/style guidance before buying.

## Read these files in order
1. `PROJECT_CHARTER.md` — product scope, users, features, non-goals.
2. `TECHNICAL_ARCHITECTURE.md` — recommended stack and system boundaries.
3. `ROADMAP_AND_TASKS.md` — phased implementation plan and acceptance criteria.
4. `PROJECT_STATE.md` — current progress; update after each work session.
5. `ANTIGRAVITY_RULES.md` — persistent instructions for Antigravity.
6. `PROMPTS/PHASE_01_FOUNDATION.md` — first implementation prompt.
7. `DECISION_LOG.md` — why major technical choices were made.
8. `TESTING_AND_DEFINITION_OF_DONE.md` — how to verify work.

## Non-negotiable project rules
- This folder is the source of truth for project status and decisions.
- Before coding, inspect the current repository and read `ANTIGRAVITY_RULES.md`, `PROJECT_STATE.md`, and the relevant roadmap phase.
- Do not claim a feature works unless it has been implemented and tested.
- Do not replace existing files or architecture blindly. Inspect first and explain the planned changes.
- Work in small, testable phases. After each phase, run checks and update `PROJECT_STATE.md`.
- Never put API keys, secrets, private user images, or credentials in source control.
- Do not claim accurate physical fit from a generated image alone.
- Do not claim true cloth simulation unless actual garment geometry and a simulation system are implemented.
- Keep the MVP achievable. No custom model training in Phase 1.
- Use Git commits at stable milestones and never overwrite uncommitted user work without permission.

## Current status
Project planning only. No application code has been implemented by this starter pack.

## First action
Open `PROMPTS/PHASE_01_FOUNDATION.md` in Antigravity and ask it to inspect the workspace, report what exists, then implement only Phase 1 after confirming the repo state. If the workspace is empty, create the initial application skeleton described in the prompt.
