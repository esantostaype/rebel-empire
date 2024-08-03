import { z } from 'zod'

export const translatorSchema = z.object({
  phrase: z.string(),
  translate: z.string().describe("Traducción de la Frase")
})