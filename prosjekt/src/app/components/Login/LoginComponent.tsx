"use client"

import { useState} from "react"

     type LoginInformation = {
        email: string;
        password: string;
    }

    export interface LoginInformationProps {
        onSubmit: (Loginprops: LoginInformation) => void;
    }


export function LoginComponent ({onSubmit}: LoginInformationProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState ("")



    // Lag en const som updateEmail og oppdaterer email basert på et event, sett input som et event.target som et HTMLInputElement 
    // videre inni const en if statement som sjekker om input er tomt og hvis tomt: setemail (staten) til (input.value)
      


    //Gjør det samme her med å lage en updatePassord og oppdater passord basert på et event, og sett det som skjer (event) som en variabel input og ta imot et event.target
    // Gjør en if sjekk som sjekker om passord er tomt, hvis tomt, setpassword lik hva som blir skrevet inn

    // Når du har gjort dette så har du to konstanter som oppdaterer og lagrer i en state basert på input




    // tilslutt så kan det være lurt å lage en konstant som resetter verdiene lagret i state når en bruker vil gjør det på nytt.
    // kall denne f.eks. handleForm og sjekk om email og passord ikke er tomme hvis ikke tomme, send de inn. deretter reset staten med
    // setemail ("")
    // setpassword("") 

    



    
    return (
        <section>
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
              <a href="/XXXXXXXXXXXXXXXXXXX" className="login-a">Glemt passord?</a>
                <h2 className="login_h2">Har du ingen konto?</h2>
                <button className="register-button">
                  <a href="/CreateNewUser"className="login-b">Registrer deg her</a>
                </button>
        </section>
    )
  }
