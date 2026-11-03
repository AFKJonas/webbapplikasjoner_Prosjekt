import type { Vote } from "@/app/types/post.types";

type VoteState = {
  likes: number;
  dislikes: number;
  vote: Vote;
};

export function updateVote(
  state: VoteState,
  newVote: "like" | "dislike"
): VoteState {
  const nextState = { ...state };

  if (state.vote === newVote) {
    if (newVote === "like") {
      nextState.likes--;
    } else {
      nextState.dislikes--;
    }

    nextState.vote = null;
    return nextState;
  }

  if (state.vote === "like") {
    nextState.likes--;
  }

  if (state.vote === "dislike") {
    nextState.dislikes--;
  }

  if (newVote === "like") {
    nextState.likes++;
  } else {
    nextState.dislikes++;
  }

  nextState.vote = newVote;

  return nextState;
}