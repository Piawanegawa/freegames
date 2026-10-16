import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { openUrl } from "@tauri-apps/plugin-opener";
import { getLiveSteamOffers } from "../services/steamOffers";
import type { GameOffer } from "../types/GameOffer";

vi.mock("../services/steamOffers", () => ({ getLiveSteamOffers: vi.fn() }));
vi.mock("@tauri-apps/plugin-opener", () => ({ openUrl: vi.fn().mockResolvedValue(undefined) }));

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

  it("opens a validated Steam store link externally without navigating the webview", async () => {
    getOffersMock.mockResolvedValue([offer]);

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Example Adventure" })).toBeTruthy();
    expect(screen.getByText("Explore a mysterious island.")).toBeTruthy();
    expect(screen.getByText("$19.99")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /view on steam/i }));
    expect(openUrl).toHaveBeenCalledWith("https://store.steampowered.com/app/12345/");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("does not turn the webview into an anchor navigation target", async () => {
    getOffersMock.mockResolvedValue([offer]);

    render(<App />);

    const button = await screen.findByRole("button", { name: /view on steam/i });
    expect(button.closest("a")).toBeNull();
  });

  it("rejects an invalid offer URL without opening it", async () => {
    getOffersMock.mockResolvedValue([{ ...offer, storeUrl: "https://steamcommunity.com/app/12345/" }]);

    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: /view on steam/i }));
    expect(screen.getByRole("alert").textContent).toMatch(/could not open/i);
    expect(openUrl).not.toHaveBeenCalled();
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
