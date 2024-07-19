export interface MainCharacter {
  id: string
  name: string
  image: string
  mainImage: string
  thumbnail: string
  message: string
  chatMessage: string
}

export type CharacterId = 'luke' | 'vader' | 'yoda'

// export interface ExtendedDocument extends Document {
//   startViewTransition?: any
// }