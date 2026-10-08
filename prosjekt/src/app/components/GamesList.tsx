import { getGames } from "@/lib/getGames"; // importerer funksjonen for å hente API-et
import { GameCard } from "./GameCard"; // importerer GameCard komponentet

export async function GamesList({ steamId }: { steamId: string }) {
    
    const data = await getGames(steamId) // Lager en konstant data som henter spillene til steamID-en skrevet inn
    
    return (
        <section>
            <h1>Games</h1> 
            <section className="games-list">
            {data.response.games.map((game) => (
                <GameCard key={game.appid} appid={game.appid} name={game.name} playtime_forever={game.playtime_forever} img_icon_url={game.img_icon_url} />
            ))}
            </section>
        </section>
    )
} // I return statementet vises en overskrift og JSON-dataen fra Steam API-et. 