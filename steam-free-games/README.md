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
