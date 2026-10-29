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

export async function getAllPosts(): Promise<Post[]> {
  const rows = await db.select(columns).from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
  return rows.map(toPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const [row] = await db.select(columns).from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.id, id));
  return row ? toPost(row) : null;
}

export async function insertPost(title: string, description: string, authorId: string): Promise<Post> {
  const [row] = await db.insert(posts).values({ title, description, authorId }).returning({ id: posts.id });
  return (await getPostById(row.id))!;
}

export async function deletePostById(id: string) {
  await db.delete(posts).where(eq(posts.id, id));
}