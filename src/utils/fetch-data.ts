export const apiUrl = "https://swapi.dev/api/"

export const getCharacters = async () => {
  const baseUrl = `${ apiUrl }/people`
  try {
    const response = await fetch( baseUrl )
    const characters = await response.json()
    return characters.results
  } catch ( error ) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
  }
}