'use client';

import { useState, useEffect } from 'react'
import { getTopics } from '@/actions/generate-topics'
import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'

type CharacterId = 'luke' | 'vader' | 'yoda'

interface Topic {
  item: string
}

interface GetChatTopicsResponse {
  topics: {
    topics: Topic[]
  }
}

interface ChatTopicsProps {
  onTopicClick: ( topic: string ) => void;
}

export const ChatTopics = ({ onTopicClick }: ChatTopicsProps ) => {
  const [ topics, setTopics ] = useState<string[]>([])
  const [ loading, setLoading ] = useState(true)
  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const character = mainCharacters.find( char => char.id === theme )
  
  const fetchTopics = async () => {
    try {
      setLoading( true )
      const response: GetChatTopicsResponse = await getTopics()
      const topicsArray = response.topics.topics.map(topic => topic.item)
      setTopics( topicsArray )
    } catch ( error ) {
      console.error('Error al cargar los Tópicos:', error)
    } finally {
      setLoading( false )
    }
  }

  useEffect(() => {
    fetchTopics()
  }, [ character?.name ])

  return (
    <>
    { loading ? (
      <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
        { Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-2 sm:flex-[0_0_calc(50%-0.5rem)] p-6 bg-[rgba(255,255,255,0.04)] animate-pulse rounded-md backdrop-blur-lg"
          >
            <div className="h-4 bg-[rgba(255,255,255,0.16)] rounded w-[100%]"></div>
            <div className="h-4 bg-[rgba(255,255,255,0.16)] rounded w-[70%]"></div>
          </div>
        ))}
      </div>
    ) : (
      <ul className='flex flex-col sm:flex-row flex-wrap gap-4 '>
        { topics.map(( topic, index ) => (
          <li key={index} className="flex flex-col flex-1 sm:flex-[0_0_calc(50%-0.5rem)]">
            <button
              onClick={() => onTopicClick( topic )}
              className="text-left bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-all py-6 px-10 flex-1 rounded-md backdrop-blur-lg"
            >
              { topic }
            </button>
          </li>
        ))}
      </ul>
    )}
    </>
  )
}