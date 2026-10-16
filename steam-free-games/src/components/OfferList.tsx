import type { GameOffer } from "../types/GameOffer";
import OfferCard from "./OfferCard";

type OfferListProps = { offers: GameOffer[] };

export default function OfferList({ offers }: OfferListProps) {
  return <section className="offer-list" aria-label="Current Steam offers">
    {offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
  </section>;
}
