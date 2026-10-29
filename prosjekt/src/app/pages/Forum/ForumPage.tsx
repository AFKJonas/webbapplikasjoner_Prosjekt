"use client";


import {faThumbsUp, faThumbsDown, faComment,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPostAction } from "@/app/actions/postActions";
import { useState } from "react";
import type { Post } from "@/app/types/post.types";
import { NewPost } from "@/app/components/Forum/NewPost";



export function ForumPage({ initialPosts }: { initialPosts: Post[] }) {
  const [forumPosts, setForumPosts] = useState<Post[]>(initialPosts);
  const [showNewPost, setShowNewPost] = useState(false);

  async function handleCreatePost(title: string, description: string) {
    try {
      const newPost = await createPostAction(title, description);
      setForumPosts((currentPosts) => [newPost, ...currentPosts]);
      setShowNewPost(false);
    } catch {
      window.alert("Kunne ikke opprette posten");
    }
  }



  return (
    <main className="forum-page">
      <header className="forum-header">
        <h1>Mine Forums</h1>
        <p>Her ligger dine posts.</p>
      </header>

      <section className="post-list" aria-label="Foruminnlegg">
        {forumPosts.map((post) => (
          <article className="post-card" key={post.id}>
            <header>
              <h2>
                <a href={`/post?id=${post.id}`}>{post.title}</a>
              </h2>
              <p>
                Skrevet av {post.author} ·{" "}
                <time dateTime={post.createdAt}>{post.createdAt}</time>
              </p>
            </header>

            <p>{post.description}</p>

            <footer>
              <p>
                <FontAwesomeIcon icon={faThumbsUp} className="faIcon" aria-hidden="true"/>{" "}
                <span>{post.thumbsUp}</span>
                
                <FontAwesomeIcon icon={faThumbsDown} className="faIcon" aria-hidden="true"/>{" "}
                <span>{post.thumbsDown}</span>
                
                <FontAwesomeIcon icon={faComment} className="faIcon" aria-hidden="true"/>{" "}
                <span>0 kommentarer</span>
              </p>
            </footer>
          </article>
        ))}
      </section>

      
      
      {showNewPost && (
        <section
          className="modal-overlay"
          onClick={() => setShowNewPost(false)}
        >
          <section
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <NewPost
              onCreatePost={handleCreatePost}
              onCancel={() => setShowNewPost(false)}
            />
          </section>
        </section>
      )}

      <button
        className="new-post-button"
        type="button"
        onClick={() => setShowNewPost(true)}
      >
        + Ny post
      </button>


    </main>
  );
}
