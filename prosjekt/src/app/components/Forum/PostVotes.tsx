"use client";

import { useState } from "react";
import {faThumbsUp, faThumbsDown,faPen,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePostAction, updatePostAction, } from "@/app/actions/postActions";

type PostVotesProps = {
  postId: string;      
  canDelete: boolean;
  initialLikes: number;
  initialDislikes: number;
  initialTitle: string;
  initialDescription: string;
};

export function PostVotes({ postId, canDelete,initialLikes,initialDislikes,initialTitle,initialDescription,}: PostVotesProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  function handleLike() {
    if (vote === "like") {
      setLikes((current) => current - 1);
      setVote(null);
    } else {
      if (vote === "dislike") {
        setDislikes((current) => current - 1);
      }

      setLikes((current) => current + 1);
      setVote("like");
    }
  }

  function handleDislike() {
    if (vote === "dislike") {
      setDislikes((current) => current - 1);
      setVote(null);
    } else {
      if (vote === "like") {
        setLikes((current) => current - 1);
      }

      setDislikes((current) => current + 1);
      setVote("dislike");
    }
  }

    async function handleDelete() {
    try {
      await deletePostAction(postId);
      window.location.href = "/forum";
    } catch {
      window.alert("Du har ikke tilgang til å slette denne posten");
    }
  }

  async function handleUpdate(event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0]) {
    event.preventDefault();
  
    try {
      await updatePostAction(postId, title.trim(), description.trim());
      window.location.reload();
    } catch {
      window.alert("Kunne ikke oppdatere innlegget");
    }
  }

  return (
    <>
      <footer className="post-actions">
        <button type="button" onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{likes}</span>
        </button>
  
        <button type="button" onClick={handleDislike}>
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{dislikes}</span>
        </button>
  
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
