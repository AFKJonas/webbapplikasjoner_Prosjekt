import CreateNewUser from "./CreateNewUser";
import { LoginComponent } from "../../components/Login/LoginComponent";
import { getUser } from "@/lib/users";
export function LoginPage() {
    return (
      <main className="login-page">
        <section className="login-form">   
            <h1>Velkommen!</h1>
            <LoginComponent onSubmit={getUser} />
        </section>
      </main>
    );
}