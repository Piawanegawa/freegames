## Context

The application is a small Windows 10 desktop utility used about once a day to inspect current Steam offers. It must avoid presenting free-to-play titles, expired promotions, free weekends, trials, or other temporary access as permanent free claims. The user selected Tauri with React + TypeScript. There is no existing application scaffold; the project currently contains OpenSpec setup and product documentation.

## Goals / Non-Goals

**Goals:**
- Launch as a Windows desktop app by double-clicking a packaged application.
- Fetch and display currently live Steam games that normally have a price and can be claimed free permanently.
- Show name, short description, usual price, and a Steam page link which opens in the default browser.
- Clearly distinguish loading, valid empty results, and retrieval errors.
- Keep storefront-specific acquisition separate from normalized offer presentation for future expansion.

**Non-Goals:**
- Always-free games, free weekends, trials, temporary access, expired offers.
- Integrations with platforms other than Steam in the initial version.
- Background monitoring, notifications, or features beyond viewing offers and opening links.

## Decisions

- **Desktop/UI stack: Tauri + React + TypeScript.** The user chose Tauri and accepted React + TypeScript. Compared with WPF, this retains the requested web UI; compared with Electron, Tauri avoids bundling a full Chromium runtime. Rust is limited to desktop-side integration that cannot or should not run in the webview.
- **Normalized offer model and Steam adapter.** Source-specific records are mapped into a store-independent offer shape before display. This reduces UI coupling and provides a seam for additional stores without implementing them now.
- **Conservative qualification.** Only display a result if evidence supports all of: paid normal price, current $0 offer, offer currently live, and a permanent claim. Unknown or incomplete claim status is excluded to avoid false-positive giveaways.
- **Retrieval location chosen after source research.** Prefer the simplest supported path, but use Tauri backend retrieval if browser CORS, source trust, or validation reliability requires it.
- **External link handling through Tauri.** Validate HTTPS Steam store URLs and open them with the operating system's default browser using narrow Tauri permissions.
- **Fetch on app open.** The daily-check use case does not require background polling. Present explicit loading, empty, and failure states; avoid implying an empty list when retrieval fails.
- **Windows packaging.** Produce and document a double-clickable Windows 10 package, verifying it on Windows where the environment permits.

## Risks / Trade-offs

- **[Offer source cannot prove permanent entitlement] →** Evaluate source fields and corroborating Steam metadata; exclude ambiguous records and document source limitations.
- **[Third-party source availability or terms change] →** Isolate the source adapter, use deterministic fixtures in tests, document attribution/limits, and handle retrieval failure visibly.
- **[Browser access is blocked by CORS or webview policy] →** Move source retrieval to the Tauri backend if needed.
- **[Stale or malformed metadata misleads users] →** Validate and normalize required fields; reject incomplete records.
- **[Tauri setup or Windows packaging prerequisites unavailable] →** Document required tooling and report any verification that could not run rather than claiming it passed.

## Migration Plan

No existing application or user data needs migration. Build and test the Tauri application, generate a Windows package, and document launch steps. Rollback consists of removing the packaged application; there is no persistent application data in scope.

## Open Questions

- Which Steam or reputable third-party source reliably identifies live permanent free-to-keep offers while supplying usual price and description?
- Does that source require backend retrieval from Tauri?
- Which Windows packaging format is best supported by the selected stable Tauri version and available prerequisites?
