"use client";

import { useState } from "react";
import {faThumbsUp, faThumbsDown,faPen,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importerer server action for å slette og oppdatere innlegg
import { deletePostAction, updatePostAction, } from "@/app/actions/postActions";


//definerer hvilke props komponenten skal motta
type PostVotesProps = {
  postId: string;      
  canDelete: boolean;
  initialLikes: number;
  initialDislikes: number;
  initialTitle: string;
  initialDescription: string;
};

//komponent som håndterer stemmer, redigering og sletting av innlegg
export function PostVotes({ postId, canDelete,initialLikes,initialDislikes,initialTitle,initialDescription,}: PostVotesProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  //håndterer når brukeren liker et innlegg
  function handleLike() {
    //fjerner stemmen hvis brukeren allerede har likt innlegget
    if (vote === "like") {
      setLikes((current) => current - 1);
      setVote(null);
    } else {
      //fjerner eventuell dislike før like registreres
      if (vote === "dislike") {
        setDislikes((current) => current - 1);
      }

      setLikes((current) => current + 1);
      setVote("like");
    }
  }

  //håndterer når brukeren ikke liker et innlegg
  function handleDislike() {
    //fjerner stemmen hvis brukeren allerede har valgt dislike
    if (vote === "dislike") {
      setDislikes((current) => current - 1);
      setVote(null);
    } else {
      //gjerner eventuell like før dislike registreres
      if (vote === "like") {
        setLikes((current) => current - 1);
      }

      setDislikes((current) => current + 1);
      setVote("dislike");
    }
  }

    //håndterer sletting av innlegget
    async function handleDelete() {
    try {
      //kaller server action for å slette innlegget
      await deletePostAction(postId);
      //sender brukeren tilbake til forumet etter sletting
      window.location.href = "/forum";
    } catch {
      //viser feilmelding hvis sletting ikke lykkes
      window.alert("Du har ikke tilgang til å slette denne posten");
    }
  }


  //håndterer oppdatering av innlegget
  async function handleUpdate(event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0]) {
    event.preventDefault();
  
    try {
      //sender de oppdaterte verdiene til server action
      await updatePostAction(postId, title.trim(), description.trim());
      //laster siden på nytt for å vise de oppdaterte verdiene
      window.location.reload();
    } catch {
      //viser feilmelding hvis oppdatering ikke lykkes
      window.alert("Kunne ikke oppdatere innlegget");
    }
  }

  return (
    <>
      {/*viser knapper for likes, dislikes, redigering og sletting */}
      <footer className="post-actions">
        <button type="button" onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{likes}</span>
        </button>
  
        <button type="button" onClick={handleDislike}>
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{dislikes}</span>
        </button>
  
        {/*viser redigerings- og sletteknappene hvis brukeren har tilgang */}
        {canDelete && (
          <>
            <button type="button" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={faPen} />
              Rediger innlegg
            </button>
  
            <button type="button" onClick={handleDelete}>
              Slett post
            </button>
          </>
        )}
      </footer>
  

      {/*viser redigeringsskjemaet når showEdit er true */}
      {showEdit && (
        <section className="edit-post-form">
          <h2>Rediger innlegg</h2>
  
          <form onSubmit={handleUpdate}>
            <label htmlFor="edit-title">Tittel</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
  
            <label htmlFor="edit-description">Beskrivelse</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />

            {/*knapper for å lagre endringene eller avbryte redigeringen */}
            <section className="edit-post-actions">
            <button type="submit">Lagre endringer</button>

            <button type="button" onClick={() => setShowEdit(false)}>
              Avbryt
            </button>
          </section>
          </form>
        </section>
      )}
    </>
  );
}
