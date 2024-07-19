'use server';

import { generateObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? ''
})

export async function getTopics( input: string ) {
  'use server'
  const { object: topics } = await generateObject({
    model: openai('gpt-4-turbo'),
    prompt: input,
    schema: z.object({
      topics: z.array(
        z.object({
          item: z.string()
        })
      )
    })
  })

  return { topics }
}