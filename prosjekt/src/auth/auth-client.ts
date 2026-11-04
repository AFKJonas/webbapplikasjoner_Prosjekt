import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({ // Lager en authClient som kan brukes til å håndtere autentisering i appen
  plugins: [
    inferAdditionalFields({
      user: {
        steamId: { type: "string" }, // Legger til steamId som et felt i user-objektet
        role: { type: "string", required: false }, // Legger til role som et felt i user-objektet, men at det ikke er påkrevd
      },
    }),
  ],
});