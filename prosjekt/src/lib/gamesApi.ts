import { env } from "cloudflare:workers"; // Denne gjør det mulig å bruke miljøvariabler i Cloudflare Workers, som STEAM_API_KEY.

export type GamesResponse = {
  response: {
    games: {
      appid: number;
      name: string;
      playtime_forever: number;
      img_icon_url?: string;
    }[];
  };
};

export async function getGames(steamId: string): Promise<GamesResponse> {

  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`
  ); // linken over henter informasjon om spillene
  
  if (!response.ok) {
    throw new Error (`Steam feilet: ${response.status}`); // Dersom Steam ikke klarer å koble seg til, vil denne feilmeldigen vises
  }
  

  return response.json() as Promise<GamesResponse>; // Returnerer JSON-dataen fra Steam API
}
