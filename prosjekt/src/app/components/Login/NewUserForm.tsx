"use client";

import { NewUserComponent } from "./NewUserComponent";
import { authClient } from "@/auth/auth-client";

//Denne komponenten viser et skjema for å opprette en ny bruker, og 
//håndterer innsending av brukernavn, Steam-ID, e-post, passord og rolle til authClient.signUp.email.
export function NewUserForm() {
  return (
    <NewUserComponent
      onSubmit={async ({ username, steamId, email, password, role }) => {
        const { error } = await authClient.signUp.email({
          name: username,
          email,
          password,
          steamId,
          role,
        });
        if (error) {
          window.alert(error.message ?? "Kunne ikke opprette bruker");
          return;
        }
        window.location.href = "/"; // autoSignIn er på
      }}
    />
  );
}