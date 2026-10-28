"use client";

import { LoginComponent } from "./LoginComponent";
import { authClient } from "@/auth/auth-client";

export function LoginForm() {
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