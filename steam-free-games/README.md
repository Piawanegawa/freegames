# Steam Free Games

A Windows desktop utility for discovering Steam games currently free to claim permanently.

## Development prerequisites

- Node.js and npm
- Rust stable and Cargo (install with [rustup](https://rustup.rs/))
- For Windows development, Microsoft C++ Build Tools and the WebView2 Runtime; see the [Tauri Windows prerequisites](https://tauri.app/start/prerequisites/#windows).

Install dependencies and start the desktop app:

```sh
npm install
npm run tauri dev
```

Run the frontend tests and production build:

```sh
npm test
npm run build
```

`npm run build` verifies the React + TypeScript frontend. A desktop launch or Windows package additionally requires the Rust and Windows prerequisites above.

## Steam offer source and limitations

Current Steam offers are read from the documented FreeToKeep.GG JSON endpoint, `https://freetokeep.gg/api/v1/offers?store=steam&limit=200`. Its API documentation calls this endpoint live free-to-keep offers and provides a separate `/api/v1/free-weekends` endpoint. The app treats membership in the offers endpoint as third-party classification evidence, not as a guarantee by Steam. It requires a `steam:<appId>` identifier, a positive original price, a currently valid start/end window, and Steam's public `appdetails` result to confirm `is_free: false` and provide the short description. Steam appdetails enriches metadata but does not prove the promotion is permanent. Incomplete or contradictory records are omitted; fetch/parse failures remain errors rather than empty success.

FreeToKeep.GG documents a 60-request-per-minute per-IP limit and approximately five-minute response caching. Its terms permit use (credit with a link appreciated) but disclaim accuracy, completeness, timeliness, and warranty; offers can vary by region/account. The app should be understood as an aggregator-backed discovery aid, not an authoritative entitlement check. Verify the Steam store page before claiming. We do not scrape SteamDB; its published FAQ disallows scraping/crawling.
