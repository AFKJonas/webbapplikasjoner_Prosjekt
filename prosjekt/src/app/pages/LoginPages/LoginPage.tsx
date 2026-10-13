import CreateNewUser from "./CreateNewUser";
import { LoginComponent } from "../../components/Login/LoginComponent";
import { loginUser } from "@/app/components/Login/action";
export function LoginPage() {
    return (
      <main className="login-page">
        <section className="login-form">   
            <h1>Velkommen!</h1>
            <LoginComponent onSubmit={loginUser} />
        </section>
      </main>
    );
}