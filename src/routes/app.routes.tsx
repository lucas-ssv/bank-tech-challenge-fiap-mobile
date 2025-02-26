import { Dashboard } from '@/screens'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AvatarMenu } from '@/components'

const { Navigator, Screen } = createDrawerNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#004D61',
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 8,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 24,
        },
        headerTintColor: '#FF5031',
        headerRight() {
          return <AvatarMenu />
        },
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  )
}
