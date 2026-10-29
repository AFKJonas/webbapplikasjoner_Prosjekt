import { getPostById } from "@/repositories/postRepository";
import type { RequestInfo } from "rwsdk/worker";
import { Comments } from "@/app/components/Forum/Comments";
import { PostVotes } from "@/app/components/Forum/PostVotes";


export async function PostPage({ request, ctx }: RequestInfo) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("id");
  const post = postId ? await getPostById(postId) : null;

  
    

  if (!post) {
    return (
      <main className="post-page">
        <h1>Posten ble ikke funnet</h1>
        <a href="/forum" className="back-button">
          ← Tilbake til forum
        </a>
      </main>
    );
  }

  return (
    <main className="post-page">
      <nav aria-label="Brødsmulesti">
        <a href="/forum" className="back-button">
          ← Tilbake til forum
        </a>
      </nav>

      <article className="post">
        <header>
        <h1>{post.title}</h1>

        <p className="post-author">
          Skrevet av {post.author}
        </p>
        </header>

        <section className="post-content" aria-label="Innleggets innhold">
          <p>{post.description}</p>
        </section>

        
        <PostVotes
        postId={post.id}
        canDelete={ctx.user?.role === "admin" || ctx.user?.id === post.authorId}
        initialLikes={post.thumbsUp}
        initialDislikes={post.thumbsDown}
      />

      </article>

      <Comments />
    </main>
  );
}
