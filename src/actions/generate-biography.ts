'use server';

import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

export async function getBiography( character: string, mainCharacter: string ) {
  'use server'
  const { object: biography } = await generateObject({
    model: google('models/gemini-1.5-pro-latest'),
    prompt: `Generar una biografía detallada, en español de ${ character }. como si ${ mainCharacter }, un personaje de Star Wars, estuviera escribiéndola, la personalidad de ${ mainCharacter } se debe ver reflejada, asegúrate de capturar su escencia. De ser necesario y si el personaje lo amerita, considerar utilizar varios párrafos, subtítulos, negrita, listas, etc, pero enviarlo con etiquetas HTML que luego utilizaré con "dangerouslySetInnerHTML"`,
    schema: z.object({
      biography: z.string()
    })
  })

  return { biography: biography.biography }
}