import { z } from 'zod'

export const similarPlanetsSchema = z.object({
  similarPlanets: z.array(
    z.object({
      name: z.string().describe('Nombre del Planeta'),
      id: z.string().describe('ID del Planeta'),
      summary: z.string().describe('Un resumen del por qué elegiste el Planeta'),
      similarLevel: z.number().describe('Calificación del 0 al 100 de qué tan similar es el Planeta')
    })
  ).length(3)
})