## 1. Desktop application foundation

- [x] 1.1 Scaffold a Tauri + React + TypeScript Windows desktop application and verify development launch/build prerequisites.
- [x] 1.2 Add a normalized storefront-independent offer model and test contract.

## 2. Steam offer acquisition

- [x] 2.1 Research and document a reliable source for live Steam free-to-keep offers, normal price, description, and permanent-claim eligibility.
- [x] 2.2 Implement Steam retrieval, normalization, and conservative qualification filtering with deterministic tests for expired, free-to-play, weekend, trial, nonzero, and incomplete records.

## 3. Offer presentation

- [x] 3.1 Implement loading, offer-list, successful-empty, and retrieval-error states with UI tests.
- [x] 3.2 Display game name, short description, usual price, and Steam page link for each qualifying offer.

## 4. Safe link opening and Windows package

- [x] 4.1 Validate HTTPS Steam store URLs and open them in the operating system's standard browser using narrow Tauri permissions.
- [x] 4.2 Build and verify a double-clickable Windows 10 application package, and document setup, source limitations, and launch instructions.
