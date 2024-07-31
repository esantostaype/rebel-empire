import { z } from 'zod';

export const topicSchema = z.object({
  topics: z.array(
    z.object({
      item: z.string()
    })
  )
})