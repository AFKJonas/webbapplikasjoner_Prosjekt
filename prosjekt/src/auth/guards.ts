import type { RequestInfo } from "rwsdk/worker";

const redirectToLogin = () =>
  new Response(null, { status: 302, headers: { Location: "/Login" } });

const forbidden = (message: string) =>
  new Response(JSON.stringify({ error: { code: "FORBIDDEN", message } }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  });

// Alle innloggede (user og admin)
export function requireAuth() {
  return ({ ctx }: RequestInfo): Response | void => {
    if (!ctx.user) return redirectToLogin();
  };
}

// Kun admin
export function requireAdmin() {
  return ({ ctx }: RequestInfo): Response | void => {
    if (!ctx.user) return redirectToLogin();
    if (ctx.user.role !== "admin") return forbidden("Utilstrekkelige rettigheter");
  };
}