# Steam Free Games App — Design

## Intent

Build a small Windows 10 desktop application that helps the user check once a day for Steam games that are usually paid but are currently free to claim permanently. The user opens the app, scans the current offers, and visits a game's Steam page in their standard browser if interested.

## Goals

- Launch as a desktop app by double-clicking it on Windows 10.
- Show live Steam offers that meet the permanent-free-claim criteria.
- For each offer, show the game name, a short description, usual price, and a link to its Steam page.
- Open the selected link in the system's standard browser.
- Keep the architecture amenable to adding other storefronts in the future.

## Out of scope

- Free-to-play games that are always free.
- Free weekends, trials, or temporary access that does not grant a permanent license.
- Expired offers; the view contains only offers live at the time of checking.
- Non-Steam platforms in the initial version.
- Additional features beyond checking the current list and opening game links.

## Product behavior

The user expects to run the app about once per day. On opening, it should present the currently claimable Steam games. An offer qualifies only if the game normally costs money and can currently be claimed for free with a permanent license. Each result includes:

- Game name
- Short description
- Usual (non-sale) price
- Link to the Steam game page

The link opens in the default browser. If no qualifying offers are live, the interface should communicate that clearly rather than imply an error. Data sourcing and validation are implementation questions; the implementation should determine a reliable way to distinguish permanent claims from temporary access and to obtain the required metadata.

## Technology direction

- Desktop shell: Tauri
- UI: React + TypeScript
- Target: Windows 10, double-clickable desktop application

The user selected Tauri and accepted React with TypeScript. Tauri may require a small Rust-based desktop layer; the UI and most application behavior should remain in TypeScript where practical.

## Extensibility

Although Steam is the only initial platform, keep offer retrieval and platform-specific details separated enough that another storefront can be added later without redesigning the entire UI. Do not build other platform integrations in the first version.

## Remaining implementation choices

The implementer should decide and document:

- Reliable data source(s) for currently live Steam offers and normal prices.
- How permanent-claim status is determined and false positives are excluded.
- Whether retrieval runs directly from the UI or through Tauri's backend, based on source access and browser/network constraints.
- Loading, network failure, and no-offer presentation.
- Packaging and distribution approach for a Windows 10 double-click launch.
- Any minimal caching or refresh behavior needed for a daily check.

## Acceptance outline

- A Windows user can launch the packaged app by double-clicking it.
- The app displays only live Steam offers for normally paid games that are free to claim permanently.
- Each displayed item includes the name, short description, usual price, and Steam link.
- Activating a game's link opens its page in the standard browser.
- Free-to-play titles, free weekends, temporary trials, and expired deals are excluded.
