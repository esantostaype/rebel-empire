export interface MainCharacter {
  id: string
  name: string
  image: string
  mainImage: string
  thumbnail: string
  message: string
  chatMessage: string
}

export interface Character {
  type: Character
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export interface DataGrid {
  name: string
  url: string
}

export type CharacterId = 'luke' | 'vader' | 'yoda'

// export interface ExtendedDocument extends Document {
//   startViewTransition?: any
// }