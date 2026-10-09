import CreateNewUser from "./CreateNewUser";
export function LoginPage() {
    return (
      <main className="login-page">
        <section className="login-form">   
            <h1>Velkommen!</h1>
            <form>
                <fieldset className="login-fieldset">
                  <legend className="login-legend" >Logg inn med e-post og passord</legend>
                  <label htmlFor="email">E-post:</label>
                  <input className="login-epost-input"
                    type="email" 
                    id="email" 
                    name="email"  
                    placeholder="example@gmail.com" 
                    maxLength={254}
                    required />

                  <label htmlFor="password">Passord:</label>
                  <input className="login-password-input"
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="********"
                    required />    
                    
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
      </main>
    );
}