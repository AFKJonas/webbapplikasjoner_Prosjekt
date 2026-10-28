"use client";

import { useState } from "react";

type NewPostProps = {
  onCreatePost: (title: string, description: string) => void;
  onCancel: () => void;
};

export function NewPost({ onCreatePost, onCancel }: NewPostProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      return;
    }

    onCreatePost(trimmedTitle, trimmedDescription);
    setTitle("");
    setDescription("");
  }

  return (
    <section className="new-post-form">
      <h2>Opprett ny post</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Tittel</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Skriv tittelen..."
          required
        />

        <label htmlFor="post-description">Beskrivelse</label>
        <textarea
          id="post-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Hva vil du diskutere?"
          required
        />

        <div className="new-post-form-actions">
          <button type="submit">Publiser post</button>
          <button type="button" onClick={onCancel}>
            Avbryt
          </button>
        </div>
      </form>
    </section>
  );
}
