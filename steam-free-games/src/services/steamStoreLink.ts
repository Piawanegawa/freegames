export function isValidSteamStoreUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "store.steampowered.com" &&
      url.port === "" &&
      url.username === "" &&
      url.password === "" &&
      !/%2f|%5c|%2e/i.test(value) &&
      /^\/app\/\d+(?:\/[\w-]+)*\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}
