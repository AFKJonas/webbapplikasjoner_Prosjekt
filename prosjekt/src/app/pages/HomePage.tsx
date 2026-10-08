import {GamesList} from "@/app/components/GamesList"; // importert Games
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export function HomePage() {
    return (
        <>
        <header>
            <a className="MenuLayout" href="#"><FontAwesomeIcon className="faIcon" icon={faBars} /></a>
            <a className="HomeLayout" href="/"> Hjem</a>
            <a className="ProfileLayout" href="#"><FontAwesomeIcon className="faIcon" icon={faUser} /></a>
        </header>
        <main>
            {/*// Viser GamesList komponent med steamid som prop*/}
            <GamesList steamId="76561198351280476" /> 
        </main>
        <footer>
            <p>Lagd av Marius, Mohammed og Jonas</p>
        </footer>
        </>
    )
}