import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { characterDataSchema } from './schema'

export const maxDuration = 30;

export async function POST( req: Request ) {
  const prompt = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: characterDataSchema,
    prompt
  })

  return result.toTextStreamResponse()
}