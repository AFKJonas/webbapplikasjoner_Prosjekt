"use client";

import { useState } from "react";
import {faThumbsUp, faThumbsDown,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePostAction } from "@/app/actions/postActions";

type PostVotesProps = {
  postId: string;      
  canDelete: boolean;
  initialLikes: number;
  initialDislikes: number;
};

export function PostVotes({ postId, canDelete,
  initialLikes,
  initialDislikes,
}: PostVotesProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);

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

  return (
    <footer className="post-actions">
      <button type="button" onClick={handleLike}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>{likes}</span>
      </button>

      <button type="button" onClick={handleDislike}>
        <FontAwesomeIcon icon={faThumbsDown} />
        <span>{dislikes}</span>
      </button>

      {canDelete && <button type="button" onClick={handleDelete}>Slett post</button>}
    </footer>
  );
}
