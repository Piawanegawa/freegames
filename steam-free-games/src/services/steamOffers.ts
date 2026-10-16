import type { GameOffer } from "../types/GameOffer";

type Fetcher = (input: string) => Promise<{ ok: boolean; json(): Promise<unknown> }>;
type Options = { fetcher?: Fetcher; now?: Date };

const API = "https://freetokeep.gg/api/v1";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSteamId(id: unknown): string | undefined {
  if (typeof id !== "string") return;
  const match = /^steam:(\d+)$/.exec(id);
  return match?.[1];
}

function validOffer(value: unknown, now: Date): { item: Record<string, unknown>; appId: string } | undefined {
  if (!record(value)) return;
  const appId = parseSteamId(value.id);
  if (!appId || value.store !== "steam" || typeof value.title !== "string" || !value.title.trim()) return;
  if (typeof value.url !== "string" || !/^https:\/\/freetokeep\.gg\/game\/[a-z0-9-]+$/i.test(value.url)) return;
  if (typeof value.originalPrice !== "string") return;
  const price = /^\s*(?:\$\s*)?(\d+(?:\.\d{1,2})?|\d+,\d{1,2}|\d{1,3}(?:\.\d{3})+,\d{1,2})(?:\s*[A-Z]{3})?\s*$/.exec(value.originalPrice);
  if (!price) return;
  const numericText = price[1].includes(",")
    ? price[1].replace(/\./g, "").replace(",", ".")
    : price[1];
  const numericPrice = Number(numericText);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) return;
  if (value.type !== undefined && value.type !== "keep") return;
  if (typeof value.startsAt !== "string" || typeof value.endsAt !== "string") return;
  const starts = Date.parse(value.startsAt);
  const ends = Date.parse(value.endsAt);
  if (!Number.isFinite(starts) || !Number.isFinite(ends) || starts > now.getTime() || ends <= now.getTime()) return;
  return { item: value, appId };
}

async function getJson(fetcher: Fetcher, url: string): Promise<unknown> {
  const response = await fetcher(url);
  if (!response.ok) throw new Error(`Steam offers request failed (${response.ok})`);
  return response.json();
}

export async function getLiveSteamOffers({ fetcher = (url) => fetch(url), now = new Date() }: Options = {}): Promise<GameOffer[]> {
  const payload = await getJson(fetcher, `${API}/offers?store=steam&limit=200`);
  if (!record(payload) || !Array.isArray(payload.items) || typeof payload.count !== "number" || payload.count !== payload.items.length) {
    throw new Error("Invalid FreeToKeep.GG offers response");
  }
  const offers = payload.items.map((item) => validOffer(item, now)).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const results = await Promise.all(offers.map(async ({ item, appId }) => {
    const metadata = await getJson(fetcher, `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=en`);
    if (!record(metadata) || !record(metadata[appId]) || metadata[appId].success !== true || !record(metadata[appId].data)) return undefined;
    const data = metadata[appId].data;
    if (data.is_free !== false || typeof data.short_description !== "string" || !data.short_description.trim()) return undefined;
    return {
      id: appId,
      title: typeof data.name === "string" && data.name.trim() ? data.name : item.title as string,
      description: data.short_description,
      usualPrice: item.originalPrice as string,
      storeUrl: `https://store.steampowered.com/app/${appId}/`,
      platform: "steam" as const,
    };
  }));
  return results.filter((offer): offer is GameOffer => offer !== undefined);
}
