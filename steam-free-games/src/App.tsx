import { useEffect, useState } from "react";
import { getLiveSteamOffers } from "./services/steamOffers";
import type { GameOffer } from "./types/GameOffer";
import OfferList from "./components/OfferList";
import StatusMessage from "./components/StatusMessage";
import "./App.css";

type RetrievalState =
  | { status: "loading" }
  | { status: "success"; offers: GameOffer[] }
  | { status: "error" };

function App() {
  const [retrieval, setRetrieval] = useState<RetrievalState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    getLiveSteamOffers().then(
      (offers) => { if (active) setRetrieval({ status: "success", offers }); },
      () => { if (active) setRetrieval({ status: "error" }); },
    );
    return () => { active = false; };
  }, []);

  return (
    <main className="container">
      <header className="page-header">
        <p className="eyebrow">Steam promotions</p>
        <h1>Steam Free Games</h1>
        <p className="intro">Currently free games to claim and keep.</p>
      </header>
      {retrieval.status === "loading" && <StatusMessage kind="loading" />}
      {retrieval.status === "error" && <StatusMessage kind="error" />}
      {retrieval.status === "success" && (retrieval.offers.length === 0
        ? <StatusMessage kind="empty" />
        : <OfferList offers={retrieval.offers} />)}
    </main>
  );
}

export default App;
