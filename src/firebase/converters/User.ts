import { User } from '@/models'
import { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => {
    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  },
  fromFirestore: (snapshot, options): User => {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ...data
    } as User
  }
}
