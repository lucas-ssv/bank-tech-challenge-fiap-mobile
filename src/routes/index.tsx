import { useAuth } from '@/contexts'
import { AuthRoutes } from './auth'
import { AppRoutes } from './app'

export function Routes() {
  const { user } = useAuth()

  return user?.uid ? <AppRoutes /> : <AuthRoutes />
}
