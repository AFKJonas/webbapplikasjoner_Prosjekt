import { describe, it, expect } from "vitest";
import { eq } from "drizzle-orm";

import { auth } from "@/auth/auth";
import { db } from "@/db";
import { users } from "@/db/schema/schema";

describe("User registration integration test", () => {
  it("should register a user and save them in the database", async () => {
    const email = `test-${crypto.randomUUID()}@example.com`;
    const steamId = `steam-${crypto.randomUUID()}`;

    const response = await auth.handler(
      new Request("http://localhost/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Integration Test",
          email,
          password: "TestPassword123!",
          steamId,
          role: "user",
        }),
      })
    );

    expect(response.status).toBe(200);

    const [createdUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(email);
    expect(createdUser.steamId).toBe(steamId);
  });
});