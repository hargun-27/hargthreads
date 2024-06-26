import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubhargthreadValidator } from "@/lib/validators/subhargthread";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubhargthreadValidator.parse(body)

    const subhardthreadExists = await db.subhargthread.findFirst({
      where: {
        name,
      },
    })

    if (subhardthreadExists) {
      return new Response('Hargthread already exists', { status: 409 })
    }

    const subhargthread = await db.subhargthread.create({
      data: {
        name,
        creatorId: session.user.id
      },
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subhargthreadId: subhargthread.id
      },
    })

    return new Response(subhargthread.name)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create hargthread', { status: 500 })
  }
}