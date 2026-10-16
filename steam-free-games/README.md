# Steam Free Games

A Windows desktop utility for discovering Steam games currently free to claim permanently. It is an aggregator-backed aid, not an authoritative entitlement service; verify each Steam store page before claiming.

## Install and run

Download and run the Windows installer produced for this app. On first run, the app checks current Steam offers and presents one of four states: loading, a list of qualifying results, a clear no-offers message, or a retrieval error. Each result includes the game name, short description, usual price, and a button that opens its Steam store page in your standard browser.

## Build a Windows installer from source

Build on Windows 10 or later with:

- Node.js (current LTS recommended) and npm
- Rust stable with Cargo, installed through [rustup](https://rustup.rs/)
- Microsoft C++ Build Tools with the MSVC C++ workload and Windows 10/11 SDK
- Microsoft Edge WebView2 Runtime (normally present on supported Windows 10 systems)

See the [Tauri Windows prerequisites](https://tauri.app/start/prerequisites/#windows) and install the Rust `stable-x86_64-pc-windows-msvc` toolchain. From this directory, run:

```powershell
npm ci
npm run test
npm run build
npm run tauri -- build --bundles nsis
node scripts/check-windows-installer.mjs
```

The bundle command runs the frontend production build and creates the NSIS installer at:

```text
src-tauri/target/release/bundle/nsis/steam-free-games_0.1.0_x64-setup.exe
```

The smoke check fails unless that exact expected installer exists as a non-empty file. If a build changes the version, set `WINDOWS_INSTALLER_PATH` to the actual expected path, relative to this directory, when invoking the check. This check establishes only artifact presence and size; it does not validate the installer or replace installing it on Windows and manually testing launch, offers, and browser links.

For development, run `npm run tauri -- dev`. `npm test` runs the complete frontend suite and `npm run build` type-checks and builds the frontend. Native Rust tests can be run with `cargo test --manifest-path src-tauri/Cargo.toml` when the Rust toolchain is installed.

## Steam offer source and limitations

Current Steam offers are read from the documented FreeToKeep.GG JSON endpoint, `https://freetokeep.gg/api/v1/offers?store=steam&limit=200`. Its API documentation calls this endpoint live free-to-keep offers and provides a separate `/api/v1/free-weekends` endpoint. The app treats membership in the offers endpoint as third-party classification evidence, not as a guarantee by Steam. It requires a `steam:<appId>` identifier, a positive original price, a currently valid start/end window, and Steam's public `appdetails` result to confirm `is_free: false` and provide the short description. Steam appdetails enriches metadata but does not prove the promotion is permanent. Incomplete or contradictory records are omitted; fetch/parse failures remain errors rather than empty success.

FreeToKeep.GG documents a 60-request-per-minute per-IP limit and approximately five-minute response caching. Its terms permit use (credit with a link appreciated) but disclaim accuracy, completeness, timeliness, and warranty; offers can vary by region/account. The app should be understood as an aggregator-backed discovery aid, not an authoritative entitlement check. Verify the Steam store page before claiming. We do not scrape SteamDB; its published FAQ disallows scraping/crawling.
