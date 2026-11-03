import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthNav } from "./AuthNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // Funksjon som lager en layout over hvordan header og footer skal se ut på siden
    <>
      <header className="AppLayoutHeader">
        <a className="MenuLayout">
          <FontAwesomeIcon className="faIcon" icon={faBars} />
        </a>
        <a className="HomeLayout" href="/">Hjem</a>
        <section className="ProfileLayout">
          <a  className="ProfileIcon" href="/Profile">
            <FontAwesomeIcon className="faIcon" icon={faUser} />
          </a>
          <AuthNav/>
        </section>
      </header>

      {children}

      <footer className="AppLayoutFooter">
        <p>Lagd av Marius, Mohammed og Jonas</p>
      </footer>
    </>
  );
}