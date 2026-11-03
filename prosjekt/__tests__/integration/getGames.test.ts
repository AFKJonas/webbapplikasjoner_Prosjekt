import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("cloudflare:workers", () => ({ env: { STEAM_API_KEY: "test-nøkkel" } }));

import { getMyGames } from "@/app/api/games";

function mockSteam(response: Response) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
}

const innlogget = { ctx: { user: { steamId: "123" } } } as any;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GET /api/games", () => {
  it("gir 401 hvis brukeren ikke er innlogget", async () => {
    const response = await getMyGames({ ctx: { user: null } } as any);

    expect(response.status).toBe(401);
  });

  it("henter spill fra Steam og sorterer dem med mest spilt først", async () => {
    mockSteam(
      Response.json({
        response: {
          games: [
            { appid: 1, name: "Lite spilt", playtime_forever: 10 },
            { appid: 2, name: "Mest spilt", playtime_forever: 500 },
          ],
        },
      }),
    );

    const response = await getMyGames(innlogget);
    const body = (await response.json()) as { games: { name: string }[] };

    expect(response.status).toBe(200);
    expect(body.games.map((g) => g.name)).toEqual(["Mest spilt", "Lite spilt"]);
  });

  it("gir 502 hvis Steam feiler", async () => {
    mockSteam(new Response(null, { status: 500 }));

    const response = await getMyGames(innlogget);

    expect(response.status).toBe(502);
  });
});