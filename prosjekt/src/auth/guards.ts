import type { RequestInfo } from "rwsdk/worker";

const redirectToLogin = () =>
  new Response(null, { status: 302, headers: { Location: "/Login" } }); // const som Redirecter til login-siden hvis brukeren ikke er logget inn

const forbidden = (message: string) =>
  new Response(JSON.stringify({ error: { code: "FORBIDDEN", message } }), { // const som returnerer en 403 Forbidden respons hvis brukeren ikke har tilstrekkelige rettigheter
    status: 403,
    headers: { "Content-Type": "application/json" },
  });


export function requireAuth() { // Funksjon som krever at brukeren er logget inn for å få tilgang til en rute
  return ({ ctx }: RequestInfo): Response | void => {
    if (!ctx.user) return redirectToLogin();
  };
}

// Kun admin
export function requireAdmin() { // Funksjon som krever at brukeren er logget inn og har admin-rettigheter for å få tilgang til en rute
  return ({ ctx }: RequestInfo): Response | void => {
    if (!ctx.user) return redirectToLogin();
    if (ctx.user.role !== "admin") return forbidden("Utilstrekkelige rettigheter");
  };
}