import { FC, useRef } from "react";
import { Post, User, Vote } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import EditorOutput from "./EditorOutput";

interface PostProps {
  subhargthreadName: string;
  post: Post & {
    author: User
    votes: Vote[]
  }
  commentAmt: number
}

const Post: FC<PostProps> = ({ subhargthreadName, post, commentAmt }) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-grey-500">
            {subhargthreadName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/hargmunity/${subhargthreadName}`}
                >
                  hargmunity/{subhargthreadName}
                </a>
                <span className="px-1">-</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span> -{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/hargmunity/${subhargthreadName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-grey-900">
              {post.title}
            </h1>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content}  />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-grey-50 z-20 text-sm p-4 sm:px-6">
        <a href={`/hargmunity/${subhargthreadName}/post/${post.id}`} className="w-fit flex items-center gap-2">
          <MessageSquare className='h-4 w-4'/> {commentAmt} comments
        </a>
      </div>
    </div>
  );
};

export default Post;
