import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  let followedCommunitiesIds: string[] = []

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        subhargthread: true
      },
    });

    followedCommunitiesIds = followedCommunities.map(
      (sub) => sub.subhargthread.id
    );
  }

  try {
    const { limit, page, subhargthreadName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subhargthreadName: z.string().nullish().optional(),
      })
      .parse({
        subhargthreadName: url.searchParams.get("subhargthreadName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    if (subhargthreadName) {
      whereClause = {
        subhargthread: {
          name: subhargthreadName,
        },
      };
    } else if (session) {
      whereClause = {
        subhargthread: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subhargthread: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
