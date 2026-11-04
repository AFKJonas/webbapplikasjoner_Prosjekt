"use client"

import { useState, ChangeEvent } from "react"


    export type LoginInformation = {
        email: string;
        password: string;
    }

    export interface LoginInformationProps {
        onSubmit: (Loginprops: LoginInformation) => void;
    }



    
export function LoginComponent ({onSubmit}: LoginInformationProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState ("")

     const LoginResult = {
      email: email,
      password: password
    }

    const updateEmail: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
            setEmail(event.target.value);
    };
    const updatePassword: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
            setPassword(event.target.value);        
    };

    const handleForm = (event: ChangeEvent) => {
        event.preventDefault();
        if (email === "" || password === "") {
          window.alert("Alle feltene må fylles ut for å kunne logge inn");
          return;
        };
        onSubmit(LoginResult);
        setEmail("");
        setPassword("");
      }



    
    return (
        <section className="login-section">
                <form onSubmit = {handleForm}>
                <fieldset className="login-fieldset">
                  <legend className="login-legend" >Logg inn med e-post og passord</legend>
                  <label htmlFor="email">E-post:</label>
                  <input className="login-epost-input"
                    type="email" 
                    id="email" 
                    name="email"  
                    placeholder="example@gmail.com" 
                    maxLength={254}
                    required 
                    onChange={updateEmail}
                    value={email}/> {/*Satt en value for typen email */}

                  <label htmlFor="password">Passord:</label>
                  <input className="login-password-input"
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="********"
                    required
                    onChange={updatePassword}
                    value={password} // lagt til value fordi i en updatePassord konstant så må du kunne ta imot et input i form av value
                    /> 
                    
                  <button className="login-button" type="submit">Logg inn</button>
                  
                </fieldset>
            </form>
              <hr />
                <h2 className="login_h2">Har du ingen konto?</h2>
                  <a href="/CreateNewUser"className="register-button">Registrer deg her</a>
        </section>
    )
  }
