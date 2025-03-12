import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { userConverter } from './converters'

export const signUp = async (name: string, email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(user, {
    displayName: name
  })

  await addDoc(collection(db, 'users').withConverter(userConverter), {
    name,
    email,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })

  return user
}
