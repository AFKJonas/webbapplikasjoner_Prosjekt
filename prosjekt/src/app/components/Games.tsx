import {getGames} from "@/lib/getGames"; // importerer funksjonen for å hente API-et

export async function Games () {
    const data = await getGames("76561198351280476") // Lager en konstant data som henter spillene til steamID-en skrevet inn

    return (
        <div>
            <h1>Games</h1> 
            <p>{JSON.stringify(data)}</p>
        </div>
    )
} // I return statementet vises en overskrift og JSON-dataen fra Steam API-et. 
// JSON.stringify brukes for å konvertere JSON-dataen til en streng som kan vises i nettleseren.