import { describe, it, expect } from "vitest";
import { updateVote } from "./vote.utils";

describe("updateVote", () => {
  it("should increase likes when user likes a post", () => {
    const result = updateVote(
      { likes: 5, dislikes: 2, vote: null },
      "like"
    );

    expect(result).toEqual({
      likes: 6,
      dislikes: 2,
      vote: "like",
    });
  });

  it("should remove like when user clicks like again", () => {
    const result = updateVote(
      { likes: 5, dislikes: 2, vote: "like" },
      "like"
    );

    expect(result).toEqual({
      likes: 4,
      dislikes: 2,
      vote: null,
    });
  });

  it("should switch from like to dislike", () => {
    const result = updateVote(
      { likes: 5, dislikes: 2, vote: "like" },
      "dislike"
    );

    expect(result).toEqual({
      likes: 4,
      dislikes: 3,
      vote: "dislike",
    });
  });
});