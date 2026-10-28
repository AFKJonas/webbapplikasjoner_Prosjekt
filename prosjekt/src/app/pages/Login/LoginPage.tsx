import { LoginForm } from "../../components/Login/LoginForm";

export function LoginPage() {
    return (
      <main className="login-page">
        <section className="login-form">   
            <h1>Velkommen!</h1>
            <LoginForm />
        </section>
      </main>
    );
}