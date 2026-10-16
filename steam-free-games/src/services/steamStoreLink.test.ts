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
    "https://user@store.steampowered.com/app/123/",
    "https://user:password@store.steampowered.com/app/123/",
    "https://store.steampowered.com:444/app/123/",
    "https://store.steampowered.com/app/123%2F..%2F124/",
    "https://store.steampowered.com/app/123/%2e%2e/124/",
    "https://store.steampowered.com/app/123/%2E%2E/124/",
    "https://store.steampowered.com/app/123\\\\..\\\\124/",
  ])("rejects an unapproved or malformed target: %s", (url) => {
    expect(isValidSteamStoreUrl(url)).toBe(false);
  });

  it.each([
    ["query", "https://store.steampowered.com/app/123/?l=english"],
    ["fragment", "https://store.steampowered.com/app/123/#game_area"],
    ["query and fragment", "https://store.steampowered.com/app/123/?l=english#game_area"],
  ])("accepts approved path with %s", (_label, url) => {
    expect(isValidSteamStoreUrl(url)).toBe(true);
  });
});
