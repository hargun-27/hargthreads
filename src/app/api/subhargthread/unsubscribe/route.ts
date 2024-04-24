import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubhargthreadSubscriptionValidator } from "@/lib/validators/subhargthread";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { subhargthreadId } = SubhargthreadSubscriptionValidator.parse(body);

    //CHECK IF OWNER IS DELETING THE THREAD
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subhargthreadId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response(
        "You're not subscribed to this hargthread.",
        {
          status: 400,
        }
      );
    }

    // create subreddit and associate it with the user
    await db.subscription.delete({
      where: {
        userId_subhargthreadId: {
          subhargthreadId,
          userId: session.user.id,
        },
      },
    });

    return new Response(subhargthreadId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not unsubscribe from subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
