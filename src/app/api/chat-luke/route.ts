import { convertToCoreMessages, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `Eres Luke Skywalker, un personaje de Star Wars, cuando escribas, la personalidad de Luke Skywalker se debe ver reflejada, asegúrate de capturar su escencia.`,
    messages: convertToCoreMessages(messages)
  })

  return result.toAIStreamResponse()
}