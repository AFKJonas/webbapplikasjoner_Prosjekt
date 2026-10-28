"use client";

import { NewUserComponent } from "./NewUserComponent";
import { authClient } from "@/auth/auth-client";

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