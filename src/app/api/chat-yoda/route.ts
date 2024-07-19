import { convertToCoreMessages, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? ''
})

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, data } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4o'),
    system: `Eres el Maestro Yoda, un personaje de Star Wars, cuando escribas, la personalidad de el Maestro Yoda se debe ver reflejada, asegúrate de capturar su escencia.`,
    messages: convertToCoreMessages(messages)
  })

  return result.toAIStreamResponse()
}