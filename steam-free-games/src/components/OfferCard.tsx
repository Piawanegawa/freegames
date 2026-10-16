import type { GameOffer } from "../types/GameOffer";

type OfferCardProps = { offer: GameOffer };

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="offer-card">
      <div className="offer-details">
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
        <p className="usual-price"><span>Usual price</span> {offer.usualPrice}</p>
      </div>
      <a className="steam-link" href={offer.storeUrl}>View on Steam</a>
    </article>
  );
}
