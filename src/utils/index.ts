import { CharacterId } from "@/interfaces"

export const getMainCharacterFullName = ( theme: CharacterId | null ) => {
  switch ( theme ) {
    case 'luke':
      return 'Luke Skywalker'
    case 'vader':
      return 'Darth Vader'
    case 'yoda':
      return 'Maestro Yoda'
    default:
      return 'Darth Vader'
  }
}

export function extractId( url: string ): number | null {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? parseInt( match[1], 10 ) : null
}

export function formatNumberWithKm( number: number ) {
  if (isNaN(number)) {
    return 'unknown'
  }
  const formatter = new Intl.NumberFormat('en-US')
  const formattedNumber = formatter.format(number)
  return formattedNumber
}