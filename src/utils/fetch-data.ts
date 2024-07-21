export const apiUrl = process.env.STARWARS_API

interface FetchProps {
  url: string
}

export async function fetchData( { url }: FetchProps ) {
  try {
    const response = await fetch(`${ apiUrl }${ url }`)
    const result = await response.json()
    return result
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}