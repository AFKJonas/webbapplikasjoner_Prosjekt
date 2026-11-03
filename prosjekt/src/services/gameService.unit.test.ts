import { expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { getGamesForUser } from "./gameService";
import { config } from "dotenv";
config({ path: ".dev.vars" });

it("henter spill fra Steam API", async () => {
  env.STEAM_API_KEY = process.env.STEAM_API_KEY!;

  const games = await getGamesForUser("76561198211075955");

  expect(games).toBeInstanceOf(Array); //Sjekker at responsen vi vår er et array.
});