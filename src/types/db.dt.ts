import type { Post, Subhargthread, User, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  subhargthread: Subhargthread;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
