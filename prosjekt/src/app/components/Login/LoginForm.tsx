"use client";

import { LoginComponent } from "./LoginComponent";
import { authClient } from "@/auth/auth-client";

export function LoginForm() {
//Denne komponenten viser et skjema for innlogging, og håndterer innsending av e-post og passord til authClient.signIn.email.
  return (
    <LoginComponent
      onSubmit={async ({ email, password }) => {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) {
          window.alert(error.message ?? "Feil e-post eller passord");
          return;
        }
        window.location.href = "/"; // full reload, så serveren ser cookien
      }}
    />
  );
}