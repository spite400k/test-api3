import { Timestamp } from 'firebase/firestore'

export type Category = {
  id: string
  name: string
  created: Timestamp
  updated: Timestamp
}
