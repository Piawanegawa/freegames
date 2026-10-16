import { describe, expect, it } from "vitest";
import type { GameOffer } from "../types/GameOffer";

describe("GameOffer", () => {
  it("accepts the normalized Steam offer fields", () => {
    const offer: GameOffer = {
      id: "steam-123",
      title: "Example Game",
      description: "A short game description.",
      usualPrice: "$19.99",
      storeUrl: "https://store.steampowered.com/app/123",
      platform: "steam",
    };

    expect(offer).toEqual({
      id: "steam-123",
      title: "Example Game",
      description: "A short game description.",
      usualPrice: "$19.99",
      storeUrl: "https://store.steampowered.com/app/123",
      platform: "steam",
    });
  });
});
