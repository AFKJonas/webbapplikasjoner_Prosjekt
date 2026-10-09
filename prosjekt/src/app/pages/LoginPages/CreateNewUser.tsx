export default function CreateNewUser() {
    return (
        <main className="new-user-registration">
            <section>
                <h1>Opprett ny bruker</h1>
                <form>
                    <fieldset>
                        <legend>Fyll ut skjemaet nedenfor for å opprette en ny bruker:</legend>
                        <label htmlFor="username">Brukernavn:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            maxLength={20} />

                        <label htmlFor="steamid">Steam-ID(17-sifret):</label>
                        <input 
                            type="text" 
                            id="steamid" 
                            name="steamid" 
                            inputMode="numeric" 
                            placeholder="12345678910121314" 
                            maxLength={17} 
                            minLength={17} 
                            pattern="[0-9]{17}" 
                            required />

                        <label htmlFor="email">E-post:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            placeholder="example@gmail.com" 
                            maxLength={254}/>
                        
                        <label htmlFor="password">Passord:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required />
                    </fieldset>
                    <button type="submit">Registrer deg</button>
                </form>
            </section>
        </main>
    );
}