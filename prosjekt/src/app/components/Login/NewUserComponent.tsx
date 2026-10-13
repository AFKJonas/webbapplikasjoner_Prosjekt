"use client";

import { useState, SyntheticEvent} from "react";

export type NewUserInformation = {
    username: string;
    steamId: string;
    email: string;
    password: string;
}

export interface NewUserInformationProps {
    onSubmit: (NewUserprops: NewUserInformation) => void;
}

export function NewUserComponent({onSubmit}: NewUserInformationProps) {
    const [username, setUsername] = useState("");
    const [steamId, setSteamId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const RegisterResult = {
        username: username,
        steamId: steamId,
        email: email,
        password: password
    }

    const updateUsername: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };
    const updateSteamId: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
        setSteamId(event.target.value);
    };
    const updateEmail: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    };
    const updatePassword: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (username === "" || steamId === "" || email === "" || password === "") {
            window.alert("Alle feltene må fylles ut for å kunne opprette en ny bruker");
            return;
        };
        onSubmit(RegisterResult);
        console.log((username), (steamId), (email), (password)); //MÅ FJERNES
        setUsername("");
        setSteamId("");
        setEmail("");
        setPassword("");
    }


    return (
            <section className="new-user-section">
                <h1 className="new-user-h1">Opprett ny bruker</h1>
                <form onSubmit={handleFormSubmit} className="new-user-form">
                    <fieldset className="new-user-fieldset">
                        <legend className="create-user-legend">Fyll ut skjemaet nedenfor for å opprette en ny bruker:</legend>
                        <label htmlFor="username">Brukernavn:</label>
                        <input className="new-user-username-input"
                            placeholder="JohnTheUser123"
                            type="text" 
                            id="username" 
                            name="username" 
                            maxLength={20}
                            minLength={3}
                            onChange={updateUsername}
                            value={username}
                            required  />

                        <label htmlFor="steamid">Steam-ID(17-sifret):</label>
                        <input className="new-user-steamid-input"
                            type="text" 
                            id="steamid" 
                            name="steamid" 
                            inputMode="numeric" 
                            placeholder="12345678910121314" 
                            maxLength={17} 
                            minLength={17} 
                            pattern="[0-9]{17}" 
                            onChange={updateSteamId}
                            value={steamId}
                            required />

                        <label htmlFor="email">E-post:</label>
                        <input className="new-user-email-input" 
                            type="email" 
                            id="email" 
                            name="email"  
                            placeholder="example@gmail.com" 
                            maxLength={254}
                            onChange={updateEmail}
                            value={email}
                            required />
                        
                        <label htmlFor="password">Passord:</label>
                        <input className="new-user-password-input" 
                            type="password" 
                            id="password" 
                            name="password" 
                            minLength={8}
                            maxLength={120}
                            placeholder="********"
                            onChange={updatePassword}
                            value={password}
                            required />
                        <button type="submit" className="register-new-user">Registrer deg</button>
                    </fieldset> 
                </form>
            </section>
    )
}
