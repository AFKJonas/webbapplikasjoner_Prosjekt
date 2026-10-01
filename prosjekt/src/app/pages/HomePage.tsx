import {GamesList} from "@/app/components/GamesList"; // importert Games

export function HomePage() {
    return (
        <>
        <header>
            <p>Hjem</p>
            <p>Profil</p>
            <p>Meny</p>
        </header>
        <main>
            <h1>HomePage</h1>
            <GamesList steamId="76561198351280476" /> // Viser GamesList komponent med steamid som prop
        </main>
        <footer>
            <p>Footer</p>
        </footer>
        </>
    )
}