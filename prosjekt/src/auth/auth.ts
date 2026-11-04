import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { users, sessions, accounts} from "@/db/schema/schema";

if (!env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET er ikke satt i .dev.vars");
}

export const auth = betterAuth({ // koblingen mellom better-auth og drizzleAdapter som gjør at vi kan bruke better-auth med vår database
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user: users, session: sessions, account: accounts},
  }),
  baseURL: env.BETTER_AUTH_URL, // URLen til better-auth som er satt i .dev.vars
  secret: env.BETTER_AUTH_SECRET, // Hemmeligheten som brukes til å signere session cookies, som er satt i .dev.vars

  advanced: { database: { validateSchema: false } }, 

  user: {
    fields: { name: "username" }, // better-auth "name" lagres i kolonnen username
    additionalFields: {
      steamId: { type: "string", required: true},
      // input: true = midlertidlig
      role: { type: "string", required: false, defaultValue: "user", input: true },
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 120,
    requireEmailVerification: false,
    autoSignIn: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // Session utløper etter 7 dager
    updateAge: 60 * 60 * 24, // Session oppdateres etter 1 dag
  },
});

export type Session = typeof auth.$Infer.Session; // Type for session som brukes i appen