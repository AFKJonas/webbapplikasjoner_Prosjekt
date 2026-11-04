import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { posts, users } from "@/db/schema/schema";
import type { Post } from "@/app/types/post.types";

const columns = {
  id: posts.id,
  title: posts.title,
  description: posts.description,
  authorId: posts.authorId,
  author: users.username,
  createdAt: posts.createdAt,
};

type Row = { id: string; title: string; description: string; authorId: string; author: string; createdAt: Date };

// Gjør databaseraden om til samme Post-type som resten av appen bruker.
// Likes er fortsatt hardkodet.
const toPost = (row: Row): Post => ({
  ...row,
  createdAt: row.createdAt.toISOString().split("T")[0],
  thumbsUp: 0,
  thumbsDown: 0,
});

export async function getAllPosts(): Promise<Post[]> { // Henter alle poster fra databasen, sortert etter opprettelsesdato (nyeste først)
  const rows = await db.select(columns).from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
  return rows.map(toPost);
}

export async function getPostById(id: string): Promise<Post | null> { // Henter en post fra databasen basert på id, returnerer null hvis posten ikke finnes
  const [row] = await db.select(columns).from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.id, id));
  return row ? toPost(row) : null;
}

export async function insertPost(title: string, description: string, authorId: string): Promise<Post> { // Setter inn en ny post i databasen og returnerer den nye posten
  const [row] = await db.insert(posts).values({ title, description, authorId }).returning({ id: posts.id });
  return (await getPostById(row.id))!;
}

export async function deletePostById(id: string) { // Sletter en post fra databasen basert på id
  await db.delete(posts).where(eq(posts.id, id));
}

export async function updatePostById( // Oppdaterer en post i databasen basert på id, og returnerer den oppdaterte posten
  id: string,
  title: string,
  description: string
) {
  await db.update(posts).set({title,description,}).where(eq(posts.id, id)); // Oppdaterer posten i databasen med de nye verdiene

  return getPostById(id);
}