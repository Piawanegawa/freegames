import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { getLiveSteamOffers } from "../services/steamOffers";
import type { GameOffer } from "../types/GameOffer";

vi.mock("../services/steamOffers", () => ({ getLiveSteamOffers: vi.fn() }));

const offer: GameOffer = {
  id: "12345",
  title: "Example Adventure",
  description: "Explore a mysterious island.",
  usualPrice: "$19.99",
  storeUrl: "https://store.steampowered.com/app/12345/",
  platform: "steam",
};

const getOffersMock = vi.mocked(getLiveSteamOffers);

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("App", () => {
  it("shows a loading state while offers are being retrieved", async () => {
    let resolveOffers!: (offers: GameOffer[]) => void;
    getOffersMock.mockReturnValue(new Promise((resolve) => { resolveOffers = resolve; }));

    render(<App />);

    expect(screen.getByRole("status").textContent).toMatch(/loading/i);
    await act(async () => resolveOffers([]));
  });

  it("displays offer details and a Steam store link", async () => {
    getOffersMock.mockResolvedValue([offer]);

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Example Adventure" })).toBeTruthy();
    expect(screen.getByText("Explore a mysterious island.")).toBeTruthy();
    expect(screen.getByText("$19.99")).toBeTruthy();
    expect(screen.getByRole("link", { name: /view on steam/i }).getAttribute("href")).toBe(offer.storeUrl);
  });

  it("communicates when no qualifying offers are live", async () => {
    getOffersMock.mockResolvedValue([]);

    render(<App />);

    expect(await screen.findByText(/no qualifying offers are currently live/i)).toBeTruthy();
  });

  it("communicates retrieval failure distinctly from an empty result", async () => {
    getOffersMock.mockRejectedValue(new Error("Network unavailable"));

    render(<App />);

    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByText(/could not retrieve steam offers/i)).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
