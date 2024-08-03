import { z } from 'zod'

export const historySchema = z.object({
  title: z.string().describe('Título de la Historia'),
  story: z.string().describe('Historia')
})