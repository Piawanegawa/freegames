## Why

Checking storefronts manually for temporarily free games is inconvenient. This change provides a simple daily view of current Steam promotions so the user can quickly find normally paid games that can be claimed for free permanently and add them to their collection.

## What Changes

- Add a Windows 10 desktop app, packaged with Tauri and presented through a React + TypeScript interface.
- Show only live Steam offers for normally paid games that are free to claim permanently.
- Display each game's name, short description, usual price, and Steam store link; open the link in the default browser.
- Clearly distinguish loading, no qualifying offers, and retrieval failure.
- Keep offer retrieval separable by storefront for potential future integrations, without adding other platforms now.

## Capabilities

### New Capabilities
- `steam-free-games`: Discover and display current Steam games that are normally paid and temporarily free to claim permanently.

### Modified Capabilities

None.

## Impact

- New Tauri desktop application targeting Windows 10, with React + TypeScript UI and minimal Rust integration as required.
- Requires a reliable data source and validation rules for live permanent-claim status, normal price, game description, and Steam links.
- Adds automated tests for eligibility filtering, data normalization, UI states, and safe link opening, plus Windows packaging/build documentation.
