import { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Comment, User } from "@prisma/client";

type ExtendedComment = Comment & {
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({ comment, postId }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.name}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
    </div>
  );
};

export default PostComment;
