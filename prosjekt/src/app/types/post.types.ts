export type Post = {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
    thumbsUp: number;
    thumbsDown: number;
  };
  
  export type Vote = "like" | "dislike" | null;
  