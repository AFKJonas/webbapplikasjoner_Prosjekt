import type { RequestInfo } from "rwsdk/worker";
import { AuthProvider, type AuthUser } from "@/app/context/AuthProvider";

export function AuthLayout({
  children,
  requestInfo,
}: {
  children?: React.ReactNode;
  requestInfo?: RequestInfo;
}) {
  const u = requestInfo?.ctx.user;
  const user: AuthUser | null = u
    ? {
        id: u.id,
        username: u.name,
        email: u.email,
        steamId: u.steamId,
        role: u.role === "admin" ? "admin" : "user",
      }
    : null;

  return <AuthProvider user={user}>{children}</AuthProvider>;
}