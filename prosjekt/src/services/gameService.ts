import { getGames } from "@/db/repositories/gamesApi";

export async function getGamesForUser(steamId: string) {
  const data = await getGames(steamId);
  const games = data.response.games ?? []; // Steam gir ingen games hvis profilen er privat

  // Mest spilte først
  return [...games].sort((a, b) => b.playtime_forever - a.playtime_forever);
}