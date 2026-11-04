import type { RequestInfo } from "rwsdk/worker";
import { getGamesForUser } from "@/services/gameService";

export async function getMyGames({ ctx }: RequestInfo) {
  if (!ctx.user) {
    return Response.json({ error: "401: Ikke innlogget" }, { status: 401 }); // Returnerer en 401 Unauthorized respons hvis brukeren ikke er logget inn
  }
  try {
    const games = await getGamesForUser(ctx.user.steamId);
    return Response.json({ games }, { status: 200 }); // Returnerer en 200 OK respons med spillene som er hentet fra Steam
  } catch {
    return Response.json({ error:  "502: Kunne ikke hente spill fra Steam"  }, { status: 502 }); // Returnerer en 502 Bad Gateway respons hvis det oppstår en feil under henting av spillene fra Steam
  }
}