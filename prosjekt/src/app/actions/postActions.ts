"use server";

import { requestInfo } from "rwsdk/worker";
import { insertPost, getPostById, deletePostById } from "@/repositories/postRepository";

// Autorisasjonssjekken skjer her på serveren, ikke i nettleseren
function requireUser() {
  const user = requestInfo.ctx.user;
  if (!user) throw new Error("Du må være innlogget");
  return user;
}

// Opprett: må være innlogget
export async function createPostAction(title: string, description: string) {
  const user = requireUser();

  if (!title.trim() || !description.trim()) {
    throw new Error("Tittel og beskrivelse må fylles ut");
  }

  return insertPost(title.trim(), description.trim(), user.id);
}

// Slett: må være forfatteren eller admin
export async function deletePostAction(postId: string) {
  const user = requireUser();
  const post = await getPostById(postId);

  if (!post) throw new Error("Posten finnes ikke");
  if (user.role !== "admin" && user.id !== post.authorId) {
    throw new Error("Du har ikke tilgang til å slette denne posten");
  }

  await deletePostById(postId);
}