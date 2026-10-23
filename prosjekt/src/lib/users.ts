"use server"

import { NewUserInformation } from "../app/components/Login/NewUserComponent";
import { sendCreateUser } from "@/lib/dbRepository";
import { LoginInformation } from "@/app/components/Login/LoginComponent";
import { getUserByEmail } from "@/lib/dbRepository";

export async function SendNewUser (createNewUser: NewUserInformation) {
    const createdUser = await sendCreateUser ({
        username: createNewUser.username,
        email: createNewUser.email,
        password: createNewUser.password,
        steamId: createNewUser.steamId
    })


    return createdUser;
}

export async function getUser (loggedInUser: LoginInformation) {
    const loginUser = await getUserByEmail(loggedInUser.email);

    if(!loginUser || loginUser.password !== loggedInUser.password) {
        console.error("Feil e-post eller passord")
        throw new Error("Feil e-post eller passord")
    }

    console.log("Brukeren er logget inn")
}