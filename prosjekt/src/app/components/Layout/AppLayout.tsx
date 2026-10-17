// src/app/components/Layout/AppLayout.tsx
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return ( 
    // Funksjon som lager en layout over hvordan header og footer skal se ut på siden
    <>
      <header>
        <a className="MenuLayout" >
          <FontAwesomeIcon className="faIcon" icon={faBars} />
        </a>
        <a className="HomeLayout" href="/">Hjem</a>
        <a className="ProfileLayout" href="/Profile">
          <FontAwesomeIcon className="faIcon" icon={faUser} />
        </a>
      </header>

      {children}

      <footer>
        <p>Lagd av Marius, Mohammed og Jonas</p>
      </footer>
    </>
  );
}