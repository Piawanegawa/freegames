import { openUrl } from "@tauri-apps/plugin-opener";
import { useState } from "react";
import { isValidSteamStoreUrl } from "../services/steamStoreLink";
import type { GameOffer } from "../types/GameOffer";

type OfferCardProps = { offer: GameOffer };

export default function OfferCard({ offer }: OfferCardProps) {
  const [linkError, setLinkError] = useState(false);

  async function openStorePage() {
    if (!isValidSteamStoreUrl(offer.storeUrl)) {
      setLinkError(true);
      return;
    }

    try {
      await openUrl(offer.storeUrl);
      setLinkError(false);
    } catch {
      setLinkError(true);
    }
  }

  return (
    <article className="offer-card">
      <div className="offer-details">
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
        <p className="usual-price"><span>Usual price</span> {offer.usualPrice}</p>
      </div>
      <button className="steam-link" type="button" onClick={openStorePage}>View on Steam</button>
      {linkError && <p role="alert">Could not open the Steam store link.</p>}
    </article>
  );
}
