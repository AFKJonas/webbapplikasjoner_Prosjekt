import type { RequestInfo } from "rwsdk/worker";
import { getGamesForUser } from "@/services/gameService";

export async function getMyGames({ ctx }: RequestInfo) {
  if (!ctx.user) {
    return Response.json({ error: "Ikke innlogget" }, { status: 401 });
  }
  try {
    const games = await getGamesForUser(ctx.user.steamId);
    return Response.json({ games }, { status: 200 });
  } catch {
    return Response.json({ error: "Kunne ikke hente spill fra Steam" }, { status: 502 });
  }
}