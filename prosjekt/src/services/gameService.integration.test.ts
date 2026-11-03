import { it, expect, vi } from "vitest";
import { env } from "cloudflare:workers";
import { getGamesForUser } from "./gameService";

it("henter spill fra Steam API med fetch", async () => {
  // gamesApi.ts bygger en URL med STEAM_API_KEY, så vi gir den en falsk nøkkel
  // i stedet for å bruke den ekte.
  env.STEAM_API_KEY = "test-nokkel";

  // vi.spyOn følger med på alle kall til fetch, og mockResolvedValue bytter den
  // ut med en falsk versjon. Når koden vår kaller fetch, får den med en gang
  // tilbake en "Promise" med denne Responsen i stedet for å gå ut på nettet.
  // Responsen har samme form som Steam sitt svar, med ett testspill.
  const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
    Response.json({
      response: { games: [{ appid: 1, name: "Testspill", playtime_forever: 60 }] },
    }),
  );

  // Kjører den ekte koden vår: getGamesForUser kaller getGames i gamesApi.ts,
  // som kaller den falske fetch, og så sorteres spillene i gameService.ts.
  const games = await getGamesForUser("123");

  // fetchSpy har registrert kallet, så vi kan sjekke at URL-en inneholdt steamid=123.
  expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining("steamid=123"));
  // Sjekker at testspillet kom helt gjennom koden vår og ut av getGamesForUser.
  expect(games[0].name).toBe("Testspill");
});