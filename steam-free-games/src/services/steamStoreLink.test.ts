import { describe, expect, it } from "vitest";
import { isValidSteamStoreUrl } from "./steamStoreLink";

describe("isValidSteamStoreUrl", () => {
  it.each([
    "https://store.steampowered.com/app/123/",
    "https://store.steampowered.com/app/123/game-name/",
    "https://store.steampowered.com/app/570/Dota_2/some/additional/path/?l=english",
    "https://store.steampowered.com/app/123/?l=english",
  ])("accepts a canonical HTTPS Steam store URL: %s", (url) => {
    expect(isValidSteamStoreUrl(url)).toBe(true);
  });

  it.each([
    "not a URL",
    "http://store.steampowered.com/app/123/",
    "https://steamcommunity.com/app/123/",
    "https://store.steampowered.com.evil.example/app/123/",
    "https://store.steampowered.com.evil.example@app/123/",
    "https://store.steampowered.com/",
    "https://store.steampowered.com/app/not-a-number/",
  ])("rejects an unapproved or malformed target: %s", (url) => {
    expect(isValidSteamStoreUrl(url)).toBe(false);
  });
});
