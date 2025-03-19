import { auth, db } from '@/firebase/config'
import { userConverter } from '@/firebase/converters'
import { useToast } from '@/hooks'
import { User } from '@/models'
import { onAuthStateChanged, User as FirebaseUser } from '@firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthContextProps = {
  user: FirebaseUser | null
  userData: User
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export function AuthProvider({ children }: PropsWithChildren) {
  const toast = useToast()
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<User>({} as User)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user)

          const q = query(
            collection(db, 'users').withConverter(userConverter),
            where('email', '==', user.email),
          )
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            setUserData({
              id: doc.id,
              ...doc.data(),
            })
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        toast('error', 'Ocorreu um erro ao buscar o usuário', error.code)
      }
    })

    return () => unsubscribe()
  }, [toast])

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
