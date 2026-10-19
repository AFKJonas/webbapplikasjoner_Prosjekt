
"use client";

import { useState } from "react";

type Comment = {
  id: number;
  author: string;
  text: string;
};

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "User123",
      text: "Dette var en interessant post!",
    },
    {
      id: 2,
      author: "User456",
      text: "Jeg er helt enig.",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  function handleComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newComment.trim()) {
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: "Mohammed",
      text: newComment.trim(),
    };

    setComments((current) => [...current, comment]);
    setNewComment("");
  }

  return (
    <section className="comments" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Kommentarer</h2>

      {comments.map((comment) => (
        <article className="comment" key={comment.id}>
          <header>
            <p>{comment.author}</p>
          </header>
          <p>{comment.text}</p>
        </article>
      ))}

      <form onSubmit={handleComment}>
        <label htmlFor="comment-text">Skriv en kommentar</label>

        <textarea
          id="comment-text"
          className="comment-box"
          placeholder="Skriv en kommentar..."
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />

        <button className="comment-button" type="submit">
          Kommenter
        </button>
      </form>
    </section>
  );
}
