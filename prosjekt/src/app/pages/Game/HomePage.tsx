import {GamesList} from "@/app/components/Games/GamesList"; // importert Games
import { db } from "@/db"
import { users } from "../../../db/schema/schema";
import { getSteamId } from "@/lib/dbRepository";
import { AppLayout } from "@/app/components/Layout/AppLayout";


export async function HomePage() {

    const myUsers =  await db.select().from(users);
    const steamId = await getSteamId(2) 

    if (!steamId) {
        return (
        <p>Klarte ikke å finne steamId</p>
        )
    }
    return (
        <>
        <AppLayout >
            <main className="mainHomePage">
                {/*// Viser GamesList komponent med steamid som prop*/}
                <GamesList steamId={steamId} /> 
            </main>
        </AppLayout >
        </>
    )
}