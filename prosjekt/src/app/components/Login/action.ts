"use server";

import {LoginInformation} from "./LoginComponent";
import { NewUserInformation } from "./NewUserComponent";

export async function loginUser( loginInformation: LoginInformation) {
    console.log("Logging in user with email:", loginInformation.email);
    console.log("Logging in user with password:", loginInformation.password);
}

export async function createNewUser( newUserInformation: NewUserInformation) {
    console.log("Creating new user with username:", newUserInformation.username);
    console.log("Creating new user with steam ID:", newUserInformation.steamId);
    console.log("Creating new user with email:", newUserInformation.email);
    console.log("Creating new user with password:", newUserInformation.password);
}

