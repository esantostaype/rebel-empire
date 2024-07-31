import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { characterDataSchema } from '../characterDataSchema'

export const maxDuration = 30;

export async function POST( req: Request ) {
  const character = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: characterDataSchema,
    prompt: `Generar información detallada en español de ${ character }: su Biografía, 3 caracteristicas (palabras) de su personalidad, Nivel de Popularidad (enviar solo el número: rango del 1 al 100), 3 datos curiosos del Personaje y el Nombre del actor/actriz que lo/la interpreta. Cuando escribas, hacerlo como si fueras el Maestro Yoda, un personaje de Star Wars, su personalidad se debe ver reflejada, asegúrate de capturar su escencia.`
  })

  return result.toTextStreamResponse()
}