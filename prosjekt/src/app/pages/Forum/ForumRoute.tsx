import { getAllPosts } from "@/repositories/postRepository";
import { ForumPage } from "./ForumPage";

export async function ForumRoute() {
  const posts = await getAllPosts();
  return <ForumPage initialPosts={posts} />;
}