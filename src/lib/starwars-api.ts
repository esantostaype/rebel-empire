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
    const homeworldResponse = await fetch( character.homeworld )
    const homeworld = await homeworldResponse.json()
    character.homeworldName = homeworld.name
    return character
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}

export const getPlanets = async ( page?: string ) => {
  const baseUrl = `${ apiUrl }/planets/?page=${ page || "1" }`
  try {
    const response = await fetch( baseUrl )
    const planets = await response.json()
    return planets
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}

export const getPlanetById = async ( id: string ) => {
  const baseUrl = `${ apiUrl }/planets/${ id }`
  try {
    const response = await fetch( baseUrl )
    const planet = await response.json()
    return planet
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}