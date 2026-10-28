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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, user }: { children: ReactNode; user: AuthUser | null }) {
  const logout = async () => {
    await authClient.signOut(); // sletter session og cookie
    window.location.href = "/Login";
  };

  return (
    <AuthContext
      value={{ user, isAuthenticated: !!user, isAdmin: user?.role === "admin", logout }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth må brukes inni en AuthProvider");
  return context;
}