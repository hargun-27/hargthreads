import { db } from "@/lib/db";
import PostFeed from "./PostFeed";

const CustomFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subhargthread: true,
    },
    take: 15,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
