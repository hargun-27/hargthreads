import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { sub } from "date-fns"

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
    })
    followedCommunitiesIds = followedCommunities.map(({subhargthread}) => subhargthread.id)
  }

  try {
    
  } catch (error) {
    
  }
}