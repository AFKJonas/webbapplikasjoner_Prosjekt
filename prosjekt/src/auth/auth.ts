import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { users, sessions, accounts } from "@/db/schema/schema";

if (!env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET er ikke satt i .dev.vars");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user: users, session: sessions, account: accounts },
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  advanced: { database: { validateSchema: false } }, 

  user: {
    fields: { name: "username" }, // better-auth "name" lagres i kolonnen username
    additionalFields: {
      steamId: { type: "string", required: true },
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
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

export type Session = typeof auth.$Infer.Session;