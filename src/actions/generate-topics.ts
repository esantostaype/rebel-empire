'use server';

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

export async function getTopics( character: string ) {
  'use server'
  const { object: topics } = await generateObject({
    model: openai('gpt-4-turbo'),
    prompt: `Generar una lista random en español de 4 tópicos interesantes por el cual partir una conversación con ${ character }, un personaje de Star Wars, a pesar de tener temática de Star Wars, deberán tener temas interesantes que puedan servir en la vida diaria de una persona, servirán para generar una lista de botones al chat de este personaje. La personalidad de ${ character } se debe ver reflejada, asegúrate de capturar su esencia. Debe tener mínimo 8 palabras y un máximo de 12 palabras.`,
    schema: z.object({
      topics: z.array(
        z.object({
          item: z.string()
        })
      )
    })
  })

  return { topics: topics.topics }
}