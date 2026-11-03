import { db } from "@/db";
import { users } from "@/db/schema/schema";
import { AppLayout } from "@/app/components/Layout/AppLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function AdminPage() {
  const all = await db
    .select({ id: users.id, username: users.username, email: users.email, role: users.role })
    .from(users);

  return (
    <AppLayout>
      <main className="profile-page">
          <a href="/" className="back-button">
              {<FontAwesomeIcon icon={faArrowLeft} />} Tilbake til hjem
          </a>
        <h1 >Admin</h1>
        <ul className="admin-list" aria-label="Liste over alle brukere">
          {all.map((u) => (
            <li key={u.id}>{u.username} ({u.email}) – {u.role}</li>
          ))}
        </ul>
      </main>
    </AppLayout>
  );
}