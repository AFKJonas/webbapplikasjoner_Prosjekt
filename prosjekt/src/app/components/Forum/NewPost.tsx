"use client";

//importerer useState for å håndtere state
import { useState } from "react";


//definerer hvilke funksjoner NewpPost skal motta som props
type NewPostProps = {
  onCreatePost: (title: string, description: string) => void;
  onCancel: () => void;
};


//komponent som viser skjemaet for å opprette en ny post
export function NewPost({ onCreatePost, onCancel }: NewPostProps) {
  //lagrer tittelen og beskrivelsen som brukeren skriver inn
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  //håndterer innsending av skjemaet
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //fjerner unødvendig mellomrom fra teksten
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    //sjekker at både tittel og beskrivelse er fylt ut
    if (!trimmedTitle || !trimmedDescription) {
      return;
    }

    //tømmer feltene etter at posten er sendt inn
    onCreatePost(trimmedTitle, trimmedDescription);
    setTitle("");
    setDescription("");
  }

  return (
    //seksjonen som inneholder skjemaet for å opprette en post
    <section className="new-post-form">
      <h2>Opprett ny post</h2>

      {/*skjema som håndterer opprettelsen av en post */}
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

        {/*knapper for å publisere posten eller avbryte */}
        <section className="new-post-form-actions">
          <button type="submit">Publiser post</button>
          <button type="button" onClick={onCancel}>
            Avbryt
          </button>
        </section>
      </form>
    </section>
  );
}
