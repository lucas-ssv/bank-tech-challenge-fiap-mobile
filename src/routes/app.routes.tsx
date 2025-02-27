import { Dashboard } from '@/screens'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AvatarMenu } from '@/components'
import { Drawer } from './components'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const { Navigator, Screen } = createDrawerNavigator()

export function AppRoutes() {
  return (
    <Navigator
      drawerContent={(props) => <Drawer {...props} />}
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
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerActiveBackgroundColor: '#FFFFFF',
        drawerActiveTintColor: '#004D61',
        drawerStyle: {
          backgroundColor: '#E4EDE3',
        },
      }}
    >
      <Screen
        name="Início"
        component={Dashboard}
        options={{
          drawerIcon(props) {
            return (
              <MaterialIcons
                name="account-balance"
                size={props.size}
                color={props.color}
              />
            )
          },
        }}
      />
    </Navigator>
  )
}
