import { describe, expect, it, vi } from "vitest";
import { getLiveSteamOffers } from "./steamOffers";

const now = new Date("2026-10-16T12:00:00.000Z");
const offer = {
  id: "steam:123",
  title: "Paid Game",
  store: "steam",
  url: "https://freetokeep.gg/game/paid-game",
  originalPrice: "$19.99",
  startsAt: "2026-10-15T12:00:00.000Z",
  endsAt: "2026-10-17T12:00:00.000Z",
  tags: ["Game"],
};
const app = {
  success: true,
  data: { name: "Paid Game", short_description: "A short description", is_free: false },
};
const response = (body: unknown) => ({ ok: true, json: async () => body });

describe("getLiveSteamOffers", () => {
  it("includes active offers classified by the free-to-keep feed and enriches from Steam", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(response({ generatedAt: now.toISOString(), count: 1, items: [offer] }))
      .mockResolvedValueOnce(response({ [123]: app }));
    await expect(getLiveSteamOffers({ fetcher, now })).resolves.toEqual([{
      id: "123", title: "Paid Game", description: "A short description", usualPrice: "$19.99",
      storeUrl: "https://store.steampowered.com/app/123/", platform: "steam",
    }]);
  });

  it.each([
    ["free weekend type", { ...offer, type: "weekend" }],
    ["expired", { ...offer, endsAt: "2026-10-16T11:59:59Z" }],
    ["not live", { ...offer, startsAt: "2026-10-16T12:00:01Z" }],
    ["zero usual price", { ...offer, originalPrice: "$0.00" }],
    ["free label", { ...offer, originalPrice: "Free" }],
    ["not available label", { ...offer, originalPrice: "N/A" }],
    ["nonnumeric price", { ...offer, originalPrice: "$twenty" }],
    ["malformed price", { ...offer, originalPrice: "$19.99 USD extra" }],
    ["missing price", { ...offer, originalPrice: undefined }],
    ["incomplete timing", { ...offer, endsAt: null }],
  ])("excludes %s", async (_label, item) => {
    const fetcher = vi.fn().mockResolvedValue(response({ generatedAt: now.toISOString(), count: 1, items: [item] }));
    await expect(getLiveSteamOffers({ fetcher, now })).resolves.toEqual([]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("excludes free-to-play titles", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(response({ generatedAt: now.toISOString(), count: 1, items: [offer] }))
      .mockResolvedValueOnce(response({ [123]: { ...app, data: { ...app.data, is_free: true } } }));
    await expect(getLiveSteamOffers({ fetcher, now })).resolves.toEqual([]);
  });

  it("returns empty success for a well-formed empty feed", async () => {
    await expect(getLiveSteamOffers({ fetcher: vi.fn().mockResolvedValue(response({ generatedAt: now.toISOString(), count: 0, items: [] })), now })).resolves.toEqual([]);
  });

  it("distinguishes network and malformed response errors", async () => {
    await expect(getLiveSteamOffers({ fetcher: vi.fn().mockRejectedValue(new Error("offline")), now })).rejects.toThrow("offline");
    await expect(getLiveSteamOffers({ fetcher: vi.fn().mockResolvedValue(response({ items: {} })), now })).rejects.toThrow(/invalid/i);
  });
});
