# steam-free-games Specification

## Purpose
TBD - created by archiving change steam-free-games. Update Purpose after archive.

## Requirements

### Requirement: Identify current permanent free-to-keep Steam offers
The application SHALL list only Steam games that normally have a purchase price and are currently offered at zero cost with a permanent claim. It SHALL exclude always-free games, expired offers, free weekends, trials, and other temporary access. It SHALL exclude offers when permanent claim eligibility or normal paid price cannot be established.

#### Scenario: Live normally paid game is free to keep
- **WHEN** a Steam game has a normal paid price and is currently claimable for zero cost with permanent ownership
- **THEN** the application includes it in the current offers

#### Scenario: Offer is expired or only temporary access
- **WHEN** an offer has expired or grants only a free weekend, trial, or other temporary access
- **THEN** the application excludes it

#### Scenario: Game is always free or claim status is uncertain
- **WHEN** a game is free-to-play or its normal paid price or permanent claim status cannot be established
- **THEN** the application excludes it

### Requirement: Present offer details and retrieval states
The application SHALL display each qualifying game's name, short description, usual non-sale price, and Steam store page link. It SHALL distinguish loading, a successful check with no qualifying offers, and retrieval failure.

#### Scenario: Offers are successfully retrieved
- **WHEN** one or more qualifying offers are available
- **THEN** the application displays each offer's name, short description, usual price, and Steam page link

#### Scenario: No qualifying offers are live
- **WHEN** retrieval succeeds but returns no qualifying offers
- **THEN** the application clearly communicates that no qualifying offers are currently live

#### Scenario: Offer retrieval fails
- **WHEN** the offer source is unavailable or returns invalid data
- **THEN** the application communicates a retrieval error rather than presenting the result as an empty successful check

### Requirement: Open Steam offer links in the standard browser
The application SHALL open a selected qualifying offer's HTTPS Steam store page using the operating system's standard browser, and SHALL NOT navigate the application window to an untrusted URL.

#### Scenario: User opens an offer
- **WHEN** the user activates a valid Steam offer link
- **THEN** the Steam store page opens in the system's standard browser

#### Scenario: Offer URL is not an approved HTTPS Steam URL
- **WHEN** a link is malformed, non-HTTPS, or not a Steam store URL
- **THEN** the application rejects it and does not open it

### Requirement: Keep initial storefront scope extensible
The application SHALL support Steam as the only integrated storefront in its initial version while keeping storefront-specific offer acquisition separate from the normalized offer presentation model.

#### Scenario: Initial version displays Steam offers
- **WHEN** the application retrieves and presents offers in the initial version
- **THEN** all offers originate from Steam and are represented through the normalized offer model
