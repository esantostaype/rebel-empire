'use client'
import { useState } from 'react'
import { experimental_useObject } from '@ai-sdk/react'
import { C3po } from './C-3PO'
import { translatorSchema } from '@/app/api/translator/schema';
import { Button } from '@/components'

export default function StarshipsPage() {
  const [ phrase, setPhrase ] = useState('Midudev es mi inspiración')
  const [ language, setLanguage ] = useState('Huttese')
  
  const { object, submit } = experimental_useObject({
    api: '/api/translator',
    schema: translatorSchema
  })

  const handleTranslate = () => {
    submit({ language, phrase });
  }

  return (
    <>
      <section className="relative xl:max-w-[640px] 2xl:max-w-[768px] mx-auto z-20">
        <h1 className="font-inter normal-case">¡Hola! Soy C-3PO,<br/>tu Traductor Galáctico</h1>
        <p className="mt-4 mb-8">Estoy encantado de poder ayudarte con las traducciones que necesites. Puedo traducir entre una variedad de idiomas, incluidos <b className="text-accent">Huttese</b>, <b className="text-accent">Shyriiwook</b>, <b className="text-accent">Droid Binary</b>, <b className="text-accent">Mandalorian</b>, <b className="text-accent">Inglés</b> y <b className="text-accent">Binario</b>, asegurando que puedan comunicarse sin barreras en cualquier rincón de la galaxia. ¡Explora y disfruta de una comunicación universal sin esfuerzo!</p>
        <div className="md:flex border-2 border-[rgba(255,255,255,0.16)] rounded-lg">
          <div className="flex-1">
            <div className="mb-2 px-4 py-3 border-b-[1px] border-[rgba(255,255,255,0.16)]">Básico Galáctico Estándar</div>
            <div>
              <textarea
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                className="resize-none w-full h-40 rounded-lg py-2 pl-4 pr-16 outline-none appearance-none"
              >
              </textarea>
            </div>
          </div>
          <div className="flex-1 border-t-[1px] border-t-[rgba(255,255,255,0.16)] md:border-l-[1px] md:border-t-0 md:border-l-[rgba(255,255,255,0.16)]">
            <div className="mb-2 pr-4 border-b-[1px] border-[rgba(255,255,255,0.16)]">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-[calc(0.75rem+1px)] w-full outline-none"
              >
                <option value="Huttese">Huttese</option>
                <option value="Shyriiwook">Shyriiwook</option>
                <option value="Droid">Droid Binary</option>
                <option value="Mandalorian">Mandalorian</option>
                <option value="Inglés">Inglés</option>
                <option value="Binario">Binario</option>
              </select>
            </div>
            <div className="h-40 overflow-y-auto">
              <div className="px-4">
                { object?.translate }
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-2">
          <Button disabled={ !phrase } text='Traducir Frase' onClick={ handleTranslate } />
        </div>
      </section>
      <C3po/>
    </>
  );
}
