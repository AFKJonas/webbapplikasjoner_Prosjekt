import CreateNewUser from "./CreateNewUser";
export function LoginPage() {
    return (
      <main className="login-page">
        <section>   
            <h1>Velommmen!</h1>
            <form>
                <fieldset>
                  <legend>Logg in med e-post og passord</legend>
                  <label htmlFor="email">E-post:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"  
                    placeholder="example@gmail.com" 
                    maxLength={254}
                    required/>

                  <label htmlFor="password">Passord:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required />
                </fieldset>
            <button type="submit">Logg inn</button>
            </form>
            </section>

              <a href="/XXXXXXXXXXXXXXXXXXX">Glemt passord?</a> /*Må nok byttes ut*/
            <section>
              
            <h2>Har ikke konto?
              <a href="/CreateNewUser">Opprett ny konto her</a>
            </h2>
        </section>
      </main>
    );
}