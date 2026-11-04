"use server";

import { requestInfo } from "rwsdk/worker";
import { insertPost, getPostById, deletePostById, updatePostById, } from "@/repositories/postRepository";



function requireUser() { // Funksjon som krever at brukeren er logget inn for å utføre en handling, kaster en feil hvis brukeren ikke er logget inn
  const user = requestInfo.ctx.user;
  if (!user) throw new Error("Du må være innlogget");
  return user;
}

export async function createPostAction(title: string, description: string) { // actions ved opprettelse av post, sjekker at brukeren er innlogget og at tittel og beskrivelse ikke er tomme
  const user = requireUser();

  if (!title.trim() || !description.trim()) {
    throw new Error("Tittel og beskrivelse må fylles ut");
  }

  return insertPost(title.trim(), description.trim(), user.id);
}


export async function deletePostAction(postId: string) { // actions ved sletting av post, sjekker at brukeren er innlogget og at brukeren har tilgang til å slette posten (enten admin eller forfatter)
  const user = requireUser();
  const post = await getPostById(postId);

  if (!post) throw new Error("Posten finnes ikke");
  if (user.role !== "admin" && user.id !== post.authorId) {
    throw new Error("Du har ikke tilgang til å slette denne posten");
  }

  await deletePostById(postId);
}


export async function updatePostAction( // actions ved oppdatering av post, sjekker at brukeren er innlogget og at brukeren har tilgang til å redigere posten (enten admin eller forfatter)
  postId: string,
  title: string,
  description: string
) {
  const user = requireUser();
  const post = await getPostById(postId);

  if (!post) {
    throw new Error("Posten finnes ikke");
  }

  if (user.role !== "admin" && user.id !== post.authorId) {
    throw new Error("Du har ikke tilgang til å redigere denne posten");
  }

  if (!title.trim() || !description.trim()) {
    throw new Error("Tittel og beskrivelse må fylles ut");
  }

  return updatePostById(postId, title.trim(), description.trim());
}