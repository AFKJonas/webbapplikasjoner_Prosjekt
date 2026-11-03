import { describe, it, expect } from "vitest";
import { requireAuth, requireAdmin } from "@/auth/guards";

const lagRequest = (user: { role: string } | null) => ({ ctx: { user } }) as any;

describe("guards", () => {
  it("requireAuth sender ikke-innlogget bruker til /Login", () => {
    const response = requireAuth()(lagRequest(null)) as Response;

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/Login");
  });

  it("requireAdmin gir 403 til vanlig bruker", () => {
    const response = requireAdmin()(lagRequest({ role: "user" })) as Response;

    expect(response.status).toBe(403);
  });

  it("requireAdmin slipper gjennom admin", () => {
    const response = requireAdmin()(lagRequest({ role: "admin" }));

    expect(response).toBeUndefined();
  });
});