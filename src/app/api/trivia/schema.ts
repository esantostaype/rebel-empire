import { z } from 'zod'

export const triviaSchema = z.object({
  question: z.string(),
  choices: z.array(
    z.object({
      item: z.string().describe('Alternativa de la Pregunta de la Trivia')
    })
  ).length(5),
  response: z.string().describe('Respuesta por parte del Sistema, si es CORRECT o INCORRECT'),
  correctAnswer: z.string().describe('La Respuesta Correcta'),
  descriptionCorrectAnswer: z.string().describe('Descripción de la Respuesta Correcta')
})