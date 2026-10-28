"use client";

import { useAuth } from "@/app/context/AuthProvider";

export function AuthNav() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  if (!isAuthenticated) return <a href="/Login">Logg inn</a>;
  return (
    <>
      {isAdmin && <a href="/admin">Admin</a>}
      <span>{user?.username}</span>
      <button type="button" onClick={logout}>Logg ut</button>
    </>
  );
}