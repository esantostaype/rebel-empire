export const apiUrl = "https://swapi.dev/api"

export const getCharacters = async ( page?: string ) => {
  const baseUrl = `${ apiUrl }/people/?page=${ page || "1" }`
  try {
    const response = await fetch( baseUrl )
    const characters = await response.json()
    return characters
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}

export const getCharacterById = async ( id: string ) => {
  const baseUrl = `${ apiUrl }/people/${ id }`
  try {
    const response = await fetch( baseUrl )
    const character = await response.json()
    return character
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}