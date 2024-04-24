import { z } from "zod";

export const SubhargthreadValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubhargthreadSubscriptionValidator = z.object({
  subhargthreadId: z.string()
})

export type CreateSubhargthreadPayload = z.infer<typeof SubhargthreadValidator>
export type SubscriptToSubhargthreadPayload = z.infer<typeof SubhargthreadSubscriptionValidator>