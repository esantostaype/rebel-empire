import { convertToCoreMessages, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `Eres el Maestro Yoda, un personaje de Star Wars, cuando escribas, la personalidad de el Maestro Yoda se debe ver reflejada, asegúrate de capturar su escencia.`,
    messages: convertToCoreMessages(messages)
  })

  return result.toAIStreamResponse()
}