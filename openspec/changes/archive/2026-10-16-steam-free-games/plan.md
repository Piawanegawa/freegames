# Steam Free Games App Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Build a Windows 10 desktop app that lists live Steam offers for normally paid games that are currently free to claim permanently, with useful metadata and browser links.

**Architecture:** Package a React + TypeScript UI in Tauri. Keep Steam offer acquisition and normalization behind a platform adapter; use the Tauri backend where source access or safe external-link handling requires it. Keep the first release Steam-only while avoiding UI coupling to Steam's raw response format.

**Tech Stack:** Tauri, Rust desktop layer, React, TypeScript, Windows 10; select a test runner and minimal supporting dependencies during scaffold setup.

## Task 1: Scaffold the desktop app and normalized offer contract

- [ ] **Step 1:** Verify Node/Rust/Tauri prerequisites and select the current stable Tauri React + TypeScript template for Windows 10.
- [ ] **Step 2:** Write a failing root-view title smoke test and confirm its failure before implementation.
- [ ] **Step 3:** Scaffold the app and implement the minimal title view; verify the Tauri development window launches.
- [ ] **Step 4:** Write a failing normalized `GameOffer` contract test for `id`, `title`, `description`, `usualPrice`, `storeUrl`, and `platform: 'steam'`; confirm failure.
- [ ] **Step 5:** Implement the normalized offer model, run focused tests, frontend production build, and Rust check where prerequisites exist.
- [ ] **Step 6:** Commit only scaffold, contract, tests, and initial setup documentation.

## Task 2: Research and implement Steam free-to-keep acquisition

- [x] **Step 1:** Research and document a reliable source, verifying normal paid price, current zero price, live status, permanent claim eligibility, description, usage limits, and terms.
- [x] **Step 2:** Write failing fixture-based eligibility tests: include verified permanent free claim; exclude expired, free-to-play, weekend, trial, nonzero, missing-price, ambiguous-claim, and malformed records.
- [x] **Step 3:** Implement `getLiveSteamOffers(): Promise<GameOffer[]>`, keeping source structures isolated and excluding records without evidence for every required qualification.
- [x] **Step 4:** Verify deterministic tests for all exclusions, valid empty responses, and retrieval/parse failures remaining distinct errors.
- [x] **Step 5:** Commit the adapter, tests, and source rationale in README. If no source can establish permanent claim status reliably, report blocked rather than showing uncertain results.

## Task 3: Present offers and retrieval states

- [ ] **Step 1:** Write failing UI tests for loading, displayed name/description/usual price, successful-empty, and distinct retrieval-error states.
- [ ] **Step 2:** Implement the app state, offer list/card, status messages, and compact desktop styles; fetch when the app opens.
- [ ] **Step 3:** Verify the targeted UI tests and frontend production build.
- [ ] **Step 4:** Commit the UI and tests.

## Task 4: Validate and open Steam store links externally

- [ ] **Step 1:** Write failing link-policy tests for valid HTTPS Steam store URLs and rejection of malformed, non-HTTPS, and non-Steam URLs.
- [ ] **Step 2:** Implement validated external opening through Tauri's supported opener with least-privilege permissions; keep navigation outside the app webview.
- [ ] **Step 3:** Run tests and verify default-browser opening on Windows when available.
- [ ] **Step 4:** Commit URL validation, capability configuration, and tests.

## Task 5: Package and verify Windows 10 app

- [ ] **Step 1:** Define a smoke check for the generated Windows package and assert the artifact exists and is non-empty.
- [ ] **Step 2:** Run complete frontend and Rust test suites.
- [ ] **Step 3:** Build the Tauri Windows package and document exact prerequisites and command.
- [ ] **Step 4:** Verify double-click launch, offer fields, loading/empty/error behavior, and a Steam link opening in the standard browser; report unavailable checks honestly.
- [ ] **Step 5:** Confirm scope exclusions, document source limitations and usage, and commit packaging/docs.
