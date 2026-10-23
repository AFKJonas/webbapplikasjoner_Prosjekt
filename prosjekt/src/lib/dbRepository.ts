

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
        throw new Error("Klarer ikke å hente en steamId fra db");
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

type NewUser = typeof users.$inferInsert

export async function sendCreateUser (CreatedUser: NewUser) {
    try {
        const [result] = await db
        .insert(users)
        .values(CreatedUser)
        .returning()


        return result
        
    } catch (error) {
        console.error("feilet", error)
        throw new Error("Klarte ikke å lage en bruker")
        
    }
}



export async function getUserByEmail (email: string) {
    try {
        const [result] = await db
        .select({id: users.id, email: users.email, password: users.password})
        .from(users)
        .where(eq(users.email, email))

        return result;
    } catch (error) {
        console.error("Klarte ikke å hente email")
        throw new Error("Klarte ikke å hente bruker fra databasen")
    }
}




