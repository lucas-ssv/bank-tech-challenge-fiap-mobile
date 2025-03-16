import { Timestamp } from 'firebase/firestore'

export interface TransactionDocument {
  id?: string
  userUid: string
  name: string
  uri: string
  mimeType: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
