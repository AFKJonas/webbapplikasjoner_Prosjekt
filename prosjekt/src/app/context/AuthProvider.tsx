"use client";

import { createContext, use, type ReactNode } from "react";
import { authClient } from "@/auth/auth-client";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  steamId: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null); // Lager en kontekst for autentisering som kan brukes i hele appen

export function AuthProvider({ children, user }: { children: ReactNode; user: AuthUser | null }) {
  const logout = async () => {
    await authClient.signOut(); // sletter session og cookie 
    window.location.href = "/Login";
  };

  return (
    <AuthContext
      value={{ user, isAuthenticated: !!user, isAdmin: user?.role === "admin", logout }} // Sender inn verdier til konteksten som kan brukes i hele appen
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() { // en hook som gjør det enkelt å bruke autentisering i komponenter
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth må brukes inni en AuthProvider");
  return context;
}