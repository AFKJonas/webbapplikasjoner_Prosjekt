import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        steamId: { type: "string" },
        role: { type: "string", required: false },
      },
    }),
  ],
});