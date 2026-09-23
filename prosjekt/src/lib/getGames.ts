import { env } from "cloudflare:workers"; // Denne gjør det mulig å bruke miljøvariabler i Cloudflare Workers, som STEAM_API_KEY.

export async function getGames(steamId: string) {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`
  ); // linken over henter informasjon om spillene
  
  if (!response.ok) {
    throw new Error (`Steam feilet: ${response.status}`); // Dersom Steam ikke klarer å koble seg til, vil denne feilmeldigen vises
  }

  return response.json(); // Returnerer JSON-dataen fra Steam API
}