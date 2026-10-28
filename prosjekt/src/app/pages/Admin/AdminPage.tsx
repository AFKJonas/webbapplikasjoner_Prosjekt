import { db } from "@/db";
import { users } from "@/db/schema/schema";
import { AppLayout } from "@/app/components/Layout/AppLayout";

export async function AdminPage() {
  const all = await db
    .select({ id: users.id, username: users.username, email: users.email, role: users.role })
    .from(users);

  return (
    <AppLayout>
      <main>
        <h1>Admin</h1>
        <ul>
          {all.map((u) => (
            <li key={u.id}>{u.username} ({u.email}) – {u.role}</li>
          ))}
        </ul>
      </main>
    </AppLayout>
  );
}