"use client";


import {faThumbsUp, faThumbsDown, faComment,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { posts } from "../posts.data";
import { useState } from "react";
import type { Post } from "../post.types";
import { NewPost } from "../components/Games/NewPost";



export function ForumPage() {

  const [forumPosts, setForumPosts] = useState<Post[]>(posts);
  const [showNewPost, setShowNewPost] = useState(false);

  function handleCreatePost(title: string, description: string) {
    const newPost: Post = {
      id: crypto.randomUUID(),
      title,
      description,
      author: "Mohammed",
      createdAt: new Date().toISOString().split("T")[0],
      thumbsUp: 0,
      thumbsDown: 0,
    };
  
    setForumPosts((currentPosts) => [newPost, ...currentPosts]);
    setShowNewPost(false);
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
        <div
          className="modal-overlay"
          onClick={() => setShowNewPost(false)}
        >
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <NewPost
              onCreatePost={handleCreatePost}
              onCancel={() => setShowNewPost(false)}
            />
          </div>
        </div>
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
