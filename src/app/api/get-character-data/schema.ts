import { z } from 'zod'

export const characterDataSchema = z.object({
  biography: z.string(),
  personality: z.array(
    z.object({
      item: z.string().describe('Palabra que define su personalidad')
    })
  ),
  popularityLevel: z.number(),
  curiosities: z.array(
    z.object({
      title: z.string().describe('Título de la Curiosidad'),
      description: z.string().describe('Descripción de la Curiosidad (no más de 50 palabras)')
    })
  ),
  actor: z.string()
})