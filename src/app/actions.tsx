'use server';

import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/'
})

export async function streamComponent( prompt: string ) {

  const result = await streamText({
    model: perplexity('llama-3-sonar-large-32k-online'),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return result.toAIStreamResponse();
}

