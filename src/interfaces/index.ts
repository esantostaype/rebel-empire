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
  homeworldName: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  url: string
}

export interface CharacterData {
  biography?: string
  personality?: { item: string }[]
  popularityLevel?: number
  curiosities?: { title: string, description: string }[]
  actor?: string
}

export interface Planet {
  type: Planet
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface SimilarPlanetData {
  similarPlanets?: {
    name?: string
    id?: string
    summary?: string
    similarLevel?: number
  }[]
}

export interface DataGrid {
  name: string
  url: string
}

export type CharacterId = 'luke' | 'vader' | 'yoda'

// export interface ExtendedDocument extends Document {
//   startViewTransition?: any
// }