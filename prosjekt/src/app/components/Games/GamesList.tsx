import { getGamesForUser } from "@/services/gameService";
import { GameCard } from "./GameCard";

export async function GamesList({ steamId }: { steamId: string }) {
    const games = await getGamesForUser(steamId);

    return (
        <section>
            <h1>Games</h1>
            <section className="games-list">
                {games.map((game) => (
                    <GameCard key={game.appid} appid={game.appid} name={game.name} playtime_forever={game.playtime_forever} img_icon_url={game.img_icon_url} />
                ))}
            </section>
        </section>
    )
}