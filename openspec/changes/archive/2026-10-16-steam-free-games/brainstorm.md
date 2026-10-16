## Design Summary

A small Windows 10 desktop app for a daily check of Steam games that normally cost money but are currently free to claim permanently. Each current offer shows the game name, a short description, its usual price, and a Steam page link that opens in the standard browser. Include only currently live offers; exclude always-free games, free weekends, trials, temporary access, and expired deals. Steam is the initial platform; keep the design open to adding storefronts later without implementing them now. No additional features were requested.

## Alternatives Considered

### Option A: Native Windows UI with C# / WPF
- **Approach**: Build the whole application using Windows desktop UI technologies.
- **Pros**: Direct native Windows experience and packaging.
- **Cons**: UI and logic would not use the preferred web technologies.
- **Why not chosen**: The user preferred a web interface packaged as a desktop app.

### Option B: React + TypeScript in Electron
- **Approach**: Package a web UI and desktop runtime using Electron.
- **Pros**: JavaScript/TypeScript-centered implementation and broad ecosystem.
- **Cons**: Larger bundled runtime and more moving parts than needed.
- **Why not chosen**: Tauri was selected as the better-fit desktop shell.

### Option C: React + TypeScript in Tauri
- **Approach**: Use a web UI in a Tauri desktop window, with Rust integration where needed.
- **Pros**: Desktop window and package with a system-WebView-based shell; separates retrieval from presentation.
- **Cons**: Desktop integration may require some Rust, and Windows packaging prerequisites must be documented.
- **Why chosen**: The user selected Tauri and accepted React + TypeScript.

## Agreed Approach

Build a Windows 10 double-clickable Tauri desktop app with a React + TypeScript interface. On opening, retrieve live Steam free-to-keep offers, show loading/empty/error states, and display each qualifying game's name, short description, normal price, and Steam link, opening in the user's default browser. Keep platform-specific retrieval behind an adapter/normalized offer model for potential stores later; do not implement them now. Select a reliable source during implementation and exclude offers unless permanent-claim eligibility, live status, and a normally paid price can be established.

## Key Decisions

- Daily manual check, not continuous monitoring.
- Only normally paid Steam games currently free to claim permanently.
- Exclude always-free, expired, weekend, trial, and temporary-access offers.
- Tauri + React + TypeScript; use Rust only where desktop integration requires it.
- Open Steam links using the default browser.
- Steam only in the initial release; normalized storefront boundary for future expansion.
- No additional features.
- Source choice and claim validation remain implementation research decisions.

## Open Questions

- Which source reliably identifies current permanent free claims and supplies normal price and description?
- Does source access require backend retrieval?
- Which Windows package is best supported by selected Tauri version and available prerequisites?
