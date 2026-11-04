"use client";

//importerer useState for å håndtere state i komponenten 
import { useState } from "react";


//definerer strukturen til en kommentar
type Comment = {
  id: number;
  author: string;
  text: string;
};


//komponent som viser og håndterer kommentarer
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


  //lagrer teksten brukeren skriver i kommentarfeltet
  const [newComment, setNewComment] = useState("");


  //håndterer innsending av en ny kommentar
  function handleComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    //sjekker at kommentaren ikke er tom
    if (!newComment.trim()) {
      return;
    }


    //oppretter en ny kommentar
    const comment: Comment = {
      id: Date.now(),
      author: "Mohammed",
      text: newComment.trim(),
    };


    //legger den nye kommentaren til listen
    setComments((current) => [...current, comment]);
    //tømmer kommentarfeltet etter innsending
    setNewComment("");
  }

  return (
    //seksjon som inneholder kommentarene og kommentarfeltet
    <section className="comments" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Kommentarer</h2>

      {/* viser alle kommentarene i listen */}
      {comments.map((comment) => (
        <article className="comment" key={comment.id}>
          <header>
            <p>{comment.author}</p>
          </header>
          <p>{comment.text}</p>
        </article>
      ))}


        {/*skjema for å skrive inn en kommentar */}
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
