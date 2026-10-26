import type { Post } from "./post.types";

export const posts: Post[] = [
  {
    id: "1",
    title: "Hva synes dere om GTA 6?",
    description: "Hva tenker dere om det kommende spillet?",
    author: "Mohammed",
    createdAt: "2026-10-15",
    thumbsUp: 24,
    thumbsDown: 3,
  },
  {
    id: "2",
    title: "Beste spill dere har spilt?",
    description: "Del deres favorittspill!",
    author: "User123",
    createdAt: "2026-10-14",
    thumbsUp: 15,
    thumbsDown: 1,
  },
  {
    id: "3",
    title: "Hva spiller dere akkurat nå?",
    description: "Hvilke spill spiller dere for tiden?",
    author: "User456",
    createdAt: "2026-10-13",
    thumbsUp: 9,
    thumbsDown: 2,
  },
];
