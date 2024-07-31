import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai';
import { z } from 'zod'
import { topicSchema } from './schema'

export const maxDuration = 30

export async function POST( req: Request ) {
  const context = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: topicSchema,
    prompt: context
  });

  return result.toTextStreamResponse()
}