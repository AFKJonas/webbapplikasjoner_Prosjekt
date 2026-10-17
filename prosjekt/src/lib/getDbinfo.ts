

import { eq } from "drizzle-orm";
import { db } from "@/db/";
import { users } from "@/db/schema/schema";


export async function getAllSteamIds() { //Funksjon som henter alle steamid-er fra db om man skulle trenge det
    try {
    const result = await db 
        .select({steamId: users.steamId})
        .from(users)
    
       return result.map((user) => user.steamId)
    }
    catch (error) {
        throw new Error("Klarer ikke å hente noen steamid-er fra db-en")
    }
}

export async function getSteamId(userId: number) { //funksjon som henter en spesifikk steam-id basert på where statement
    try {
        const result = await db
            .select({ steamId: users.steamId })
            .from(users)
            .where(eq(users.id, userId));

        return result[0]?.steamId;
    } catch (error) {
        throw new Error("Klarerikke å hente en steamId fra db");
    }
}

export async function getUserInformation (userId: number) { // Henter informasjon fra en spesifikk bruker som er logget inn
    try {
        const result = await db
        .select({ id: users.id, username: users.username, email: users.email, steamId: users.steamId })
        .from(users)
        .where(eq(users.id, userId))

        return result[0]
        
    } catch (error) {
        throw new Error("Klarer ikke å hente bruker fra db")
    }
}